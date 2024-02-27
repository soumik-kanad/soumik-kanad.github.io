---
layout: distill
title: What is the point?
description: 
giscus_comments: true
date: 2024-02-27
featured: true

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
  - name: Example
  - name: Discussion and Conclusion
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
Why do I even bother to do research and submit to "1st Tier Conferences" when it is going to get rejected anyway? **What is the point?**
My advisor says that the review process is very very noisy and we should not get disheartened; we should make improvements and resubmit again. 
He is probably right about the extreme noise because of the number of people submitting and the occasional experimentation in the review process.
But I find the idea of "resubmitting again and again till your paper gets outdated and then someone pity-accepts the paper" inelegant and disheartening. 
I would have been fine with improving the work if there were actual pitfalls that needed to be corrected. But sigh! That is never the case. 


I am starting to find the process of review and rebuttal very emotionally draining as well as pointless. I'm not saying it does not work but it has not worked for me even once properly. By now I have gone through 4 cycles of reviews and rebuttals and every time it is just heart-breaking. There are only so many pieces that your heart can break into before it becomes irreparable. Besides, I realised that the immense amount of energy, effort, and time that goes into creating a work does not matter to a reviewer. If a reviewer has made up their mind in the initial review, it is highly improbable that they change their mind in the final review. Further, it does not even seem that it matters to the Area Chair/ Program Chair if the paper has any relevance. 

I am going to share the experience of the review of one of my papers. I think they are important to understand where I am coming from but feel free to skip them to the conclusion if you want. 

## Example
In this example, I talk about how a work of mine that got preposterous reviews. In this, we had an insight that (text-free) diffusion model features have emergent recognition powers, which makes diffusion process a self-supervised pretraining method. We first analysed the diversity in these features to be able to come up with methods to harness this knowledge in a meaningful manner. Then we also showed competitive results on multiple tasks to show its effectiveness. 

Some of the reviews were completely unrelated, eg. asking why we were text-free when the paper is in a self-supervised representation learning category, or why we didn't compare/mention methods that use text; while others are unfair eg. disregarding a paper for not being SOTA, or questioning a hypothesis when we show empirical results; while some other are just plain wrong eg. misquoting papers, wrongly citing papers, saying that our method is the same as some completely different paper which models generation hence incremental, or disregarding the main heavy training stage of the SOTA competitor as an advantage we have. In regards to these, they go on to give comments which are very demoralizing as well as demeaning. And the PC final review was the final nail in the coffin being an utter concoction of balderdash.

### version 1
I had a paper D1 which was majorly based on one primary insight (which I think was quite an exciting finding). The reviewers questioned (1) the motivation of the paper, (2) the fact that we don't use "text", (3) the performance gap, and (4) there being concurrent papers that explore one of all the aspects that we look at (obviously they do it differently). One of them asked to do 640 GPU hours of ablation (which we didn't have the resources or time to do) and further goes on to say "I am not sure all reviewers will sufficiently raise their score for this paper to get through, but maybe this discussion is still useful to make a better paper." (which is quite disheartening to get before the final review). Finally, the program chair rejected it quoting the "lack of thoroughness of this experimental study", and the results being “mildly interesting” and “not [..] strong, impactful”. There was some constructive criticism as well which asked us to show results on more tasks and use the insight to build a method.

### version 2
We took their advice for the next iteration of the paper, D2. In D2, D1 was merely a subpart of the analysis section. (1,2) We rewrote the introduction to handle the motivation and the "text-free" nature besides adding "text-free" in the title itself. (3) We introduced 2 new methods and showed their effectiveness on 5 tasks where were are now within +-2% of every method we compare against. (4) We also added a section in the related works talking about concurrent works that handle only one task using text-based models. So, we addressed all the flaws we had in the previous D1 and hence the paper should get in this time, right? Right?!

You guessed it. The answer is NO! 

#### Initial reviews - 
The reviewers praise our writing, experiments, and analysis. 
- R1 gives "borderline" based on "Related Works" being at the end and the fact that we didn't spell out ViT-B! How is this relevant to any of the contents of the paper?
- R2 gives "borderline" and complains about SOTA and the methods being similar to a paper called UD. The only similarity UD has with one of our methods is that both use diffusion models and transformers. Now, the reviewer did not take the time out to see what UD was doing and what we were doing. UD was doing something that was completely different from what we were doing and that too very differently. Essentially, UD's diffusion model was a transformer that was being trained to learn joint-distribution of text+image in their latent spaces while we used a pretrained "Convolutional" diffusion model's features and gave this to a transformer head to do "Recognition". If that was not enough, we also had a second method, which I think the reviewer fell asleep before reading. They, in fact, to prove a minor point of theirs misquoted a well-known paper we had as a reference.
- R3 gives "borderline" and complains about SOTA, missing reference of papers OD and VP, questions a hypothesis in the paper, and "text-free" nature of the paper. I was not aware of OD or VP, but both of these models again use text (leaking labels) and solve only one task while we show generalisation on multiple tasks. As for the hypothesis, they say stuff like "I am worried that the claim of ... is not reliable and may be misleading to the research society" citing only one work. This is so disheartening when we experimentally show that this hypothesis works and had at least 5 citations in our related work which also have similar conclusions based on ablations in their tasks. By the way, this paper was submitted to "Self-Supervised Representation Learning" category, so I do not understand why they are questioning the "text-free" nature of the paper.


#### Rebuttal - 
- We said that SOTA was not the focus, but showing that something trained for A works for B as well was our insight. But we have results within +-2% in all tasks that we show.
- Text-free: using text leaks downstream labels, manual/automated text captioner have their own bias and do not generalise to novel/out-of-distribution concepts. That is the whole point of self-supervised learning in the first place. 
- About UD being different.
- We gave references for our hypothesis: [80, 49, 52, 67, 74][^1]. 
- We gave results showing SOTA doesn't beat us in a particular task.
- Some runtime numbers

We pointed out to the AC that rejection based on SOTA is against the guidelines and that we were being questioned for "text-free" in "Self-Supervised Representation Learning" category. Also pointed out that R2 makes incorrect statements. 

#### Final reviews - 
- R1 ghosted us.
- R2 reduced rating to "weak reject". They question SOTA and say that "it is not clear what conclusive additional information this work provides to the community." They further question the computational overhead and are still stuck on UD being the same as ours. Finally, they question our hypothesis now saying that out of [80, 49, 52, 67, 74], [49, 52, 67, 74] are latent space diffusion models while ours is pixel space. How does that even prove any point?!!! Both latent-space, as well as pixel-space models, are going through the same diffusion process, and both are 2D spatial signals with channels; then how is the latent space so different? For a moment let's assume that their point is valid. They slyly forget about [80] being pixel space. And what if I said that [52] was also a pixel space model and that R2 does not read things properly?
- R3 reduced the rating to "weak reject". They say that OD, VP, and [49] already show what we showed in this work. Dear R3, you completely missed the point that this paper shows the property we highlight is true even without "text" showing that it is diffusion model's property and not because of the enormous amount of text the rest are trained on. Besides, they each show one task at a time while we show multiple. We had pointed out that the SOTA model requires 3 cumbersome steps which they did not agree saying that step 1 of that is readily available similar to ours while step 3 is similar to ours; completely forgetting step 2 which requires training on 32 V100s for 4 days. Finally, they rejected based on SOTA.
- PC: used these phrases "below CVPR standards", "unconvincing experiments and performance improvements", "unjustified design choices", and "incremental contributions", "needs substantial rewriting". I don't understand if the AC/PC even read the paper properly because I don't see them summarising the paper at all. It just seems that they are basing their arguments on the reviews completely without even reading the paper or rebuttal. Even if I were to base the final decision on the reviewers, who in their final review did have "performance improvements" (which is against the guideline) and "incremental contributions" (which I don't think is correct based on my comments above); none of them had problems with "unconvincing experiments", "unjustified design choices", or "needs substantial rewriting". Where did they even get these three criteria?
  - **"Unconvincing experiments"**: R1 R2 put extensive experiments in varied tasks as our strength. 
  - **"Unjustified design choices"**: R2 praised us saying "Fairly easy to implement, has potential to have a significant impact" and R3 said that our analysis was "interesting", "novel" and "inspiring" on which our methods were based. Maybe the PC was talking about the hypothesis here? But we have extensive studies and references backing it. 
  - **"needs substantial rewriting"** except R1 having an issue with the related work being at the end, both R2 and R3 praised the clarity and flow of the paper. R2 had a few minor updates which we were ready to make. 


## Discussion and Conclusion
I don't think I have a conclusion because I am both confused and disappointed. How do you have faith in such a system where scientific evidence is not enough to convince the community to accept a work? Here the paper will get accepted only if your views align with those of the reviewers (who apparently can represent the whole community). Here the reviewers already make up their minds based on their beliefs and will not change it even with evidence bolstering your point. Here new insights are useless if you do not beat the SOTA. And if you do beat the SOTA your work is not novel enough. I can no longer even have faith in the AC/PC system as well because that also seems noisy. The chairs seem to not properly read the paper or the rebuttals to base their final judgment. I appreciate the reviewers, ACs, PCs to take out their time to undergo the review process but I am losing all my faith in the outcome and effectiveness of this system. Anyway, people are using LLMs to write their reviews, might as well remove the middle-"MAN". Scaling may solve video generation but it seems to fail miserably in peer-review.    

When a very similar study was done on a very small scale with results on CiFAR, MNIST and consequently got performance comparable to standard methods, even though not SOTA, it ended up getting an "Oral paper". But us showing that this insight does not hold in larger datasets like ImageNet out of the box was "mildly interesting" and proposing methods to make it comparable to standard methods was "unconvincing [..] performance improvements", "unjustified design choices", and "incremental contributions". 

I don't even understand why they gave this paper borderline in the first place if they didn't want to accept it. Were they expecting that we would make it SOTA in the rebuttal period or did I say things in the rebuttal that they didn't agree with? The PC came up with new unfair reasons to reject the paper without proper justification. 

One conclusion could be that the system is extremely flawed. But the flip side would be that I'm not good enough for this field. My ideas are boring, incremental, and unacceptable for this fast-moving community. All ideas anyway get outdated and are declared useless because of concurrent works in a similar domain (even though they can never be the exact same). Anyway, there is no breathing space, the reviews/rebuttals further choke all the enthusiasm out of you. To catch up, currently, I put all my hours in the day toward research. And still, I lag in the amount of work that I produce and out of that even less gets accepted. 

In the past three years of my PhD I have dedicated most of my time to work, leading to the loss of my hobbies. I knew that PhD would be difficult but it is also draining me from inside. Yesterday, when I asked what was the point of any of this it was going to get rejected anyway. My advisor said that you should do it because it makes you happy. And doing research makes me immensely happy but at the same time, these unjustified rejections make me extremely sad and I'm starting to question if the latter is more. So,back to the question -- **what is the point**?





---
[^1]: These references are from the original paper.