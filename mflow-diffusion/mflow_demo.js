/* "Try it: dial the gains" -- interactive MFlow m-curve playground.
 *
 * u_G = x0 - M eps is linear in the gains, so with per-group noise components N_g (precomputed by
 * PD/scripts/paper_figures/build_mflow_demo_assets.py) the browser only evaluates
 *     M eps = sum_g m_g N_g,     u_G = x0 - M eps
 * and shows both with the same per-image min-max normalisation as the paper figure.
 * Data comes from a JS file (not JSON) so the page also works when opened from file://.
 */
(function () {
  "use strict";

  var card = document.getElementById("md-card");
  if (!card) return;

  var DATA_SRC = "assets/mflow_demo/mflow_demo_data.js";
  var SVGNS = "http://www.w3.org/2000/svg";
  var COLORS = { x0: "#444", u: "#444", uA: "#0072B2", uG: "#D55E00" };

  // ---------- lazy load ----------
  var requested = false;
  function load() {
    if (requested) return;
    requested = true;
    var s = document.createElement("script");
    s.src = DATA_SRC;
    s.async = true;
    s.onload = function () {
      if (window.MFLOW_DEMO_DATA) init(window.MFLOW_DEMO_DATA);
      else fail();
    };
    s.onerror = fail;
    document.body.appendChild(s);
  }
  function fail() {
    card.innerHTML = '<p class="md-wait">Could not load the demo data.</p>';
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: "600px 0px" });
    io.observe(card);
  } else {
    load();
  }

  // ---------- helpers ----------
  function bytes(b64) {
    var s = atob(b64), n = s.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = s.charCodeAt(i);
    return u;
  }
  function el(tag, cls, parent, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }
  function sv(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function snap(v, step) { return clamp01(Math.round(v / step) * step); }

  // Per-image min-max to [0, 255], as norm() in the notebook; a constant image maps to black.
  function drawNorm(ctx, imgData, arr) {
    var lo = Infinity, hi = -Infinity, n = arr.length, i;
    for (i = 0; i < n; i++) { var a = arr[i]; if (a < lo) lo = a; if (a > hi) hi = a; }
    var s = hi - lo > 1e-9 ? 255 / (hi - lo) : 0, d = imgData.data;
    for (i = 0; i < n / 3; i++) {
      d[4 * i] = (arr[3 * i] - lo) * s;
      d[4 * i + 1] = (arr[3 * i + 1] - lo) * s;
      d[4 * i + 2] = (arr[3 * i + 2] - lo) * s;
      d[4 * i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // ---------- main ----------
  function init(D) {
    var H = D.H, W = D.W, P = D.patch, PD = P * P * 3, K = D.K, HW3 = H * W * 3;
    var nPW = W / P, NP = (H / P) * nPW;
    var groups = D.groups, G = groups.length;

    // --- decode + expand the per-group noise components N_g ---
    var x0u8 = bytes(D.x0);
    var epsQ = new Int8Array(bytes(D.eps).buffer);
    var V = new Float32Array(bytes(D.V).buffer);      // (D, K) row-major
    var C = new Float32Array(bytes(D.C).buffer);      // (NP, K) row-major

    var Vt = new Float32Array(K * PD);                 // (K, D) for contiguous inner loops
    for (var j = 0; j < PD; j++) for (var k = 0; k < K; k++) Vt[k * PD + j] = V[j * K + k];

    var pix = new Int32Array(NP * PD);                 // in-patch index -> HWC pixel index
    for (var p = 0; p < NP; p++) {
      var pi = Math.floor(p / nPW), pj = p % nPW;
      for (j = 0; j < PD; j++) {
        var r = Math.floor(j / (3 * P)), c = Math.floor(j / 3) % P, ch = j % 3;
        pix[p * PD + j] = ((pi * P + r) * W + pj * P + c) * 3 + ch;
      }
    }

    var eps = new Float32Array(HW3), x0 = new Float32Array(HW3);
    for (var i = 0; i < HW3; i++) { eps[i] = epsQ[i] * D.epsScale; x0[i] = x0u8[i] / 255; }

    var comps = groups.map(function (g) {
      var N = new Float32Array(HW3);
      if (g.end > K) return N;                         // the tail group is filled in below
      for (var p = 0; p < NP; p++) {
        for (var k = g.start; k < g.end; k++) {
          var cpk = C[p * K + k], row = k * PD, base = p * PD;
          for (var j = 0; j < PD; j++) N[pix[base + j]] += cpk * Vt[row + j];
        }
      }
      return N;
    });
    // Tail group = eps minus every other group, so all gains = 1 reproduces eps exactly.
    var tail = comps[G - 1];
    for (i = 0; i < HW3; i++) {
      var acc = eps[i];
      for (var g = 0; g < G - 1; g++) acc -= comps[g][i];
      tail[i] = acc;
    }

    // --- state ---
    var m = new Float64Array(G);
    var activePreset = null;

    // --- DOM ---
    card.innerHTML = "";
    card.setAttribute("role", "group");

    var bar = el("div", "md-presets", card);
    var presetBtns = D.presets.map(function (pr) {
      var b = el("button", "md-preset", bar);
      b.type = "button";
      b.textContent = pr.name;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { applyPreset(pr); });
      return b;
    });
    // Reset: enabled once the curve has been edited; restores the last preset that was chosen.
    var resetBtn = el("button", "md-reset", bar, "&#8634; Reset");
    resetBtn.type = "button";
    resetBtn.disabled = true;
    var lastPreset = null;
    resetBtn.addEventListener("click", function () { if (lastPreset) applyPreset(lastPreset); });

    var body = el("div", "md-body", card);

    // ----- left: editable m-curve -----
    var plot = el("div", "md-plot", body);
    var VW = 440, VH = 292, L = 40, R = 8, T = 12, B = 78;
    var PW = VW - L - R, PH = VH - T - B, YMIN = -0.08, YMAX = 1.1;
    var weights = groups.map(function (g) { return g.end - g.start === 1 ? 1 : 1.5; });
    var totalW = weights.reduce(function (a, b) { return a + b; }, 0);
    var colL = [], colW = [], acc0 = L;
    weights.forEach(function (w) { colL.push(acc0); colW.push(w / totalW * PW); acc0 += w / totalW * PW; });
    function cx(g) { return colL[g] + colW[g] / 2; }
    function y(v) { return T + (YMAX - v) / (YMAX - YMIN) * PH; }
    var yBase = T + PH;

    var svg = sv("svg", { viewBox: "0 0 " + VW + " " + VH, class: "md-svg",
      "aria-label": "Editable gain curve: one handle per PCA direction or group" }, plot);
    sv("rect", { x: L, y: y(1), width: PW, height: y(0.66) - y(1), fill: "#eef4fb" }, svg);
    sv("rect", { x: L, y: y(0.34), width: PW, height: y(0) - y(0.34), fill: "#fdf1e9" }, svg);
    [0, 0.5, 1].forEach(function (v) { sv("line", { x1: L, x2: L + PW, y1: y(v), y2: y(v), stroke: "#e6e6e6" }, svg); });
    var tVel = sv("text", { x: L + PW - 6, y: y(0.83) + 4, "text-anchor": "end", "font-size": 13, fill: "#4a6fa5" }, svg);
    tVel.textContent = "velocity-like";
    var tX0 = sv("text", { x: L + PW - 6, y: y(0.17) + 4, "text-anchor": "end", "font-size": 13, fill: "#a5633a" }, svg);
    tX0.textContent = "x\u2080-like";
    sv("line", { x1: colL[10], x2: colL[10], y1: T, y2: yBase, stroke: "#bbb", "stroke-dasharray": "3 3" }, svg);

    // axes
    sv("line", { x1: L, x2: L, y1: T, y2: yBase, stroke: "#999", "stroke-width": 1.5 }, svg);
    sv("line", { x1: L, x2: L + PW, y1: yBase, y2: yBase, stroke: "#999", "stroke-width": 1.5 }, svg);
    [0, 1].forEach(function (v) {
      var t = sv("text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", "font-size": 12, fill: "#495057" }, svg);
      t.textContent = String(v);
    });
    var yl = sv("text", { x: 12, y: T + PH / 2, "text-anchor": "middle", "font-size": 14, fill: "#212529",
      transform: "rotate(-90 12 " + (T + PH / 2) + ")" }, svg);
    yl.textContent = "gain m\u1d62";
    groups.forEach(function (g, k) {
      var single = g.end - g.start === 1;
      var t = sv("text", { "font-size": single ? 12 : 11, fill: "#495057" }, svg);
      if (single) {
        t.setAttribute("x", cx(k)); t.setAttribute("y", yBase + 14); t.setAttribute("text-anchor", "middle");
        t.textContent = String(g.start + 1);
      } else {
        t.setAttribute("text-anchor", "end");
        t.setAttribute("transform", "translate(" + (cx(k) + 3) + "," + (yBase + 10) + ") rotate(-45)");
        t.textContent = g.label;
      }
    });
    var xt = sv("text", { x: L + PW / 2, y: VH - 20, "text-anchor": "middle", "font-size": 14, fill: "#212529" }, svg);
    xt.textContent = "PCA direction i";
    var xv = sv("text", { x: L + PW / 2, y: VH - 4, "text-anchor": "middle", "font-size": 12, fill: "#6b6b6b" }, svg);
    xv.textContent = "\u2190 increasing variance";

    var area = sv("polygon", { "fill-opacity": 0.12, stroke: "none" }, svg);
    var line = sv("polyline", { fill: "none", "stroke-width": 3, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);

    var handles = groups.map(function (g, k) {
      var h = sv("g", { class: "md-handle", tabindex: 0, role: "slider", "aria-valuemin": 0, "aria-valuemax": 1,
        "aria-orientation": "vertical",
        "aria-label": g.end - g.start === 1 ? "Gain m for PCA direction " + (g.start + 1)
                                            : "Gain m for PCA directions " + g.label + " (shared)" }, svg);
      var c = sv("circle", { cx: cx(k), r: 7 }, h);
      var t = sv("text", { class: "md-val", x: cx(k) }, h);
      h.addEventListener("keydown", function (e) { onKey(e, k); });
      return { g: h, c: c, t: t };
    });

    var readout = el("div", "md-readout", plot);
    el("div", "md-hint", plot,
      "Drag a handle (or draw across several); snaps to 0.1, hold Shift for 0.01. Arrow keys work too.");

    // ----- right: equation strip -----
    var eq = el("div", "md-eq", body);
    var head = el("div", "md-eq-head", eq);
    // Wrap in a span: a <sub> that is a direct flex item loses its baseline offset.
    el("div", "md-chip md-chip-x0", head, "<span>x<sub>0</sub></span>");
    el("div", "md-op", head, "&minus;");
    var mterm = el("div", "md-mterm", head);
    var mbar = el("div", "md-mbar", mterm);
    mbar.setAttribute("aria-hidden", "true");
    var mcells = groups.map(function (g) { return el("span", g.end - g.start === 1 ? "" : "md-tail", mbar); });
    var mletter = el("div", "md-mbar-letter", mbar);
    el("span", "md-otimes", mterm, "&otimes;");
    var epsThumb = el("canvas", "md-epsthumb", mterm);
    el("div", "md-op", head, "=");
    var resLabel = el("div", "md-result-label", head);

    var imgs = el("div", "md-eq-imgs", eq);
    function panel(cap) {
      var wrap = el("div", "md-imgwrap", imgs);
      var cv = el("canvas", "md-canvas", wrap);
      cv.width = W; cv.height = H;
      var capEl = el("span", "md-cap", wrap, cap);
      return { cv: cv, ctx: cv.getContext("2d"), img: null, cap: capEl };
    }
    var pX0 = panel("clean image <i>x</i><sub>0</sub>");
    el("div", "", imgs);
    var pMe = panel("filtered noise <i>M</i>&epsilon;");
    el("div", "", imgs);
    var pU = panel("");
    pX0.cv.setAttribute("aria-label", "Clean image x0");
    pMe.cv.setAttribute("aria-label", "Noise filtered by M");
    pU.cv.setAttribute("aria-label", "Regression target");
    [pMe, pU].forEach(function (pp) { pp.img = pp.ctx.createImageData(W, H); });

    el("div", "md-scale", eq,
      "<span>black = <i>x</i><sub>0</sub>-pred</span><span class=\"md-scale-bar\"></span><span>white = <i>u</i>-pred</span>");

    el("p", "md-note", card,
      "Same image and noise as the figure above. PCs 11\u2013768 are edited in groups; the MFlow preset is the " +
      "learned MFlow-H/16 + LPIPS curve on ImageNet-256 (tail groups set to their mean). Images use per-image min\u2013max.");

    // static images
    var x0Img = pX0.ctx.createImageData(W, H);
    for (i = 0; i < H * W; i++) {
      x0Img.data[4 * i] = x0u8[3 * i]; x0Img.data[4 * i + 1] = x0u8[3 * i + 1];
      x0Img.data[4 * i + 2] = x0u8[3 * i + 2]; x0Img.data[4 * i + 3] = 255;
    }
    pX0.ctx.putImageData(x0Img, 0, 0);
    epsThumb.width = W; epsThumb.height = H;
    var ectx = epsThumb.getContext("2d");
    drawNorm(ectx, ectx.createImageData(W, H), eps);

    // ---------- rendering ----------
    var me = new Float32Array(HW3), u = new Float32Array(HW3), pending = false;
    function render() {
      pending = false;
      me.fill(0);
      for (var g = 0; g < G; g++) {
        var w = m[g];
        if (w === 0) continue;
        var N = comps[g];
        for (var i = 0; i < HW3; i++) me[i] += w * N[i];
      }
      for (i = 0; i < HW3; i++) u[i] = x0[i] - me[i];
      drawNorm(pMe.ctx, pMe.img, me);
      drawNorm(pU.ctx, pU.img, u);
    }
    function schedule() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(render);
    }

    function kind() {
      var all0 = true, all1 = true, binary = true;
      for (var g = 0; g < G; g++) {
        if (m[g] !== 0) all0 = false;
        if (m[g] !== 1) all1 = false;
        if (m[g] !== 0 && m[g] !== 1) binary = false;
      }
      return all0 ? "x0" : all1 ? "u" : binary ? "uA" : "uG";
    }
    var LABELS = {
      x0: ["<i>x</i><sub>0</sub>", "0", "<i>u</i><sub><i>G</i></sub> = <i>x</i><sub>0</sub> (JiT target)"],
      u:  ["<i>u</i>", "1", "<i>u</i> = <i>x</i><sub>0</sub> &minus; &epsilon; (velocity)"],
      uA: ["<i>u<sub>A</sub></i>", "P", "<i>u<sub>A</sub></i> = <i>x</i><sub>0</sub> &minus; <i>P</i>&epsilon; (binary mask)"],
      uG: ["<i>u<sub>G</sub></i>", "M", "<i>u<sub>G</sub></i> = <i>x</i><sub>0</sub> &minus; <i>M</i>&epsilon;"]
    };

    function update() {
      var kd = kind(), col = COLORS[kd], pts = [], rEff = 0;
      for (var g = 0; g < G; g++) {
        var v = m[g], yy = y(v), h = handles[g];
        pts.push(cx(g).toFixed(1) + "," + yy.toFixed(1));
        h.c.setAttribute("cy", yy);
        h.c.setAttribute("stroke", col);
        h.t.setAttribute("y", yy - 12);
        h.t.textContent = v.toFixed(2);
        h.g.setAttribute("aria-valuenow", v.toFixed(2));
        var lev = Math.round(v * 255);
        mcells[g].style.background = "rgb(" + lev + "," + lev + "," + lev + ")";
        rEff += v * (groups[g].end - groups[g].start);
      }
      line.setAttribute("points", pts.join(" "));
      line.setAttribute("stroke", col);
      area.setAttribute("points", cx(0).toFixed(1) + "," + yBase + " " + pts.join(" ") + " " +
                                  cx(G - 1).toFixed(1) + "," + yBase);
      area.setAttribute("fill", col);
      mletter.textContent = LABELS[kd][1];
      resLabel.innerHTML = LABELS[kd][0];
      pU.cap.innerHTML = LABELS[kd][2];
      readout.innerHTML = "soft velocity rank <i>r</i><sub>eff</sub> = tr(<i>M</i>) = &Sigma;<i>m<sub>i</sub></i> = <b>" +
        (rEff < 100 ? rEff.toFixed(2) : rEff.toFixed(0)) + "</b> of " + D.D;
      presetBtns.forEach(function (b, k) {
        var on = activePreset === k;
        b.classList.toggle("md-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      var edited = activePreset === null && lastPreset !== null;
      resetBtn.disabled = !edited;
      resetBtn.title = lastPreset ? "Reset the curve to " + lastPreset.name : "";
      resetBtn.setAttribute("aria-label", lastPreset ? "Reset the curve to " + lastPreset.name : "Reset");
      schedule();
    }

    function applyPreset(pr) {
      for (var g = 0; g < G; g++) m[g] = pr.m[g];
      activePreset = D.presets.indexOf(pr);
      lastPreset = pr;
      update();
    }
    function setGain(g, v) {
      if (m[g] === v) return;
      m[g] = v;
      activePreset = null;
    }

    // ---------- pointer: drag a handle, or draw across columns ----------
    function toSvg(e) {
      var rc = svg.getBoundingClientRect();
      return { x: (e.clientX - rc.left) * VW / rc.width, y: (e.clientY - rc.top) * VH / rc.height };
    }
    function colAt(x) {
      for (var g = G - 1; g >= 0; g--) if (x >= colL[g]) return g;
      return 0;
    }
    function valAt(yy) { return YMAX - (yy - T) / PH * (YMAX - YMIN); }

    var drag = null;
    function paint(e) {
      var pt = toSvg(e), g = colAt(pt.x), step = e.shiftKey ? 0.01 : 0.1, v = valAt(pt.y);
      var g0 = drag.g, v0 = drag.v;
      // fill skipped columns when the pointer moves fast across several
      var n = Math.abs(g - g0);
      for (var s = 1; s <= n; s++) {
        var gg = g0 + (g > g0 ? s : -s);
        setGain(gg, snap(v0 + (v - v0) * s / n, step));
      }
      if (n === 0) setGain(g, snap(v, step));
      if (drag.g !== g) {
        handles[drag.g].g.classList.remove("md-drag");
        handles[g].g.classList.add("md-drag");
      }
      drag.g = g; drag.v = v;
      update();
    }
    svg.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      var pt = toSvg(e);
      if (pt.x < L - 10 || pt.y > yBase + 6) return;
      e.preventDefault();
      var g = colAt(pt.x);
      drag = { g: g, v: valAt(pt.y), id: e.pointerId };
      svg.setPointerCapture(e.pointerId);
      handles[g].g.classList.add("md-drag");
      handles[g].g.focus({ preventScroll: true });
      paint(e);
    });
    svg.addEventListener("pointermove", function (e) {
      if (drag && e.pointerId === drag.id) paint(e);
    });
    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      handles[drag.g].g.classList.remove("md-drag");
      drag = null;
    }
    svg.addEventListener("pointerup", endDrag);
    svg.addEventListener("pointercancel", endDrag);

    // ---------- keyboard ----------
    function onKey(e, g) {
      var step = e.shiftKey ? 0.01 : 0.1, v = m[g];
      // move to the next grid level in the pressed direction (preset values can sit between levels)
      switch (e.key) {
        case "ArrowUp": case "ArrowRight": case "PageUp": v = snap((Math.floor(v / step + 1e-6) + 1) * step, step); break;
        case "ArrowDown": case "ArrowLeft": case "PageDown": v = snap((Math.ceil(v / step - 1e-6) - 1) * step, step); break;
        case "Home": v = 0; break;
        case "End": v = 1; break;
        default: return;
      }
      e.preventDefault();
      setGain(g, v);
      update();
    }

    var start = D.presets.filter(function (pr) { return pr.id === "mflow"; })[0] || D.presets[0];
    applyPreset(start);
  }
})();
