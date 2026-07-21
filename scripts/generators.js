"use strict";

// Emits a single JSON feed of all posts, consumed client-side by the Search
// modal, Timeline explorer and Categories explorer Vue islands — mirrors the
// /api/search route from the original Next.js build.

hexo.extend.generator.register("bp_data_feed", function (locals) {
  const posts = locals.posts.sort("-date").toArray();
  const themeConfig = hexo.theme.config || {};
  const authorName = (themeConfig.author && themeConfig.author.name) || "";

  function stripHtml(html) {
    return String(html || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function wordCount(html) {
    const text = stripHtml(html);
    return text ? text.split(" ").filter(Boolean).length : 0;
  }

  // Cap the body text shipped for search so a large site doesn't balloon
  // search.json — plenty of headroom for substring matching against typical
  // post lengths.
  const MAX_BODY_CHARS = 5000;

  const data = posts.map(function (post) {
    const cats = post.categories ? post.categories.toArray() : [];
    const tags = post.tags
      ? post.tags.toArray().map(function (t) {
          return t.name;
        })
      : [];
    const words = wordCount(post.content);
    const category = cats.length ? cats[0] : null;
    const body = stripHtml(post.content).slice(0, MAX_BODY_CHARS);

    return {
      title: post.title,
      path: "/" + String(post.path || "").replace(/index\.html$/, ""),
      description: post.description || post.excerpt || "",
      body: body,
      cover: post.cover || themeConfig.seo?.og_image_fallback || "",
      category: category ? category.name : "",
      category_slug: category ? category.slug : "",
      tags: tags,
      author: post.author || authorName,
      date: post.date ? post.date.toISOString() : null,
      updated: post.updated ? post.updated.toISOString() : post.date ? post.date.toISOString() : null,
      version: post.version || "v1.0",
      featured: !!post.featured,
      word_count: words,
      char_count: String(post.content || "").replace(/<[^>]*>/g, "").length,
      reading_time: Math.max(1, Math.ceil(words / 220)),
    };
  });

  return [
    {
      path: "assets/data/search.json",
      data: JSON.stringify(data),
    },
  ];
});
