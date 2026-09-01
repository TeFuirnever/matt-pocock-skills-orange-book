import assert from 'node:assert/strict';
import test from 'node:test';

import {
  collectMarkdownUrls,
  hasAiHeroSource,
  hasMattPocockSkillsSource,
} from './source-url-contract.mjs';

test('accepts the expected public source hosts and repository path', () => {
  const urls = collectMarkdownUrls(`
[Repository](https://github.com/mattpocock/skills/tree/6654f6b)
[Article](https://www.aihero.dev/skills)
`);

  assert.equal(hasMattPocockSkillsSource(urls), true);
  assert.equal(hasAiHeroSource(urls), true);
});

test('rejects trusted URL text embedded in an untrusted URL', () => {
  const urls = collectMarkdownUrls(`
[Repository](https://evil.example/?next=https://github.com/mattpocock/skills)
[Article](https://www.aihero.dev.evil.example/skills)
`);

  assert.equal(hasMattPocockSkillsSource(urls), false);
  assert.equal(hasAiHeroSource(urls), false);
});
