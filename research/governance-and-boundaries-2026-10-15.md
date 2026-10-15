# 上游治理与边界核对 · 2026-10-15

## 来源与边界

- 核对日期：2026-10-15。
- 本次来源：本地 `mattpocock/skills` Git 工作区，HEAD 经 `git rev-parse HEAD` 实测为
  `49dd158d1076134a641b33efb035946536778336`，`git status --porcelain` 为空（工作区干净），
  与本书当前证据基线一致；本笔记所引文件均在该提交的内容下逐项阅读。
- 范围：上游仓库的治理层（`CLAUDE.md`、`.agents/`、`SCOPE.md`、`.claude-plugin/`、`scripts/`）
  与边界层（`.out-of-scope/`、`skills/misc/`、`skills/in-progress/` 的定位声明），以及附录
  「业界方法来源」需用到的思想谱系归因。这些内容在 `upstream-sync-2026-10-12.md` 的
  Skill 清单核对范围之外，故单独成笔记。
- 推断限制：本笔记只记录固定提交中的文本事实与作者明示的理由；「结构性空白」一节是本书的
  编辑性归纳（由否决档案与目录清单反推），不是上游自称的路线图。上游后续提交可能改变任何一条。
- 运行边界：未安装任何客户端插件，未对外发布 issue/PR，未改动上游工作区检出状态。

## 治理层事实（固定提交文本）

### promoted 四件套同步不变量（根 `CLAUDE.md`）

- `engineering/` 与 `productivity/` 为 promoted 目录；其中每个 Skill 必须同时出现在四处：
  顶层 `README.md` 条目、`.claude-plugin/plugin.json` 的 `skills` 数组、对应 docs 页
  （`docs/<bucket>/<skill>.md`，发布为 `https://aihero.dev/skills-<name>`）、`ask-matt` 的路由地图。
  原文：「a new skill it never mentions, or a stale one it still routes to, is a router that lies」。
- `misc/`、`in-progress/`、`deprecated/` 一律不得出现在上述任何一处；promoted 目录的 README
  按 **User-invoked / Model-invoked** 分组，非 promoted 目录的 README 用平铺清单。
- 每个 Skill 要么是 user-invoked（frontmatter `disable-model-invocation: true` 加
  `agents/openai.yaml` 的 `policy.allow_implicit_invocation: false`），要么是 model-invoked；
  判定与维护规则见 `.agents/invocation.md`。
- 文体纪律：全仓库散文禁用 em-dash（`SKILL.md`、docs、README、CHANGELOG、ADR、changeset、
  代码注释均在内），要求改写句子而非字符替换。
- `scripts/link-skills.sh` 把 `deprecated/` 与 `misc/` 以外的 Skill 以符号链接接入本机
  `~/.claude/skills` 与 `~/.agents/skills`，`git pull` 即同步；同目录另有 `list-skills.sh` 与
  `sync-plugin-version.mjs`。

### `.agents/` 决策记录

- `adr/0001-explicit-setup-pointer-only-for-hard-dependencies.md`：把 Skill 对 setup 配置的依赖
  分为硬依赖（缺配置时输出是错的，必须显式提示运行 `setup-matt-pocock-skills`）与软依赖
  （只用散文提及，保持 token 轻量）。
- `adr/0002-ship-as-a-claude-code-plugin.md`：以 Claude Code 插件形态分发 promoted 集合；
  记录了 Codex 插件清单格式的演进与回退读 `.claude-plugin/` 的决定。
- `install-block.md` 是 README 安装命令的单一来源；`.claude-plugin/marketplace.json` 为仓库自带
  marketplace，Claude Code 走官方 `claude-plugins-official`，其余客户端走仓库 marketplace。

### 收录门槛（`SCOPE.md`）

- issue 留在打开状态必须同时过两关：① 描述真实会话中观察到的失败（跑了什么、Skill 做了什么、
  期待什么），假设性改进不合格；② 不撞 `.out-of-scope/` 与历史否决，也不是个人工作流微调。
- 规模不影响门槛（一词修复与整体重写同标准）；reaction 与 +1 不计入。
- 新 Skill 提案与贡献整体关闭；无法判断的 issue 给一轮提问加 `needs-info`，14 天无回复即关闭。

### 调用二元模型的路由层

- `ask-matt` 为 user-invoked 路由器，其 `SKILL.md` 自称各 Skill 摘要「只供定向」，陈述某 Skill
  行为前必须先读该 Skill 的 `SKILL.md`；同目录 `PHASE-BOUNDARIES.md` 定义阶段边界五选项决策树
  （继续 / `clear` / `handoff` / 子 Agent / `compact`，按序提问，第一个肯定答案胜出，
  「继续」最先排除、「压缩」垫底为默认值），并定义 smart zone 为约 15 万 token 的清晰推理窗口。
- `ask-matt` 的 context hygiene 段给出三条会话纪律：澄清、规格、拆票在同一不压缩窗口完成；
  每次 `implement` 从 ticket 冷启动；`retro` 在被复盘会话内（清空前）运行，清空后改为指向
  该会话日志。

## 边界层事实：`.out-of-scope/` 九份否决档案

| 档案 | 拒绝的方向 | 文本给出的理由（要点） |
|---|---|---|
| `new-skills.md` | 一切新 Skill 提案与贡献（含带现成分支者） | 目录刻意小；每个 Skill 是永久维护面；「能由现有 Skill 组合出来的行为不立新 Skill」；被拒实例 #101（brownfield 词汇构建器）、#414、#727、#1051（`/red-team` 预实现安全评审） |
| `mainstream-issue-trackers-only.md` | GitHub / GitLab / 本地 Markdown 之外的 tracker 一等支持（Jira、Linear、Azure DevOps、Trello、YouTrack 等） | 每个后端把一套 CLI 形状硬编码进 Skill，是永久维护面；「我用 GitHub，所以那是我能保持正确的后端」；「流行度不改变这一点」 |
| `native-question-tool.md` | grilling 改用 harness 原生提问 UI | Skill 是跨 harness 的中性文本；结构化选择器会把访谈推向预置答案的选择题，与访谈目的相反 |
| `question-limits.md` | grilling 的问题数量上限 | 「有的计划需要三个问题，有的需要五十个」；硬上限混淆两种失败模式 |
| `subagent-recursion.md` | Skill 内嵌子 Agent 递归守卫 | 阻止无限递归是 harness 的责任，不是 Skill 的 |
| `harness-name-collisions.md` | 为避让 harness 内置同名命令而改 Skill 名 | 同名解析是 harness 的行为；解法是命名空间调用 |
| `setup-skill-verify-mode.md` | setup 的 verify/check 模式或独立 verify Skill | Skill 由 prompt 驱动，直接让它验证现状即可；避免双代码路径漂移 |
| `lazy-load-writing-for-agents.md` | `retro` 延迟加载 `writing-for-agents` | 它是判断 no-op 指令与好 Skill 的标尺，复盘读取阶段就需要（另见 `upstream-sync-2026-10-12.md` 对 #1238/#1240 的记录） |
| `frozen-misc-skills.md` | `misc/` 目录的一切 issue/PR | 作者不再日用这些 Skill，无法判断修复对错；文件留在仓库是因为「原样对一些人仍可用」，可用 skills.sh 复制后修自己的副本；promote 回 promoted 目录即恢复受理 |

另：`SCOPE.md` 的「Already decided」段只链接其中八份；`lazy-load-writing-for-agents.md` 于
2026-10-09 新增，`SCOPE.md` 的链接清单在该提交尚未补入。

## 退役与删除政策

- `deprecated/` 目录在基线提交中只有 README、计数为 0：退役 Skill 直接删除，由移除它的
  changeset 指明替代者。实例：`resolving-merge-conflicts` 于上游 1.3.0 删除且**无替代**
  （上游 CHANGELOG #1120：「the agent works through an in-progress merge or rebase conflict
  without a dedicated skill」），其 docs 页保留并标注 archived。

## 结构性空白（编辑性归纳，非上游自称）

由否决档案与 38 个 Skill 的目录清单反推，以下领域是刻意不覆盖，而非暂未排期：

1. 部署、运维、监控、on-call：无对应 Skill；唯一沾边的 `wizard` 方向相反——把只能人做的
   步骤（开通、凭据、控制台点击）脚本化，即 ops 被划给人类。
2. 安全评审维度：`code-review` 固定为 Standards 与 Spec 两轴；预实现安全评审 `/red-team`
   （#1051）被 `new-skills.md` 政策关闭。
3. 合并冲突：无专用 Skill（见上节，删除且无替代）。
4. 非主流 tracker 的深度集成：Jira/Linear 用户只有散文式「Other」后端，`to-tickets` 的
   原生阻塞链接等能力不可用。
5. 大型 brownfield 的冷启动：渐进建立词汇表的入口 Skill（#101）已被拒，路径只有
   setup 加反复访谈。
6. harness 原生能力：为保持跨 harness 中立，放弃原生提问 UI、内嵌递归守卫等（三份否决档案同源）。
7. 生态扩展：新 Skill 通道关闭，未覆盖领域的官方答案是经 skills.sh 自行发布分叉。

## in-progress 作为空白地图（编辑性归纳）

`skills/in-progress/` 七个实验各自指向稳定集的一处空白：`chief-of-staff` 指向跨会话长期协调；
`loop-me` 指向个人重复流程的规约化；`setup-ts-deep-modules` 指向深模块边界的机械化强制；
`writing-fragments` / `writing-beats` / `writing-shape` 指向面向人类读者的写作流水线；
`claude-handoff` 指向交接的即时后台化（依赖特定 CLI，与稳定集的 harness 中立原则有张力）。
上游目录 README 口径：「beta: public on purpose, feedback wanted, not shipped in the plugin」；
`chief-of-staff` 存在于目录但未列入该 README 清单（基线提交实测）。

## 思想谱系归因补证（供附录使用）

- `codebase-design/SKILL.md` 把 seam 明确归因 Michael Feathers（「**Seam** _(Michael Feathers)_」），
  并在 Rejected framings 中拒绝 Ousterhout 的 depth-as-ratio（「rewards padding the
  implementation. We use depth-as-leverage instead」）。
- `pr/SKILL.md` 使用 one-way / two-way door 与 blast radius 概念但未点名出处；Bezos 归因
  是本书的背景注释，不是上游文本事实。
- Beck 的「Make the change easy, then make the easy change」在 `to-tickets` 的 prefactoring
  规则中引用（第 4 章已述）。
