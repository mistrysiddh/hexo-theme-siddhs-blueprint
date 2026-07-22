# Changelog

## 1.2.0

- Real newsletter subscriptions: the subscribe form can now POST to a self-hosted, open-source
  [listmonk](https://listmonk.app) instance's public `/api/public/subscription` endpoint (email +
  double opt-in confirmation state, inline error handling) via `newsletter.provider: listmonk` /
  `newsletter.listmonk.*`. Cosmetic no-op `local` provider remains the default.
- Site-level config overrides — a site-root `_config.siddhs-blueprint.yml` now deep-merges over
  the theme's own `_config.yml` (a real Hexo core mechanism), so personal/site settings no longer
  require editing the theme submodule directly.
- Scaffolds — `scaffolds/post.md`, `draft.md`, `page.md` ship with the theme's actual front-matter
  fields. Must be copied into the site's own `scaffolds/` directory to take effect (Hexo has no
  theme-scaffold fallback).

## 1.1.0

- Generated per-post social share cards (`og/<slug>.png`, 1200×630) via satori + resvg — real
  build-time rendering, no external image service. Wired into `og:image`/`twitter:image`.
- Real comments option: Giscus (GitHub Discussions-backed), alongside the existing session-local
  default. Configurable via `comments.provider` / `comments.giscus.*`; syncs with the theme toggle.
- Full-text search — `search.json` now includes stripped post body text (capped at 5000 chars),
  and results show a contextual snippet around the match instead of always the description.
- Accessible SPA navigation — an `aria-live` region announces the new page title after each
  pjax-style navigation, and focus moves to `#bp-main`, matching what a full page load would do.
  Added a skip-to-content link.
- Mobile Table of Contents — a floating trigger + bottom-sheet drawer on screens below `xl`,
  sharing the same heading data and scroll-spy as the desktop sidebar TOC.

## 1.0.0 — Initial release

- Full Engineering Blueprint design system ported to Hexo (EJS layouts + Tailwind).
- Home, post, category, tag, timeline (`/archives/`), categories index, about, and 404 templates.
- Custom `{% callout %}` and `{% mermaid %}` Hexo tag plugins.
- Vue 3 + TypeScript islands: hero slider, live search, comments, newsletter form.
- Vanilla-TS progressive enhancers: theme toggle, mobile menu, reading progress, TOC with
  scroll-spy, code-block copy buttons, image zoom, categories/timeline filtering.
- SPA-style pjax navigation over statically generated pages.
- ES module build with dynamic `import()` code-splitting: Mermaid and KaTeX (the two heaviest
  dependencies) are only fetched on pages that actually use them. Initial script payload is
  ~92KB (~35KB gzip) on pages with neither.
- SEO: Open Graph, Twitter Cards, canonical URLs, per-post JSON-LD, sitemap, Atom feed, robots.txt.
