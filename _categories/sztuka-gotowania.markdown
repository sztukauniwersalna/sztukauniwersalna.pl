---
title: Sztuka Gotowania
date: 2017-07-15 22:12:00 +02:00
tags:
- sztuka
- gotowanie
- kuchnia
- dania
- ciasta
- inspiracje
role: category
---

<div>
  <Feed pages={
    paramorph.categories['Sztuka Gotowania'].pages
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

