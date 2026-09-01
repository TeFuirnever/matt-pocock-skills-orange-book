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

每张票都穿过必要层级，但只做一条细而完整的行为。

### 4.3 宽范围机械改动是例外

如果一次共享类型重命名会让几千个调用点同时变红，硬拆垂直切片并不现实。`to-tickets` 对这类 wide refactor 推荐 expand–migrate–contract：

1. Expand：新旧形式并存，保持兼容；
2. Migrate：按包或目录分批迁移；
3. Contract：确认旧调用归零后删除旧形式。

这个例外很重要。方法论不是教条，垂直切片的目的始终是让反馈保持有效。

### 4.4 `implement`：施工阶段不重开产品讨论

`implement` 接收已经批准的 spec 或 tickets。它应该：

- 按预先约定的 seam 使用 `tdd`；
- 一次实现一张 ticket；
- 持续运行类型检查和目标测试；
- 完成后调用 `code-review`；
- 在当前分支提交结果。

它不应该边实现边 redesign。出现新的产品决策时，应停下来上报，而不是悄悄选一个答案继续写。

### 4.5 `code-review`：规范正确与需求正确是两件事

![Code Review 的 Standards 与 Spec 两条轴](assets/diagrams/two-axis-review.png)

这套 `code-review` 把评审拆成两条隔离的轴：

| 轴 | 核心问题 | 证据 |
|---|---|---|
| Standards | 代码是否遵守仓库规范与坏味道基线 | 编码规范、diff、测试与设计信号 |
| Spec | 代码是否实现了原始需求 | issue/spec、验收标准、行为证据 |

一段代码完全可能写得优雅，却解决了错误的问题；也可能功能正确，却以高耦合和重复代码实现。两条轴不能揉成一个模糊的总分。

### 4.6 `wayfinder`：一个会话装不下时，先画决策地图

大工程的瓶颈通常不是代码量，而是未决问题太多。`wayfinder` 会建立一张由决策 tickets 组成的地图：

- grilling ticket：通过讨论决定；
- prototype ticket：必须做出可交互东西才能决定；
- research ticket：需要一手资料；
- task ticket：需要人完成外部动作。

地图清空以后，再用 `to-spec` 把散落的决定收拢成统一规格。它不是直接把地图变成实现票。

### 4.7 本章验收

- 规格只记录已确定内容，不在写作阶段偷偷补产品决定。
- tickets 默认是 tracer-bullet 垂直切片。
- wide refactor 用 expand–migrate–contract，而不是强行端到端。
- 实现阶段遇到新决策会回报，不会自行 redesign。
- 评审同时覆盖 Standards 与 Spec，但不混成一个结论。

---
