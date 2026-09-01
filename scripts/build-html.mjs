import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Marked } from 'marked';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chapterDir = resolve(projectRoot, 'chapters');
const bookPath = resolve(projectRoot, 'book.md');
const cssPath = resolve(projectRoot, 'html/print.css');
const scriptPath = resolve(projectRoot, 'html/site.js');
const htmlDir = resolve(projectRoot, 'html');
const imageGroups = ['azhou', 'diagrams'];

const chapterNames = readdirSync(chapterDir)
  .filter((name) => /^\d{2}-.+\.md$/.test(name))
  .sort((left, right) => left.localeCompare(right, 'en'));

if (chapterNames.length === 0) {
  throw new Error('No numbered chapter sources found under chapters/.');
}

const source = chapterNames
  .map((name) => readFileSync(resolve(chapterDir, name), 'utf8').trimEnd())
  .join('\n\n');
const completeBook = `${source}\n`;
writeFileSync(bookPath, completeBook);

const css = readFileSync(cssPath, 'utf8');
const script = readFileSync(scriptPath, 'utf8');
const headingCounts = new Map();
const headings = [];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function createSlug(value) {
  const base = value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section';
  const count = headingCounts.get(base) ?? 0;
  headingCounts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    heading({ tokens, depth, text }) {
      const id = createSlug(text);
      const label = this.parser.parseInline(tokens);
      headings.push({ depth, id, text });
      return `<h${depth} id="${id}" tabindex="-1">${label}<a class="heading-anchor" href="#${id}" aria-label="链接到本节">#</a></h${depth}>\n`;
    },
  },
});

const body = marked.parse(completeBook);
const chapterLinks = headings
  .filter(({ depth }) => depth === 2)
  .map(
    ({ id, text }) =>
      `<a class="toc-link" href="#${id}" data-section="${id}">${escapeHtml(text)}</a>`,
  )
  .join('\n');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="面向 AI 协作开发者的 Matt Pocock Skills 中文橙皮书，含 37 个 Skill 讲解、读者路径和脱敏会话实例。">
  <meta name="theme-color" content="#f8f7f4">
  <link rel="canonical" href="https://tefuirnever.github.io/matt-pocock-skills-orange-book/">
  <title>Matt Pocock Skills 橙皮书</title>
  <style>${css}</style>
</head>
<body>
  <a class="skip-link" href="#book-content">跳到正文</a>
  <div class="reading-progress" aria-hidden="true"><span id="reading-progress-bar"></span></div>
  <header class="topbar">
    <div class="topbar-inner">
      <button class="icon-button menu-button" id="menu-button" type="button" aria-label="打开目录" aria-expanded="false" title="打开目录">☰</button>
      <a class="brand" href="#top" aria-label="回到页首">
        <span class="brand-mark" aria-hidden="true">M</span>
        <span><strong>Skills 橙皮书</strong><small>Matt Pocock 公开材料中文讲解</small></span>
      </a>
      <div class="search-wrap">
        <label class="visually-hidden" for="site-search">搜索全书</label>
        <input id="site-search" type="search" placeholder="搜索章节、Skill 或问题…" autocomplete="off" aria-controls="search-results" aria-expanded="false">
        <kbd aria-hidden="true">/</kbd>
        <div class="search-results" id="search-results" hidden></div>
      </div>
      <nav class="topbar-actions" aria-label="页面操作">
        <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book" target="_blank" rel="noreferrer">GitHub</a>
        <button class="icon-button mobile-search-button" id="mobile-search-button" type="button" aria-label="打开搜索" aria-expanded="false" title="搜索全书">⌕</button>
        <button class="icon-button" id="print-button" type="button" aria-label="打印或导出 PDF" title="打印或导出 PDF">⎙</button>
      </nav>
    </div>
  </header>
  <div class="sidebar-overlay" id="sidebar-overlay" hidden></div>
  <div class="docs-layout" id="top">
    <aside class="sidebar" id="sidebar" aria-label="全书目录">
      <div class="sidebar-inner">
        <p class="sidebar-label">按读者程度</p>
        <nav class="reader-links" aria-label="读者路径">
          <a href="#第-0-章-这本书怎样读">小白：先选路径</a>
          <a href="#第-8-章-七个-ui-客户端实例-从浅到深">中级：串联交付</a>
          <a href="#高阶进阶-从会使用-skill-到会设计-harness">高阶：设计 Harness</a>
        </nav>
        <div class="sidebar-divider"></div>
        <p class="sidebar-label">章节</p>
        <nav class="toc" id="table-of-contents">${chapterLinks}</nav>
        <div class="sidebar-meta">
          <span>固定上游提交</span>
          <code>6654f6b</code>
        </div>
      </div>
    </aside>
    <main id="book-content" class="content">
      <article class="book-article">${body}</article>
    </main>
  </div>
  <button class="back-to-top icon-button" id="back-to-top" type="button" aria-label="回到顶部" title="回到顶部" hidden>↑</button>
  <script>${script}</script>
</body>
</html>
`;

mkdirSync(htmlDir, { recursive: true });
const htmlAssetsDir = resolve(htmlDir, 'assets');
rmSync(htmlAssetsDir, { recursive: true, force: true });

for (const imageGroup of imageGroups) {
  const imageSourceDir = resolve(projectRoot, 'assets', imageGroup);
  const imageOutputDir = resolve(htmlAssetsDir, imageGroup);
  mkdirSync(imageOutputDir, { recursive: true });

  for (const imageName of readdirSync(imageSourceDir).filter((name) =>
    name.endsWith('.png'),
  )) {
    copyFileSync(
      resolve(imageSourceDir, imageName),
      resolve(imageOutputDir, imageName),
    );
  }
}

writeFileSync(resolve(htmlDir, 'index.html'), html);
writeFileSync(resolve(htmlDir, 'book.html'), html);
writeFileSync(resolve(htmlDir, '.nojekyll'), '');

console.log(`[build] assembled ${chapterNames.length} chapter sources into ${bookPath}`);
console.log(`[build] ${resolve(htmlDir, 'index.html')}`);
console.log(`[build] ${resolve(htmlDir, 'book.html')}`);
