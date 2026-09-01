import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  collectMarkdownUrls,
  hasAiHeroSource,
  hasMattPocockSkillsSource,
} from './source-url-contract.mjs';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const fixedCommit = '6654f6b60cd9d5be8b54c6fafe44346dabeb3b76';
const expectedChapterCount = 16;
const expectedStatementCount = 15;
const expectedSessionCaseCount = 3;
const expectedSkills = [
  'ask-matt',
  'setup-matt-pocock-skills',
  'grill-with-docs',
  'triage',
  'wayfinder',
  'to-spec',
  'to-tickets',
  'implement',
  'prototype',
  'diagnosing-bugs',
  'tdd',
  'research',
  'domain-modeling',
  'codebase-design',
  'improve-codebase-architecture',
  'code-review',
  'resolving-merge-conflicts',
  'wizard',
  'grill-me',
  'grilling',
  'handoff',
  'teach',
  'to-questionnaire',
  'wait-what',
  'writing-for-agents',
  'git-guardrails-claude-code',
  'migrate-to-shoehorn',
  'scaffold-exercises',
  'setup-pre-commit',
  'claude-handoff',
  'implement-spec',
  'loop-me',
  'retro',
  'setup-ts-deep-modules',
  'writing-fragments',
  'writing-beats',
  'writing-shape',
];
const textExtensions = new Set([
  '.cjs',
  '.css',
  '.excalidraw',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.svg',
  '.txt',
  '.yml',
  '.yaml',
]);
const excludedDirectories = new Set([
  '.azhou',
  '.git',
  '.lavish',
  'node_modules',
]);
const forbiddenPatterns = [
  { label: 'absolute macOS user path', pattern: /\/Users\/[A-Za-z0-9._-]+\// },
  { label: 'Codex session path', pattern: /\.codex\/sessions/i },
  { label: 'Claude project history path', pattern: /\.claude\/projects/i },
  { label: 'Zcode history path', pattern: new RegExp('\\.' + 'zcode', 'i') },
  { label: 'private project name', pattern: new RegExp('Matrix' + 'Assistant', 'i') },
  { label: 'private project shorthand', pattern: /\bMA\s*(?:项目|project|case)\b/i },
  { label: 'GitHub token', pattern: /(?:github_pat_|gh[opsu]_)\w{20,}/ },
  { label: 'OpenAI-style secret', pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { label: 'private key material', pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (excludedDirectories.has(entry.name)) return [];
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

function requireFile(errors, relativePath) {
  const path = resolve(projectRoot, relativePath);
  if (!existsSync(path) || statSync(path).size === 0) {
    errors.push(`missing or empty required file: ${relativePath}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

const errors = [];
const chapterDir = resolve(projectRoot, 'chapters');
const chapterNames = readdirSync(chapterDir)
  .filter((name) => /^\d{2}-.+\.md$/.test(name))
  .sort((left, right) => left.localeCompare(right, 'en'));
const assembledBook = `${chapterNames
  .map((name) => readFileSync(resolve(chapterDir, name), 'utf8').trimEnd())
  .join('\n\n')}\n`;
const book = requireFile(errors, 'book.md');
const indexHtml = requireFile(errors, 'html/index.html');
const bookHtml = requireFile(errors, 'html/book.html');
const pagesWorkflow = requireFile(errors, '.github/workflows/pages.yml');
const statementResearch = requireFile(
  errors,
  'research/matt-pocock-public-statements.md',
);
const statementUrls = collectMarkdownUrls(statementResearch);
const sessionResearch = requireFile(
  errors,
  'research/anonymized-session-patterns.md',
);

if (chapterNames.length !== expectedChapterCount) {
  errors.push(
    `expected ${expectedChapterCount} numbered chapter sources, found ${chapterNames.length}`,
  );
}
if (book !== assembledBook) {
  errors.push('book.md is not the exact ordered assembly of chapters/*.md');
}
if (!book.includes(fixedCommit)) {
  errors.push('book.md does not declare the fixed upstream commit');
}

const detailedSkillPattern = /^#### 11\.[1-4]\.\d+ \`([^\`]+)\`/gm;
const documentedSkills = [...book.matchAll(detailedSkillPattern)].map(
  (match) => match[1],
);
if (documentedSkills.length !== expectedSkills.length) {
  errors.push(
    `expected ${expectedSkills.length} detailed Skill sections, found ${documentedSkills.length}`,
  );
}
for (const skill of expectedSkills) {
  if (!documentedSkills.includes(skill)) {
    errors.push(`missing detailed Skill section: ${skill}`);
  }
}

for (const requiredText of [
  '小白路径',
  '| 中级：已经能用 Agent 写功能',
  '高阶路径',
  'Matt Pocock 本人怎样讲 Skills',
  '三类 Agent 会话的脱敏复盘',
]) {
  if (!book.includes(requiredText)) {
    errors.push(`missing required reader/evidence section: ${requiredText}`);
  }
}

const statementCount = [...statementResearch.matchAll(/^### \d+\./gm)].length;
if (statementCount !== expectedStatementCount) {
  errors.push(
    `expected ${expectedStatementCount} first-party evidence records, found ${statementCount}`,
  );
}
if (!hasMattPocockSkillsSource(statementUrls)) {
  errors.push('author research does not include the upstream repository');
}
if (!hasAiHeroSource(statementUrls)) {
  errors.push('author research does not include official AI Hero material');
}

const sessionChapter = readFileSync(
  resolve(chapterDir, '14-session-evidence.md'),
  'utf8',
);
const sessionCaseCount = [
  ...sessionChapter.matchAll(/^### 13\.[2-4] 案例/gm),
].length;
if (sessionCaseCount !== expectedSessionCaseCount) {
  errors.push(
    `expected ${expectedSessionCaseCount} detailed sanitized cases, found ${sessionCaseCount}`,
  );
}
for (const client of ['Codex', 'Zcode', 'Claude Code']) {
  if (!sessionChapter.includes(client) || !sessionResearch.includes(client)) {
    errors.push(`sanitized session evidence is missing client: ${client}`);
  }
}

const imagePattern = /!\[[^\]]*\]\((assets\/[^)]+)\)/g;
const imageReferences = [
  ...new Set([...book.matchAll(imagePattern)].map((match) => match[1])),
];
if (imageReferences.length < 16) {
  errors.push(`expected at least 16 unique book images, found ${imageReferences.length}`);
}
for (const imageReference of imageReferences) {
  const sourceImage = resolve(projectRoot, imageReference);
  const htmlImage = resolve(projectRoot, 'html', imageReference);
  if (!existsSync(sourceImage) || statSync(sourceImage).size === 0) {
    errors.push(`missing or empty source image: ${imageReference}`);
  }
  if (!existsSync(htmlImage) || statSync(htmlImage).size === 0) {
    errors.push(`missing or empty HTML image: ${imageReference}`);
  }
}

for (const stem of ['reader-paths', 'session-evidence-sanitization']) {
  for (const extension of ['.excalidraw', '.svg', '.png']) {
    const relativePath = `assets/diagrams/${stem}${extension}`;
    const path = resolve(projectRoot, relativePath);
    if (!existsSync(path) || statSync(path).size === 0) {
      errors.push(`missing diagram deliverable: ${relativePath}`);
    }
  }
}

if (indexHtml !== bookHtml) {
  errors.push('html/index.html and html/book.html are not identical editions');
}
for (const siteContract of [
  'id="site-search"',
  'id="table-of-contents"',
  'id="menu-button"',
  'id="reading-progress-bar"',
]) {
  if (!indexHtml.includes(siteContract)) {
    errors.push(`generated HTML is missing site contract: ${siteContract}`);
  }
}
if (!existsSync(resolve(projectRoot, 'html/.nojekyll'))) {
  errors.push('html/.nojekyll is missing');
}
for (const workflowContract of [
  'npm run check',
  'actions/configure-pages@v6',
  'actions/upload-pages-artifact@v5',
  'actions/deploy-pages@v5',
]) {
  if (!pagesWorkflow.includes(workflowContract)) {
    errors.push(`Pages workflow is missing: ${workflowContract}`);
  }
}

for (const path of listFiles(projectRoot)) {
  if (extname(path) === '.jsonl') {
    errors.push(`raw session-like JSONL file is not allowed: ${path.slice(projectRoot.length + 1)}`);
    continue;
  }
  if (!textExtensions.has(extname(path))) continue;
  const content = readFileSync(path, 'utf8');
  for (const { label, pattern } of forbiddenPatterns) {
    if (pattern.test(content)) {
      errors.push(`${label}: ${path.slice(projectRoot.length + 1)}`);
    }
  }
}

if (errors.length > 0) {
  console.error('[verify] failed');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `[verify] passed: ${chapterNames.length} chapters, ${documentedSkills.length} Skills, ${statementCount} first-party records, ${sessionCaseCount} sanitized cases, ${imageReferences.length} images, Pages contract present, public scan clean`,
  );
}
