---
layout: distill
title: Are Transformers conceptually better than CNNs?
description: 
giscus_comments: true
date: 2023-07-05
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
  - name: An inevitable analogy
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

## An inevitable analogy

Transformers evolved from attention-based RNNs when recurrence was removed from them. In layman's terms, each layer of a Transformer tries to compare each atom of information (words for text and patches for images) with every other atom. While CNNs use the combination of convolution and pooling which only can compare spatially adjacent atoms while pooling the response from the convolution layers. 

I cannot miss the resemblance of these two architectures with sorting algorithms. In this analogy, a Transformer layer is the $$O(n^2)$$ time complexity sorting algorithms (non-parallelised) like selection sort or bubble sort while CNNs are the $$O(n\log n)$$ algorithms  like merge sort[^1]. This also accounts for the higher complexity of Transformers[^2]. Further, the comparisons at different receptive fields at different spatial resolutions in the CNNs are quite similar in structure to the recursive hierarchical comparison structure in mergesort. For example, in merge sort when we found the order in one level of recurrence we need not do comparisons among these sets of atoms again. Similarly, in CNNs pooling a patch leads to aggregation of information among all the atoms in a region and we need not compare them again amongst themselves.

The only difference between sorting and these deep neural network architectures is that in the case of CNNs, pooling leads to loss of information due to which we cannot make sure that every atom gets compared to every other atom[^3]. Sorting assumes monotonicity among the atoms (a way to order the results of comparisons) which may not be the case for tasks that deep neural networks solve. In CNNs, only the pooled aggregations get "compared" with their neighbours while due to monotonicity aggregations of sorted subparts still retain all the information about their order. This problem does not occur in Transformers which uses a brute force way of comparison. 

I feel this may be the reason why **Transformers are conceptually better than CNNs even though they may be way more inefficient**. Ideally, the hierarchical nature of CNNs should extract all the essence from the input but in practice, **it lacks the rigour that Transformers have and at the same time does not have the benefit of simplified input structure assumptions necessary for efficient sorting**. 


### Acknowledgements
Thanks to [Dr. Kamal Gupta](https://kampta.github.io/) for their useful feedback to make this article more readable and explicit. 


[^1]: The $$\log n$$ in the complexity comes from the number of layers required to have the possibility of comparison of all atoms in a CNN's input. Some may say that one layer of Transformer is not a fair comparison for $$O(\log n)$$ layers of convolution-pooling layers. But here I was trying to look at how much complexity is required to compare all the atoms (or at least have an illusion of it) which Transformers can do in a single layer. 

[^2]: A multi-layer transformer will actually have a $$O(n^2 \log n)$$ time complexity when $$O(\log n)$$ layers are used. This is required so that higher-level concepts can be compared apart from low-level atoms.

[^3]: [Attention Pooling](https://github.com/openai/CLIP/blob/main/clip/model.py#L58) seems to be a $$O(n)$$ complexity compromise between standard pooling and a Transformer layer. If we were to use a fully functional Transformer layer instead for pooling then one could argue that why do even need convolutions anymore because _Attention is all you need_ !  


---
