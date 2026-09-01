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
const sourcePath = resolve(projectRoot, 'book.md');
const cssPath = resolve(projectRoot, 'html/print.css');
const outputPath = resolve(projectRoot, 'html/book.html');
const imageGroups = ['azhou', 'diagrams'];

const marked = new Marked({ gfm: true, breaks: false });
const source = readFileSync(sourcePath, 'utf8');
const css = readFileSync(cssPath, 'utf8');
const body = marked.parse(source);

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Matt Pocock Skills 橙皮书</title>
  <style>${css}</style>
</head>
<body>
  <a class="skip-link" href="#book-content">跳到正文</a>
  <main id="book-content">${body}</main>
</body>
</html>
`;

mkdirSync(dirname(outputPath), { recursive: true });
const htmlAssetsDir = resolve(projectRoot, 'html/assets');
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
writeFileSync(outputPath, html);
console.log(`[build] ${outputPath}`);
