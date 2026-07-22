# Siddh's Blueprint — a Hexo theme

An **Engineering Blueprint** themed [Hexo](https://hexo.io) theme: CAD drawings, technical
specification sheets, and drafting-table precision applied to a technical blog. Every page —
home, post, category, timeline, about — is laid out like an official engineering document:
drawing numbers, revision codes, corner registration marks, grid backgrounds, and a title block
in the footer.

Built with **Hexo (EJS) for real, crawlable, server-rendered pages**, and a **Vue 3 + TypeScript +
Vite** layer for the interactive pieces — hero slider, live search, timeline filtering, code-block
copy buttons, Mermaid/KaTeX rendering — plus lightweight SPA-style navigation so browsing feels
instant without giving up static-site SEO.

> This theme was built from a from-scratch design system (not forked from any existing theme).
> Aurora ([auroral-ui/hexo-theme-aurora](https://github.com/auroral-ui/hexo-theme-aurora)) was
> used only as a reference point for what a modern Vue-powered Hexo theme's project shape looks
> like — the visual design, components, and code here are original.

---

## Features

- **Engineering Blueprint design language** — blueprint blue / deep navy / engineering cyan
  palette, grid + ruler backgrounds, corner registration marks, drawing numbers, revision codes,
  CAD-style hover states.
- **Hero slider** on the home page — auto-advancing cover sheet with prev/next, pagination dots,
  and a full engineering title block per slide.
- **System Modules** — categories are displayed as numbered engineering modules (`MOD-01 System
  Core`, etc.), fully configurable in `_config.yml`.
- **Timeline** (`/archives/`) — every post plotted on a CAD-style connector-line timeline, grouped
  by year, with year/module filters and client-side "infinite scroll" over real, pre-rendered HTML.
- **Categories explorer** (`/categories/`) — searchable, sortable module grid plus a tag cloud.
- **Live search** — indexes title, description, tags, category and author; opens with the navbar
  search button.
- **Post template** — engineering title-block metadata header (Designer / Module / Runtime /
  Documentation Length / Revision / Version), sticky Table of Contents with scroll-spy, reading
  progress bar, previous/next, related documents, mobile Table of Contents drawer, and comments
  (session-local by default, or real GitHub Discussions-backed comments via [Giscus](https://giscus.app)).
- **Rich content support**: fenced code blocks (server-side highlighted with real line numbers via
  `hexo-renderer-markdown-it`, enhanced client-side with a copy button + language badge), custom
  `{% callout %}` note/tip/warning/alert boxes, `{% mermaid %}` diagrams, inline/block KaTeX math,
  GFM task lists, footnotes, tables, blockquotes, embedded video/iframes, file download links,
  image zoom.
- **About page** — full engineering profile: bio, experience, education, skills matrix,
  certifications, achievements, projects, favorite tech, resume download, social links.
- **Light / dark theme toggle** — dark "blueprint" mode by default, plus a light "cyanotype paper"
  mode.
- **SPA-style navigation** — internal links are intercepted and only the content region is
  swapped, without losing per-page static HTML (see [Architecture](#architecture)).
- **SEO** — Open Graph, Twitter Cards, canonical URLs, per-post `TechArticle` JSON-LD, sitemap,
  Atom feed, `robots.txt`, and a **generated 1200×630 social share card per post** (title, module
  badge, drawing number — rendered at build time, no external service).
- **Full-text search, accessible SPA navigation** — search indexes post body text (not just
  title/tags), and route changes announce themselves to screen readers and move focus, since
  swapping content client-side doesn't trigger the browser's normal navigation announcement.

## Requirements

- Node.js **18+**
- Hexo **7.x** site with `hexo-renderer-ejs` installed (this theme's templates are `.ejs`)

## Installation

1. Clone this theme into your Hexo site's `themes/` folder:

   ```bash
   git clone https://github.com/mistrysiddh/hexo-theme-siddhs-blueprint.git themes/siddhs-blueprint
   ```

2. Install and build the theme's front-end bundle (Vue/Vite/Tailwind):

   ```bash
   cd themes/siddhs-blueprint
   npm install
   npm run build
   ```

   This compiles `src/` into `source/assets/app.js` + `source/assets/app.css`, which Hexo copies
   into your generated site automatically. **Re-run `npm run build` any time you edit `src/`.**

3. In your site's root `_config.yml`, set:

   ```yaml
   theme: siddhs-blueprint
   ```

4. Make sure the markdown/EJS renderer plugins are installed on the **site** (not the theme) —
   see [Recommended site plugins](#recommended-site-plugins) below.

5. `hexo server` (or `hexo generate`).

A ready-to-run example site — with this theme wired in as a git submodule, all ten sample posts,
and a GitHub Actions build workflow — lives in its own repo:
[hexo-demo-siddhs-blueprint](https://github.com/mistrysiddh/hexo-demo-siddhs-blueprint). See its
README for the fastest way to see the theme running.

## Recommended site plugins

Add these to your **site's** `package.json` (the demo site already has them configured):

| Plugin | Why |
|---|---|
| `hexo-renderer-ejs` | Required — this theme's layouts are `.ejs` |
| `hexo-renderer-markdown-it` | GFM task lists, footnotes, auto heading IDs (needed by the TOC) |
| `markdown-it-footnote` | Footnote syntax (`[^1]`) |
| `markdown-it-task-lists` | `- [ ]` / `- [x]` checkbox rendering |
| `hexo-generator-index`, `hexo-generator-archive`, `hexo-generator-category`, `hexo-generator-tag` | Standard Hexo route generation |
| `hexo-generator-sitemap` | `sitemap.xml` |
| `hexo-generator-feed` | Atom feed |

And in your site's `_config.yml`:

```yaml
highlight:
  enable: false   # disable Hexo core's legacy highlighter — hexo-renderer-markdown-it
                  # does its own (better) highlighting with real line numbers

archive_generator:
  per_page: 0     # required: Timeline needs every post rendered so its
                  # client-side "infinite scroll" has real content to reveal

markdown:
  plugins:
    - markdown-it-footnote
    - markdown-it-task-lists
  anchors:
    level: 2
    permalink: false
```

## Directory structure

```
hexo-theme-siddhs-blueprint/
├── _config.yml              # theme configuration (brand, nav, author, modules, ...)
├── layout/                  # EJS templates — real, server-rendered HTML
│   ├── layout.ejs           # root shell (head, navbar, #bp-main, footer)
│   ├── index.ejs            # home page
│   ├── post.ejs             # single post
│   ├── category.ejs         # per-category archive
│   ├── tag.ejs               # per-tag archive
│   ├── archive.ejs          # /archives/ — the Timeline
│   ├── categories_index.ejs # /categories/ — the module grid
│   ├── about.ejs
│   ├── 404.ejs
│   ├── page.ejs             # generic page fallback
│   └── _partial/            # head, navbar, footer, article-card, pagination, ...
├── scripts/                 # Hexo extensions (run in Node, not the browser)
│   ├── helpers.js           # reading_time, word_count, drawing_number, icon(), asset_version(), ...
│   ├── tags.js               # {% callout %} and {% mermaid %} tag plugins
│   ├── generators.js         # emits assets/data/search.json (title/body/tags/category/author)
│   ├── og-generator.js       # emits og/<slug>.png — one generated social card per post
│   └── lib/
│       ├── icons.js           # hand-drawn icon set for Node/EJS (require()'d by helpers.js)
│       ├── format.js          # shared drawing_number()/revision_code() hashing
│       └── og-image.js        # satori + resvg card renderer (see below)
├── src/                     # Vue 3 + TypeScript source, bundled by Vite
│   ├── main.ts               # boot: enhancers + widget mounting + SPA nav
│   ├── widgets.ts            # mounts Vue components into [data-widget] elements
│   ├── spa.ts                 # pjax-style navigation
│   ├── lib/icons.ts           # same icon set as scripts/lib/icons.js, as an ES module for
│   │                           # the browser bundle (kept as a twin file, not a shared import —
│   │                           # Hexo's Node scripts are CommonJS, Vite's build is ESM)
│   ├── enhancers/             # vanilla-TS progressive enhancement (no framework needed)
│   │   ├── theme-toggle.ts, mobile-menu.ts, reading-progress.ts, toc.ts
│   │   ├── code-blocks.ts, mermaid.ts, katex.ts, image-zoom.ts
│   │   └── categories-filter.ts, timeline-filter.ts
│   ├── components/            # genuinely stateful widgets — these use Vue
│   │   ├── HeroSlider.vue, SearchModal.vue, Comments.vue, Newsletter.vue
│   └── styles/main.css        # Tailwind + the full blueprint design system
└── source/assets/            # Vite build OUTPUT — committed so the theme works immediately
                               # after `git clone` + `npm run build`. app.js is the small
                               # (~35KB gzip) entry; Mermaid/KaTeX/highlight chunks are
                               # separate files fetched only on pages that need them.
```

## Architecture

This is deliberately **not** a pure client-side SPA. Every route (`/`, `/blog/<slug>/`,
`/categories/<slug>/`, `/archives/`, `/about/`, …) is rendered by Hexo/EJS into real, complete,
crawlable HTML at build time — that's what a static-site generator is *for*, and giving it up
would hurt SEO and no-JS robustness for no real benefit.

On top of that static HTML:

1. **Vanilla TypeScript enhancers** (`src/enhancers/`) progressively enhance already-rendered
   content: building the Table of Contents from real headings, adding a reading-progress bar,
   wrapping the server-highlighted code blocks with a copy button, rendering Mermaid/KaTeX, wiring
   up the categories/timeline filter controls. No framework needed for DOM-decoration tasks like
   these.
2. **Vue 3 components** (`src/components/`) are used only where there's real client state and
   interaction: the hero slider, the search modal, the (session-local) comments box, the
   newsletter form. Each is mounted into a `data-widget="Name"` element that Hexo/EJS has already
   filled with real static fallback content — when the bundle loads, Vue replaces that element
   with the fully interactive version. This is a **client-replace** pattern, not true SSR
   hydration; it keeps the build simple while still shipping real content first.
3. **SPA-style navigation** (`src/spa.ts`) intercepts same-origin link clicks, fetches the
   destination page, and swaps only `#bp-main` — giving instant, no-full-reload transitions
   (à la Aurora's advertised SPA navigation) while every URL remains a real, independently
   loadable static page if JS is unavailable or a link is opened directly.
4. **Code-split, lazily-loaded dependencies.** The build output (`vite.config.ts`) is ES modules,
   not a single IIFE, so Mermaid and KaTeX — by far the two heaviest dependencies — are pulled in
   via dynamic `import()` only on pages that actually contain a diagram or math, instead of
   shipping in every page's initial script. `app.js` itself is ~92KB (~35KB gzip).

## Configuration reference (`_config.yml`)

| Key | Purpose |
|---|---|
| `brand.*` | Site name, logo text (two-tone), tagline, meta description |
| `menu` | Navbar links, `Label: /path/` |
| `appearance.default_theme` | `dark` or `light` |
| `appearance.hero_autoplay_ms` | Hero slider interval |
| `author.*` | Name, role, avatar, bio, resume path, email — used on the About page + article bylines |
| `social.*` | github / linkedin / twitter / instagram / youtube URLs |
| `experience`, `education`, `skills`, `achievements`, `certifications`, `projects`, `favorite_tech` | About page content blocks |
| `category_modules.<slug>` | Maps a Hexo category slug to its module name, `MOD-xx` code, label, icon, and description. **The slug must match exactly** — see the note below. |
| `title_block.*` | Footer engineering title-block fields |
| `comments.provider` | `local` (session-only demo, default) · `giscus` (real, GitHub Discussions-backed) · `disabled` |
| `comments.giscus.*` | `repo`, `repo_id`, `category`, `category_id` from [giscus.app](https://giscus.app) after enabling Discussions on a public repo and installing the giscus app |
| `seo.*` | OG image fallback, Twitter card type |

> **Category slugs must match exactly.** Hexo slugifies category *names* into slugs itself, and
> the algorithm depends on your site's `filename_case` setting — `Self Hosting` won't necessarily
> become `self-hosting` on its own. Pin exact slugs with `category_map` in your site's
> `_config.yml` (the demo site does this for all ten sample categories) so they always match the
> keys under `category_modules` in the theme config — otherwise module cards will show 0 documents
> and fall back to a generic `MOD-00` module.
>
> ```yaml
> # site _config.yml
> category_map:
>   Linux: linux
>   Self Hosting: self-hosting
>   Raspberry Pi: raspberry-pi
>   # ...one line per category you use, matching theme category_modules keys
> ```

## Writing posts

Standard Hexo front-matter, plus a few extra fields this theme reads:

```yaml
---
title: "Post Title"
subtitle: "Optional subtitle shown under the title"
description: "Used for card excerpts, meta description, and Open Graph"
cover: /path/or/url/to/cover.jpg
categories: [Linux]        # match a key in theme _config.yml → category_modules
tags: [linux, kernel]
date: 2026-01-01
updated: 2026-01-05          # optional
featured: true               # include in the home page hero + Editor's Selection
version: "v1.2"               # shown in the metadata title block
---
```

Custom tag plugins available in post content:

```md
{% callout note "Optional Title" %}
Body text — supports **markdown**.
{% endcallout %}

{% callout tip %}...{% endcallout %}
{% callout warning %}...{% endcallout %}
{% callout alert %}...{% endcallout %}

{% mermaid %}
graph TD
  A --> B
{% endmermaid %}
```

Math: `$inline$` and `$$block$$` (rendered client-side with KaTeX).

## Social share cards

Every post gets a real, generated `og/<slug>.png` (1200×630) — module badge, drawing number,
title, author/date, and the brand wordmark — instead of falling back to a generic image. It's
built with [`satori`](https://github.com/vercel/satori) (lays out a JSX-like tree into SVG) and
[`@resvg/resvg-js`](https://github.com/thx/resvg-js) (rasterizes to PNG), both running at
`hexo generate`/`hexo server` time — nothing calls out to an external image service.

Text is set in KaTeX's bundled SansSerif font (`node_modules/katex/dist/fonts/`) — already an
MIT/SIL-licensed dependency of this theme, so no additional font asset needs to be fetched or
shipped just for this. `head.ejs` points `og:image`/`twitter:image` at the generated card for post
pages automatically; other pages keep using `cover` / `seo.og_image_fallback`.

## Development

```bash
npm install
npm run dev     # vite build --watch — rebuilds source/assets on every save
```

Run `hexo server` in your site in a second terminal. Refresh the browser after each rebuild
(there's no dev-server HMR bridge into Hexo's own server in this setup).

## License

MIT — see [LICENSE](./LICENSE).
