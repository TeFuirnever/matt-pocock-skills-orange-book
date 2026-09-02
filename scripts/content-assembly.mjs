export const practicePlacements = [
  { sourceName: 'README.md', afterChapter: '01-reading-guide.md', kind: 'path' },
  { sourceName: '01-find-the-answer.md', afterChapter: '04-decisions.md', kind: 'gate' },
  { sourceName: '02-decision-to-spec.md', afterChapter: '05-delivery.md', kind: 'gate' },
  { sourceName: '03-red-green-bug.md', afterChapter: '06-feedback-loops.md', kind: 'gate' },
  { sourceName: '04-minimal-fix-evidence.md', afterChapter: '06-feedback-loops.md', kind: 'gate' },
  { sourceName: '05-two-axis-review.md', afterChapter: '07-code-quality.md', kind: 'gate' },
  { sourceName: '06-handoff-rehearsal.md', afterChapter: '08-handoffs.md', kind: 'gate' },
  { sourceName: '07-capstone-delivery.md', afterChapter: '08-handoffs.md', kind: 'capstone' },
];

export function practiceAnchor(sourceName) {
  return `practice-${sourceName
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;
}

export function inlinePracticeSource(source) {
  let inCodeFence = false;
  const demotedSource = source
    .trimEnd()
    .split('\n')
    .map((line) => {
      if (/^(```|~~~)/.test(line)) {
        inCodeFence = !inCodeFence;
        return line;
      }
      return inCodeFence ? line : line.replace(/^(#{1,5})\s+/, '$1# ');
    })
    .join('\n');

  return demotedSource
    .replace(
      /\]\((README|\d{2}-[a-z0-9-]+)\.md\)/gi,
      (_match, target) => `](#${practiceAnchor(`${target}.md`)})`,
    )
    .replace(/\]\(\.\.\/\)/g, '](#top)');
}

export function assembleBook({ chapterNames, chapterSource, practiceSources }) {
  const sourcesByName = new Map(practiceSources.map(({ name, source }) => [name, source]));
  const placementsByChapter = new Map();

  for (const placement of practicePlacements) {
    const source = sourcesByName.get(placement.sourceName);
    if (!source) {
      throw new Error(`Missing practice source: ${placement.sourceName}`);
    }
    const placements = placementsByChapter.get(placement.afterChapter) ?? [];
    placements.push(source);
    placementsByChapter.set(placement.afterChapter, placements);
  }

  const chunks = [];
  for (const chapterName of chapterNames) {
    chunks.push(chapterSource(chapterName).trimEnd());
    for (const practiceSource of placementsByChapter.get(chapterName) ?? []) {
      chunks.push(inlinePracticeSource(practiceSource));
    }
  }
  return `${chunks.join('\n\n')}\n`;
}
