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

import {
  assembleBook,
  practiceAnchor,
  practicePlacements,
} from './content-assembly.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chapterDir = resolve(projectRoot, 'chapters');
const labsDir = resolve(projectRoot, 'labs');
const bookPath = resolve(projectRoot, 'book.md');
const cssPath = resolve(projectRoot, 'html/print.css');
const themeScriptPath = resolve(projectRoot, 'html/theme.js');
const scriptPath = resolve(projectRoot, 'html/site.js');
const htmlDir = resolve(projectRoot, 'html');
const imageGroups = ['azhou', 'diagrams'];
const readingEdition = `v${JSON.parse(
  readFileSync(resolve(projectRoot, 'package.json'), 'utf8'),
).version}`;
const faviconHref = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23fff1df'/%3E%3Ctext x='32' y='44' text-anchor='middle' font-family='Georgia,serif' font-size='42' font-weight='700' fill='%239f4800'%3EM%3C/text%3E%3C/svg%3E";

const chapterNames = readdirSync(chapterDir)
  .filter((name) => /^\d{2}-.+\.md$/.test(name))
  .sort((left, right) => left.localeCompare(right, 'en'));

if (chapterNames.length === 0) {
  throw new Error('No numbered chapter sources found under chapters/.');
}

const labNames = readdirSync(labsDir)
  .filter((name) => /^\d{2}-.+\.md$/.test(name))
  .sort((left, right) => left.localeCompare(right, 'en'));

if (labNames.length === 0) {
  throw new Error('No numbered learning labs found under labs/.');
}

const practiceSourceNames = practicePlacements.map(({ sourceName }) => sourceName);
const practiceSources = practiceSourceNames.map((name) => ({
  name,
  source: readFileSync(resolve(labsDir, name), 'utf8'),
}));
const labSources = labNames.map((name) => {
  const source = practiceSources.find((practice) => practice.name === name)?.source
    ?? readFileSync(resolve(labsDir, name), 'utf8');
  return {
    name,
    source,
    title: labTitle(source, name.replace(/\.md$/, '')),
    outputName: name.replace(/\.md$/, '.html'),
  };
});
const completeBook = assembleBook({
  chapterNames,
  chapterSource: (name) => readFileSync(resolve(chapterDir, name), 'utf8'),
  practiceSources,
});
writeFileSync(bookPath, completeBook);

const css = readFileSync(cssPath, 'utf8');
const themeScript = readFileSync(themeScriptPath, 'utf8');
const siteScript = readFileSync(scriptPath, 'utf8');
const themeBootstrap = `(() => {
  const root = document.documentElement;
  const systemTheme = () => typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  let selected = 'system';
  try {
    const preference = localStorage.getItem('orange-book-theme');
    selected = preference === 'light' || preference === 'dark' ? preference : 'system';
  } catch {}
  const theme = selected === 'system' ? systemTheme() : selected;
  root.dataset.themePreference = selected;
  root.dataset.theme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#1c1f24' : '#f8f7f4');
})();`;
const themeControl = `<label class="theme-control" for="theme-select">
  <span class="theme-control-label">主题</span>
  <select id="theme-select" aria-label="主题：跟随系统">
    <option value="system">跟随系统</option>
    <option value="light">浅色</option>
    <option value="dark">深色</option>
  </select>
</label>`;
const themeStatus = '<p class="theme-status" id="theme-status" role="status" aria-live="polite"></p>';
const headingCounts = new Map();
const headings = [];
const practiceKindByTitle = new Map(
  practicePlacements.map(({ sourceName, kind }) => {
    const source = practiceSources.find((practice) => practice.name === sourceName).source;
    return [labTitle(source, sourceName.replace(/\.md$/, '')), kind];
  }),
);
const practiceAnchorByTitle = new Map(
  practicePlacements.map(({ sourceName }) => {
    const source = practiceSources.find((practice) => practice.name === sourceName).source;
    return [labTitle(source, sourceName.replace(/\.md$/, '')), practiceAnchor(sourceName)];
  }),
);

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
      const id = practiceAnchorByTitle.get(text) ?? createSlug(text);
      const label = this.parser.parseInline(tokens);
      headings.push({ depth, id, text });
      const practiceKind = practiceKindByTitle.get(text);
      const className = practiceKind ? ` class="practice-heading practice-${practiceKind}-heading"` : '';
      return `<h${depth} id="${id}"${className} tabindex="-1">${label}<a class="heading-anchor" href="#${id}" aria-label="链接到本节">#</a></h${depth}>\n`;
    },
  },
});

const body = marked.parse(completeBook);
const practiceLinks = headings
  .filter(({ depth, text }) => depth === 2 && practiceKindByTitle.has(text))
  .map(
    ({ id, text }) =>
      `<a class="toc-link practice-toc-link" href="#${id}" data-section="${id}">${escapeHtml(text)}</a>`,
  )
  .join('\n');
const chapterLinks = headings
  .filter(({ depth, text }) => depth === 2 && !practiceKindByTitle.has(text))
  .map(
    ({ id, text }) =>
      `<a class="toc-link" href="#${id}" data-section="${id}">${escapeHtml(text)}</a>`,
  )
  .join('\n');

function labTitle(source, fallback) {
  return source.match(/^#\s+(.+)$/m)?.[1]?.trim() || fallback;
}

function renderLabMarkdown(source) {
  const staticSiteSource = source.replace(
    /\]\((README|\d{2}-[a-z0-9-]+)\.md(#[^)]+)?\)/gi,
    (_match, name, fragment = '') =>
      `](${name === 'README' ? 'index' : name}.html${fragment})`,
  );
  return new Marked({ gfm: true, breaks: false }).parse(staticSiteSource);
}

function createLabPage({ title, description, body, labLinks, canonicalHref, mainHref }) {
  const pageTitle = title === 'Skills 橙皮书实践路径'
    ? title
    : `${title} · Skills 橙皮书实践路径`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Matt Pocock Skills 橙皮书实践路径：六个实践关卡与一个综合交付，用可验证产物完成从调查到交接。">
  <meta name="theme-color" content="#f8f7f4">
  <script>${themeBootstrap}</script>
  <link rel="icon" href="${faviconHref}">
  <link rel="canonical" href="https://tefuirnever.github.io/matt-pocock-skills-orange-book/${canonicalHref}">
  <title>${escapeHtml(pageTitle)}</title>
  <style>${css}</style>
</head>
<body class="lab-page">
  <a class="skip-link" href="#lab-content">跳到实践正文</a>
  <header class="topbar">
    <div class="lab-topbar">
      <a class="brand" href="${mainHref}" aria-label="回到橙皮书实践路径">
        <span class="brand-mark" aria-hidden="true">M</span>
        <span><strong>Skills 橙皮书</strong><small>实践路径 · 从阅读到可验证交付</small></span>
      </a>
      <nav class="lab-topbar-actions" aria-label="实践路径操作">
        ${themeControl}
        <a href="${mainHref}">回到橙皮书</a>
        <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </div>
  </header>
  ${themeStatus}
  <main id="lab-content" class="lab-layout">
    <aside class="lab-sidebar" aria-label="实践路径导航">
      <p class="sidebar-label">实践路径</p>
      <nav class="toc">${labLinks}</nav>
      <div class="sidebar-meta">
        <span>每关都需留下</span>
        <code>可复跑证据</code>
      </div>
    </aside>
    <article class="book-article lab-article">
      <p class="lab-kicker">橙皮书实践路径</p>
      <p class="lab-description">${escapeHtml(description)}</p>
      ${body}
    </article>
  </main>
  <script>${themeScript}</script>
</body>
</html>
`;
}

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="面向 AI 协作开发者的 Matt Pocock Skills 中文橙皮书，含 37 个 Skill 讲解、实践关卡与端到端操作案例。">
  <meta name="theme-color" content="#f8f7f4">
  <script>${themeBootstrap}</script>
  <link rel="icon" href="${faviconHref}">
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
        <span><strong>Skills 橙皮书</strong><small>Matt Pocock 公开材料中文讲解 · ${readingEdition}</small></span>
      </a>
      <div class="search-wrap">
        <label class="visually-hidden" for="site-search">搜索全书</label>
        <input id="site-search" type="search" placeholder="搜索章节、Skill 或问题…" autocomplete="off" aria-controls="search-results" aria-expanded="false">
        <kbd aria-hidden="true">/</kbd>
        <div class="search-results" id="search-results" hidden></div>
      </div>
      <nav class="topbar-actions" aria-label="页面操作">
        ${themeControl}
        <a href="#${practiceAnchor('README.md')}">实践路径</a>
        <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book" target="_blank" rel="noreferrer">GitHub</a>
        <button class="icon-button mobile-search-button" id="mobile-search-button" type="button" aria-label="打开搜索" aria-expanded="false" title="搜索全书">⌕</button>
        <button class="icon-button" id="print-button" type="button" aria-label="打印或导出 PDF" title="打印或导出 PDF">⎙</button>
      </nav>
    </div>
  </header>
  ${themeStatus}
  <div class="sidebar-overlay" id="sidebar-overlay" hidden></div>
  <div class="docs-layout" id="top">
    <aside class="sidebar" id="sidebar" aria-label="全书目录">
      <div class="sidebar-inner">
        <p class="sidebar-label">按读者程度</p>
        <nav class="reader-links" aria-label="读者路径">
          <a href="#第-0-章-这本书怎样读">小白：先选路径</a>
          <a href="#${practiceAnchor('README.md')}">练习：进入实践路径</a>
          <a href="#第-8-章-七个-ui-客户端实例-从浅到深">中级：串联交付</a>
          <a href="#高阶进阶-从会使用-skill-到会设计-harness">高阶：设计 Harness</a>
        </nav>
        <div class="sidebar-divider"></div>
        <p class="sidebar-label">实践路径</p>
        <nav class="toc" aria-label="实践路径目录">${practiceLinks}</nav>
        <div class="sidebar-divider"></div>
        <p class="sidebar-label">章节</p>
        <nav class="toc" id="table-of-contents">${chapterLinks}</nav>
        <div class="sidebar-meta">
          <span>当前阅读版</span>
          <code>${readingEdition}</code>
        </div>
      </div>
    </aside>
    <main id="book-content" class="content">
      <article class="book-article">${body}</article>
    </main>
  </div>
  <button class="back-to-top icon-button" id="back-to-top" type="button" aria-label="回到顶部" title="回到顶部" hidden>↑</button>
  <script>${themeScript}</script>
  <script>${siteScript}</script>
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

const labsOutputDir = resolve(htmlDir, 'labs');
rmSync(labsOutputDir, { recursive: true, force: true });
mkdirSync(labsOutputDir, { recursive: true });

const labLinks = [
  `<a class="toc-link" href="../#${practiceAnchor('README.md')}">实践路径总览</a>`,
  ...labSources.map(
    ({ outputName, title }) =>
      `<a class="toc-link" href="${outputName}">${escapeHtml(title)}</a>`,
  ),
].join('\n');
const labsIndexSource = practiceSources.find((practice) => practice.name === 'README.md').source;

writeFileSync(
  resolve(labsOutputDir, 'index.html'),
  createLabPage({
    title: 'Skills 橙皮书实践路径',
    description: '六个实践关卡与一个综合交付，把 Skill 选择、规格、反馈、评审和交接变成可复跑的工程动作。',
    body: renderLabMarkdown(labsIndexSource),
    labLinks,
    canonicalHref: `#${practiceAnchor('README.md')}`,
    mainHref: `../#${practiceAnchor('README.md')}`,
  }),
);

for (const lab of labSources) {
  writeFileSync(
    resolve(labsOutputDir, lab.outputName),
    createLabPage({
      title: lab.title,
      description: '在自己的仓库完成一个小任务，并把可验证产物留给下一关。',
      body: renderLabMarkdown(lab.source),
      labLinks,
      canonicalHref: `#${practiceAnchor(lab.name)}`,
      mainHref: `../#${practiceAnchor(lab.name)}`,
    }),
  );
}

console.log(`[build] assembled ${chapterNames.length} chapter sources into ${bookPath}`);
console.log(`[build] ${resolve(htmlDir, 'index.html')}`);
console.log(`[build] ${resolve(htmlDir, 'book.html')}`);
console.log(`[build] ${labSources.length + 1} standalone practice pages into ${labsOutputDir}`);
