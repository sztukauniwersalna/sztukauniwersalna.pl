---
title: Sztuka dla Sztuki
permalink: /sztuka-dla-sztuki/:pageNumber?/
date: 2017-07-15 22:12:00 +02:00
tags:
- sztuka
- współczesna
- abstrakcja
- inspiracje
role: category
---

<div>
  <Feed posts={
    paramorph.categories['Sztuka dla Sztuki'].posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

