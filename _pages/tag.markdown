---
title: Tag
date: 0000-01-01 01:24:00 +01:24
output: false
---

<div>
  <Feed posts={
    post.posts
      .filter(p => p.output && p.feed)
      .sort((a, b) => b.compareTo(a))
  } />
</div>

