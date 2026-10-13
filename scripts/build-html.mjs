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
const icons = {
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>',
  print: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v6H7z"/></svg>',
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>',
};
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

const chapterInfoByName = new Map();
for (const chapterName of chapterNames) {
  const source = readFileSync(resolve(chapterDir, chapterName), 'utf8');
  const title = source.match(/^##\s+(.+)$/m)?.[1]?.trim()
    ?? source.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const heading = headings.find(
    ({ depth, text }) => depth === 2 && text === title,
  );
  if (heading) chapterInfoByName.set(chapterName, { id: heading.id, title });
}

function injectAfterHeading(html, id, addition) {
  const at = html.indexOf(`id="${id}"`);
  if (at === -1) throw new Error(`build: heading not found for injection: ${id}`);
  const end = html.indexOf('\n', html.indexOf('</h', at)) + 1;
  return `${html.slice(0, end)}${addition}\n${html.slice(end)}`;
}

let enrichedBody = body;
for (let index = 0; index < headings.length; index++) {
  const heading = headings[index];
  if (heading.depth !== 3 || !/^11\.[1-4]\s/.test(heading.text)) continue;
  const skillLinks = [];
  for (
    let cursor = index + 1;
    cursor < headings.length && headings[cursor].depth > 3;
    cursor++
  ) {
    if (headings[cursor].depth !== 4) continue;
    const skillName = headings[cursor].text.match(/`([^`]+)`/)?.[1];
    skillLinks.push(
      `<a href="#${headings[cursor].id}"><code>${escapeHtml(skillName ?? headings[cursor].text)}</code></a>`,
    );
  }
  enrichedBody = injectAfterHeading(
    enrichedBody,
    heading.id,
    `<nav class="skill-jump" aria-label="本节 Skill 速查">${skillLinks.join('')}</nav>`,
  );
}

for (const { sourceName } of practicePlacements) {
  const standaloneName = sourceName === 'README.md'
    ? 'labs/index.html'
    : `labs/${sourceName.replace(/\.md$/, '.html')}`;
  enrichedBody = injectAfterHeading(
    enrichedBody,
    practiceAnchor(sourceName),
    `<p class="practice-standalone-link"><a href="${standaloneName}">打开此关独立页，方便打印与分享</a></p>`,
  );
}

const tocChapters = headings.filter(
  ({ depth, text }) => depth === 2 && /^第\s*\d+\s*章/.test(text),
);
function chapterPager(prev, next) {
  return [
    '<nav class="chapter-pager" aria-label="章节导航">',
    prev
      ? `<a class="pager-prev" href="#${prev.id}">← 上一章：${escapeHtml(prev.title)}</a>`
      : '<span></span>',
    next
      ? `<a class="pager-next" href="#${next.id}">下一章：${escapeHtml(next.title)} →</a>`
      : `<a class="pager-next" href="#${practiceAnchor('README.md')}">进入实践路径 →</a>`,
    '</nav>',
  ].join('');
}
for (let index = 1; index < tocChapters.length; index++) {
  const marker = `<h2 id="${tocChapters[index].id}"`;
  const at = enrichedBody.indexOf(marker);
  if (at === -1) {
    throw new Error(`build: chapter heading not found: ${tocChapters[index].id}`);
  }
  const pager = chapterPager(
    index >= 2
      ? { id: tocChapters[index - 2].id, title: tocChapters[index - 2].text }
      : null,
    { id: tocChapters[index].id, title: tocChapters[index].text },
  );
  enrichedBody = `${enrichedBody.slice(0, at)}${pager}\n${enrichedBody.slice(at)}`;
}
enrichedBody += `\n${chapterPager(
  tocChapters.length >= 2
    ? {
        id: tocChapters[tocChapters.length - 2].id,
        title: tocChapters[tocChapters.length - 2].text,
      }
    : null,
  null,
)}\n`;

const chapterBounds = tocChapters.map(({ id }) => enrichedBody.indexOf(`<h2 id="${id}"`));
for (let index = 0; index < tocChapters.length; index++) {
  const start = chapterBounds[index];
  const end = chapterBounds[index + 1] ?? enrichedBody.length;
  const minutes = Math.max(
    3,
    Math.round((end - start - `<h2 id="${tocChapters[index].id}"`.length) / 2400),
  );
  enrichedBody = injectAfterHeading(
    enrichedBody,
    tocChapters[index].id,
    `<p class="chapter-meta">本章约 ${minutes} 分钟</p>`,
  );
}
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

function createLabPage({ title, description, body, labLinks, canonicalHref, mainHref, chapter }) {
  const pageTitle = title === 'Skills 橙皮书实践路径'
    ? title
    : `${title} · Skills 橙皮书实践路径`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Matt Pocock Skills 橙皮书实践路径：六个实践关卡与一个综合交付，用可验证产物完成从调查到交接。">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="橙皮书实践路径：六个实践关卡与一个综合交付，把阅读变成可验证的工程练习。">
  <meta property="og:image" content="https://tefuirnever.github.io/matt-pocock-skills-orange-book/assets/azhou/skill-not-prompt.png">
  <meta name="twitter:card" content="summary_large_image">
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
      <p class="lab-chapter-link">对应正文：<a href="${chapter.href}">${escapeHtml(chapter.title)}</a></p>
      ${body}
    </article>
  </main>
  <footer class="site-footer">
    <span>Skills 橙皮书实践路径 · ${readingEdition}</span>
    <a href="${mainHref}">回到橙皮书</a>
    <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book/issues" target="_blank" rel="noreferrer">反馈 Issue</a>
  </footer>
  <script>${themeScript}</script>
  <script>(() => {
  const key = 'orange-book-lab-' + location.pathname;
  const boxes = [...document.querySelectorAll('.lab-article input[type="checkbox"]')];
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch {}
  boxes.forEach((box, index) => {
    box.disabled = false;
    box.checked = Boolean(saved[index]);
    box.addEventListener('change', () => {
      try {
        localStorage.setItem(key, JSON.stringify(boxes.map((item) => item.checked)));
      } catch {}
    });
  });
})();</script>
</body>
</html>
`;
}

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="面向 AI 协作开发者的 Matt Pocock Skills 中文橙皮书，含 38 个 Skill 讲解、实践关卡与端到端操作案例。">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Matt Pocock Skills 橙皮书">
  <meta property="og:description" content="固定版本中文导读：38 个 Skill 逐项讲解、六个实践关卡、三个端到端操作案例。">
  <meta property="og:url" content="https://tefuirnever.github.io/matt-pocock-skills-orange-book/">
  <meta property="og:image" content="https://tefuirnever.github.io/matt-pocock-skills-orange-book/assets/azhou/skill-not-prompt.png">
  <meta name="twitter:card" content="summary_large_image">
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
      <button class="icon-button menu-button" id="menu-button" type="button" aria-label="打开目录" aria-expanded="false" aria-controls="sidebar" title="打开目录">${icons.menu}</button>
      <a class="brand" href="#top" aria-label="回到页首">
        <span class="brand-mark" aria-hidden="true">M</span>
        <span><strong>Skills 橙皮书</strong><small>Matt Pocock 公开材料中文讲解 · ${readingEdition}</small></span>
      </a>
      <div class="search-wrap">
        <label class="visually-hidden" for="site-search">搜索全书</label>
        <input id="site-search" type="search" placeholder="搜索章节、Skill 或问题…" autocomplete="off" aria-controls="search-results" aria-expanded="false">
        <kbd aria-hidden="true">/</kbd>
        <div class="search-results" id="search-results" role="list" aria-live="polite" aria-label="搜索结果" hidden></div>
      </div>
      <nav class="topbar-actions" aria-label="页面操作">
        ${themeControl}
        <a href="#${practiceAnchor('README.md')}">实践路径</a>
        <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book" target="_blank" rel="noreferrer">GitHub</a>
        <button class="icon-button mobile-search-button" id="mobile-search-button" type="button" aria-label="打开搜索" aria-expanded="false" title="搜索全书">${icons.search}</button>
        <button class="icon-button" id="print-button" type="button" aria-label="打印或导出 PDF" title="打印或导出 PDF">${icons.print}</button>
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
        <div class="mobile-utilities" aria-label="移动端工具">
          <button class="mobile-utility" id="sidebar-search-button" type="button">${icons.search}<span>搜索全书</span></button>
          <button class="mobile-utility" id="sidebar-print-button" type="button">${icons.print}<span>打印或导出</span></button>
        </div>
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
      <article class="book-article">${enrichedBody}</article>
    </main>
  </div>
  <footer class="site-footer">
    <span>Matt Pocock Skills 橙皮书 · 当前阅读版 ${readingEdition}</span>
    <span>证据基线：上游固定提交 <code>49dd158</code></span>
    <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book" target="_blank" rel="noreferrer">GitHub</a>
    <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book/issues" target="_blank" rel="noreferrer">反馈 Issue</a>
    <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book/blob/main/LICENSE" target="_blank" rel="noreferrer">CC BY-NC-SA 4.0</a>
  </footer>
  <button class="back-to-top icon-button" id="back-to-top" type="button" aria-label="回到顶部" title="回到顶部" hidden>${icons.up}</button>
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

function chapterLinkFor(sourceName) {
  const placement = practicePlacements.find(
    (candidate) => candidate.sourceName === sourceName,
  );
  const info = chapterInfoByName.get(placement.afterChapter);
  if (!info) {
    throw new Error(`build: no chapter anchor for ${placement.afterChapter}`);
  }
  return { href: `../#${info.id}`, title: info.title };
}

writeFileSync(
  resolve(labsOutputDir, 'index.html'),
  createLabPage({
    title: 'Skills 橙皮书实践路径',
    description: '六个实践关卡与一个综合交付，把 Skill 选择、规格、反馈、评审和交接变成可复跑的工程动作。',
    body: renderLabMarkdown(labsIndexSource),
    labLinks,
    canonicalHref: `#${practiceAnchor('README.md')}`,
    mainHref: `../#${practiceAnchor('README.md')}`,
    chapter: chapterLinkFor('README.md'),
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
      chapter: chapterLinkFor(lab.name),
    }),
  );
}

const siteBase = 'https://tefuirnever.github.io/matt-pocock-skills-orange-book';
writeFileSync(
  resolve(htmlDir, '404.html'),
  `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f8f7f4">
  <script>${themeBootstrap}</script>
  <link rel="icon" href="${faviconHref}">
  <title>页面不存在 · Matt Pocock Skills 橙皮书</title>
  <style>${css}</style>
</head>
<body class="lab-page">
  <main id="lab-content" class="lab-layout">
    <article class="book-article lab-article">
      <p class="lab-kicker">404</p>
      <h1>这个页面不存在</h1>
      <p class="lab-description">链接可能来自旧版阅读版。全书与实践路径的当前入口如下。</p>
      <p><a href="${siteBase}/">回到橙皮书首页</a> · <a href="${siteBase}/labs/">进入实践路径</a> · <a href="https://github.com/TeFuirnever/matt-pocock-skills-orange-book/issues" target="_blank" rel="noreferrer">报告坏链</a></p>
    </article>
  </main>
  <script>${themeScript}</script>
</body>
</html>
`,
);
writeFileSync(
  resolve(htmlDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteBase}/</loc></url>
  <url><loc>${siteBase}/labs/</loc></url>
${labSources
  .map((lab) => `  <url><loc>${siteBase}/labs/${lab.outputName}</loc></url>`)
  .join('\n')}
</urlset>
`,
);
writeFileSync(
  resolve(htmlDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${siteBase}/sitemap.xml\n`,
);

console.log(`[build] assembled ${chapterNames.length} chapter sources into ${bookPath}`);
console.log(`[build] ${resolve(htmlDir, 'index.html')}`);
console.log(`[build] ${resolve(htmlDir, 'book.html')}`);
console.log(`[build] ${labSources.length + 1} standalone practice pages into ${labsOutputDir}`);
