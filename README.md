# Matt Pocock Skills Orange Book

![Skill is not a longer prompt](assets/azhou/skill-not-prompt.png)

A Chinese-first, beginner-friendly handbook for the public
[`mattpocock/skills`](https://github.com/mattpocock/skills) repository.

- [中文说明](README_zh.md)
- [Online reading edition](https://tefuirnever.github.io/matt-pocock-skills-orange-book/)
- [Practice Path](https://tefuirnever.github.io/matt-pocock-skills-orange-book/#practice-readme)
- [Authoritative Markdown book](book.md)
- [Generated HTML reading edition](html/index.html)

## Azhou visual guide

The book uses Azhou visual annotations to make two beginner decisions visible:
a Skill is a repeatable work method rather than a longer one-off request, and
an Agent should investigate facts before a human makes a trade-off. These are
original teaching metaphors, not Matt Pocock quotations, upstream source
material, or an author endorsement.

![Azhou routes facts, trade-offs, and specifications](assets/azhou/decision-source-router.png)

The diagrams are final public PNG renders only. Private Azhou Skill source,
character references, prompts, templates, runtime files, receipts, and audit
material are intentionally excluded. The book's factual claims remain linked
to the fixed upstream commit and the evidence records under `research/`.

## What this repository contains

- A fixed-version explanation of all 37 upstream Skills.
- A step-by-step field guide for each Skill: trigger, input, process, boundary,
  teaching desktop UI example, output, verification, and beginner mistakes.
- Three explicit reading paths for beginner, intermediate, and advanced users.
- Six practice gates and one capstone that turn reading into verifiable engineering work.
- Seven progressive, synthetic desktop UI client exercises.
- Three end-to-end operation cases: fact-auditing a technical report, moving
  configuration semantics, and fixing an Electron renderer blank screen.
- Fifteen first-party evidence records from Matt Pocock's repository and
  official AI Hero pages, with version and inference boundaries.
- Fifteen Azhou beginner diagrams as final PNG assets.
- Ten editable Excalidraw scenes with SVG and PNG exports.

The current reading edition is `v0.1.0`. Its evidence baseline is upstream commit
[`6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76):
18 engineering, 7 productivity, 4 misc, and 8 in-progress Skills.

## Public boundary

Examples are purpose-built teaching scenarios. This repository does not contain
private project names, private source code, local user paths, credentials,
raw chat transcripts, or internal release information.

## Build and verify

```bash
npm ci
npm run check
```

The numbered files under `chapters/` and `labs/` are the authoritative content
sources. The build assembles chapters and placed practice sources into `book.md`,
generates both `html/index.html` and `html/book.html`, generates standalone
practice pages under `html/labs/`, and copies every referenced PNG into
`html/assets/`.
The verifier checks the fixed upstream commit, the Pages workflow, and common
public-repository secret/path patterns. Its current verified snapshot
(`2026-09-01`) is:

| Surface | Verified count |
|---|---:|
| Numbered chapter sources | 16 |
| Practice gates | 6 |
| Capstones | 1 |
| Detailed Skill sections | 37 |
| First-party evidence records | 15 |
| Referenced book images | 25 |
| Final Azhou PNG diagrams | 15 |
| Editable Excalidraw scenes | 10 |
| Generated practice pages | 8 |

## Visual sources

- `assets/azhou/`: final public PNG diagrams only. They are Azhou teaching
  annotations, not upstream evidence. No private Skill runtime, prompt bundle,
  template, character reference, or machine receipt is included.
- `assets/diagrams/`: original `.excalidraw` scenes plus SVG and PNG exports.

## License

The upstream Skills remain under their MIT license. Original book text, HTML,
examples, and diagrams are licensed under CC BY-NC-SA 4.0. Embedded font
subsets retain their own licenses. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
and [LICENSES](LICENSES). Project copyright and attribution scope are recorded
in [NOTICE.md](NOTICE.md).
