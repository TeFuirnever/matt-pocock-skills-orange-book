## 第 14 章 · 附录：37 个 Skills 完整索引

下面的列表以固定提交为准。稳定分类来自仓库目录；一句话说明综合了上游 README、各 Skill frontmatter 与正文。

### A. Engineering：18 个

| Skill | 调用倾向 | 解决的问题 |
|---|---|---|
| `ask-matt` | 用户 | 为当前情境选择 Skill 或流程 |
| `grill-with-docs` | 用户 | 在真实仓库里问清需求，同时更新领域词汇与 ADR |
| `triage` | 用户 | 让 issue 和外部 PR 经过状态化分诊、核验与简报 |
| `improve-codebase-architecture` | 用户 | 调查模块加深机会，生成 HTML 候选报告，再逐项讨论 |
| `setup-matt-pocock-skills` | 用户 | 配置 tracker、triage labels 与领域文档布局 |
| `to-spec` | 用户 | 把已完成的对话决策整理成规格并发布到 tracker |
| `to-tickets` | 用户 | 把计划拆成声明阻塞关系的 tracer-bullet tickets |
| `implement` | 用户 | 按 spec/tickets 实现，在约定 seam 做 TDD 并完成 review |
| `wayfinder` | 用户 | 用决策 tickets 管理一个会话装不下的大型工作 |
| `prototype` | 模型 | 用可抛弃代码回答状态模型或 UI 结构问题 |
| `diagnosing-bugs` | 模型 | 从 red-capable 反馈环开始诊断疑难 bug 与性能退化 |
| `research` | 模型 | 用高可信一手来源调查外部事实并形成引用文档 |
| `tdd` | 模型 | 在预先同意的公共 seam 做一行为一循环的红绿开发 |
| `domain-modeling` | 模型 | 打磨共同语言，及时更新 `CONTEXT.md`，谨慎记录 ADR |
| `codebase-design` | 模型 | 提供深模块、接口、seam、adapter 等共享设计词汇 |
| `code-review` | 模型 | 并行或隔离执行 Standards 与 Spec 两轴评审 |
| `resolving-merge-conflicts` | 模型 | 按两侧一手意图逐 hunk 解决 merge/rebase 冲突 |
| `wizard` | 模型 | 为只有人能完成的控制台、凭据和迁移步骤生成安全向导 |

### B. Productivity：7 个

| Skill | 调用倾向 | 解决的问题 |
|---|---|---|
| `grill-me` | 用户 | 不依赖仓库地把模糊想法问清楚 |
| `handoff` | 用户 | 把当前对话压缩为新 Agent 可继续的临时交接文档 |
| `teach` | 用户 | 在持久工作区里跨会话教学，依赖可信资料与学习记录 |
| `to-questionnaire` | 用户 | 把别人掌握的未知信息整理成异步问卷 |
| `wait-what` | 用户 | 上一条消息没落地时，用缺失上下文和直白语言重讲 |
| `grilling` | 模型 | 用决策树和 frontier 组织多轮追问 |
| `writing-for-agents` | 模型 | 设计 context pointer、降低两类负担并删除 no-op 指令 |

### C. Misc：4 个

| Skill | 适用条件 | 注意事项 |
|---|---|---|
| `git-guardrails-claude-code` | 需要用 Claude Code hooks 阻止危险 Git 命令 | 工具特定，先确认运行时 |
| `migrate-to-shoehorn` | 测试项目使用 `@total-typescript/shoehorn` | 作者技术栈特定，不是通用规则 |
| `scaffold-exercises` | 需要课程章节、题目、答案和讲解目录 | 面向教学内容生产 |
| `setup-pre-commit` | 需要 Husky、lint-staged、Prettier、类型检查和测试 | 先匹配现有包管理器与 CI |

### D. In-progress：8 个

| Skill | 当前方向 | 稳定性提醒 |
|---|---|---|
| `claude-handoff` | 用后台 Claude Agent 立即接手当前对话 | 工具特定，行为可能变化 |
| `implement-spec` | 实现一份规格 | 与稳定 `implement` 重叠，先看当前文本 |
| `loop-me` | 多会话拷问工作流规格 | 实验中 |
| `retro` | 对一次编码会话做 retrospective | 实验中 |
| `setup-ts-deep-modules` | 用 dependency-cruiser 约束 TypeScript 深模块 | 工具链侵入较大，先原型验证 |
| `writing-beats` | 把素材组织成逐步展开的叙事 beats | 写作实验 |
| `writing-fragments` | 挖掘未结构化写作碎片 | 写作实验 |
| `writing-shape` | 逐段把原始材料塑造成文章 | 写作实验 |

### E. 一页选型表

| 你现在卡在哪里 | 先用什么 |
|---|---|
| 不知道选哪个 Skill | `ask-matt` |
| 想法模糊，答案在自己脑中 | `grill-me` |
| 想法模糊，需要结合仓库 | `grill-with-docs` |
| 一个会话装不下 | `wayfinder` |
| 决策已完成，需要规格 | `to-spec` |
| 规格需要拆成可交付任务 | `to-tickets` |
| 有批准的 ticket，需要施工 | `implement` |
| UI/状态模型必须看见才能决定 | `prototype` |
| 新功能或 bug 要测试先行 | `tdd` |
| bug 难复现或跨多层 | `diagnosing-bugs` |
| 决定依赖外部技术事实 | `research` |
| 术语混乱 | `domain-modeling` |
| 模块接口浅、复杂度泄漏 | `codebase-design` |
| 想找真实架构改进候选 | `improve-codebase-architecture` |
| 要评审实现 | `code-review` |
| merge/rebase 冲突 | `resolving-merge-conflicts` |
| 只有人能完成外部步骤 | `wizard` |
| 工作要跨 Agent/工具旅行 | `handoff` |
| 决定在另一位专家脑中 | `to-questionnaire` |
| 上一条解释没听懂 | `wait-what` |
| 要写 Skill 或 Agent 指导文档 | `writing-for-agents` |

---

## 资料与诚实声明

### 上游一手材料

- [仓库 README（固定提交）](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/README.md)
- [engineering 目录](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering)
- [productivity 目录](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity)
- [misc 目录](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/misc)
- [in-progress 目录](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress)
- [AI Skills for Real Engineers](https://www.aihero.dev/skills)
- [The /grilling Skill](https://www.aihero.dev/skills-grilling)
- [The /implement Skill](https://www.aihero.dev/skills-implement)
- [The /prototype Skill](https://www.aihero.dev/skills-prototype)
- [The /wizard Skill](https://www.aihero.dev/skills-wizard)
- [Skills Changelog: /handoff, /prototype, /review and /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)

官网页面以 2026-09-01 的检索结果为准，只补充作者当时的公开表述，不用来改写 2026-08-24 的固定仓库基线。完整的 15 条证据记录位于 `research/matt-pocock-public-statements.md`。

### 业界方法来源

上游 README 和 Skills 明确借鉴或呼应了这些软件工程传统：

- David Thomas 与 Andrew Hunt，《The Pragmatic Programmer》：反馈速度、刻意小步与需求澄清；
- Eric Evans，《Domain-Driven Design》：ubiquitous language；
- John Ousterhout，《A Philosophy of Software Design》：深模块与小接口；
- Martin Fowler 的代码坏味道：Standards review 基线；
- Kent Beck 与极限编程传统：持续设计与测试反馈。

这些书和方法提供背景，不替代上游固定提交里的实际 Skill 文本。遇到行为冲突时，本书以固定提交为事实基准。

### 已知限制

- 本书没有声称 37 个 Skills 都适合每个 Agent 运行时。
- 上游仓库会变化，尤其是 `in-progress`。
- 教学案例不证明任何私有产品已经实现或通过测试。
- 脱敏会话模式不是原始转录，不能用于推断私有项目身份、状态或成功率。
- HTML 是由本书 Markdown 生成的阅读版，不是独立事实源。
- 没有当前代码与当前命令输出时，不应把流程描述写成工程完成证明。

最后只留一个记忆点：

**AI 协作开发的速度上限，不是生成代码的速度，而是获得可靠反馈的速度。Skills 的价值，是让你在正确的时刻建立正确的反馈环。**
