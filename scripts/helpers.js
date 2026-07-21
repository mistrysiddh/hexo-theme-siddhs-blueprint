"use strict";

const fs = require("fs");
const path = require("path");
const { iconSvg } = require("./lib/icons");
const { hashSeed, drawingNumber, revisionCode } = require("./lib/format");

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

hexo.extend.helper.register("strip_html", stripHtml);

hexo.extend.helper.register("word_count", function (content) {
  const text = stripHtml(content);
  return text ? text.split(" ").filter(Boolean).length : 0;
});

hexo.extend.helper.register("char_count", function (content) {
  return stripHtml(content).length;
});

hexo.extend.helper.register("reading_time", function (content) {
  const words = stripHtml(content).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
});

hexo.extend.helper.register("drawing_number", drawingNumber);

hexo.extend.helper.register("revision_code", revisionCode);

hexo.extend.helper.register("pseudo_stat", function (seed, min, max) {
  const range = max - min;
  return min + (hashSeed(seed) % range);
});

hexo.extend.helper.register("icon", function (name, size) {
  return iconSvg(name, size);
});

// Serializes an object for a single-quoted HTML attribute (data-widget-props='...').
// JSON.stringify only ever produces double-quoted syntax, but string VALUES
// inside it (a post title containing an apostrophe, say) can still contain a
// literal `'` that would otherwise terminate the attribute early and truncate
// the JSON. Escaping it as an HTML entity keeps the attribute well-formed —
// the browser decodes it back to `'` before JSON.parse ever sees it.
hexo.extend.helper.register("widget_props", function (obj) {
  return JSON.stringify(obj).replace(/'/g, "&#39;");
});

hexo.extend.helper.register("category_module", function (slug) {
  const map = (this.theme && this.theme.category_modules) || {};
  return (
    map[slug] || {
      name: slug,
      code: "MOD-00",
      icon: "box",
      description: "",
    }
  );
});

// Cache-busting query string for the theme's compiled assets — derived from
// the built file's mtime so every `npm run build` forces browsers to fetch
// the new bundle instead of reusing a stale cached copy of app.js/app.css.
hexo.extend.helper.register("asset_version", function (file) {
  try {
    const p = path.join(hexo.theme_dir, "source/assets", file);
    return Math.floor(fs.statSync(p).mtimeMs);
  } catch (e) {
    return Date.now();
  }
});

hexo.extend.helper.register("excerpt_text", function (content, length) {
  const text = stripHtml(content);
  const max = length || 160;
  return text.length > max ? text.slice(0, max).trim() + "…" : text;
});
