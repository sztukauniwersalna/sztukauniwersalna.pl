---
title: Strona Główna
date: 2017-07-15 22:12:00 +02:00
tags:
- index
- sztuka
- uniwersalna
- kreacja
- moda
- makijaż
- gotowanie
- moodboard
- artysta
- art
pathSpec: "/:pageNumber(-\\d+-)?/"
description: Sztuka w codzienności. Znajdź sposoby na odnalezienie odrobiny sztuki
  w codziennych czynnościach takich jak gotowanie, makijaż, oraz moda. Sztuka współczesna,
  sztuka abstrakcyjna, inspiracje dziełami wielkich twórców.
feed: false
---

<div>
  <Feed posts={
    paramorph.collections['Posts'].posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

