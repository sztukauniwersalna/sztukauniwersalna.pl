---
title: Sztuka dla Sztuki
date: 2017-07-15 22:12:00 +02:00
tags:
- sztuka
- współczesna
- abstrakcja
- inspiracje
pathSpec: "/sztuka-dla-sztuki/:pageNumber(-\\d+-)?/"
role: category
---

<div>
  <Feed posts={
    paramorph.categories['Sztuka dla Sztuki'].posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

