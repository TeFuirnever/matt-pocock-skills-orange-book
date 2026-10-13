import test from 'node:test';
import assert from 'node:assert/strict';

import {
  assembleBook,
  inlinePracticeSource,
  practiceAnchor,
  practicePlacements,
} from './content-assembly.mjs';

test('practiceAnchor produces stable lowercase anchors', () => {
  assert.equal(practiceAnchor('README.md'), 'practice-readme');
  assert.equal(practiceAnchor('03-red-green-bug.md'), 'practice-03-red-green-bug');
});

test('inlinePracticeSource demotes headings outside code fences only', () => {
  const source = '# Title\n\n## Section\n\n```\n# not a heading\n```\n';
  const result = inlinePracticeSource(source);
  assert.ok(result.includes('## Title'));
  assert.ok(result.includes('### Section'));
  assert.ok(result.includes('# not a heading'));
});

test('inlinePracticeSource rewrites lab links to in-book practice anchors', () => {
  const result = inlinePracticeSource('[下一关](02-decision-to-spec.md)');
  assert.ok(result.includes('](#practice-02-decision-to-spec)'));
});

test('assembleBook keeps chapter order and inserts practices after their chapter', () => {
  const chapterNames = ['01-reading-guide.md', '04-decisions.md'];
  const practiceSources = practicePlacements.map(({ sourceName, afterChapter }) => ({
    name: sourceName,
    source: `# P-${afterChapter}`,
  }));
  const book = assembleBook({
    chapterNames,
    chapterSource: (name) => `# C-${name}`,
    practiceSources,
  });
  const order = [
    '# C-01-reading-guide.md',
    '## P-01-reading-guide.md',
    '# C-04-decisions.md',
    '## P-04-decisions.md',
  ].map((marker) => book.indexOf(marker));
  assert.ok(order.every((index) => index !== -1), 'all markers present');
  assert.ok(
    order.every((index, i) => i === 0 || order[i - 1] < index),
    'markers appear in placement order',
  );
});
