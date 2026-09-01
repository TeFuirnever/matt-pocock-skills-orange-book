# Contributing

Contributions that improve accuracy, beginner clarity, diagrams, accessibility,
or fixed-version traceability are welcome.

## Content rules

- Treat upstream commit
  `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76` as the factual baseline.
- Distinguish upstream behavior, teaching interpretation, and synthetic example.
- Use public, anonymous desktop UI examples. Do not submit private project names,
  private code, local user paths, credentials, or raw chat transcripts.
- Do not silently describe an `in-progress` Skill as stable.
- Keep numbered files under `chapters/` as the content source of truth. Do not
  edit generated `book.md` or HTML without changing the chapter or build source.
- Put evidence collection notes under `research/` and keep author statement,
  repository fact, teaching synthesis, and session-derived pattern distinct.

## Diagrams

- Excalidraw changes must include the editable `.excalidraw` scene and refreshed
  SVG/PNG exports.
- Azhou contributions must include only the final public image. Do not commit
  private Skill files, prompt bundles, templates, runtime files, or receipts.
- Add meaningful Markdown alt text and verify the image remains readable at
  desktop and mobile widths.

## Local verification

```bash
npm ci
npm run check
```

The check must pass before a pull request is ready. Describe any validation that
could not be run.

For site changes, also open `html/index.html` at desktop and mobile widths and
exercise the table of contents, search, mobile drawer, and print action.

## Pull requests

Keep each change focused. Explain the upstream source, the beginner problem being
fixed, and the verification performed. By contributing, you agree that your
contribution is licensed under this repository's applicable licenses.
