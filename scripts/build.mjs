import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the INSTALLED npm dependency. No sibling checkout or duplicated engine.
const root = resolve(dirname(fileURLToPath(import.meta.resolve('pixel-founder-arena/browser'))), '..');
const out = resolve('dist');
await rm(out, { recursive: true, force: true }); await mkdir(out, { recursive: true });
await cp(resolve(root, 'public'), out, { recursive: true });
await mkdir(resolve(out, 'runtime'));
for (const file of ['browser.js', 'founders.js', 'dialogue.js', 'errors.js']) await cp(resolve(root, 'src', file), resolve(out, 'runtime', file));

let html = await readFile(resolve(root, 'public/index.html'), 'utf8');
html = html.replace(/\s*<meta name="arena-token"[^>]*>/, '')
  .replace('<title>Founder Arena — Code. Break. Come back.</title>', '<title>Founder Arena — Interactive npm Package Demo</title>')
  .replace('src="/app.js"', 'src="/demo.js"')
  .replace('</header>', `</header><aside class="demo-banner"><strong>Interactive npm package demo</strong><span>Sample errors run in your browser. Install the CLI to react to your own terminal.</span><nav><a href="https://github.com/yashpanpaliya11/pixel-founder-arena">Package source</a><a href="https://github.com/yashpanpaliya11/pixel-founder-arena-demo">Demo source</a></nav></aside>`)
  .replace('LOCAL & OFFLINE', 'BROWSER DEMO')
  .replace('IDE TERMINAL → LOCAL ARENA', 'NPM PACKAGE → BROWSER DEMO')
  .replace('Your terminal has a new audience.', 'Try this with your own code.')
  .replace('Run this inside your project. The package observes that command\'s output.', 'Install the packaged CLI from the public GitHub release, then run this in your project.')
  .replace('No AI keys. No telemetry. Just pixels.', 'Installed npm package. Browser-local state. No account required.');
await writeFile(resolve(out, 'index.html'), html);
await writeFile(resolve(out, 'demo.js'), `import { createBrowserDemo } from './runtime/browser.js';\nimport { mountArena } from './app.js';\nlet storage;\ntry { storage = window.localStorage; } catch {}\nmountArena({ transport: createBrowserDemo({ storage }) });\n`);
await writeFile(resolve(out, 'style.css'), (await readFile(resolve(out, 'style.css'), 'utf8')) + `\n.demo-banner{padding:18px 4vw;border-bottom:1px solid #3a4530;background:#222c19;display:flex;flex-wrap:wrap;gap:12px 22px;align-items:center;font-size:14px}.demo-banner strong{color:#c4ed80}.demo-banner span{color:#c3cbbb;flex:1}.demo-banner nav{display:flex;gap:16px}.demo-banner a{color:#c4ed80;font-size:13px}@media(max-width:700px){.demo-banner{padding:16px;display:block}.demo-banner span{display:block;margin:8px 0}.demo-banner nav{margin-top:10px}}\n`);
console.log('Built dist/ using the installed pixel-founder-arena package.');
