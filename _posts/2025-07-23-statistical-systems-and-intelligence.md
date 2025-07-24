---
layout: distill
title: Can statistical systems ever be intelligent?
description: 
giscus_comments: true
date: 2025-07-23
featured: false
published: false

authors:
  - name: Soumik Mukhopadhyay
    url: 
    affiliations:
      name: PhD student, UMD

bibliography: 2018-12-22-distill.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).

# toc:
#   - name: Equations
#     # if a section has subsections, you can add them as follows:
#     # subsections:
#     #   - name: Example Child Subsection 1
#     #   - name: Example Child Subsection 2
#   - name: Citations
#   - name: Footnotes
#   - name: Code Blocks
#   - name: Interactive Plots
#   - name: Layouts
#   - name: Other Typography?

toc:
  - name: Introduction
  - name: Premise
  - name: Debate/Discussion Notes
  - name: My Conclusions
# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }

---

## Introduction

These are notes on my chat with my Advisor on this topic. In this conversation I’ll use **S** for me and **A** for my advisor. I’ll divide the main part of the debate/discussion into major points that came up and our thoughts about them. I will add some thoughts in square brackets [], which are my thought and were not part of the discussion.

## Premise
* **Initial hypothesis**: Statistical systems cannot be intelligent.
    * **Definitions**:
        * Here _statistical systems_ are systems that are trained to just learn the probability distribution of underlying data (eg. any neural network like LLMs).
        *  _Intelligence_ here refers to being able to solve problems which have never been solved before, and no one knows the answers as well as ways to solve it, yet.
* **Motivation**: I was watching a [Minsky lecture video](https://youtu.be/AO7F0n2Dclc?si=Xcd88f3reTl3DAyv&t=4234) which argued that Bayesian statistical systems cannot be intelligent, because they are opposite of what intelligence is. For intelligence you need to make smart hypothesis, ie. look at possibilities which are improbable or non-existent in the current dataset/knowledge base.
    * Once I heard this, it seemed like we (the PhD students in AI) are just making “Artificial Dumbness” instead of Intelligence.

## Debate/Discussion Notes:
* _Initial remark_:
    * **S**: Current statistical systems have not reached this level of intelligence.
    * **A**: Agreed but they will eventually.
* _**A**: the data provided to current LLM’s cannot be compared to the amount of data that even a toddler has perceived_:
    * **S**: That is true but toddlers have not seen the entire internet, which is not just raw data but preprocessed data in human relevant concept. Plus they have virtually infinite (compared to human) levels of memory and information processing and retrieval capabilities.
    * **A**: With these super human capabilities, it has achieved stuff that we humans can’t, which makes them useful. And probably with more amounts of data and processing power they will achieve even intelligence.
    * **S**: I disagreed that pure statistical systems will ever achieve intelligence. 
* _**A** wasn’t letting me define the human knowledge base_.
    * [I wanted to start defining intelligence as the ability to move the boundary of human knowledge base (ie. extrapolation)]
    * **A**’s point was that we don’t have all the information about what the knowledge base was/is (because a lot of historical verbal, text, and thoughts are lost in time) or how to define/measure it.
* _**S**: There have been exceptional humans coming up with theories/science/math that no one else in the history of humanity even imagined. I think that is what moves the knowledge base of human kind forward, ie. extrapolation, and the rest of us are just interpolating between previously known things (also known as “standing on the shoulder of giants.”). Examples - Euclid, Euler, Riemann, Newton, Fourier, Einstein,……_
    * **A**: No one knows how they come up with their exceptional discoveries; we don’t have what generic mutations they have or what was going on in their mind, what discussion they had with their peers.
    * **S**: But there do exist examples of systems (humans in this case) which are intelligent, and there exists a way/algorithm that such systems have reached this level of intelligence (namely evolution.)
    * **A**: What was the last time you thought such a human arrived on this planet? 50 years? 100 years? Allow LLMs that much time to arrive to the conclusion that they cannot achieve intelligence.
    * [I wanted to propose an experiment but **A** kept saying that we can never faithfully achieve full amount of data required for this (eg. verbal discussions, lost documents, thoughts in the head):
        * How about a hypothetical situation of giving all the knowledge available prior Newton’s time and make an LLM to come up with Newton’s laws? I am pretty sure that only next word prediction cannot make Newton’s laws of motion, but one cannot prove this faithfully.]
* _Interpolation vs Extrapolation_:
    * **S**: Current neural nets can interpolate between the data fed into them at some level of abstraction. Since, they have seen too much data they may seem to do intelligent things but I’d say all of this is just having extremely superior memory, retrieval, processing, and interpolation properties compared to one human’s capabilities. 
    * **A**: What about protein folding? Maybe humans where also doing interpolation in some sense and intelligence is just interpolation at certain level of abstraction.
    * **S**: Protein folding success is like saying alphaZero is smarter than humans because they have better processing capabilities to look into deeper possibility traces of Chess compared to human. But collectively we have achieved breakthroughs given enough time, and I don’t see statistical systems achieving that.
    * **A**: Are you sure that given enough time LLMs can’t achieve such breakthroughs just using interpolation?
        * [**S**: I there is no way to prove or disprove this right now.] 
* _Differential/higher-order knowledge_
    * **A**: Maybe some N-th higher order knowledge differential (think of 2nd order differential as the feedback on whether an idea/hypothesis/thought is worth exploring or not) might be enough to make intelligent discoveries.
    * **S**: I feel that is not enough (but there is no way to prove/disprove that). There needs to be exploration on top of differential data.
* _**A**: But companies using RL to make statistical systems (like LLMs) do explicitly explore less probable directions/ideas_.
    * **S**: To me that (eg. RLHF) also sounds like we are providing 2nd order knowledge data for their reward. Which is again supervision. The model didn’t come up with what to do.
    * **A**: How does it matter who is providing these signals/instructions till it makes a system intelligent?
* _**A**: Is GPT o1 a statistical system (using the definition above) to you?_
    * **A**: Is ChatGPT a non-statistical system given it was asked to once in a while actively seek feedback for things less probable?
        * **S**: To me, that stops becoming a pure statistical system, because you are giving it intelligent algorithmic instructions to achieve that non-statistical behavior. So, not sure if it is a statistical system anymore.
    * **A**: With this in mind, is reasoning based systems like o1 statistical in your definition? 
        * **S**: I’d say not anymore. There are more than just predicting what the data says you to predict. You have a God layer (algorithms coming from an Oracle) which makes you explore improbable scenarios to see if anything useful/interesting comes out of nothing. 
    * **A**: I don't agree with your definition of statistical systems, but glad we are on the same page now.

## My Conclusions:
* I believe interpolation is not enough to discover new things. There needs to be extrapolation, ie. exploration of uncharted territories. We need systems which are as smart as exceptional humans to make new discoveries/ breakthroughs. 
    * (There is no way to prove or disprove this yet, that with n-th order of differential data, maybe smartness directly emerges. ) 
* Maybe mere bayesian statistical systems like LLMs are not enough to achieve intelligence. But with a meta-algorithms/meta-instructions which uses such statistical systems as their base tools, but tells them how to explore/achieve novelty/intelligence, it is indeed doable. Minsky also said something in these lines - maybe each advanced system making intelligent hypothesis (in humans) consists 90% of bayesian reinforcement things but the rest 10% are symbolic like K-lines. I’m unsure that we have found the secret sauce in that meta-algorithm that makes these statistical systems intelligent. (My worry is what if you need Newton to tell an LLM the possibility of the existence of Newton's laws!) **A** seemed optimistic enough that it will happen in next 10 years given the current development, saying as a person who experienced times when HoG features would fail miserably to experiencing an extremely useful reasoning assistant in our pockets. Let’s hope he is right, because that is a fascinating possibility to live for! 

---
