# 全书内容对齐审计 · 2026-10-12

## 来源与边界

- 审计日期：2026-10-12。
- 上游真源：`mattpocock/skills` 基线提交 `49dd158d1076134a641b33efb035946536778336`，全部内容经 git 引用读取（`git show 49dd158…:skills/<bucket>/<name>/SKILL.md` 及附带文件），未读上游工作区检出（其 HEAD 停在旧提交 `b0618bc`）。
- 方法：38 个 Skill 各一个独立审计线程，逐条核对书稿的事实性断言（阶段名与顺序、命令、文件名、调用方式、约束、产出物）与上游基线原文；范围覆盖 `chapters/12-skill-handbook.md` 的 38 个专节（§11.1–11.4）及 `chapters/` 其余 11 章的全部零星提及。观点性、教学性发挥不判为差异。
- 边界：本审计只核对「书稿断言 vs 基线原文」的一致性，不评价上游设计本身；in-progress Skill 按其实验定位核对，不要求稳定接口。

## 结果总览

- 38 个 Skill 中 29 个零事实性差异。
- 9 个 Skill 共 17 处偏差，本次全部修订（7 个章节文件）。无新增、删除或迁移 Skill 的清单变化。

## 修订清单

| # | 位置 | Skill | 偏差 | 修订 |
|---|---|---|---|---|
| 1 | 12-skill-handbook.md（§11.1.4） | triage | 「外部」泛化到 issue 与点名 PR | issue 不受外部限制；点名 PR 不论作者 |
| 2 | 12-skill-handbook.md（§11.1.5） | wayfinder | task ticket「必须由人完成」、prototype ticket「必须可运行」 | task 含 AFK 分支；prototype 可为大纲/草稿/stub |
| 3 | 05-delivery.md（§4.6） | wayfinder | 同上两处窄化 | 同步修订 |
| 4 | 12-skill-handbook.md（§11.1.7） | to-tickets | 「每张票有 Parent」概括过度 | Parent 仅存在于来源为已有 issue 的 tracker 票 |
| 5 | 12-skill-handbook.md（§11.1.10） | diagnosing-bugs | 「公共 seam」挪用自 tdd | 改为「能在调用点复现真实 bug 模式的正确 seam；不存在则记录为发现」 |
| 6 | 06-feedback-loops.md | diagnosing-bugs | 反馈环清单 8 种缺 2 种却称「最后才是」 | 补齐 property/fuzz 与 differential，共 10 种 |
| 7 | 10-adoption.md | diagnosing-bugs | 安装树只复制 SKILL.md | 补 `scripts/hitl-loop.template.sh`（SKILL.md Phase 1 引用） |
| 8 | 12-skill-handbook.md（§11.1.13） | domain-modeling | ADR 三条件漏「真实取舍」 | 补齐三条件与缺一即跳过 |
| 9 | 12-skill-handbook.md（§11.1.13） | domain-modeling | glossary 词条「正例、反例和代码指针」与格式文件冲突 | 对齐 GLOSSARY-FORMAT.md：定义 + `_Avoid_`，不含实现细节 |
| 10 | 12-skill-handbook.md（§11.1.16） | code-review | spec source 含「验收清单」 | 对齐 Step 2 的三类来源 |
| 11 | 12-skill-handbook.md（§11.1.16） | code-review | Standards 轴枚举「安全、测试」超出上游定义 | 改为「仓库成文规范＋坏味道基线，工具已强制的跳过」 |
| 12 | 14-operation-cases.md | code-review | 双轴被改写为「事实错误 vs 表达规范」 | 改为「规格符合性 vs 成文规范」 |
| 13 | 08-handoffs.md（§7.4） | teach | 测验选项「长度相近」弱化硬性等长 | 改为字数完全相同（尽量字符数也一致） |
| 14 | 12-skill-handbook.md（§11.4.2） | loop-me | 字段枚举自创且「每个 workflow 有 checkpoint」与上游抵触 | 改为「写到实现者无需追问；checkpoint 可有可无」 |
| 15 | 15-appendix.md | loop-me | 「多会话」误读 stateful | 改为「有状态地拷问工作流规格」 |
| 16 | 12-skill-handbook.md（§11.4.6） | writing-shape | 「写后重读磁盘」方向反转 | 改为「写入前先重读磁盘」 |
| 17 | 12-skill-handbook.md（§11.3.4） | setup-pre-commit | 「不覆盖已有配置」推广过度 | 注明不覆盖保护仅适用于 Prettier 配置 |

## 遗留观察（不构成本次修订）

- `12-skill-handbook.md:501` retro 类别名写作「Global guidance」，上游原名「Global AGENTS.md」；语义未错，低优先级。
- `setup-ts-deep-modules` 专节两处轻微措辞（tests fixtures 例外省略、「人工加入 deep import」执行者偏差）；核心事实 pass→fail→pass 正确。
- 各专节的教学性发挥（UI 客户端操作例、新手误区）属本书编辑层，不与上游对齐要求冲突。

## 验证

- 修订后运行 `npm run check`（构建 + Node 测试 + verify），预期计数不变：16 章、7+1 实践源、38 项 Skill、15 条一手记录、25 张引用图片、8 个独立实践页、公开扫描干净。
- 依赖未变，不运行 `npm ci`。
- 基线保持 `49dd158…` 不动；本笔记不改变 `upstream-manifest.json` 任何字段。
