---
title: Sztuka Makijażu
date: 2017-07-15 22:13:00 +02:00
pathSpec: "/sztuka-makijazu/:pageNumber(-\\d+-)?/"
tags:
- sztuka
- makijaż
- inspiracje
role: category
---

<div>
  <Feed posts={
    paramorph.categories['Sztuka Makijażu'].posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

