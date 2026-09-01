## 第 12 章 · Matt Pocock 本人怎样讲 Skills

前 11 章主要解释固定提交中的 37 个 Skills。本章换一个视角：只看 Matt Pocock 自己的公开仓库和 AI Hero 官网，学习他如何解释 Skills、上下文、反馈环和交接。

### 12.1 先分清两条时间线

| 时间线 | 本书怎样使用 | 不得怎样使用 |
|---|---|---|
| 2026-08-24 的固定提交 | 证明 37 个 Skills 当时的数量、分类、文件和明文规则 | 不代表后续仓库仍然不变 |
| 2026-09-01 检索到的官网页面 | 补充作者当时的公开教学表述 | 不反向改写固定提交，也不代表作者为本书背书 |

这一区分很重要。「作者今天如何讲」和「固定版本当时包含什么」是两个问题。把它们混在一起，就会让版本化教材失去可核验性。

### 12.2 十条作者公开表述

#### 12.2.1 Skill 是过程级约束，不是平台魔法

在 [AI Skills for Real Engineers](https://www.aihero.dev/skills) 中，Matt 把 Skills 描述为交给编码 Agent 的小型、聚焦指令，目的是让 Agent 按资深工程师式的工作方法执行。

同一页还强调 Skills 可以组成链路：前一个的产出会成为后一个的输入。

对小白的翻译：一个 Skill 不需要拥有整个项目。它只需要产出下一步能信任的东西，例如决策清单、spec、ticket、红色测试或 review findings。

#### 12.2.2 跨会话不会凭空保留项目记忆

在 [My Claude Code Cohort - A Teaser](https://www.aihero.dev/my-claude-code-cohort-a-teaser) 中，Matt 强调会话之间需要额外的引导机制。这不是对每个厂商记忆功能的技术规格，而是一条工程建议：不要把依赖关系、业务词义和已定决策只留在聊天里。

行动：用 `AGENTS.md`、领域文档、spec、ticket 和 handoff 把重要上下文移到可版本化介质。

#### 12.2.3 大任务要围绕上下文边界分阶段

同一页建议将巨大功能拆成多个阶段。关键不是预测一个通用 token 阈值，而是让每个阶段都有：

1. 明确的决策边界；
2. 可带走的上下文产物；
3. 可独立验证的完成条件；
4. 下一阶段可以拒绝的错误输入。

#### 12.2.4 反馈环是质量机制，不是收尾仪式

Matt 在 cohort 页面上把 feedback loops 放在核心位置；在 [Day 4: Feedback Loops](https://www.aihero.dev/workshops/day-4-feedback-loops-fcqu2) 中又把 do-work Skills、pre-commit hooks 和 red-green-refactor TDD 放在同一套训练里。

对小白的翻译：Skill 告诉 Agent 应该怎样做，hook 自动拦下明确错误，TDD 让每个小行为都可观察。三者可组合，但没有任何一个能单独保证正确。

#### 12.2.5 环境能回答的事实，不要再去问人

在 [The /grilling Skill](https://www.aihero.dev/skills-grilling) 中，Matt 把问题分成两类：代码、文档、工具能查到的事实，应由 Skill 自己调查；只有产品取舍、风险偏好和业务决策才应等人回答。

实战检查：每当 Agent 问一个问题，先问「这个答案在环境里吗？」如果在，要求它带证据回来，而不是把调查推给用户。

#### 12.2.6 问题问完不等于形成共识

`grilling` 页面还把「用户确认共同理解」作为从讨论进入行动的门槛。这条规则针对的是一种常见假完成：Agent 已经没有新问题，但人对范围、取舍和验收仍没有同一张图。

可操作门槛：行动前回显「已定决策 / 未决问题 / 明确不做 / 验收方式」，再由人确认。

#### 12.2.7 上下文快用尽时，主动交接而不是硬塞

在 [Skills Changelog: /handoff, /prototype, /review and /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing) 中，Matt 把 handoff 作为上下文耗尽时的主动策略。这里的「full context」应理解为交接的目标，不是对零遗漏的保证。

一份可用 handoff 至少应当包含：当前目标、已确认决策、已改文件、当前验证、未决问题、下一个可执行动作。

#### 12.2.8 `implement` 只消费已稳定的计划

在 [The /implement Skill](https://www.aihero.dev/skills-implement) 中，Matt 用一句很强的边界描述这个 Skill：

> 「It never reopens the plan.」

这不是说实现中发现错误也不能停。正确做法是：发现 spec 前提错误时，把问题退回上游决策阶段；不在实现中悄悄改目标。

#### 12.2.9 原型只回答一个问题

在 [The /prototype Skill](https://www.aihero.dev/skills-prototype) 中，原型被定义为可丢弃代码，用来回答一个设计问题。重点是问题优先、一次会话完成、决策后删除代码但保留结论。

如果原型开始承担迁移、安全、完整错误处理和产品级样式，它就很可能已经变成了没有 spec 的实现。

#### 12.2.10 人工外部步骤应该被编成可恢复向导

在 [The /wizard Skill](https://www.aihero.dev/skills-wizard) 中，外部控制台、凭据录入等人工操作被转化为交互式 Bash 向导。教学重点不是「自动化一切」，而是让不能自动化的部分也拥有顺序、安全输入、恢复点和最终摘要。

### 12.3 固定提交里的五个可观察事实

#### 12.3.1 仓库定位是真实工程，不是 vibe coding

固定版 [README](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/README.md) 把这些 Skills 描述为作者日常工程使用的做法，并强调小、易改、可组合。这能支持「把 Skill 当成可审查流程部件」，但不能证明任意组合都经过验证。

#### 12.3.2 TDD 明文要求先红后绿

固定版 [`tdd/SKILL.md`](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/tdd/SKILL.md) 要求先写失败测试，再只写让它通过的代码；而且测试 seam 需要前置确认。因此，「先代码后补测试」不是这个 Skill 的等价实现。

#### 12.3.3 context pointer 的文案决定加载时机

固定版 [`writing-for-agents/SKILL.md`](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/writing-for-agents/SKILL.md) 指出，不是「有一个目标文件」就能保证 Agent 读取；指针文案需要说清什么情况下应该去读。

检查你的项目规则：把「详见 `docs/testing.md`」改成「修改会话状态或重试逻辑前，先读 `docs/testing.md` 中的状态转移测试约束」。

#### 12.3.4 `to-spec` 不再做现场访谈

固定版 [`to-spec/SKILL.md`](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/to-spec/SKILL.md) 明文要求综合已知信息，不重开访谈。如果缺失业务决策，应回到 `grill-*` 或研究阶段，不应把假设写成 spec 事实。

#### 12.3.5 retrospective 也要检查 Agent 能否获得信息

固定基线提交新增了「Information access」复盘类别。这给了一个很实用的诊断角度：Agent 做错时，不要只问模型或 prompt 是否不够强，还要检查它是否根本看不到日志、代码关系、运行状态或官方资料。

### 12.4 把作者表述转成一套工程自检

| 检查点 | 一个合格答案的样子 |
|---|---|
| 这个 Skill 有单一职责吗 | 它只负责形成 spec，不同时实现和发布 |
| 上一步的输出能成为下一步的输入吗 | ticket 含完整验收与测试 seam，新会话无需读原聊天 |
| 可查事实是否由 Agent 自己查 | 它从仓库确认测试框架，只向人询问产品取舍 |
| 实现前是否有共同理解 | 范围、不做什么、验收命令已被回显并确认 |
| 反馈是否可重复运行 | 同一条命令能在修复前捕获问题，修复后变绿 |
| 上下文快耗尽时是否有交接 | handoff 包含当前证据与下一个动作，不依赖「去看上面聊天」 |
| 工具不可用时是否保留核心方法 | 无法并行 review 时仍分开 Standards 与 Spec 两轴串行检查 |

### 12.5 本章验收

- 能区分官网当前表述与固定提交事实。
- 能用「输入→产物→下一步」而不是「更强 prompt」解释 Skill 组合。
- 能说清事实调查、人类决策、实现和验证各自的边界。
- 不把作者的公开材料写成对本书的认可或效果保证。

---
