---
layout: distill
title: Can statistical systems ever be intelligent?
description: 
giscus_comments: true
date: 2025-07-23
featured: false
hidden: true

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
  - name: Further Reading
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

These are notes on my chat with my Advisor on this topic. In this conversation, I’ll use **S** for me and **A** for my advisor. I’ll divide the main part of the debate/discussion into major points that came up and our thoughts about them. I will add some thoughts in square brackets [], which are my thought and were not part of the discussion.

## Premise
* **Initial hypothesis**: Statistical systems cannot be intelligent.
    * **Definitions**:
        * Here _statistical systems_ are systems that are trained to just learn the probability distribution of underlying data (e.g., any neural network like LLMs).
        *  _Intelligence_ here refers to being able to solve problems which have never been solved before, and no one knows the answers, as well as ways to solve them, yet.
* **Motivation**: I was watching a [Minsky lecture video](https://youtu.be/AO7F0n2Dclc?si=Xcd88f3reTl3DAyv&t=4234) which argued that Bayesian statistical systems cannot be intelligent, because they are the opposite of what intelligence is. For intelligence, you need to make smart hypothesis, ie. look at possibilities which are improbable or non-existent in the current dataset/knowledge base.
    * Once I heard this, it seemed like we (the PhD students in AI) are just making “Artificial Dumbness” instead of Intelligence.

## Debate/Discussion Notes:
* _Initial remark_:
    * **S**: Current statistical systems have not reached this level of intelligence.
    * **A**: Agreed, but they will eventually.
* _**A**: the data provided to current LLMs cannot be compared to the amount of data that even a toddler has perceived_:
    * **S**: That is true, but toddlers have not seen the entire internet, which is not just raw data but preprocessed data in human-relevant concepts. Plus, they have virtually infinite (compared to human) levels of memory and information processing and retrieval capabilities.
    * **A**: With these superhuman capabilities, it has achieved stuff that we humans can’t, which makes it useful. And probably with more amounts of data and processing power, they will achieve even intelligence.
    * **S**: I disagreed that pure statistical systems will ever achieve intelligence. 
* _**A** wasn’t letting me define the human knowledge base_.
    * [I wanted to start defining intelligence as the ability to move the boundary of the human knowledge base (i.e., extrapolation)]
    * **A**’s point was that we don’t have all the information about what the knowledge base was/is (because a lot of historical verbal, text, and thoughts are lost in time) or how to define/measure it.
* _**S**: There have been exceptional humans coming up with theories/science/math that no one else in the history of humanity even imagined. I think that is what moves the knowledge base of humankind forward, i.e., extrapolation, and the rest of us are just interpolating between previously known things (also known as “standing on the shoulders of giants”). Examples - Euclid, Euler, Riemann, Newton, Fourier, Einstein,……_
    * **A**: No one knows how they come up with their exceptional discoveries; we don’t have what genetic mutations they have or what was going on in their mind, what discussions they had with their peers.
    * **S**: But there do exist examples of systems (humans in this case) which are intelligent, and there exists a way/algorithm that such systems have reached this level of intelligence (namely, evolution.)
    * **A**: What was the last time you thought such a human arrived on this planet? 50 years? 100 years? Allow LLMs that much time to arrive at the conclusion that they cannot achieve intelligence.
    * [I wanted to propose an experiment but **A** kept saying that we can never faithfully achieve the full amount of data required for this (e.g., verbal discussions, lost documents, thoughts in the head):
        * How about a hypothetical situation of giving all the knowledge available before Newton’s time and making an LLM to come up with Newton’s laws? I am pretty sure that only next word prediction cannot make Newton’s laws of motion, but one cannot prove this faithfully. (Email me if anyone wants to work on this idea!)]
* _Interpolation vs Extrapolation_:
    * **S**: Current neural nets can interpolate between the data fed into them at some level of abstraction. Since they have seen too much data, they may seem to do intelligent things, but I’d say all of this is just having extremely superior memory, retrieval, processing, and interpolation properties compared to one human’s capabilities. 
    * **A**: What about [protein folding](https://en.wikipedia.org/wiki/AlphaFold)? Maybe humans are also doing interpolation in some sense, and intelligence is just interpolation at a certain level of abstraction.
    * **S**: Protein folding success is like saying [AlphaZero](https://en.wikipedia.org/wiki/AlphaZero) is smarter than humans because they have better processing capabilities to look into deeper possibility traces of Chess compared to humans. But collectively, we have achieved breakthroughs given enough time, and I don’t see statistical systems achieving that.
    * **A**: Are you sure that, given enough time, LLMs can’t achieve such breakthroughs just using interpolation?
        * [**S**: I think there is no way to prove or disprove this right now.] 
* _Differential/higher-order knowledge_
    * **A**: Maybe some N-th higher order knowledge differential (think of 2nd order differential as the feedback on whether an idea/hypothesis/thought is worth exploring or not) might be enough to make intelligent discoveries.
    * **S**: I feel that is not enough (but there is no way to prove/disprove that). There needs to be exploration/randomness on top of differential data.
    * **A**: But people already use exploration like reinforcement learning and randomness in the form of seeds.
    * **S**: Using a seed for randomness does not make statistical systems look in improbable directions.
* _**A**: Companies using [RL](https://en.wikipedia.org/wiki/Reinforcement_learning) to make statistical systems (like LLMs) do it so that these systems explicitly explore less probable directions/ideas_.
    * **S**: To me that (eg. [RLHF](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback)) also sounds like we are providing 2nd order knowledge data for their reward. Which is again supervision. The model didn’t come up with what to do.
    * **A**: How does it matter who is providing these signals/instructions till it makes a system intelligent?
* _**A**: Is GPT o1 a statistical system (using the definition above) to you?_
    * **A**: Is ChatGPT a non-statistical system, given it was asked to once in a while actively seek feedback for things less probable?
        * **S**: To me, that stops becoming a pure statistical system, because you are giving it intelligent algorithmic instructions to achieve that non-statistical behavior. So, not sure if it is a statistical system anymore.
    * **A**: With this in mind, is reasoning based systems like o1 statistical in your definition? 
        * **S**: I’d say not anymore. There are more than just predicting what the data says to predict. You have a God layer (algorithms coming from an Oracle), which makes you explore improbable scenarios to see if anything useful/interesting comes out of nothing. 
    * **A**: I don't agree with your definition of statistical systems, but glad we are on the same page now.

## My Conclusions:
* I believe interpolation is not enough to discover new things. There needs to be extrapolation, ie. exploration of uncharted territories. We need systems which are as smart as exceptional humans to make new discoveries/ breakthroughs. 
    * (There is no way to prove or disprove this yet, that with n-th order of differential data, maybe smartness directly emerges. ) 
* Maybe mere Bayesian statistical systems like LLMs are not enough to achieve intelligence. But with meta-algorithms/meta-instructions which use such statistical systems as their base tools, but tell them how to explore/achieve novelty/intelligence, it is indeed doable. Minsky also said something in these lines - maybe our mind made of advanced systems, making intelligent hypothesis (in humans) consists 90% of bayesian reinforcement things but the rest 10% are symbolic like K-lines. I’m unsure that we have found the secret sauce in that meta-algorithm that makes these statistical systems intelligent. (My worry is what if you need Newton to tell an LLM the possibility of the existence of Newton's laws!) **A** seemed optimistic enough that it will happen in the next 10 years, given the current development, saying as a person who experienced times when HoG features would fail miserably, to experiencing an extremely useful reasoning assistant in our pockets. Let’s hope he is right, because that is a fascinating possibility to live for! 

## Further thoughts and reading:

After the discussion, I also tried to look up some sources to make sure that I was not just supporting outdated notions. So, here are some reading materials:

* **About the definitions**:

    * What I defined as "intelligence" is merely one aspect of what humans consider intelligence. This aspect is more suitable to be called [adaptive intelligence](https://dictionary.apa.org/adaptive-intelligence).

* **Examples of AI beating humans**:

    Even though I'm unsure that any of these examples are still forms of intelligent systems. My concern is that they are just smart brute-forcers. Regardless, they are definitely impressive and have beaten humans. 

    * [AlphaFold2](https://www.nature.com/articles/d41586-020-03348-4) solved a 50-year old problem. 
    * [AlphaTensor](https://deepmind.google/discover/blog/discovering-novel-algorithms-with-alphatensor/) found a faster matrix-multiplication method.
    * [AlphaZero](https://www.newyorker.com/science/elements/how-the-artificial-intelligence-program-alphazero-mastered-its-games) has found new moves unknown to Chess Grand Masters.

* **Interpolation vs Extrapolation**

    * [Bonnasse-Gahot et al.](https://arxiv.org/abs/2207.08648) point towards held-out datapoints represented in neural network feature space being in the interpolation regime.
    * While [Balestriero et al.](https://arxiv.org/abs/2110.09485) saw that in raw pixel space, almost every test sample falls in the extrapolation regime.
    
* **Benchmarking intelligence**

    It is very difficult to faithfully measure intelligence, but it is still a very important task. Here are some attempts by people trying to measure intelligence in new AI systems.
    * [ARC-Challenge](https://arcprize.org/) tests abstract pattern  invention without allowing brute-forcing.
    * [LLM-SRBencg (2024)](https://arxiv.org/abs/2504.10415) tests whether LLMs can come up with the final equations when they are absent in the corpus.
    * [ResearchBench (2025)](https://arxiv.org/abs/2503.21248) tests whether LLMs can discover interesting research innovations or hypotheses. 

* **Alternate Theories to find the secret sauce**

    I think it was a good exercise, and ChatGPT gave me the following directions that I myself need to read.
    
    * Connectionist vs. Symbolic AI: Whether to represent and process data in human-readable symbols or empirically derived representation ([Goel (2023)](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/download/15111/18883), [Xiong et al. (2024)](https://arxiv.org/html/2407.08516v2))
     
    * System‑1/System‑2 dual‑process views: Intuitive thinking vs effort based deliberate thinking ([Loo's blog](https://thedecisionlab.com/reference-guide/philosophy/system-1-and-system-2-thinking)).
    * Predictive coding: Predicting the future and comparing with the real future. ([Wikipedia](https://en.wikipedia.org/wiki/Predictive_coding)).
    * Pure scaling not enough: ([LeCun (2025)](https://finance.yahoo.com/news/meta-chief-ai-scientist-yann-153745262.html)).
  
---
