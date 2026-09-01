## 第 1 章 · Skill 到底是什么

### 1.1 Skill 不是更长的 Prompt

普通 Prompt 往往只描述一次任务：改一个页面、修一个 bug、写一段测试。

Skill 描述的是可重复使用的工作方法：

- 什么情况下应该触发；
- 开始前需要读什么；
- 按什么顺序行动；
- 哪些步骤不能跳过；
- 完成时必须留下什么证据；
- 哪些情况应该停下来，把决定交还给人。

可以把它理解成 Agent 的标准作业程序，但它比传统 SOP 更贴近上下文：Agent 会结合当前仓库、对话和工具，把方法落到具体任务上。

### 1.2 一个最小 Skill 的四个问题

无论 Skill 文件多长，都应该回答四个问题：

| 问题 | 例子 |
|---|---|
| 什么时候触发 | 用户报告难复现的性能退化 |
| 第一步做什么 | 先建立能捕获该症状的红色反馈环 |
| 中间怎样约束 | 每次只改变一个变量，假设必须可证伪 |
| 怎样才算完成 | 回归测试变绿，临时埋点被清理，当前命令重新运行 |

如果一份所谓 Skill 只写了角色、语气和宏大目标，却没有可判断的完成条件，它更接近人格 Prompt，不是可靠的工程能力。

![一个 Skill 的五层结构](assets/diagrams/skill-anatomy.png)

对刚接触 Skill 的同学，更实用的读法是把一个 `SKILL.md` 拆成五层：

1. **触发层**：frontmatter 里的 `description` 以及正文开头，决定它在什么症状下应该被加载。
2. **输入层**：开始前必须读取的文件、当前对话、issue、spec、测试命令或外部资料。
3. **步骤层**：Agent 必须按什么顺序做事，哪些步骤可以并行，哪些步骤必须等待前置决定。
4. **边界层**：禁止事项、权限边界、隐私要求、工具缺失时的降级方式。
5. **证据层**：什么文件、命令结果、决策或回执出现后，才能说这次运行结束。

一个 Skill 文件夹里还可能有 `references/`、`scripts/`、模板或示例。它们不是装饰。`SKILL.md` 应该保留主路径，把只有某个分支才需要的材料放到引用文件里。这叫渐进披露：先让 Agent 看见“何时需要什么”，再按条件读取细节，避免每次对话都背着整个手册。

#### frontmatter 小白词典

| 字段 | 可以怎么理解 | 新手要检查什么 |
|---|---|---|
| `name` | Skill 的稳定名字 | 文件夹名、调用名和文档是否一致 |
| `description` | 路由标签 | 是否同时写清能力与触发场景，而不是只写“很有用” |
| `argument-hint` | 用户输入提示 | 是否告诉用户需要补什么上下文 |
| `disable-model-invocation: true` | 只允许用户显式发起 | 是否适合会改变流程、创建大量产物或需要用户持续参与的能力 |

`disable-model-invocation` 不是能力等级。它只是控制“谁有权启动”。例如 `grill-me` 会进入多轮访谈，应该由用户明确发起；`tdd` 是实现内部的工程纪律，可以由 Agent 在合适场景主动加载。

### 1.3 小而可组合，比接管全流程更重要

上游 README 明确反对让一套方法论完全接管流程。原因很现实：流程越大，内部错误越难定位，使用者也越难保留控制权。

这套仓库选择了另一条路：

- `grill-me` 只负责把想法问清楚；
- `to-spec` 只负责把已经确定的对话写成规格；
- `to-tickets` 只负责把规格拆成有阻塞关系的垂直切片；
- `implement` 只负责按已经批准的规格施工；
- `code-review` 只负责按 Standards 与 Spec 两条轴验收。

每个 Skill 都有边界。边界清楚以后，组合才不会变成一团自动化黑箱。

### 1.4 两种调用方式

这个仓库按一个关键轴区分 Skills：谁可以调用它。

| 类型 | 谁触发 | 典型职责 | 例子 |
|---|---|---|---|
| User-invoked | 用户显式输入 | 编排一次完整工作阶段 | `grill-me`、`to-spec`、`implement` |
| Model-invoked | 用户或 Agent 按任务匹配 | 提供可复用的工程纪律 | `tdd`、`diagnosing-bugs`、`codebase-design` |

这条区分解决了一个常见问题：如果 Agent 可以自动启动任何大型流程，它很容易在用户只想问一句话时开一场漫长仪式。让编排型 Skill 由用户显式触发，能保留控制权；把 TDD、诊断、领域建模这类纪律交给模型按需调用，又能减少重复指挥。

### 1.5 从失败风险反推 Skill

![Matt Pocock Skills 新手地图](assets/diagrams/skills-failure-mode-map.png)

不要先背 37 个名字。先问这次最可能怎样失败。

| 失败风险 | 优先考虑 |
|---|---|
| 做出的东西不是用户想要的 | `ask-matt`、`grill-me`、`grill-with-docs` |
| 团队和 Agent 对词汇理解不同 | `domain-modeling`、`writing-for-agents` |
| 代码看似完成但无法稳定验证 | `tdd`、`diagnosing-bugs` |
| 功能越做越难改 | `codebase-design`、`improve-codebase-architecture` |
| 代码规范但做错了需求 | `code-review` 的 Spec 轴 |
| 需求明确但跨会话失真 | `to-spec`、`to-tickets`、`handoff` |

![阿舟图解：从失败风险选择 Skill](assets/azhou/skill-selection.png)

### 1.6 本章验收

- 能用自己的话解释 Skill 与一次性 Prompt 的区别。
- 能区分 user-invoked 与 model-invoked。
- 面对任务时先判断失败风险，而不是先选最强、最长的流程。

---
