# 上游 1.3.2 待发版待命笔记 · 2026-10-12

## 对齐口径

本书基线对齐**上游最新 release**，不是 main。最新 release 为 [v1.3.1](https://github.com/mattpocock/skills/releases/tag/v1.3.1)（2026-10-04 发布），tag 指向提交 `24fe0ef7737efae15c87225755e9f6f5965e4888`（`git rev-parse v1.3.1^{commit}`）。当前基线 `49dd158` 领先该 release 46 个提交（`git log --oneline v1.3.1..49dd158 | wc -l` → 46），这 46 个提交即待发 1.3.2 的全部内容。经下节 16/16 祖先验证，基线内容将与 1.3.2 发布内容一致，故**不回退基线**，待 1.3.2 发布后把基线锚定到其 tag 提交即可。

## 来源与边界

- 核对日期：2026-10-12。
- 本次来源：本地 `mattpocock/skills` Git 工作区。`git fetch origin` 后实测：`git ls-remote origin main` → `49dd158d1076134a641b33efb035946536778336`（main 未动，仍等于本书当前基线）；`changeset-release/main` → `f7f05086e564eff660e11273608469644c86c1c1`。
- 待发分支结构：`git log origin/changeset-release/main` 显示该分支仅比 main 多一个提交 `f7f0508`「chore: version skills」（2026-10-09T10:57:07+00:00），即上游 changesets 机器人积攒的发布 PR，尚未合并。
- **边界：本笔记不移动基线。** 本书证据基线仍为 `49dd158d1076134a641b33efb035946536778336`，`packageVersion` 仍为 `1.3.1`。1.3.2 在合并进 main 之前不是可引用的事实；本笔记的全部 `f7f0508` 内容经 `git show`/`git diff` 以该分支引用读取，仅作合并后行动的预备。
- 运行边界：未安装客户端插件，未对外发布 issue、PR 或执行上游工作流，未改动上游工作区检出状态。

## 待发内容（`git diff 49dd158 origin/changeset-release/main`）

- `package.json`：`1.3.1` → `1.3.2`；`.claude-plugin/plugin.json` 经 `sync-plugin-version.mjs` 同步为 `1.3.2`。
- `CHANGELOG.md`：+36 行，新增 `## 1.3.2` 共 16 条 patch 记录。
- `.changeset/`：16 个 changeset 文件随发布消耗（ask-matt-read-skill-first、code-review-standards-and-subagents、diagnosing-bugs-prove-mutation、github-tracker-external-pr-list、grilling-yes-accepts-recommendation、handoff-temp-dir、implement-skill-tool-wording、implement-ticket-reference、setup-tracker-fixes、tdd-seam-tradeoffs、teach-quiz-answer-position、teach-workspace-root、to-tickets-sub-issues、wayfinder-labels-refs-research-prs、wizard-template-fixes、wizard-template-fixes-2）。
- 无 Skill 内容文件改动：`git diff --stat` 涉及的 19 个文件仅为版本号、CHANGELOG 与 changeset 消耗。

## 关键事实：16 条记录全部已在当前基线内

对 CHANGELOG 1.3.2 段引用的全部 16 个提交逐一执行 `git merge-base --is-ancestor <commit> 49dd158…`，**16/16 均为基线祖先**。即 1.3.2 是纯版本号发布：它聚合的行为变更（ask-matt 先读 SKILL.md、code-review 前台子代理与标准文件检索、diagnosing-bugs 变更落盘验证、grilling 推荐即「是」、handoff 临时目录明示、implement 取工单标题、setup 建 triage 标签、tdd seam 取舍注记、teach 工作区根与答案位置、to-tickets 子 issue、wayfinder 四项收敛、wizard 模板两轮修复）全部已包含在本书基线 `49dd158` 的正文证据内。

## 对书稿影响预判

- 正文预计零改动：无新增、删除或迁移的 Skill；38 项清单口径不变。逐项行为表述已在 `upstream-sync-2026-10-12.md` 的基线核对中验证为真。
- `research/upstream-manifest.json`：`commit` 前移至合并提交，`checkedOn` 更新，`packageVersion` 改为 `1.3.2`。
- 基线前移仅是「同一内容、正式发布名号」的迁移，不构成阅读版号变更理由。

## 发布后行动清单

触发条件：上游发布 v1.3.2（GitHub release 与 tag 出现），而不是 main 移动。main 上的新提交在进入 release 之前不改变本书基线。

1. `git fetch origin --tags`，确认 tag `v1.3.2` 存在且其提交包含 `f7f0508`（或等价的 squash/merge 提交），记录 `git rev-parse v1.3.2^{commit}` 的完整哈希与 tag 日期。
2. 按既有格式新写一份 `research/upstream-sync-<日期>.md`：以 v1.3.2 tag 提交为新基线，复核 38 项清单计数、列出 diff、逐项核实正文表述；本 standby 笔记的 16/16 祖先验证可作为「无新行为」的先验，但不能替代对 tag 提交的实测。
3. 更新 `research/upstream-manifest.json` 三个字段（`commit`、`checkedOn`、`packageVersion: 1.3.2`）。
4. 历史证据原样保留：`upstream-sync-2026-10-09.md`、`upstream-sync-2026-10-12.md`、`project-review-2026-10-09.md` 中的旧基线哈希与本笔记中的 `f7f0508`、`24fe0ef` 引用均不回改。
5. 运行 `npm run check`，预期计数沿用 2026-10-12 笔记口径（16 章、7+1 实践源、38 项 Skill、15 条一手记录、25 张引用图片、8 个独立实践页、公开扫描干净）；依赖未变则不运行 `npm ci`。
6. 阅读版号保持 `v0.1.0`；若发布实测出现清单或行为变化，再评估是否进入 `v0.2.0` 讨论。
