## 第 9 章 · 把 Skills 引入自己的仓库

![阿舟图解：公开仓库为什么要从干净历史开始](assets/azhou/clean-public-history.png)

### 9.1 不要一次复制全部 38 个

先从团队真正反复遇到的失败开始。一个适合 UI 客户端团队的最小集合通常是：

- `ask-matt`；
- `grill-with-docs`；
- `to-spec`；
- `to-tickets`；
- `implement`；
- `tdd`；
- `diagnosing-bugs`；
- `domain-modeling`；
- `codebase-design`；
- `code-review`；
- `writing-for-agents`；
- `handoff`。

等到出现真实场景，再引入 `wayfinder`、`wizard`、`teach` 或 misc Skills。

示例输入：

```text
/ask-matt

我要把一组 Skill 引入团队仓库。先检查当前运行时是否支持子 Agent、
tracker 和浏览器，再告诉我哪些流程需要降级、最小集合应该包含什么。
```

### 9.2 建议目录

不同 Agent 的安装位置不同，但原则相同：项目级 Skill 应该和仓库一起版本化，并通过根指导文件提供精确指针。

```text
project/
├── AGENTS.md or CLAUDE.md
├── GLOSSARY.md
├── docs/
│   ├── adr/
│   └── agents/
└── .agents/
    └── skills/
        ├── diagnosing-bugs/
        │   ├── SKILL.md
        │   └── scripts/
        │       └── hitl-loop.template.sh
        ├── tdd/
        │   └── SKILL.md
        └── code-review/
            └── SKILL.md
```

不要依赖某一个工具的私有目录名作为核心方法。关键是 Agent 能发现 Skill、团队能审查变更、版本能和项目一起演进。

### 9.3 本地化不是改名字

把上游 Skill 复制进项目后，至少检查：

| 检查项 | 要回答的问题 |
|---|---|
| 触发条件 | 是否会在小问题上误启动重流程 |
| 工具能力 | 当前 Agent 是否真的支持子 Agent、浏览器、tracker 和 shell |
| 文件路径 | tracker、ADR、领域文档放在哪里 |
| 安全边界 | 哪些命令、凭据和生产动作不能自动执行 |
| 完成条件 | 项目真正的测试、类型检查、构建和发布门禁是什么 |
| 术语 | Skill 是否使用项目的 `GLOSSARY.md` 词汇 |

### 9.4 根指导文件只做路由

不要把 12 个 Skill 的全文塞进 `AGENTS.md`。更好的写法是：

```markdown
Bug fixes use the project diagnosing-bugs Skill when the symptom is hard to reproduce
or spans multiple layers. Read `.agents/skills/diagnosing-bugs/SKILL.md` completely
before forming a root-cause theory.
```

这一行同时说明了触发条件、目标文件和必须完整读取的动作，是一个锋利的 context pointer。

### 9.5 工具不支持时，流程要降级

Skill 里写了并行子 Agent，不代表当前运行时一定有该能力；写了 tracker API，也不代表账号已经授权。降级时要保留方法的核心：

- 没有子 Agent：顺序执行 Standards 与 Spec review，并保持结论分开；
- 没有 tracker：使用本地 Markdown tickets；
- 没有浏览器：保留视觉验证为 hold，不伪造通过；
- 没有生产权限：输出可审阅向导或阻塞，不冒充已完成。

#### 成本也是约束

并行子 Agent、多 worktree 和整份规格的 `implement-spec`，都是用真实的上下文与配额换速度：

- 一次并行评审的上下文开销约等于串行的数倍，小任务不要开大流程；
- 大编排 Skill（`wayfinder`、`implement-spec`）保持显式调用，本身就是成本控制；
- 顺序执行更慢但更便宜：不确定规模时先顺序跑通，再为真实瓶颈引入并行；
- 接近会话上限时硬推，推理质量下降的代价高于一次 `handoff`。

### 9.6 常见失败

- 一次复制全部 38 个 Skill：触发噪音掩盖了真正反复出现的失败，从最小集合开始。
- 把 12 个 Skill 的全文塞进 `AGENTS.md`：根指导文件只做路由，全文让 Agent 每次都付 context load。
- 完成条件沿用上游默认命令：不把项目真实的测试、类型检查和构建门禁写进去，验收就是空的。
- 不演练降级路径：子 Agent、tracker、浏览器任一缺失时，流程在半路断裂而不是优雅降级。
- 不记录上游更新策略：Skill 内容静默漂移，团队各用各的版本。

### 9.7 本章验收

- 最小 Skill 集合已在一个小任务和一个真实 bug 上跑通。
- 根指导文件只有路由指针，没有 Skill 全文。
- 每种缺失能力都有演练过的降级路径。
- 上游更新策略已记录，不存在静默漂移。

### 9.8 迁移清单

- [ ] 固定并记录上游 commit。
- [ ] 选择最小 Skill 集合。
- [ ] 运行仓库 setup。
- [ ] 建立 `GLOSSARY.md` 与 ADR 位置。
- [ ] 把项目真实命令写进完成条件。
- [ ] 检查 Agent 运行时能力与降级路径。
- [ ] 用一个小任务跑通。
- [ ] 用一个真实 bug 验证 red-capable 反馈环。
- [ ] review Skill 本身的触发、权限和隐私边界。
- [ ] 记录上游更新策略，避免静默漂移。

---
