## 第 14 章 · 附录：38 个 Skills 完整索引

下面的列表以本地源提交 `49dd158d1076134a641b33efb035946536778336` 为准，核对日期为 2026-10-12。稳定分类来自仓库目录；一句话说明综合了上游 README、各 Skill frontmatter 与正文。

### A. Engineering：20 个

| Skill | 调用倾向 | 解决的问题 |
|---|---|---|
| [`ask-matt`](#11-1-1-ask-matt-不知道走哪条路时先路由) | 用户 | 为当前情境选择 Skill 或流程 |
| [`grill-with-docs`](#11-1-3-grill-with-docs-在真实仓库里把问题问清楚) | 用户 | 在真实仓库里问清需求，同时更新领域词汇与 ADR |
| [`triage`](#11-1-4-triage-先确认来件是什么-再决定谁处理) | 用户 | 让 issue 和外部 PR 经过状态化分诊、核验与简报 |
| [`improve-codebase-architecture`](#11-1-15-improve-codebase-architecture-先找高价值候选-再讨论接口) | 用户 | 调查模块加深机会，生成 HTML 候选报告，再逐项讨论 |
| [`setup-matt-pocock-skills`](#11-1-2-setup-matt-pocock-skills-第一次使用前对齐仓库现实) | 用户 | 配置 tracker、triage labels 与领域文档布局 |
| [`to-spec`](#11-1-6-to-spec-把已经讨论清楚的内容固定下来) | 用户 | 把已完成的对话决策整理成规格并发布到 tracker |
| [`to-tickets`](#11-1-7-to-tickets-把规格切成能独立反馈的纵向薄片) | 用户 | 把计划拆成声明阻塞关系的 tracer-bullet tickets |
| [`implement`](#11-1-8-implement-按批准的-spec-或-ticket-施工) | 用户 | 按 spec/tickets 实现，在约定 seam 做 TDD 并完成 review |
| [`wayfinder`](#11-1-5-wayfinder-大工程先画决策地图-不急着施工) | 用户 | 用决策 tickets 管理一个会话装不下的大型工作 |
| [`prototype`](#11-1-9-prototype-用可丢弃代码回答一个设计问题) | 模型 | 用可抛弃代码回答状态模型或 UI 结构问题 |
| [`diagnosing-bugs`](#11-1-10-diagnosing-bugs-先制造稳定红色-再形成理论) | 模型 | 从 red-capable 反馈环开始诊断疑难 bug 与性能退化 |
| [`research`](#11-1-12-research-外部事实必须回到一手来源) | 模型 | 用高可信一手来源调查外部事实并形成引用文档 |
| [`tdd`](#11-1-11-tdd-一次只推动一个可观察行为) | 模型 | 在预先同意的公共 seam 做一行为一循环的红绿开发 |
| [`domain-modeling`](#11-1-13-domain-modeling-先统一词义-再让代码承载词义) | 模型 | 打磨共同语言，及时更新 `GLOSSARY.md`，谨慎记录 ADR |
| [`codebase-design`](#11-1-14-codebase-design-用深模块语言讨论代码形状) | 模型 | 提供深模块、接口、seam、adapter 等共享设计词汇 |
| [`code-review`](#11-1-16-code-review-把-standards-与-spec-分开验收) | 模型 | 并行或隔离执行 Standards 与 Spec 两轴评审 |
| [`wizard`](#11-1-17-wizard-把只有人能做的步骤变成可审阅向导) | 模型 | 为只有人能完成的控制台、凭据和迁移步骤生成安全向导 |
| [`implement-spec`](#11-1-18-implement-spec-把一份规格汇总到集成分支的并行任务图) | 用户 | 按任务图并行实现整份规格，汇总到集成分支并统一评审 |
| [`retro`](#11-1-19-retro-复盘-agent-环境-而不是评价一次回答好不好) | 用户 | 从会话证据提出环境改进，机械错误优先转为自动检查 |
| [`pr`](#11-1-20-pr-用最小图示和证据写清-pr) | 模型 | 用最小图示、前后证据与合并影响撰写 PR 正文 |

### B. Productivity：7 个

| Skill | 调用倾向 | 解决的问题 |
|---|---|---|
| [`grill-me`](#11-2-1-grill-me-没有仓库时-把脑中的想法问清楚) | 用户 | 不依赖仓库地把模糊想法问清楚 |
| [`handoff`](#11-2-3-handoff-让工作跨会话旅行-但不复制整个世界) | 用户 | 把当前对话压缩为新 Agent 可继续的临时交接文档 |
| [`teach`](#11-2-4-teach-把一次问答变成跨会话学习工作区) | 用户 | 在持久工作区里跨会话教学，依赖可信资料与学习记录 |
| [`to-questionnaire`](#11-2-5-to-questionnaire-把别人脑中的信息异步取回来) | 用户 | 把别人掌握的未知信息整理成异步问卷 |
| [`wait-what`](#11-2-6-wait-what-上一条没听懂-先退回共同前提) | 用户 | 上一条消息没落地时，用缺失上下文和直白语言重讲 |
| [`grilling`](#11-2-2-grilling-用决策树和-frontier-管理追问) | 模型 | 用决策树和 frontier 组织多轮追问 |
| [`writing-for-agents`](#11-2-7-writing-for-agents-写给-agent-的文档要改变行为) | 模型 | 设计 context pointer、降低两类负担并删除 no-op 指令 |

### C. Misc：4 个

| Skill | 适用条件 | 注意事项 |
|---|---|---|
| [`git-guardrails-claude-code`](#11-3-1-git-guardrails-claude-code-在-claude-code-执行前拦截危险-git-命令) | 需要用 Claude Code hooks 阻止危险 Git 命令 | 工具特定，先确认运行时 |
| [`migrate-to-shoehorn`](#11-3-2-migrate-to-shoehorn-只在测试里减少大型对象伪造) | 测试项目使用 `@total-typescript/shoehorn` | 作者技术栈特定，不是通用规则 |
| [`scaffold-exercises`](#11-3-3-scaffold-exercises-按固定课程结构生成可-lint-的练习骨架) | 需要课程章节、题目、答案和讲解目录 | 面向教学内容生产 |
| [`setup-pre-commit`](#11-3-4-setup-pre-commit-为已有-node-仓库接入提交前检查) | 需要 Husky、lint-staged、Prettier、类型检查和测试 | 先匹配现有包管理器与 CI |

### D. In-progress：7 个

| Skill | 当前方向 | 稳定性提醒 |
|---|---|---|
| [`claude-handoff`](#11-4-1-claude-handoff-把-handoff-直接启动成后台-claude-agent) | 用后台 Claude Agent 立即接手当前对话 | 工具特定，行为可能变化 |
| [`loop-me`](#11-4-2-loop-me-把生活或工作中的重复循环写成可实现-workflow) | 有状态地拷问工作流规格 | 实验中 |
| [`setup-ts-deep-modules`](#11-4-3-setup-ts-deep-modules-用-dependency-cruiser-把深模块边界变成硬检查) | 用 dependency-cruiser 约束 TypeScript 深模块 | 工具链侵入较大，先原型验证 |
| [`writing-beats`](#11-4-5-writing-beats-从固定素材中选择一条可达的叙事路径) | 把素材组织成逐步展开的叙事 beats | 写作实验 |
| [`writing-fragments`](#11-4-4-writing-fragments-探索期只采集有生命力的写作碎片) | 挖掘未结构化写作碎片 | 写作实验 |
| [`writing-shape`](#11-4-6-writing-shape-从固定素材中逐段塑造一篇文章) | 逐段把原始材料塑造成文章 | 写作实验 |
| [`chief-of-staff`](#11-4-7-chief-of-staff-在长会话里协调长期目标) | 通过后台子 Agent 与日程建议协调长期目标 | 长会话与运行时相关，仍属实验 |

### E. 一页选型表

此表只覆盖最常见的 23 个入口；misc 与 in-progress 的 Skill 按场景查阅附录 C、D 全表。

| 你现在卡在哪里 | 先用什么 |
|---|---|
| 不知道选哪个 Skill | `ask-matt` |
| 想法模糊，答案在自己脑中 | `grill-me` |
| 想法模糊，需要结合仓库 | `grill-with-docs` |
| 一个会话装不下 | `wayfinder` |
| 决策已完成，需要规格 | `to-spec` |
| 规格需要拆成可交付任务 | `to-tickets` |
| 有批准的 ticket，需要施工 | `implement` |
| 要一次协调整份规格的任务图 | `implement-spec` |
| 需要写 PR 正文 | `pr` |
| 要从会话里改进 Agent 环境 | `retro` |
| UI/状态模型必须看见才能决定 | `prototype` |
| 新功能或 bug 要测试先行 | `tdd` |
| bug 难复现或跨多层 | `diagnosing-bugs` |
| 决定依赖外部技术事实 | `research` |
| 术语混乱 | `domain-modeling` |
| 模块接口浅、复杂度泄漏 | `codebase-design` |
| 想找真实架构改进候选 | `improve-codebase-architecture` |
| 要评审实现 | `code-review` |
| 只有人能完成外部步骤 | `wizard` |
| 工作要跨 Agent/工具旅行 | `handoff` |
| 决定在另一位专家脑中 | `to-questionnaire` |
| 上一条解释没听懂 | `wait-what` |
| 要写 Skill 或 Agent 指导文档 | `writing-for-agents` |

**版本迁移提示：** `implement-spec` 与 `retro` 已从实验目录移入 Engineering；新增 `pr` 与实验性 `chief-of-staff`。`resolving-merge-conflicts` 的 Skill 文件已删除，源仓库仍有历史说明页，但不再是本版可调用条目。

---

### F. 全书术语表

| 术语 | 一句话定义 | 系统讲解 |
|---|---|---|
| seam（测试接缝） | 预先约定、用来挂测试的公共边界，优先复用而不是新切 | [第 5 章](#第-5-章-反馈环-原型-tdd-诊断和研究) |
| red-capable | 一条能因为目标 bug 本身而失败的命令，不只证明程序没崩溃 | [第 5 章](#第-5-章-反馈环-原型-tdd-诊断和研究) |
| tracer-bullet ticket | 穿过所有层、但只做一条细而完整行为的垂直切片票 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| frontier（前沿） | 任务图中当前已解阻塞、可以开工的票集合 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| blocking edge | ticket 之间声明的「先完成谁」关系 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| integration branch | `implement-spec` 汇总各实现票成果的集成分支 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| 双轴评审 | Standards 与 Spec 分开启动、分开下结论的 review | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| HITL / AFK | 必须由人完成的步骤 / Agent 可独立完成的步骤 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| 深模块（depth） | 用小接口隐藏大量复杂行为的模块 | [第 6 章](#第-6-章-代码不会自己变好-领域语言-深模块与双轴评审) |
| handoff | 把会话状态压缩成交接文档，让新会话只读产物继续 | [第 7 章](#第-7-章-跨人-跨会话与人工步骤) |
| context pointer | 根指导文件里一行说明资料是什么、何时必须读的指针 | [第 7 章](#第-7-章-跨人-跨会话与人工步骤) |
| 断言账本 | 对技术文档逐条记录「声称、证据、核验日期」的核对表 | [第 13 章](#第-13-章-三个端到端操作案例-审报告-迁逻辑-修白屏) |
| 降级路径 | 工具能力缺失时保留方法核心的替代流程 | [第 9 章](#第-9-章-把-skills-引入自己的仓库) |
| 阅读版 / 证据基线 | 读者看到的发布版本 / 内部钉住的上游快照与证据记录 | [第 0 章](#第-0-章-这本书怎样读) |

### G. 三档就绪自检表

读完全书后，用这张表定位自己。哪条做不到，按右列回炉。

**小白就绪：**

| 我能做到 | 做不到时回炉 |
|---|---|
| 模糊时先澄清，明确时不重复讨论 | [第 3 章](#第-3-章-写代码前-把模糊需求变成工程决策) → [关卡 1](#practice-01-find-the-answer) |
| 大任务留下 spec、tickets 和 handoff | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) → [关卡 2](#practice-02-decision-to-spec)、[关卡 6](#practice-06-handoff-rehearsal) |
| bug 先建反馈环，再谈理论 | [第 5 章](#第-5-章-反馈环-原型-tdd-诊断和研究) → [关卡 3](#practice-03-red-green-bug) |
| 测试放在公共 seam，不锁死内部实现 | [第 5 章](#第-5-章-反馈环-原型-tdd-诊断和研究) → [关卡 4](#practice-04-minimal-fix-evidence) |
| 完成声明只引用当前验证，不引用历史印象 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) → [关卡 5](#practice-05-two-axis-review) |

**中级就绪：** 任意抽掉一段原始聊天，后续工作仍能从 spec、ticket、测试和 handoff 恢复。达不到就做 [第 10 章](#第-10-章-新人四周训练路线)的四个中级挑战，再用[综合交付](#practice-07-capstone-delivery)验收。

**高阶就绪：** 抽掉一个子 Agent、一个 tracker API 或一个特定终端工具后，流程仍能以较慢但可验证的方式完成；不能的依赖已写进 Skill 合同。达不到就回到 [第 9 章](#第-9-章-把-skills-引入自己的仓库)的降级路径与[第 10 章](#第-10-章-新人四周训练路线)的高阶挑战。

### H. 版本沿革图（历史教学图）

下面两张图保留自更早的阅读版，图中的数字与入口不是本版清单，只用于说明编排思路的演变。当前清单以附录 A–D 和本版正文为准。

![历史教学图：旧基线的 29 个非实验 Skill 与 8 个 in-progress Skill](assets/azhou/stable-and-beta.png)

![阿舟知识图：六个新手问题路由（旧版示意）](assets/azhou/six-questions-skill-router.png)

### I. 当 Agent 不靠谱时：症状与处置

| 症状 | 处置 | 回到 |
|---|---|---|
| 路由错了：`ask-matt` 推荐的流程与任务规模不匹配 | 按第 2 章三档强度表自己定档，小改动直接实现 | [第 2 章](#第-2-章-先看懂仓库-再安装) |
| `implement` 中途偷偷 redesign | 停下来，把新决策退回讨论，更新 spec 后再继续 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| 证据像伪造的：命令输出过于完美或无法复跑 | 要求当场重跑并贴当前输出；mutation 必须与原件 `diff` | [第 5 章](#第-5-章-反馈环-原型-tdd-诊断和研究) |
| 绿是假绿：测试通过了但没测到目标行为 | 检查测试是否在公共 seam、是否同义反复、是否 mock 了自己模块 | [第 5 章](#第-5-章-反馈环-原型-tdd-诊断和研究) |
| review 橡皮图章：结论只有 LGTM | 要求双轴分开，每条 finding 必须指向行为、证据和最小修复 | [第 6 章](#第-6-章-代码不会自己变好-领域语言-深模块与双轴评审) / [关卡 5](#practice-05-two-axis-review) |
| spec 前提被证伪 | 退回 `to-spec` 修订规格，不带着错误前提继续实现 | [第 4 章](#第-4-章-从对话到交付-规格-拆票-实现和评审) |
| 上下文污染：Agent 引用早已作废的决定 | 换会话，用 `handoff` 只带活着的线索 | [第 7 章](#第-7-章-跨人-跨会话与人工步骤) / [关卡 6](#practice-06-handoff-rehearsal) |
| 工具能力缺失：没有子 Agent、浏览器或 tracker | 走降级路径，保留方法核心，不伪造通过 | [第 9 章](#第-9-章-把-skills-引入自己的仓库) |

## 资料与诚实声明

### 上游一手材料

- [仓库 README（固定提交）](https://github.com/mattpocock/skills/blob/49dd158d1076134a641b33efb035946536778336/README.md)
- [engineering 目录](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336/skills/engineering)
- [productivity 目录](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336/skills/productivity)
- [misc 目录](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336/skills/misc)
- [in-progress 目录](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336/skills/in-progress)
- [AI Skills for Real Engineers](https://www.aihero.dev/skills)
- [The /grilling Skill](https://www.aihero.dev/skills-grilling)
- [The /implement Skill](https://www.aihero.dev/skills-implement)
- [The /prototype Skill](https://www.aihero.dev/skills-prototype)
- [The /wizard Skill](https://www.aihero.dev/skills-wizard)
- [Skills Changelog: /handoff, /prototype, /review and /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)

官网页面以 2026-09-01 的检索结果为准，只补充作者当时的公开表述，不用来改写本版的本地固定仓库基线。完整的 15 条证据记录位于 `research/matt-pocock-public-statements.md`。

### 业界方法来源

上游 README 和 Skills 明确借鉴或呼应了这些软件工程传统：

- David Thomas 与 Andrew Hunt，《The Pragmatic Programmer》：反馈速度、刻意小步与需求澄清；
- Eric Evans，《Domain-Driven Design》：ubiquitous language；
- John Ousterhout，《A Philosophy of Software Design》：深模块与小接口；
- Martin Fowler 的代码坏味道：Standards review 基线；
- Kent Beck 与极限编程传统：持续设计与测试反馈。

这些书和方法提供背景，不替代上游固定提交里的实际 Skill 文本。遇到行为冲突时，本书以固定提交为事实基准。

### 已知限制

- 本书没有声称 38 个 Skills 都适合每个 Agent 运行时。
- 上游仓库会变化，尤其是 `in-progress`。
- 教学案例不证明任何私有产品已经实现或通过测试。
- HTML 是由本书 Markdown 生成的阅读版，不是独立事实源。
- 没有当前代码与当前命令输出时，不应把流程描述写成工程完成证明。

最后只留一个记忆点：

**AI 协作开发的速度上限，不是生成代码的速度，而是获得可靠反馈的速度。Skills 的价值，是让你在正确的时刻建立正确的反馈环。**
