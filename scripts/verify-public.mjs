import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const fixedCommit = '6654f6b60cd9d5be8b54c6fafe44346dabeb3b76';
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
const excludedDirectories = new Set(['.git', 'node_modules']);
const forbiddenPatterns = [
  { label: 'absolute macOS user path', pattern: /\/Users\/[A-Za-z0-9._-]+\// },
  { label: 'Codex session path', pattern: /\.codex\/sessions/i },
  { label: 'Claude project history path', pattern: /\.claude\/projects/i },
  {
    label: 'Zcode history path',
    pattern: new RegExp('\\.' + 'zcode', 'i'),
  },
  { label: 'GitHub token', pattern: /(?:github_pat_|gh[opsu]_)\w{20,}/ },
  { label: 'OpenAI-style secret', pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { label: 'private key material', pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
];

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (excludedDirectories.has(entry.name)) {
      return [];
    }

    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

const errors = [];
const bookPath = resolve(projectRoot, 'book.md');
const book = readFileSync(bookPath, 'utf8');

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

const imagePattern = /!\[[^\]]*\]\((assets\/[^)]+)\)/g;
const imageReferences = [...book.matchAll(imagePattern)].map((match) => match[1]);
if (imageReferences.length < 14) {
  errors.push(`expected at least 14 book images, found ${imageReferences.length}`);
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

for (const path of listFiles(projectRoot)) {
  if (!textExtensions.has(extname(path))) {
    continue;
  }

  const content = readFileSync(path, 'utf8');
  for (const { label, pattern } of forbiddenPatterns) {
    if (pattern.test(content)) {
      errors.push(`${label}: ${path.slice(projectRoot.length + 1)}`);
    }
  }
}

if (errors.length > 0) {
  console.error('[verify] failed');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `[verify] passed: ${documentedSkills.length} Skills, ${imageReferences.length} images, public scan clean`,
  );
}
