# BrowserTools

Privacy-first browser utilities. Static site, no backend, no build step required.

## Structure

```
/
├── index.html                 homepage — tool grid by category
├── about.html
├── privacy.html                placeholder — replace before going live
├── assets/
│   ├── css/style.css          shared design tokens + layout
│   └── js/led.js              status-LED helper (optional, most tools inline it)
└── tools/
    ├── json-to-csv/index.html
    ├── jwt-decoder/index.html
    ├── regex-tester/index.html
    ├── pdf-merge/index.html    uses pdf-lib via CDN
    ├── pdf-compress/index.html
    ├── pdf-to-images/index.html
    ├── pdf-to-word/index.html
    ├── word-to-pdf/index.html
    ├── pdf-to-excel/index.html
    ├── excel-to-pdf/index.html
    ├── images-to-pdf/index.html
    ├── pdf-to-csv/index.html
    ├── csv-to-pdf/index.html
    ├── pdf-to-txt/index.html
    └── pdf-utils/index.html
```

Every tool is a self-contained HTML file: markup, CSS class hooks into the shared
stylesheet, and a `<script>` block with the tool logic. No React, no bundler —
this keeps each page fast to load and trivially easy to add to.

## Running it locally

Any static file server works, e.g.:

```
cd browsertools
python3 -m http.server 8000
```

Then open http://localhost:8000

(Opening index.html directly via `file://` also works for most tools, but
some browsers block `fetch`/module features over `file://` — a local server
avoids that.)

## Deploying

This is a static site, so any of these work with zero config:
- **Vercel** or **Netlify** — drag-and-drop the folder, or connect a GitHub repo
- **GitHub Pages** — push to a repo, enable Pages on the main branch
- **Cloudflare Pages** — same idea, generous free tier

## Adding a new tool

1. Duplicate an existing folder under `tools/`, e.g. `tools/base64-encoder/`
2. Update the `<title>`, `<meta description>`, `<h1>`, and FAQ text — this is
   what search engines index, so make it specific to the exact task
3. Add a link to it in the sidenav of **every** page (homepage + all tool
   pages) and in the homepage card grid
4. Keep the LED pattern (`ready → processing → done`) so the "runs locally"
   promise stays visible and consistent across the suite

## Next tools to build (per the original plan)

- **Media Suite** — image/video conversion via `@ffmpeg/ffmpeg` (WebAssembly).
  Heavier than the tools here (the ffmpeg.wasm core is ~25MB), so lazy-load it
  only when the user opens a media tool, and show a loading state on the LED.
- **Audio Suite** — trimming/pitch/tempo via the Web Audio API.

## Before applying to AdSense

- Replace `privacy.html` and `about.html` placeholder text with real copy
- Add real content: the FAQ blocks under each tool count toward "quality content"
- Remove all `.ad-slot` placeholder divs or replace them with real ad units
- Don't run any other ad network (e.g. Monetag) until after your AdSense
  decision — a clean site improves approval odds
- Buy a real domain and let it age a few weeks before applying
