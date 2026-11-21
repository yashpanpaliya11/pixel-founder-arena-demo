# Founder Arena — Demo Project

An independently installable demo project that **installs and uses** the [`pixel-founder-arena`](https://github.com/yashpanpaliya11/pixel-founder-arena) npm package.

## Live demo

[Open the public interactive demo](https://pixel-founder-arena-demo.vercel.app/) — no sign-in required.

## Run locally

Node.js 22 or newer:

```sh
git clone https://github.com/yashpanpaliya11/pixel-founder-arena-demo.git
cd pixel-founder-arena-demo
npm ci
npm run dev
```

Open the URL printed in your terminal (default `http://127.0.0.1:4320`).

## Where the npm package is used

`package.json` declares `pixel-founder-arena` as a real npm dependency. `npm ci` installs the pinned npm tarball in `vendor/`; this is the same packaged release distributed by the package repository. This works without private credentials or a sibling checkout. It is an npm package artifact installation, **not a claim that the package is already on the npm registry**.

`scripts/verify.mjs` imports and tests the installed package directly:

```js
import {
  createBrowserDemo,
  founders,
  classifyError
} from 'pixel-founder-arena/browser';
```

`scripts/build.mjs` resolves the installed package, copies its UI and browser-safe modules into `dist/`, and creates this entrypoint:

```js
import { createBrowserDemo } from './runtime/browser.js';
import { mountArena } from './app.js';

mountArena({ transport: createBrowserDemo({ storage: window.localStorage }) });
```

The roster, dialogue, roast selection, error classification, hints, task logic, and UI come from the npm dependency. The demo repository contains the build/verification scripts and demo banner rather than a duplicate game implementation. There are no external runtime APIs or frontend framework dependencies.

## Reviewer walkthrough

1. Click **Syntax error** or **Undefined** to trigger a pixel-character roast.
2. Expand **Explain this error + progressive hints** for the English explanation and progressive hints.
3. In **Settings**, change the roast language to Hinglish and try another error. Other interface text stays English.
4. Click **Let them argue** to see fictional founders roast each other about MRR, marketing, competitors, product, bootstrapping, or AI.
5. Select two to five characters from the 35-character roster, or click **Indian cast** for Anupam Mittal, Peyush Bansal, Aadit Palicha, Kaivalya Vohra, and Aman Gupta.
6. Add a project brief to personalize the debate prompts.
7. Add and complete a task to earn XP. Preferences and tasks persist in your browser.

This hosted demo uses **sample events**. It cannot access a visitor's terminal, inspect local files, or execute arbitrary submitted code. The installed CLI package monitors real command output locally. Sample error buttons do not award XP.

## Build and verify

```sh
npm test
npm run build
```

Deploy `dist/` to any static host. Vercel settings are included in `vercel.json`; the project requires no environment variables. Public GitHub Actions run dependency checks and the build.

The character artwork and generated dialogue are fictional parody. Company names and marks belong to their respective owners; no endorsement is implied. See the package's `ASSETS.md` for art details.
