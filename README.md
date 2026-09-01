# Matt Pocock Skills Orange Book

![Skill is not a longer prompt](assets/azhou/skill-not-prompt.png)

A Chinese-first, beginner-friendly handbook for the public
[`mattpocock/skills`](https://github.com/mattpocock/skills) repository.

- [中文说明](README_zh.md)
- [Authoritative Markdown book](book.md)
- [Generated HTML reading edition](html/book.html)

## What this repository contains

- A fixed-version explanation of all 37 upstream Skills.
- A step-by-step field guide for each Skill: trigger, input, process, boundary,
  anonymous desktop UI example, output, verification, and beginner mistakes.
- Seven progressive, synthetic desktop UI client exercises.
- Six Azhou beginner diagrams as final PNG assets.
- Eight editable Excalidraw scenes with SVG and PNG exports.

The book is based on upstream commit
[`6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76):
18 engineering, 7 productivity, 4 misc, and 8 in-progress Skills.

## Public boundary

Examples are synthetic and anonymized. This repository does not contain
private project names, private source code, local user paths, credentials,
raw chat transcripts, or internal release information.

## Build and verify

```bash
npm ci
npm run check
```

`book.md` is the content source of truth. The build generates
`html/book.html` and copies every referenced PNG into `html/assets/`.
The verifier checks 37/37 detailed Skill sections, image availability, the
fixed upstream commit, and common public-repository secret/path patterns.

## Visual sources

- `assets/azhou/`: final public PNG diagrams only. No private Skill runtime,
  prompt bundle, template, or machine receipt is included.
- `assets/diagrams/`: original `.excalidraw` scenes plus SVG and PNG exports.

## License

The upstream Skills remain under their MIT license. Original book text, HTML,
examples, and diagrams are licensed under CC BY-NC-SA 4.0. Embedded font
subsets retain their own licenses. See [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)
and [LICENSES](LICENSES).
