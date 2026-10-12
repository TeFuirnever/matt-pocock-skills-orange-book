# 本地上游版本核对 · 2026-10-12

## 来源与边界

- 核对日期：2026-10-12。
- 本次来源：本地 `mattpocock/skills` Git 工作区。执行者动笔前重跑工作区状态检查，按实测值记录：`git rev-parse HEAD` → `b0618bc436ad893b3c5e84e55fba86586d34a404`（HEAD 仍停在前一基线），`git rev-parse origin/main` → `49dd158d1076134a641b33efb035946536778336`，`git status --porcelain` 为空（工作区干净）。
- 方法：本笔记全部内容核实均以 `49dd158d1076134a641b33efb035946536778336` 为参数经 git 引用读取（`git rev-parse <ref>:<path>`、`git ls-tree <ref>`、`git show <ref>:<path>`、`git diff b0618bc… 49dd158…`），不依赖工作区检出内容。
- 提交间隔：`git log b0618bc..origin/main` 恰 2 个提交、均为 2026-10-09：`49dd158`「wizard: template fixes (#1220, #1142, #1081, #1041, #1003) (#1237)」为行为提交；`8267225`「out-of-scope: retro always loads writing-for-agents (#1240)」为记录性提交。`git diff --name-status` 仅 3 个文件：`.changeset/wizard-template-fixes-2.md`（新增）、`.out-of-scope/lazy-load-writing-for-agents.md`（新增）、`skills/engineering/wizard/template.sh`（修改，+21/−7）。
- 新基线：[`49dd158d1076134a641b33efb035946536778336`](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336)，提交日期 2026-10-09（author 与 committer 日期均为 2026-10-09T11:56:49+01:00）；`package.json` 版本 1.3.1，且两基线 `package.json` blob 一致（`fc954629d8d974406d96c33888f3ec1c977f0302`）。上一基线：`b0618bc436ad893b3c5e84e55fba86586d34a404`，2026-10-08。
- 历史证据：`upstream-sync-2026-10-09.md`（39 处旧基线完整哈希）与 `project-review-2026-10-09.md`（3 处：第 18、35 行完整哈希 + 第 162 行短形式）中的 `b0618bc…` 引用原样保留，不随基线前移；`matt-pocock-public-statements.md` 的 15 条记录锚定 2026-08-24 的 `6654f6b…`，本次没有重新检索官网，历史引文不能证明最新行为。
- 运行边界：此记录只核对文本与 blob，未安装各客户端插件，未对外发布 issue、PR 或执行上游工作流，未改动上游工作区的检出状态。

## 清单迁移

两侧口径完全一致，无新增、无删除、无目录迁移：

| 口径 | 上一基线 `b0618bc` | 当前基线 `49dd158` |
|---|---|---|
| engineering | 20 | 20 |
| productivity | 7 | 7 |
| misc | 4 | 4 |
| in-progress | 7 | 7 |
| 总数 | 38 | 38 |
| deprecated | 0 | 0 |

计数命令：`git ls-tree -r --name-only 49dd158 skills/<目录> | grep -c 'SKILL\.md'`。插件分发口径不变（engineering 与 productivity 共 27 个）。`research/upstream-manifest.json` 已同步 `commit` 与 `checkedOn` 字段，`packageVersion` 保持 `1.3.1`（changeset 未发布，CHANGELOG 与 `package.json` 仍为 1.3.1）。

## 行为与配套文本变化

- `skills/engineering/wizard/template.sh`（+21/−7）五项修复：
  1. 删除未用的 `RED` 颜色变量，`tput` 分支与兜底分支同步（#1003）；
  2. `_clear` 改为 `tput clear` 实际执行成功才返回，否则回退 ANSI 序列 `\033[2J\033[3J\033[H`，修复 terminfo 缺失时清屏失败（#1081）；
  3. `_existing` 新增 dotenv 双引号值 `KEY="value"` 解码，内含转义符、`$` 或 `"` 时返回 1 重新提问，效果是重跑时按 Enter 保留现值不再把外层引号写回 `.env`（#1220）；
  4. `write_env` 末尾新增 `printf -v "$key" '%s' "$value"`，写文件同时设置 shell 变量，注释改为 “and sets $KEY”（#1041）；
  5. STAGES 示例段整体包进 `run_wizard() { … }`，末行 `run_wizard "$@"; exit`，并加注释说明 bash 先整体解析再出第一个提示、运行中编辑脚本不再打断向导（#1142）。
  注意 `wizard/SKILL.md` 本身未变（两基线 blob 一致 `c4294ad8…`），变化都在模板产物内部。
- `.changeset/wizard-template-fixes-2.md` 新增：未发布 patch changeset，逐条列出上述 5 项修复与 issue 引用；文件名后缀 `-2` 对应基线里已合并的第一轮 `wizard-template-fixes.md`。
- `.out-of-scope/lazy-load-writing-for-agents.md` 新增：#1238 已关闭，上游明确拒绝让 `retro` 懒加载 `writing-for-agents`——它定义了什么是 no-op 指令与好 Skill，`retro` 只读不写的复盘也需要这把标尺。
- 对书稿影响：正文零改动——§11.1.17（`chapters/12-skill-handbook.md:457`）对模板的三项描述（转义环境值、0600 新建、保留权限与符号链接目标）在新模板 diff 中逐项核实仍为真；`retro` 与 `writing-for-agents` 的 SKILL.md blob 两基线一致（`12149acf…`、`a37608da…`），§11.1.19（`chapters/12-skill-handbook.md:499`）表述不变，#1240 的裁决反而佐证之。
- 附带观察（预先存在、非本范围引入，仅供上游问题追踪）：`docs/engineering/wizard.md` 自称提供 “progress with time remaining”，而模板新旧两版均只显示 `Stage X/Y` 阶段计数、无剩余时间；不构成书稿改动依据。

## 可复核清单

下表沿用 2026-10-09 笔记的 38 行口径（Skill / 目录 / 调用入口 / 固定原文），行序与 `upstream-manifest.json` 一致，不新增行、不改调用入口列；全部 blob 链接基线由 `b0618bc…` 换成 `49dd158d1076134a641b33efb035946536778336`，不指向浮动主分支。

| Skill | 目录 | 调用入口 | 固定原文 |
|---|---|---|---|
| `ask-matt` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/ask-matt/SKILL.md) |
| `code-review` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/code-review/SKILL.md) |
| `codebase-design` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/codebase-design/SKILL.md) |
| `diagnosing-bugs` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/diagnosing-bugs/SKILL.md) |
| `domain-modeling` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/domain-modeling/SKILL.md) |
| `grill-with-docs` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/grill-with-docs/SKILL.md) |
| `implement` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/implement/SKILL.md) |
| `implement-spec` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/implement-spec/SKILL.md) |
| `improve-codebase-architecture` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/improve-codebase-architecture/SKILL.md) |
| `pr` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/pr/SKILL.md) |
| `prototype` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/prototype/SKILL.md) |
| `research` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/research/SKILL.md) |
| `retro` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/retro/SKILL.md) |
| `setup-matt-pocock-skills` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/setup-matt-pocock-skills/SKILL.md) |
| `tdd` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/tdd/SKILL.md) |
| `to-spec` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/to-spec/SKILL.md) |
| `to-tickets` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/to-tickets/SKILL.md) |
| `triage` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/triage/SKILL.md) |
| `wayfinder` | engineering | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/wayfinder/SKILL.md) |
| `wizard` | engineering | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/engineering/wizard/SKILL.md) |
| `chief-of-staff` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/chief-of-staff/SKILL.md) |
| `claude-handoff` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/claude-handoff/SKILL.md) |
| `loop-me` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/loop-me/SKILL.md) |
| `setup-ts-deep-modules` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/setup-ts-deep-modules/SKILL.md) |
| `writing-beats` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/writing-beats/SKILL.md) |
| `writing-fragments` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/writing-fragments/SKILL.md) |
| `writing-shape` | in-progress | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/in-progress/writing-shape/SKILL.md) |
| `git-guardrails-claude-code` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/misc/git-guardrails-claude-code/SKILL.md) |
| `migrate-to-shoehorn` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/misc/migrate-to-shoehorn/SKILL.md) |
| `scaffold-exercises` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/misc/scaffold-exercises/SKILL.md) |
| `setup-pre-commit` | misc | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/misc/setup-pre-commit/SKILL.md) |
| `grill-me` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/grill-me/SKILL.md) |
| `grilling` | productivity | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/grilling/SKILL.md) |
| `handoff` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/handoff/SKILL.md) |
| `teach` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/teach/SKILL.md) |
| `to-questionnaire` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/to-questionnaire/SKILL.md) |
| `wait-what` | productivity | 用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/wait-what/SKILL.md) |
| `writing-for-agents` | productivity | 模型或用户 | [SKILL.md](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/skills/productivity/writing-for-agents/SKILL.md) |

## 本次验证

本节是验证安排，结果由构建门通过后的后续步骤确认填写；本笔记成稿时（2026-10-12）不预填运行结果。

- 计划运行 `npm run check`（构建 + Node 测试 + verify），预期计数：16 章、7+1 实践源（6 个实践关卡 + 1 个综合交付）、38 项 Skill、15 条一手记录、25 张引用图片、8 个独立实践页、公开扫描干净。
- 计划运行 `git diff --check`。
- 计划抽查旧基线链接保留：`upstream-sync-2026-10-09.md` 39 处、`project-review-2026-10-09.md` 3 处、`matt-pocock-public-statements.md` 与 `chapters/13-author-perspective.md` §12.4 的 `6654f6b` 固定链接（第 101-115 行）均未被改动。
- 依赖未变（`package.json`/`package-lock.json` 未触碰），不运行 `npm ci`。
- 阅读版号保持 `v0.1.0`，本次仅更新本书工作树，不提交、不推送、不发布、不部署。
