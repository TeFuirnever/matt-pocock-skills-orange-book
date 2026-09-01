## 第 2 章 · 先看懂仓库，再安装

### 2.1 四个目录，不是同一种稳定性

固定提交中共有 37 个 `SKILL.md`：

| 目录 | 数量 | 定位 | 使用态度 |
|---|---:|---|---|
| `engineering` | 18 | 日常软件工程主线 | 重点学习 |
| `productivity` | 7 | 通用思考、交接、教学与文档 | 按场景组合 |
| `misc` | 4 | 作者特定工具与仓库设置 | 先判断是否匹配本项目 |
| `in-progress` | 8 | 正在演化的实验能力 | 只做试验，不当稳定接口 |

一个容易踩的坑，是看到目录里存在 Skill，就默认它已经稳定。`in-progress` 的名字、行为和存在性都可能变化，书中会完整列出，但不会把它们塞进新人主链。

![阿舟图解：29 个稳定 Skill 与 8 个 in-progress Skill](assets/azhou/stable-and-beta.png)

### 2.2 两种安装哲学

上游提供两条主要路径：

#### Claude Code 插件

```bash
claude plugins install mattpocock-skills
```

它安装整个托管、只读的集合。优点是更新方便，代价是你订阅的是上游版本，不是项目自己的改编版。

#### skills.sh 安装

```bash
npx skills@latest add mattpocock/skills
```

它把选中的 Skill 复制到项目里。优点是可以修改、审查和版本化，代价是更新需要自己管理。

不要同时走两条路径。重复安装会让同名 Skill 出现两份，触发和维护都会变得模糊。

### 2.3 第一次必须做 setup

安装后，优先运行：

```text
/setup-matt-pocock-skills
```

它会配置三件事：

1. issue tracker 在哪里；
2. triage 使用哪些标签；
3. 领域文档放在哪里。

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
| 大型工作 | `wayfinder` → 决策 tickets → `to-spec` → `to-tickets` → 多次 `implement` | 试图把所有上下文塞进一个会话 |

### 2.6 本章验收

- 能说出四个目录的稳定性差异。
- 知道 Claude Code 插件与 skills.sh 不应重复安装。
- 能解释 setup 为什么是仓库级配置，不是形式步骤。
- 遇到选型困难时先用 `ask-matt`，而不是盲猜。

---
