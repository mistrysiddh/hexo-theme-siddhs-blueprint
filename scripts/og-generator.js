"use strict";

// Generates a blueprint-styled 1200x630 social share card per post at
// og/<slug>.png, baked in at `hexo generate`/`hexo server` time. head.ejs
// prefers this over the post's `cover` for og:image/twitter:image when it
// exists. Rendering ~10 posts adds a few seconds to generation — cached
// per-run, not per-request.

const { drawingNumber } = require("./lib/format");
const { renderOgImage } = require("./lib/og-image");

hexo.extend.generator.register("bp_og_images", async function (locals) {
  const posts = locals.posts.toArray();
  const themeConfig = hexo.theme.config || {};
  const brand =
    (themeConfig.brand && (themeConfig.brand.logo_prefix + " " + themeConfig.brand.logo_accent).trim()) || "";
  const authorName = (themeConfig.author && themeConfig.author.name) || "";
  const moduleMap = themeConfig.category_modules || {};

  const routes = [];

  for (const post of posts) {
    try {
      const cats = post.categories ? post.categories.toArray() : [];
      const cat = cats.length ? cats[0] : null;
      const mod = cat ? moduleMap[cat.slug] : null;
      const moduleLabel = mod && cat ? mod.code + "  /  " + cat.name.toUpperCase() : "SIDDH'S BLUEPRINT";

      const png = await renderOgImage({
        title: post.title,
        moduleLabel,
        drawingNumber: drawingNumber(post.slug),
        author: post.author || authorName,
        dateDisplay: post.date ? post.date.format("MMMM DD, YYYY") : "",
        brand,
      });

      routes.push({ path: "og/" + post.slug + ".png", data: png });
    } catch (err) {
      hexo.log.warn("[siddhs-blueprint] Failed to generate OG image for '" + post.title + "': " + err.message);
    }
  }

  return routes;
});
