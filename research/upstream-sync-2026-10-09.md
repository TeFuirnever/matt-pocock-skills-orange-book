# 本地上游版本核对 · 2026-10-09

## 来源与边界

- 核对日期：2026-10-09。
- 本次来源：用户指定的本地 `mattpocock/skills` Git 工作区，核对开始时干净，未拉取远端。
- 当前提交：[`b0618bc436ad893b3c5e84e55fba86586d34a404`](https://github.com/mattpocock/skills/tree/b0618bc436ad893b3c5e84e55fba86586d34a404)，提交日期 2026-10-08，`package.json` 版本 1.3.1。
- 前一基线：`6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`，2026-08-24。
- 方法：比较两个提交的 README、目录清单、全部 Skill 及配套模板差异；逐项核对书中目录、调用方式和工作流。没有把插件版本号当作完整行为版本。
- 历史证据：`matt-pocock-public-statements.md` 的 15 条记录保持原始日期、提交和推论范围；本次没有重新检索官网。历史引文不能证明最新行为。
- 运行边界：此记录核对文本，未实际安装各客户端插件，未对外发布 issue、PR 或执行上游工作流。书中客户端操作仍是合成教学例。

## 清单迁移

| 变化 | 旧基线 | 当前基线 |
|---|---|---|
| engineering | 18 | 20 |
| productivity | 7 | 7 |
| misc | 4 | 4 |
| in-progress | 8 | 7 |
| 总数 | 37 | 38 |
| `implement-spec`、`retro` | 实验目录 | engineering，用户调用 |
| `pr` | 不存在 | engineering，模型或用户调用 |
| `chief-of-staff` | 不存在 | in-progress，用户调用，实验能力 |
| `resolving-merge-conflicts` | engineering | Skill 已删除，docs 页归档，无替代 Skill |

插件只分发 engineering 与 productivity 的 27 个 Skill。misc 不在插件中，in-progress 是公开测试能力。保留的旧数量图明确标注历史口径，不用作当前清单。

## 行为与配套文本变化

- 安装：README 首推自动更新插件，Claude Code 使用官方 marketplace，Codex/Copilot 使用仓库 marketplace；可编辑文件仍手动更新。每个 Agent 只选一条路径。
- 领域文档：`CONTEXT.md`、`CONTEXT-MAP.md` 和格式模板改名为 `GLOSSARY.md`、`GLOSSARY-MAP.md`、`GLOSSARY-FORMAT.md`；词汇表仍不容纳实现细节。
- `implement-spec`：围绕依赖图 frontier 调度独立 worktree 的实现代理，在同一 integration branch 汇合；需要 PR 的 tracker 在首次合并后才创建草稿 PR，最终双轴 review 并清理 worktree。
- `pr`：用最小可解释图示写 Summary，附前后验证证据，判断单向/双向门和影响范围。其图示菜单来自 Dex Horthy 的 `show-me`，见上游 `pr/CREDITS.md`；不是新增依赖。
- `retro`：晋升 engineering 后仍建议改善导航、检查、规范、指导文件与工具，不自动实施建议。
- `chief-of-staff`：实验性的长期目标协调，强调后台子代理、上下文指针及环境改进；定时工作受运行时能力约束。
- `ask-matt`：先阅读路由到的 Skill，再交还对应用户调用入口；反映晋升、新增与删除后的工作流。
- `setup-matt-pocock-skills`：仅安装 triage 时配置其标签，并在 GitHub/GitLab 创建缺失标签；tracker 模板修正 GitHub issue JSON、外部 PR API、sub-issue 操作和 GitLab `-O json`。这些是固定模板说明，不是对所有 CLI 版本的兼容承诺。
- `to-tickets`：来源为既有 issue 时将 tickets 设为其子 issue；阻塞关系和父子关系分开，已有原生阻塞边时不再复制 Blocked by 段。
- `implement`：传入 ticket 引用要读取标题、正文、评论，并在输出中指出所做 ticket 标题。
- `code-review`：搜索全部规范文件，存在的 CODING_STANDARDS/CONTRIBUTING 必须包含；两轴子代理同时在前台运行，再汇总。
- `tdd`：每个待确认 seam 附一句“能捕获什么、遗漏什么”。
- `diagnosing-bugs`：强制变异代码或 fixture 制造红灯时，先与干净副本 diff，证明变异真实落地。
- `wayfinder`：map/ticket 仅用 wayfinder 标签，不混入 triage 标签；创建真实 issue 后再连接阻塞边与引用；研究成果保存在不合并的 `research/<name>` 分支，上游要求推送但不开 PR，ticket 留上下文指针。解决后把答案写为 ticket 评论并关闭，再将指针追加到 map。
- `grilling`：问题措辞让“yes”明确接受推荐答案；`teach` 明确工作区根和题目答案位置变化；`handoff` 明确系统临时目录；`wizard/template.sh` 修复 shell 值转义及环境文件写入权限、符号链接处理。

## 可复核清单

下表从本地 `skills/*/*/SKILL.md` 提取；机器可读镜像为 `upstream-manifest.json`。链接固定到上述提交，不指向浮动主分支。

| Skill | 目录 | 调用入口 | 固定原文 |
|---|---|---|---|
| `ask-matt` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/ask-matt/SKILL.md) |
| `code-review` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/code-review/SKILL.md) |
| `codebase-design` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/codebase-design/SKILL.md) |
| `diagnosing-bugs` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/diagnosing-bugs/SKILL.md) |
| `domain-modeling` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/domain-modeling/SKILL.md) |
| `grill-with-docs` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/grill-with-docs/SKILL.md) |
| `implement` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/implement/SKILL.md) |
| `implement-spec` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/implement-spec/SKILL.md) |
| `improve-codebase-architecture` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/improve-codebase-architecture/SKILL.md) |
| `pr` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/pr/SKILL.md) |
| `prototype` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/prototype/SKILL.md) |
| `research` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/research/SKILL.md) |
| `retro` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/retro/SKILL.md) |
| `setup-matt-pocock-skills` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/setup-matt-pocock-skills/SKILL.md) |
| `tdd` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/tdd/SKILL.md) |
| `to-spec` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/to-spec/SKILL.md) |
| `to-tickets` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/to-tickets/SKILL.md) |
| `triage` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/triage/SKILL.md) |
| `wayfinder` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/wayfinder/SKILL.md) |
| `wizard` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/engineering/wizard/SKILL.md) |
| `chief-of-staff` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/chief-of-staff/SKILL.md) |
| `claude-handoff` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/claude-handoff/SKILL.md) |
| `loop-me` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/loop-me/SKILL.md) |
| `setup-ts-deep-modules` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/setup-ts-deep-modules/SKILL.md) |
| `writing-beats` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/writing-beats/SKILL.md) |
| `writing-fragments` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/writing-fragments/SKILL.md) |
| `writing-shape` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/in-progress/writing-shape/SKILL.md) |
| `git-guardrails-claude-code` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/misc/git-guardrails-claude-code/SKILL.md) |
| `migrate-to-shoehorn` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/misc/migrate-to-shoehorn/SKILL.md) |
| `scaffold-exercises` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/misc/scaffold-exercises/SKILL.md) |
| `setup-pre-commit` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/misc/setup-pre-commit/SKILL.md) |
| `grill-me` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/grill-me/SKILL.md) |
| `grilling` | productivity | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/grilling/SKILL.md) |
| `handoff` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/handoff/SKILL.md) |
| `teach` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/teach/SKILL.md) |
| `to-questionnaire` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/to-questionnaire/SKILL.md) |
| `wait-what` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/wait-what/SKILL.md) |
| `writing-for-agents` | productivity | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/b0618bc436ad893b3c5e84e55fba86586d34a404/skills/productivity/writing-for-agents/SKILL.md) |

## 本次验证

- `npm run check`：构建、2 项 Node 测试、公开内容审计通过；16 章、38 项 Skill、15 条历史证据、25 张引用图片、8 个独立实践页。
- 补充本地链接检查：10 个 HTML 页面、964 个本地链接/锚点、47 个固定 Git 源路径，无缺失。
- 实际浏览器预览：首页标题、38 项口径和原有排版正常；搜索 `chief-of-staff` 返回实验手册与索引入口。
- `git diff --check` 通过；源目录保持干净。依赖未改变，未运行 `npm ci`。未执行外网链接存活检查或各客户端安装测试。
- 旧版图保留历史说明，未改 Excalidraw 场景或图片。阅读版号保留 `v0.1.0`，本次仅更新本地工作树，未提交、推送、发布或部署。
