---
title: Sztuka Ubioru
date: 2017-07-15 22:14:00 +02:00
pathSpec: "/sztuka-ubioru/:pageNumber(-\\d+-)?/"
tags:
- sztuka
- ubiór
- moda
- projektanci
- domy mody
- inspiracje
role: category
---

<div>
  <Feed posts={
    paramorph.categories['Sztuka Ubioru'].posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

