## 第 2 章 · 先看懂仓库，再安装

### 2.1 四个目录，不是同一种稳定性

固定提交中共有 38 个 `SKILL.md`：

| 目录 | 数量 | 定位 | 使用态度 |
|---|---:|---|---|
| `engineering` | 20 | 日常软件工程主线 | 重点学习 |
| `productivity` | 7 | 通用思考、交接、教学与文档 | 按场景组合 |
| `misc` | 4 | 作者特定工具与仓库设置 | 先判断是否匹配本项目 |
| `in-progress` | 7 | 正在演化的实验能力 | 只做试验，不当稳定接口 |

一个容易踩的坑，是看到目录里存在 Skill，就默认它已经稳定。`in-progress` 的名字、行为和存在性都可能变化，书中会完整列出，但不会把它们塞进新人主链。本版为 31 个非实验目录 Skill 与 7 个实验 Skill；插件只包含 engineering 与 productivity 共 27 个，misc 的 4 个不随插件分发。更早阅读版使用过的旧数字教学图已移入[附录 H](#h-版本沿革图-历史教学图)。

### 2.2 两种安装哲学

上游提供两条主要路径：

#### 自动更新的插件

固定版本 README 首推插件安装。Claude Code 使用官方 marketplace：

```bash
claude plugin install mattpocock-skills@claude-plugins-official
```

Codex 使用上游自带 marketplace，启动时更新：

```bash
codex plugin marketplace add mattpocock/skills
codex plugin add mattpocock-skills@mattpocock
```

GitHub Copilot CLI 的安装入口为：

```bash
copilot plugin marketplace add mattpocock/skills
copilot plugin install mattpocock-skills@mattpocock
```

Copilot 自动更新还需要 README 给出的 `extraKnownMarketplaces` 配置；VS Code 使用 **Chat: Install Plugin From Source** 输入仓库 URL。不同客户端的自动更新时机并不相同，执行时以本版固定 README 与客户端能力为准。

#### 可编辑文件与手动更新

```bash
npx skills@latest add mattpocock/skills
npx skills@latest update
```

首次选择时包含 `setup-matt-pocock-skills`；新增 Skill 需要重新运行 `add`。这种方式把可编辑文件放进项目，需要自行管理更新。Gemini CLI 则分别安装两个主要目录，并重跑命令更新：

```bash
gemini skills install https://github.com/mattpocock/skills.git --path skills/engineering
gemini skills install https://github.com/mattpocock/skills.git --path skills/productivity
```

同一个 Agent 选择插件或复制文件中的一种，避免同名 Skill 重复。上述安装入口跟随上游，不会自动锁定本书提交；要复现实验，应核对实际安装文本与本版固定源。

#### 装不上怎么办

| 症状 | 处置 |
|---|---|
| marketplace 拉取失败 | 改用手动安装（`npx skills@latest add`）；网络问题不要反复重试同一命令 |
| 安装后 Skill 不出现 | 核对安装目录与客户端读取路径是否一致；插件与手动复制只保留一种 |
| 行为与本书描述不一致 | 用本版固定提交的 README 对照实际安装文本；上游更新不会自动锁定本书基线 |
| 同名 Skill 冲突 | 删除其中一份，重启客户端后重试 |
| 客户端提示版本或能力不支持 | 查第 9 章 9.5 的降级路径，保留方法核心而不是放弃流程 |

### 2.3 第一次必须做 setup

安装后，优先运行：

```text
/setup-matt-pocock-skills
```

它会配置三件事（领域词汇约定已改为 `GLOSSARY.md`，多上下文为 `GLOSSARY-MAP.md`）：

1. issue tracker 在哪里；
2. triage 使用哪些标签；
3. 领域文档放在哪里。

安装了 `triage` 时才配置分诊标签；在 GitHub/GitLab 上还会创建缺失的已配置标签。默认单领域布局无需额外询问，多领域信号存在时再确认布局。

这一步的价值不在生成几个文件，而在把 Skill 与仓库现实连接起来。没有 tracker 配置，`to-spec` 和 `to-tickets` 不知道往哪里发布；没有领域文档位置，`domain-modeling` 和下游任务就没有共同语言。

### 2.4 `ask-matt` 是路由器

刚开始不需要记住全部 Skill。可以把任务原样交给 `ask-matt`：

```text
/ask-matt

我要给桌面客户端新增一个 Provider 设置页。
产品方向大致确定，但错误状态、凭据保存方式和测试边界还没想清楚。
这项工作可能跨多个会话，我应该走哪条流程？
```

一个合理的路由不是直接回答「用 implement」，而是根据未决问题推荐：先 `grill-with-docs`，必要时做 `prototype`，决策稳定后 `to-spec`，再根据规模决定是否 `to-tickets`。

![选 Skill 的四问决策树](assets/diagrams/skill-router-decision-tree.png)

### 2.5 三档使用强度

| 任务规模 | 推荐链路 | 不该做的事 |
|---|---|---|
| 小改动 | 直接实现，按需调用 `tdd` 或 `code-review` | 为改一个字写十页规格 |
| 中等功能 | `grill-with-docs` → `to-spec` → `implement` | 边写边重新设计 |
| 大型工作 | `wayfinder` → 决策 tickets → `to-spec` → `to-tickets` → `implement-spec`（依赖图并行交付） | 试图把所有上下文塞进一个会话 |

按起点而不是规模看，入口的选择是另一张表：

| 起点 | 主链 | 什么时候换轨 |
|---|---|---|
| 新功能，一个会话装得下 | `grill-with-docs` → `implement` → `pr` → `retro` | 有设计问题谈不拢，中途迂回 `prototype` |
| 新功能，跨多个会话 | 同一窗口内 `grill-with-docs` → `to-spec` → `to-tickets`，再逐票新会话 `implement`；或交给 `implement-spec` 并行 | 规格前提被证伪，退回 `to-spec` 修订 |
| 设计问题需要能跑的答案 | `handoff` 出 → `prototype` → `handoff` 带回结论 | 结论一出就回到原链路，原型不进主干 |
| 疑难 bug 或性能回归 | `diagnosing-bugs` 先造变红的反馈环 → 同会话 `retro` | 找不到可写回归测试的 seam，转 `improve-codebase-architecture` |
| 别人提的 issue 堆积 | `triage` 推出 agent-ready 的 brief → `implement` 拾取 | 自己拆出的票已可直接执行，不要再分诊 |
| 路径被雾笼罩的大工程 | `wayfinder` 绘决策地图 → 清晰后汇入 `to-spec` | 地图一清就交付，不要拿地图直接施工 |

每条链路的操作细节见第 3–7 章；一页式选型表见附录 E。

### 2.6 仓库怎样管住自己：四件套同步与收录门槛

目录结构只是表象。这个仓库更值得学的一层，是它怎样防止自己在演化中腐烂：38 个 Skill 的清单、路由、文档与分发，被几条硬性不变量锁在一起。

promoted 目录（`engineering` 与 `productivity`）里的每个 Skill 必须同时出现在四处：

1. 顶层 `README.md` 的条目；
2. `.claude-plugin/plugin.json` 的 `skills` 数组——它决定插件实际分发哪 27 个 Skill；
3. 对应的 docs 页（发布为 `aihero.dev/skills-<名称>`）；
4. `ask-matt` 的路由地图。

少一处，上游称之为「说谎的路由器」。`misc`、`in-progress`、`deprecated` 则一律不许出现在这四处的任何一处：曝光度本身就是稳定性的声明。

反向的纪律同样写死。仓库根部的 `SCOPE.md` 给所有反馈设了两道门槛：一条 issue 想留在打开状态，必须描述一次真实会话中观察到的失败（跑了什么、Skill 做了什么、期待什么），并且不撞历史否决、不是个人工作流微调；「这样会更好」式的假设改进不合格，+1 也不算数。写法与结构纪律（包括全仓库散文禁用 em-dash、每个 Skill 非 user-invoked 即 model-invoked 的二元划分）集中在上游自己的 `.agents/` 目录，其中两份 ADR 分别记录了 setup 指针分级与插件分发的决策理由。

把这套仓库当方法论学习时，治理层是免费的副产品：四件套同步是「清单一多就腐烂」的解法，收录门槛是「反馈越多越噪声」的解法。逐条出处见 `research/governance-and-boundaries-2026-10-15.md`。

### 2.7 这套仓库不做什么：否决档案与结构性空白

判断一套方法论的边界，比记住它能做什么更重要。上游把拒绝过的方向写成档案，收在 `.out-of-scope/` 里，固定提交中共有九份：

| 档案 | 拒绝的方向 | 一句话理由 |
|---|---|---|
| `new-skills.md` | 一切新 Skill 提案（含带现成分支的） | 能由现有 Skill 组合出来的行为，不立新 Skill |
| `mainstream-issue-trackers-only.md` | Jira、Linear 等 tracker 的一等支持 | 每个后端都是永久维护面；流行度不改变这一点 |
| `native-question-tool.md` | 访谈改用各家原生提问 UI | 结构化选择器会把开放访谈推向选择题 |
| `question-limits.md` | 给访谈设问题数量上限 | 有的计划需要三个问题，有的需要五十个 |
| `subagent-recursion.md` | Skill 内嵌子 Agent 递归守卫 | 阻止无限循环是 harness 的责任 |
| `harness-name-collisions.md` | 为避让同名内置命令而改名 | 同名如何解析是 harness 的行为 |
| `setup-skill-verify-mode.md` | setup 的独立验证模式 | 直接让 prompt 驱动的 setup 验证现状即可 |
| `lazy-load-writing-for-agents.md` | `retro` 延迟加载写作规范 | 那是它评审时就要用的标尺 |
| `frozen-misc-skills.md` | `misc/` 的一切 issue 与 PR | 作者不再日用，无法判断修复对错；可自行复制修改 |

由这些否决和 38 个 Skill 的覆盖面，可以反推出几处结构性空白（这是本书的归纳，不是上游的路线图）：

- 没有部署、运维、监控类 Skill；唯一沾边的 `wizard` 方向相反——把只能人做的步骤脚本化，即运维被刻意划回给人。
- `code-review` 固定为 Standards 与 Spec 两轴，没有安全评审轴；预实现安全评审的提案已被政策关闭。
- 没有合并冲突专用 Skill：旧的 `resolving-merge-conflicts` 在上游 1.3.0 被删除且无替代，理由是 Agent 不需要专用流程也能走完冲突。
- 非主流 tracker 只有散文式桥接，`to-tickets` 的原生阻塞链接等深度集成不可用。
- 生态是封闭的：未覆盖领域的官方答案不是路线图，而是用 skills.sh 复制一份，改成自己的。

这些空白与第 9 章的本地化是一体两面：知道上游不做什么，才知道引入时要自己补什么。

### 2.8 常见失败

- 插件与手动复制同时安装：同名 Skill 出现两份且行为漂移，同一个 Agent 只选一种方式。
- 跳过 setup 直接进入实现：`to-spec` 和 `to-tickets` 不知道 tracker 在哪里，产物发不出去。
- 把 `in-progress` 当稳定接口写进团队流程：实验目录的名字、行为和存在性都可能变化。
- 跟随上游自动更新却不核对安装文本：与本版固定源不一致时，以固定提交为准复现实验。
- 把仓库当下载站，从不读治理层：不知道 `SCOPE.md` 的收录门槛，就会提交注定被拒的反馈，或苦等已被否决的方向。
- 期待官方补齐部署、安全评审或 Jira 支持：这些方向已被明确否决，正确动作是复制后自行扩展。

### 2.9 本章验收

- 能说出四个目录的稳定性差异。
- 知道 Claude Code 插件与 skills.sh 不应重复安装。
- 能解释 setup 为什么是仓库级配置，不是形式步骤。
- 遇到选型困难时先用 `ask-matt`，而不是盲猜。
- 能说出 promoted Skill 必须同步出现的四个位置。
- 能举出两个被上游明确否决的方向，并说明理由。
- 知道未覆盖领域的官方答案是自行分叉，而不是等待路线图。

---
