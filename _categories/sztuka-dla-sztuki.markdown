---
title: Sztuka dla Sztuki
date: 2017-07-15 22:12:00 +02:00
permalink: "/sztuka-dla-sztuki/"
tags:
- sztuka
- współczesna
- abstrakcja
- inspiracje
role: category
---

<div>
  <Feed pages={
    paramorph.categories['Sztuka dla Sztuki'].pages
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

