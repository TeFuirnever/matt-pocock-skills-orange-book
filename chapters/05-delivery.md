## 第 4 章 · 从对话到交付：规格、拆票、实现和评审

![Matt Pocock Skills 交付反馈环](assets/diagrams/skills-delivery-feedback-loop.png)

### 4.1 `to-spec`：记录已经做完的决定

`to-spec` 不负责采访。它应该读取当前对话，把已经确定的内容整理成：

- Problem Statement；
- Solution；
- 编号 User Stories；
- Implementation Decisions；
- Testing Decisions；
- Out of Scope；
- Further Notes。

它在写规格前会确认测试接缝。上游强调优先复用已有接缝，尽量选择最高层、最少数量的公共边界。理想接缝数量甚至可以是一条。

为什么规格里要写测试接缝？因为没有这一步，下一会话很可能把内部函数当接口测试，或者为了好测而到处切新接口，最后测试很多，设计更差。

### 4.2 `to-tickets`：按垂直切片拆，不按技术层拆

![Tracer-bullet ticket：横向分层与纵向切片](assets/diagrams/tracer-bullet-slices.png)

错误拆法：

1. 先完成所有数据结构；
2. 再完成所有 main 进程逻辑；
3. 再完成所有 renderer 页面；
4. 最后统一补测试。

这种横向拆法的问题是，前三张票关闭时都没有可演示的用户价值，也没有端到端反馈。

更好的 tracer-bullet 拆法：

1. 用户可以新增一条最小 Provider 配置，并在重启后看到它；
2. 用户可以验证凭据，看到成功与失败状态；
3. 用户可以设为默认，并在一次真实请求里使用；
4. 用户可以删除配置，运行时安全回退。

每张票都穿过必要层级，但只做一条细而完整的行为。使用真实 tracker 且来源是已有 issue 时，每张实现票都应成为该 issue 的子 issue；父子关系表达归属，blocking 关系表达先后，两者不能混为一谈。已经设置原生阻塞边时，票正文不再重复列出 Blocked by。

### 4.3 宽范围机械改动是例外

如果一次共享类型重命名会让几千个调用点同时变红，硬拆垂直切片并不现实。`to-tickets` 对这类 wide refactor 推荐 expand–migrate–contract：

1. Expand：新旧形式并存，保持兼容；
2. Migrate：按包或目录分批迁移；
3. Contract：确认旧调用归零后删除旧形式。

这个例外很重要。方法论不是教条，垂直切片的目的始终是让反馈保持有效。

### 4.4 `implement`：施工阶段不重开产品讨论

`implement` 接收已经批准的 spec 或 tickets。它应该：

- 用户给出 ticket 引用时，先从 tracker 获取内容并回显标题；引用有歧义则先澄清；
- 按预先约定的 seam 使用 `tdd`；
- 一次实现一张 ticket；
- 持续运行类型检查和目标测试；
- 完成后调用 `code-review`；
- 在当前分支提交结果。

它不应该边实现边 redesign。出现新的产品决策时，应停下来上报，而不是悄悄选一个答案继续写。

#### 整份规格交给 `implement-spec`

当前固定版的 `implement-spec` 已从 `in-progress` 移到 engineering。它把 tickets 当作带阻塞关系的任务图：先建 integration branch，只启动当前前沿上已解阻塞的票；各 implementer 在独立 worktree/branch 上工作，开始前确认基于 integration branch，完成前合入最新集成分支，再由 merger 汇入。

如果 tracker 通过 PR 关闭工作，或用户要求 PR，则在第一次合入后创建 draft PR；全部票完成后，对集成分支执行双轴 review，由一个 implementer 集中修复。最后把已有 draft PR 标为可评审，或按 tracker 工作流关闭 tickets，并清理 implementer worktrees。具体提交、远程写入仍服从当前会话授权。

### 4.5 `code-review`：规范正确与需求正确是两件事

![Code Review 的 Standards 与 Spec 两条轴](assets/diagrams/two-axis-review.png)

这套 `code-review` 把评审拆成两条隔离的轴：

| 轴 | 核心问题 | 证据 |
|---|---|---|
| Standards | 代码是否遵守仓库规范与坏味道基线 | 编码规范、diff、测试与设计信号 |
| Spec | 代码是否实现了原始需求 | issue/spec、验收标准、行为证据 |

执行前先确认固定比较点能解析，并搜索仓库内所有编码规范文件；存在的 `CODING_STANDARDS.md` 和 `CONTRIBUTING.md` 必须纳入。两条轴要同时以前台子 Agent 启动，再汇总返回报告；没有 spec 时明确报告 Spec 轴跳过，不能凭空补需求。

一段代码完全可能写得优雅，却解决了错误的问题；也可能功能正确，却以高耦合和重复代码实现。两条轴不能揉成一个模糊的总分。

### 4.6 `wayfinder`：一个会话装不下时，先画决策地图

大工程的瓶颈通常不是代码量，而是未决问题太多。`wayfinder` 会建立一张由决策 tickets 组成的地图：

- grilling ticket：通过讨论决定；
- prototype ticket：做一个廉价粗糙的具体工件（大纲、草稿、stub 或 UI/逻辑代码）来提高讨论保真度；
- research ticket：需要一手资料；
- task ticket：决策前必须完成的杂务，Agent 能独立完成的直接做（AFK），否则交给人一份精确清单（HITL）。

地图与决策票只使用 `wayfinder:` 标签，不混入 `ready-for-agent` 等实现分诊标签。执行时先读类型标签，再选择对应流程；先创建 issues 拿到真实 id，再补阻塞与交叉引用，避免占位编号误链。research 票的上游流程把证据推到一次性研究分支，但不创建 PR，也不合并该分支；这类远程动作必须服从当前会话的授权边界。

地图清空以后，再用 `to-spec` 把散落的决定收拢成统一规格。它不是直接把地图变成实现票。

#### `pr`：让评审者看见改动与证据

新增的 `pr` 专门负责 PR 正文，使用 `GLOSSARY.md` 里的领域语言。Summary 用最小图、树、伪代码或 diff 草图解释关键变化；Evidence 给出真实的 Before/After；Merge Danger 说明回退难度与影响范围。视觉改动适合截图，执行逻辑适合失败与通过的命令证据。写正文不等于获准发布 PR。该 Skill 标注借鉴 Dex Horthy / Humanlayer 的 [show-me](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md)，应保留归属。

### 4.7 本章验收

- 规格只记录已确定内容，不在写作阶段偷偷补产品决定。
- tickets 默认是 tracer-bullet 垂直切片。
- wide refactor 用 expand–migrate–contract，而不是强行端到端。
- 实现阶段遇到新决策会回报，不会自行 redesign。
- 评审同时覆盖 Standards 与 Spec，但不混成一个结论。

---
