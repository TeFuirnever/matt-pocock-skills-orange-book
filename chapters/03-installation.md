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

### 2.6 常见失败

- 插件与手动复制同时安装：同名 Skill 出现两份且行为漂移，同一个 Agent 只选一种方式。
- 跳过 setup 直接进入实现：`to-spec` 和 `to-tickets` 不知道 tracker 在哪里，产物发不出去。
- 把 `in-progress` 当稳定接口写进团队流程：实验目录的名字、行为和存在性都可能变化。
- 跟随上游自动更新却不核对安装文本：与本版固定源不一致时，以固定提交为准复现实验。

### 2.7 本章验收

- 能说出四个目录的稳定性差异。
- 知道 Claude Code 插件与 skills.sh 不应重复安装。
- 能解释 setup 为什么是仓库级配置，不是形式步骤。
- 遇到选型困难时先用 `ask-matt`，而不是盲猜。

---
