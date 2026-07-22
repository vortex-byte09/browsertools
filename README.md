# BrowserTools

Privacy-first browser utilities. Everything runs entirely on your own
device — no backend, no build step, no file ever leaves your browser.

## What this is

BrowserTools is a suite of small, single-purpose tools for everyday file
tasks — PDF conversion, media and audio processing, and developer
utilities. Each tool does its work using JavaScript running directly in
your browser tab, so nothing you open, drop, or paste into a tool is ever
uploaded anywhere. You can confirm this yourself in any tool by checking
your browser's network tab while it runs.

## Structure

```
/
├── index.html              homepage — tool grid by category
├── about.html
├── privacy.html
├── assets/
│   ├── css/style.css       shared design tokens + layout + mobile breakpoints
│   └── js/led.js           status-LED helper
└── tools/
    ├── pdf-merge/                 merge PDFs, in order        (pdf-lib)
    ├── pdf-to-images/             export pages as PNG/JPG     (pdf.js)
    ├── pdf-compress/              rasterize + re-encode       (pdf.js + pdf-lib)
    ├── pdf-to-word/               PDF → editable .docx
    ├── word-to-pdf/               .docx → PDF
    ├── pdf-to-excel/              extract tables → .xlsx
    ├── excel-to-pdf/              .xlsx → PDF
    ├── images-to-pdf/             combine images → PDF
    ├── pdf-to-csv/                extract tables → .csv
    ├── csv-to-pdf/                .csv → PDF
    ├── pdf-to-txt/                extract all text
    ├── pdf-utils/                 page numbers, watermarking
    │
    ├── video-to-audio/            extract audio, save as MP3  (ffmpeg.wasm)
    ├── audio-to-video/            audio + image → video       (ffmpeg.wasm)
    ├── video-to-gif/              trim + convert to GIF       (ffmpeg.wasm)
    ├── video-compress/            bitrate/resolution control  (ffmpeg.wasm)
    ├── image-compress/            JPG/PNG/WebP quality control
    │
    ├── audio-trim/                cut a clip to start/end
    ├── audio-format/              MP3 ⇄ WAV ⇄ OGG ⇄ M4A ⇄ FLAC
    ├── audio-merge/               join clips in order
    ├── audio-volume/              gain/normalize
    ├── audio-compress/            bitrate-based size reduction
    │
    ├── json-to-csv/               paste JSON, get a CSV
    ├── jwt-decoder/               decode header + payload
    └── regex-tester/              live pattern matching
```

25 tools across four suites: **PDF**, **Media**, **Audio**, and
**Dev & Security**.

Every tool is a self-contained `index.html`: markup, shared CSS classes,
and a `<script>` block with the tool's own logic. No React, no bundler —
this keeps each page fast to load and simple to reason about.

## Design

Every tool shares a status-LED pattern — idle, then a live "processing"
state, then done — reflecting that the work is happening locally in that
tab, not on a server. The sidenav lists every tool by category and
collapses into a mobile drawer (hamburger toggle) on small screens. About
and Privacy pages are linked from a footer present on every page.

Heavier engines (ffmpeg.wasm for the Media suite, pdf.js for PDF
rendering) are lazy-loaded only when a tool that needs them is opened, with
a distinct LED state while the engine itself is loading, so the wait
during that download doesn't look like the page has frozen.

## Running it locally

Any static file server works:

```
cd browsertools
python3 -m http.server 8000
```

Then open http://localhost:8000

(Opening `index.html` directly via `file://` also works for most tools,
but some browsers block `fetch`/module features over `file://` — a local
server avoids that.)

## Deploying

This is a static site, so any of these work with zero config:

- **Vercel** or **Netlify** — drag-and-drop the folder, or connect a
  GitHub repo
- **GitHub Pages** — push to a repo, enable Pages on the main branch
- **Cloudflare Pages** — same idea, generous free tier

## Adding a new tool

1. Duplicate an existing folder under `tools/`, e.g. `tools/base64-encoder/`
2. Update the `<title>`, `<meta description>`, `<h1>`, and FAQ text — this
   is what search engines index, so make it specific to the exact task
3. Add a link to it in the sidenav of **every** page (homepage + all tool
   pages) and in the homepage card grid — update all of them in the same
   pass, not as a separate step, since a mismatch here is the most common
   source of bugs in this project
4. Keep the LED pattern (`ready → processing → done`) so the "runs
   locally" promise stays visible and consistent across the suite
