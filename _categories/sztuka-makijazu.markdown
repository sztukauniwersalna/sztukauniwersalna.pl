---
title: Sztuka Makijażu
date: 2017-07-15 22:13:00 +02:00
tags:
- sztuka
- makijaż
- inspiracje
pathSpec: "/sztuka-makijazu/:pageNumber(-\\d+-)?/"
role: category
---

<div>
  <Feed posts={
    paramorph.categories['Sztuka Makijażu'].posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

