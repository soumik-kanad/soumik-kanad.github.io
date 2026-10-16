// Render math, and keep placeholder links inert until real URLs exist.

document.addEventListener("DOMContentLoaded", function () {

  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$",  right: "$",  display: false }
      ],
      throwOnError: false
    });
  }

  document
    .querySelectorAll("[data-placeholder], [data-placeholder-inline]")
    .forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); });
    });
});
