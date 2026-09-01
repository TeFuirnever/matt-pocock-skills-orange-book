## 第 11 章 · 37 个 Skills 逐项小白手册

这一章不是把 frontmatter 翻译成中文，而是把每个 Skill 还原成一个新手可以执行的工作单元。建议第一次阅读时只看“什么时候用”和“什么时候别用”；遇到真实任务时，再回来照着“输入、步骤、产物、验收”运行。

> **固定版本说明：** 本章只对固定提交
> `6654f6b60cd9d5be8b54c6fafe44346dabeb3b76` 负责。调用语法会随 Agent
> 客户端变化，但触发条件、步骤顺序和证据要求仍然可以迁移。

### 11.1 Engineering：从想法到交付的 18 个 Skill

#### 11.1.1 `ask-matt`：不知道走哪条路时先路由

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/ask-matt/SKILL.md)

**一句话理解：** 它不替你做任务，而是判断当前最接近哪种失败风险，并给出 Skill 链路。

**什么时候用：** 你知道要解决什么，但不知道应该先澄清、原型、写规格、拆票、诊断还是直接实现。

**什么时候别用：** 当前动作已经明确，例如“这个测试已经稳定复现，请按 `diagnosing-bugs` 继续”。这时再次路由只会增加一层转述。

**它会怎样判断：**

1. 想法是否仍有未决问题；
2. 问题能否在对话里回答，还是必须用原型或研究回答；
3. 工作是否超过一个会话；
4. 当前是在做功能、处理缺陷、维护代码库，还是跨越会话边界；
5. 下一阶段需要继续、清空上下文、交接、压缩，还是交给子 Agent。

**UI 客户端操作例：** 团队准备增加“启动时恢复上次工作区”，但不清楚恢复失败时的交互，也不清楚状态应该由哪一层持有。合理路由是先 `grill-with-docs`，状态模型仍说不清时转 `prototype`，决定稳定后再 `to-spec`。

**可直接使用的输入：**

```text
/ask-matt

我要给桌面客户端增加“启动时恢复上次工作区”。
交互和状态归属还有未决问题，预计会改动界面、持久化和测试。
请判断应该先用哪些 Skill，并说明每次切换的条件。
```

**产物与验收：** 至少得到“当前阶段、推荐 Skill、为什么、何时切到下一 Skill、哪些 Skill 暂时不要用”。如果回答只是列出 37 个名字，路由没有完成。

**新手误区：** 把它当总控 Agent，一旦调用就让它包办所有阶段。它的职责是给路线，不是无限接管。

#### 11.1.2 `setup-matt-pocock-skills`：第一次使用前对齐仓库现实

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/setup-matt-pocock-skills/SKILL.md)

**一句话理解：** 这是工程 Skills 的一次性仓库配置，把 tracker、triage 词汇和领域文档位置写清楚。

**什么时候用：** 刚把 Skills 引入一个仓库，准备第一次运行 `triage`、`to-spec`、`to-tickets` 或领域建模流程。

**什么时候别用：** 每个任务开始都跑一次；或者在不了解现有约定时直接覆盖已有 tracker 和文档布局。

**输入：**

- 仓库现有 issue/PR 管理方式；
- 已有标签或状态；
- 根指导文件；
- `CONTEXT.md`、ADR、docs 的当前位置；
- 团队愿意接受的最小改动。

**执行顺序：**

1. 先探索现状，不创建文件；
2. 报告发现、冲突和可选方案；
3. 由用户确认 tracker、标签词汇和领域文档布局；
4. 只写经过确认的配置与指针；
5. 回读文件，确认下游 Skill 能找到它们。

**UI 客户端操作例：** 仓库已经使用本地 Markdown issue，而不是 GitHub Issues。setup 不应该强行迁移平台，只需把本地 issue 根目录、阻塞关系写法和领域文档路径配置给后续 Skills。

**产物与验收：** 下游 Skill 能回答三件事：规格发布到哪里、ticket 状态怎样表达、领域术语和 ADR 去哪里读写。缺一项都不算 setup 完成。

**新手误区：** 把 setup 当脚手架生成器。它真正生成的是共同约定；文件只是约定的载体。

#### 11.1.3 `grill-with-docs`：在真实仓库里把问题问清楚

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/grill-with-docs/SKILL.md)

**一句话理解：** 它把 `grilling` 的决策树与 `domain-modeling` 的共同语言结合起来，边讨论边留下仓库证据。

**什么时候用：** 模糊问题发生在一个真实工作目录里，而且决定会影响模块、术语、边界或长期维护。

**什么时候别用：** 没有仓库的个人想法，用 `grill-me`；决定已经完成，只需整理，用 `to-spec`。

**Agent 必须自己查的事实：** 现有组件、状态管理方式、测试框架、类似交互、编码规范、领域文档。不要把这些问题甩回给用户。

**必须交给人决定的事项：** 用户体验取舍、容错政策、范围、非目标、兼容策略、风险偏好。

**UI 客户端操作例：** “关闭窗口”究竟是退出应用、隐藏到托盘，还是保留后台任务？Agent 先查当前窗口生命周期，再向用户询问产品决策；确定词义后，立即把“关闭”“退出”“隐藏”写入领域词汇。

**可直接使用的输入：**

```text
/grill-with-docs

请把“关闭窗口后的行为”问清楚。
你负责先检查仓库现状；需要产品取舍时再问我。
每个稳定术语立即更新领域文档，只有难以逆转的决定才建议 ADR。
```

**产物与验收：** 决策树 frontier 为空；事实有代码或文档证据；术语在讨论形成时已经落盘；仍有未决问题时不能假装进入实现。

**新手误区：** 会后一次性写总结。这样最容易漏掉决定改变过程中的词义修正。

#### 11.1.4 `triage`：先确认来件是什么，再决定谁处理

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/triage/SKILL.md)

**一句话理解：** 它把外部 issue 和 PR 推进一套状态机，不让未经核验的描述直接变成实现任务。

**适合处理：** 未分类 issue、`needs-triage`、补充信息后重新活跃的 `needs-info`，以及明确点名的外部 PR。

**不适合处理：** `to-tickets` 刚生成的实现票。那些票已经是 agent-ready，再 triage 一次属于重复流程。

**核心步骤：**

1. 读完整 body、评论、标签、作者和时间；PR 还要读 diff；
2. 用领域概念搜索是否已经实现，并检查过去是否明确拒绝；
3. 给出分类和状态建议，等待维护者方向；
4. 对 bug 真实复现，对 PR 运行相关验证；
5. 信息不足才进入 grilling；
6. 写 agent brief、needs-info notes，或按理由关闭。

**UI 客户端操作例：** 用户报告“设置偶尔丢失”。triage 先检查是否已存在自动恢复逻辑和类似 issue，再按报告步骤复现。没有操作系统、版本和最小步骤时进入 `needs-info`，而不是猜根因并开工。

**产物与验收：** 每项都有当前状态、核验结果、代码位置或缺失信息、下一责任人。一个“看起来像 bug”的标签不是核验。

**新手误区：** 只改标签不留可执行 brief；或者把“无法复现”误写成“问题不存在”。

#### 11.1.5 `wayfinder`：大工程先画决策地图，不急着施工

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/wayfinder/SKILL.md)

**一句话理解：** 当目标远到一个会话看不清路线时，用 decision tickets 逐步驱散 fog of war。

**什么时候用：** 绿地项目、跨多子系统的大功能、关键决定相互依赖、单次 grilling 放不下。

**什么时候别用：** 一个边界清楚、两三天能完成的功能。wayfinder 的认知成本很高。

**地图里装什么：**

- Destination：走到什么状态算看清路线；
- Decisions so far：已经稳定的决定；
- Not yet specified：尚未解决的区域；
- Out of scope：这张地图不处理什么；
- Decision tickets：每张只解决一个决定，并声明依赖。

**ticket 类型：** 可以通过讨论解决的 grilling ticket；必须看到可运行结果的 prototype ticket；依赖一手资料的 research ticket；必须由人完成外部动作的 task ticket。

**UI 客户端操作例：** “重做插件系统”同时涉及权限、安装、版本、沙箱、UI、迁移和回滚。先建地图；“插件权限模型”阻塞“安装确认 UI”，“版本兼容策略”阻塞“自动更新”。地图清晰后再 `to-spec`，不要直接 `implement`。

**产物与验收：** 所有重要未知都被命名；ticket 之间有真实依赖；地图最终产生决定而非半成品代码；进入实现前有一份收拢后的 spec。

**新手误区：** 把它当超大 todo list。它管理的是“还不知道什么”，不是“代码文件有哪些”。

#### 11.1.6 `to-spec`：把已经讨论清楚的内容固定下来

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/to-spec/SKILL.md)

**一句话理解：** 它只做 synthesis，不做 interview；把当前对话中的已决内容变成一份可交付规格。

**输入前提：** Problem、Solution、用户故事、关键实现决定、测试 seam 和 Out of Scope 已经在对话中出现。

**什么时候别用：** 仍有关键问题没人回答。不要让 Agent 在写规格时偷偷发明答案。

**规格固定结构：**

1. Problem Statement；
2. Solution；
3. 编号 User Stories；
4. Implementation Decisions；
5. Testing Decisions；
6. Out of Scope；
7. Further Notes。

**UI 客户端操作例：** “新增离线状态条”已经决定展示位置、状态来源、重试行为和无网络文案。to-spec 将这些决定写成用户故事，并明确不在本期加入离线编辑队列。

**可直接使用的输入：**

```text
/to-spec

把当前对话整理成规格。不要追加新决定。
重点保留离线状态的来源、展示规则、重试行为、测试 seam 和非目标。
```

**产物与验收：** 每个用户故事可观察；测试决定指向公共 seam；非目标明确；任何从未在对话中出现的新政策都必须删除或标为未决。

**新手误区：** 把“完整”理解成“什么都写”。规格的完整，是决定边界完整，不是篇幅大。

#### 11.1.7 `to-tickets`：把规格切成能独立反馈的纵向薄片

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/to-tickets/SKILL.md)

**一句话理解：** 每张 ticket 都穿过必要层级，交付一条可观察行为，并显式声明 blocked-by 边。

**输入：** 一份规格、计划，或已经足够稳定的当前对话；可选地先探索代码以找到真正 seam。

**切票检查：**

- 用户完成这张票后能观察到什么变化；
- 是否包含它所需的界面、契约、逻辑和测试；
- 是否可以独立验收；
- 是否真的被另一张票阻塞；
- 标题能否表达行为，而不是技术层。

**UI 客户端操作例：**

- 票 1：用户保存一个最小账号配置，重启后仍可见；
- 票 2：用户验证配置并看到成功/失败；
- 票 3：用户设为默认并完成一次真实调用；
- 票 4：用户删除配置，运行时安全回退。

**不好的切法：** “先写类型”“再写 IPC”“再写页面”“最后补测试”。关闭前三张票时用户仍得不到可用行为。

**产物与验收：** 每张票有 Parent、What to build、Acceptance criteria、Blocked by；依赖图没有循环；除宽范围机械迁移外，默认使用 tracer-bullet。

**新手误区：** 为了看起来并行，把真实依赖删掉；或者把所有票都标成阻塞，失去 frontier。

#### 11.1.8 `implement`：按批准的 spec 或 ticket 施工

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/implement/SKILL.md)

**一句话理解：** 这是施工入口：按预先批准的工作说明实现，在约定 seam 做 TDD，持续验证，最后 review 并提交。

**前置输入：** spec 或 tickets、当前分支、预先同意的测试 seam、项目真实验证命令。

**执行顺序：**

1. 读清当前票和所有阻塞项；
2. 在约定 seam 尽可能使用 `tdd`；
3. 经常运行单测文件和 typecheck；
4. 只做当前票，不顺手扩范围；
5. 结束时运行完整测试套件；
6. 调用 `code-review`；
7. 修复 finding 后提交当前分支。

**UI 客户端操作例：** 当前票只要求“验证账号配置并显示结果”。实现不应顺便加入账号排序、导入导出和自动重试；发现产品未决定错误文案时应上报，而不是自行设计。

**产物与验收：** diff 可追溯到票；目标测试与 typecheck 有当前输出；完整测试在结束时运行；review finding 已处理或明确记录；提交只包含当前工作。

**新手误区：** 把 `implement` 理解成“自由发挥直到看起来完整”。它恰恰要求施工阶段服从已定边界。

#### 11.1.9 `prototype`：用可丢弃代码回答一个设计问题

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/prototype/SKILL.md)

**一句话理解：** 原型的交付物不是产品代码，而是一个被真实运行回答掉的问题。

**两条分支：**

- “逻辑或状态模型是否合理？”：做单文件 HTML，让非开发者通过按钮和引导场景推动状态机；
- “UI 应该长什么样？”：在同一路由提供多个结构明显不同的变体，可快速切换。

**共同约束：** 明确标注 prototype；一条命令或双击即可运行；默认只用内存状态；不补生产级抽象、测试和错误处理；每次动作都把相关状态暴露出来。

**UI 客户端操作例：** 团队无法仅靠文字决定“任务详情”应该是抽屉、侧栏还是独立页。原型同时做三个差异足够大的变体，使用同一组真实长度的合成数据，让用户完成相同任务后再决定。

**产物与验收：** 问题写在原型顶部；每个变体能被运行；用户给出 verdict；被验证的决定进入正式 issue/spec；原型保存在 main 之外的 throwaway 分支并留下指针。

**新手误区：** 把原型做成“以后也许能直接上线”的半成品，于是开始补架构、权限和完整测试，反馈速度反而消失。

#### 11.1.10 `diagnosing-bugs`：先制造稳定红色，再形成理论

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/diagnosing-bugs/SKILL.md)

**一句话理解：** 疑难 bug 的第一产物是一条能捕获精确症状的 red-capable 命令，而不是一篇根因猜测。

**完整循环：**

1. Redact：先移除日志、数据和命令中的敏感信息；
2. Feedback loop：找到当前会红的测试、脚本或自动化；
3. Reproduce：确认捕获的是用户症状；
4. Minimise：删掉无关步骤和变量；
5. Hypothesise：列 3–5 个可证伪假设；
6. Instrument：一次只插一个探针，区分假设；
7. Fix：最小修复并加入回归测试；
8. Cleanup：删除临时日志，重新跑当前验证。

**UI 客户端操作例：** “切换工作区后偶尔显示旧标题”。先写自动化连续切换并断言标题与当前工作区一致；确认它在旧代码上稳定失败；再分别测试缓存未失效、事件乱序、状态覆盖等假设。

**可直接使用的输入：**

```text
请调用 diagnosing-bugs。
症状是连续切换工作区后标题偶尔仍显示上一个名称。
先建立能在当前分支稳定变红的最小命令；在看到红色前不要给根因结论。
```

**产物与验收：** 同一条命令在修复前红、修复后绿；回归测试位于公共 seam；临时埋点被移除；日志已脱敏。

**新手误区：** 先写“深度根因分析”，最后才发现症状根本不能稳定复现。

#### 11.1.11 `tdd`：一次只推动一个可观察行为

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/tdd/SKILL.md)

**一句话理解：** 在预先同意的公共 seam 上，写一个因为目标行为缺失而失败的测试，只实现足够让它变绿的代码。

**好测试的三个问题：**

1. 它验证用户或调用方可观察的行为吗；
2. 重构内部实现时它仍应成立吗；
3. 失败时能说明哪条行为被破坏吗。

**seam 选择：** 优先最高层、最少数量、稳定的公共接口。外部 API、时钟、随机数可以 mock；不要 mock 自己的模块来模拟成功。

**UI 客户端操作例：** 对“保存设置后重启仍保留”写一条穿过公共设置接口的测试，而不是分别测试序列化函数、文件函数和状态 reducer 的内部调用顺序。

**循环：**

1. 写一条测试；
2. 运行并看到预期红色；
3. 写最小实现；
4. 再运行看到绿色；
5. 进入下一条行为。

**产物与验收：** 每个测试都曾因目标行为缺失而失败；测试没有复刻实现算法；没有先批量写十个红测试；固定提交当前把重构交给 review 阶段，不能把其他 TDD 版本的口号强加进来。

**新手误区：** 先写完实现，再补一个必绿测试，然后把它称为 TDD。

#### 11.1.12 `research`：外部事实必须回到一手来源

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/research/SKILL.md)

**一句话理解：** 把外部阅读交给后台 Agent，沿官方文档、规范、源码或第一方 API 追溯每项关键事实，并保存带引用的 Markdown。

**什么时候用：** 实现决定依赖浏览器行为、SDK 契约、协议、框架限制、版本差异或官方最佳实践。

**什么时候别用：** 答案就在当前仓库；或者只是想收集更多二手观点，却没有待解决的具体决定。

**UI 客户端操作例：** 要决定系统通知在不同桌面平台的权限与点击行为。research 应查看各平台官方文档和所用运行时的官方 API，不以博客摘要代替。

**输入要写清：** 待回答的问题、固定版本、需要支持的环境、输出路径、哪些决定会被研究结果改变。

**产物与验收：** 单个 Markdown 文件；每个关键结论附近有一手来源；事实与推断分开；版本和日期可追溯；文件进入后续 `grill-with-docs`，不直接冒充产品决定。

**新手误区：** 搜到“大家都这么做”就停止追溯；或者只把链接堆在末尾，读者无法知道哪条链接支持哪项结论。

#### 11.1.13 `domain-modeling`：先统一词义，再让代码承载词义

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/domain-modeling/SKILL.md)

**一句话理解：** 用具体场景把模糊、重载或冲突的领域词压实，并立即更新 `CONTEXT.md`。

**重点动作：**

- 用现有 glossary 挑战新说法；
- 把“状态正常”“保存成功”这类模糊词变成可观察场景；
- 区分同一个词承担的多个概念；
- 把术语和真实代码位置交叉引用；
- 决定形成时 inline 更新；
- 只有难以逆转且不记录会令人意外时才建议 ADR。

**UI 客户端操作例：** “连接”可能指保存凭据、验证凭据、建立长连接或启用账号。把它们统一叫连接会让 UI 文案和函数名不断漂移。领域建模应给每个行为一个能用例子反证的名字。

**产物与验收：** glossary 词条有定义、正例、反例和代码指针；后续 spec、ticket、测试和界面文案使用同一词义；ADR 数量保持克制。

**新手误区：** 把 `CONTEXT.md` 写成百科全书。它首先是共同语言和导航，不是整个系统的复制品。

#### 11.1.14 `codebase-design`：用深模块语言讨论代码形状

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/codebase-design/SKILL.md)

**一句话理解：** 它提供一组精确词汇，帮助团队判断复杂度是否被藏在小接口后面。

**核心词：**

| 词 | 小白解释 |
|---|---|
| Module | 一组共同承担某种能力的实现 |
| Interface | 调用方必须理解的表面 |
| Depth | 实现能力相对接口复杂度的比值 |
| Seam | 可以从外部验证或替换行为的位置 |
| Adapter | 把一种外部形状翻译为模块形状 |
| Leverage | 一处改动能服务多少调用方 |
| Locality | 理解一个行为需要跳多少位置 |

**删除测试：** 假设删除这个模块。调用方需要重新实现多少复杂逻辑？如果只是把几行转发挪走，它很浅；如果大量规则重新散到各处，它可能很深。

**UI 客户端操作例：** 五个设置组件依次调用 `read`、`parse`、`merge`、`validate`、`write`。更深的模块可以只暴露 `loadSettings` 与 `saveSettings`，把顺序、默认值和迁移藏起来。

**产物与验收：** 设计讨论能说明接口、被隐藏的复杂度、seam、测试面和调用方收益；不会只说“再抽一层”或“更优雅”。

**新手误区：** 把文件短、函数多、类多误认为模块化。模块深度看的是调用方少学了多少，不是文件数量。

#### 11.1.15 `improve-codebase-architecture`：先找高价值候选，再讨论接口

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/improve-codebase-architecture/SKILL.md)

**一句话理解：** 它先调查最近常改、理解成本高的区域，生成视觉 HTML 候选报告；用户选中后才进入 grilling。

**执行顺序：**

1. 如果用户没给范围，先从一段 git 历史找热点；
2. 读取 `CONTEXT.md` 和相关 ADR；
3. 用 `codebase-design` 词汇调查浅模块、低 locality 和不真实 seam；
4. 对候选做删除测试；
5. 在系统临时目录生成带 before/after 的 HTML 报告；
6. 用户选择一个候选；
7. 再通过 grilling 讨论接口和迁移。

**UI 客户端操作例：** 最近十次改动都触碰窗口偏好、托盘行为和启动设置。报告发现调用方必须知道同一套默认值和迁移顺序，推荐把这些规则放进一个深模块，但在用户选择前不直接重构。

**产物与验收：** 候选有文件、问题、方案、收益、推荐强度和图；顶级建议有依据；报告不落入仓库；未被选择的候选不产生代码改动。

**新手误区：** 跑一次架构扫描就自动重构全仓；或者脱离近期变化，列一堆理论上可优化但没人会再碰的区域。

#### 11.1.16 `code-review`：把 Standards 与 Spec 分开验收

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/code-review/SKILL.md)

**一句话理解：** 钉住一个 fixed point，再分别回答“代码是否符合仓库规范”和“代码是否完成原始需求”。

**前置证据：**

- fixed point：commit、branch、tag 或 merge-base；
- spec source：issue、规格或验收清单；
- standards source：仓库指导文件、编码标准和相关文档；
- 当前 diff 与验证输出。

**两个隔离问题：**

- Standards 轴：设计、可读性、安全、测试、仓库规则是否满足；
- Spec 轴：用户故事、非目标、边界案例、验收是否满足。

**UI 客户端操作例：** 新的错误提示组件结构清晰、测试完整，但漏掉“离线时不显示重试按钮”的需求。Standards 可通过，Spec 仍失败；总评不能用代码质量把需求缺口平均掉。

**产物与验收：** 两条轴分别列 finding、证据、严重度和最小修复；聚合时保留来源；只有两轴都通过才能收口。

**新手误区：** 只做 lint 风格检查；或者只照需求点功能，忽略测试泄漏内部实现和越界依赖。

#### 11.1.17 `resolving-merge-conflicts`：解决两侧意图，不是选一侧文本

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/resolving-merge-conflicts/SKILL.md)

**一句话理解：** 对每个冲突 hunk 追溯两侧提交、issue 和 PR 的原始意图，尽可能同时保留，再完成 merge/rebase。

**执行顺序：**

1. 查看当前 merge/rebase 状态和历史；
2. 找到每侧改动的 primary source；
3. 逐 hunk 解释两侧意图；
4. 能兼容就合并，不能兼容就按本次合并目标选择并记录取舍；
5. 不发明新行为；
6. 运行项目检查；
7. stage 并继续操作直到结束。

**UI 客户端操作例：** 一侧给设置项增加禁用态，另一侧把同一区域改成异步加载。正确结果应同时保留加载态和禁用规则，而不是接受“ours”或“theirs”。

**产物与验收：** 工作树没有未解决冲突；项目验证通过；merge/rebase 完成；每个不兼容取舍能解释来源。上游 Skill 明确要求总是解决，不执行 `--abort`。

**新手误区：** 看到冲突标记就按“较新的代码”选择。时间不能说明产品和架构意图。

#### 11.1.18 `wizard`：把只有人能做的步骤变成可审阅向导

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/wizard/SKILL.md)

**一句话理解：** 当 Agent 确实无法代替人点击控制台、处理密钥或确认不可逆动作时，生成一份阶段化 Bash 向导。

**什么时候用：** 创建第三方凭据、配置 CI secret、陌生控制台操作、一次性迁移或 cutover。

**什么时候别用：** Agent 可以通过已有工具安全完成的普通命令。不要把自动化能力退化成“请人手工做”。

**制作步骤：**

1. 读仓库，列出全部人工阶段和每个阶段产生的值；
2. 确认值从哪里取得、写到哪里、是否为 secret；
3. 为每阶段写精确点击路径和 URL，不知道就查官方文档，不能编；
4. 复制稳定模板，只编写 stages；
5. secret 使用隐藏输入，写入时幂等；
6. 不可逆动作前显式确认；
7. 用 `bash -n`，可用时再跑 shellcheck；不要由 Agent 代替用户完整执行。

**UI 客户端操作例：** 管理员需要在第三方控制台创建最小权限 token，再写入本地环境和 CI。向导打开正确页面、提示权限、隐藏读取 token、写入目标并运行不暴露凭据的连通性检查。

**产物与验收：** 所有人工步骤都有顺序和剩余阶段；每个值有来源与落点；secret 不进入聊天、日志或命令历史；脚本语法通过；是否提交仓库由可重复性决定。

**新手误区：** 把真实 secret 粘贴进对话，或者让 Agent 猜控制台按钮名称。

### 11.2 Productivity：思考、交接、教学与 Agent 文档的 7 个 Skill

#### 11.2.1 `grill-me`：没有仓库时，把脑中的想法问清楚

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/grill-me/SKILL.md)

**一句话理解：** 这是 `grilling` 的无仓库入口，适合计划、设计和想法澄清。

**什么时候用：** 答案主要在用户脑中，且当前没有需要同步维护的工作目录。

**什么时候别用：** 事实在代码或文档里；发生在真实仓库中时应优先 `grill-with-docs`；决定已经结束时应使用 `to-spec`。

**它实际做什么：** `grill-me` 本身非常薄，只负责调用 `grilling`。这正是 router Skill 的示范：入口稳定，提问纪律只有一个来源，避免两套访谈规则漂移。

**UI 客户端操作例：** 产品负责人还没有仓库，只想先决定“首次启动引导”要解决什么问题。Agent 逐轮确认目标用户、必须完成的动作、可跳过策略、失败处理和明确非目标。

**可直接使用的输入：**

```text
/grill-me

请把桌面客户端的首次启动引导问清楚。
我希望最后得到可以转成规格的决定，不要先画页面，也不要替我决定产品取舍。
```

**产物与验收：** frontier 为空；所有事实由 Agent 调查或明确标为不可得；所有产品决定由用户确认；会话末尾能清楚区分已决、未决和非目标。

**新手误区：** 把“relentless”理解成无限追问。问题应该沿依赖树推进，前置未定时不能问下游细节。

#### 11.2.2 `grilling`：用决策树和 frontier 管理追问

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/grilling/SKILL.md)

**一句话理解：** 把一个设计建模成决策树，每一轮只问前置条件已经稳定的 frontier，并给每题一个推荐答案。

**三个关键概念：**

- Decision tree：一个决定会解锁哪些后续决定；
- Prerequisite：回答当前问题前必须先稳定的上游决定；
- Frontier：此刻无需猜测就能回答的全部问题。

**一轮的正确形状：** 同时询问当前 frontier 上的所有独立问题；每题编号，说明为什么要问，并给出推荐答案；然后等待用户回答，重新计算下一轮。

**事实与决定的边界：** “当前框架支持什么”由 Agent 查；“团队愿意承担哪种兼容成本”由用户定。一个好的 grilling 会减少用户负担，而不是把代码库调查伪装成访谈。

**UI 客户端操作例：** 在决定错误详情如何展示前，必须先知道目标用户是谁、错误是否可恢复；“复制诊断信息按钮放哪”不是第一轮问题。

**产物与验收：** 没有问题依赖同轮尚未回答的问题；每轮结束后设计树被更新；frontier 为空才声明共同理解；在用户确认之前不进入实施。

**新手误区：** 一次列 30 个问题，表面全面，实际把前置与下游混在一起，用户只能凭空猜。

#### 11.2.3 `handoff`：让工作跨会话旅行，但不复制整个世界

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/handoff/SKILL.md)

**一句话理解：** 把当前会话压缩成一份放在系统临时目录的交接文档，让新 Agent 从权威产物继续。

**什么时候用：** 新工具、新目录、新同事、侧任务，或当前上下文必须跨越 harness。

**什么时候别用：** 仍在同一阶段且上下文健康；只需要开一个短子任务；spec、ticket 和 commit 已足够描述后续工作时不应重复抄写。

**必须包含：**

- 目标与当前状态；
- 已完成和未完成；
- 权威文件、issue、commit、diff 的指针；
- 当前验证结果及时间边界；
- 风险、阻塞和下一步；
- suggested skills；
- 敏感信息脱敏说明。

**UI 客户端操作例：** 原会话完成了错误状态规格，新会话只负责制作 UI prototype。handoff 指向 spec 和原型目标，不重贴全部访谈；明确“不要写生产代码”和验收问题。

**产物与验收：** 文档位于 OS 临时目录，不污染仓库；新 Agent 无需重问已决定内容；没有密钥、个人路径和原始敏感日志；旧的测试结果被标为历史快照。

**新手误区：** 把聊天摘要当事实源。真正稳定的事实应在 spec、ticket、代码和测试里，handoff 只做索引与状态压缩。

#### 11.2.4 `teach`：把一次问答变成跨会话学习工作区

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/teach/SKILL.md)

**一句话理解：** 围绕学习使命建立持久目录，用短课、参考材料、学习记录和反馈练习提升长期掌握。

**工作区组成：**

- `MISSION.md`：为什么要学，所有课程的判断基准；
- `RESOURCES.md`：高可信知识来源；
- `lessons/*.html`：一次只教一个小目标；
- `reference/*.html`：可反复查阅的压缩知识；
- `learning-records/*.md`：非显然的学习进展和修正；
- `assets/*`：课程复用组件；
- `NOTES.md`：教学偏好和工作笔记。

**学习原则：** 知识获取阶段降低无关难度；技能训练阶段通过检索练习、间隔和交错增加“有益难度”；不要把当下答得快误认为长期记得住。

**UI 客户端操作例：** 新人要学会诊断跨层 bug。第一课只练“构造 red-capable 命令”，第二课再练最小化，第三课混入事件乱序案例；每课都能在十几分钟内完成并得到即时反馈。

**产物与验收：** 每课与 mission 直接相关；有一手资料；练习难度落在当前最近发展区；课程短而可完成；长期进展写进 learning record，而不是依赖聊天记忆。

**新手误区：** 一次生成一门宏大课程，内容很多但没有练习反馈，也没有后续会话可读取的学习状态。

#### 11.2.5 `to-questionnaire`：把别人脑中的信息异步取回来

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/to-questionnaire/SKILL.md)

**一句话理解：** 当用户无法回答主题本身时，只采访“发给谁、需要拿回什么”，再为真正知情者写问卷。

**什么时候用：** 关键事实掌握在安全、运维、设计、法务、支持或外部供应商等另一位专家手里。

**核心原则：** Grill the send, not the subject。用户总能回答收件人是谁、需要什么决定；不强迫用户替专家猜答案。

**文档结构：**

1. 标题、Purpose、From/To、答案用途；
2. 足够回答的 Context；
3. How to answer：期限、预计耗时、允许“不知道”；
4. 按重要性排序的主题问题；
5. 每个问题只问一个概念，必要时写 why this matters；
6. Anything else。

**UI 客户端操作例：** 团队要设计企业代理设置，但网络管理员才知道认证、证书和例外域名。问卷应询问这些事实会影响哪些决定，而不是问“您觉得页面怎么设计”。

**产物与验收：** `to-questionnaire-<slug>.md` 存在；用户列出的每个信息缺口都有问题；最重要问题在前；收件人无需了解原对话也能回答。

**新手误区：** 写成满意度调查或把多个问题塞进一句；异步场景可能只有一次回复机会。

#### 11.2.6 `wait-what`：上一条没听懂，先退回共同前提

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/wait-what/SKILL.md)

**一句话理解：** 它要求 Agent 为上一条回复补少量背景，用 ASD-STE100 风格的简明英语和项目共同语言重新表达。

**什么时候用：** 回复跳步、术语密集、缺失前提，用户知道“没听懂”但不确定从哪里断线。

**什么时候别用：** 需要修改事实或方案；这不是“说得更简单就算修复”的替代品。

**UI 客户端操作例：** Agent 突然说“把该 adapter 设为 seam 可以提高 locality”。调用后，它应先解释调用方目前被迫知道哪些内部步骤，再用 `CONTEXT.md` 已有词汇重讲 adapter、seam 与 locality。

**可直接使用的输入：**

```text
/wait-what
```

**产物与验收：** 新解释补回缺失上下文；句子短；术语与领域文档一致；不是简单同义改写原句。

**新手误区：** 因为没听懂就让 Agent 从头重写整份文档。先修复刚刚断掉的那一步，成本更低。

#### 11.2.7 `writing-for-agents`：写给 Agent 的文档要改变行为

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/writing-for-agents/SKILL.md)

**一句话理解：** 用 context pointer、信息层级、明确步骤和完成条件，让 Agent 每次运行采取同一过程，而不是生成同一句输出。

**两个负担：**

- Context load：总在上下文里的文字成本，例如根指导文件；
- Cognitive load：人需要记住有哪些文档、何时调用的成本。

**context pointer 的两个任务：** 说明目标材料是什么；写清哪些不同分支会触发读取。一个重要文档藏在模糊指针后面，是可重复性缺陷。

**信息层级：**

1. 当前文件中的执行步骤；
2. 当前文件中的按需参考；
3. 由精准指针指向的外部参考。

**UI 客户端操作例：** 根指导文件不应粘贴整套跨进程安全规范，只需写：“修改 renderer 与主进程数据通道时，先读取 `docs/security-boundaries.md` 并运行边界测试。”这条指针同时有触发和动作。

**写 Skill 时的验收：** description 能触发正确分支；步骤顺序可执行；边界与完成条件可观察；引用文件有达到条件；删除无行为影响的 no-op 句子。

**新手误区：** 通过加粗“必须”“绝对”来提高权威感。若一句话没有改变 Agent 下一步，语气再强也只是上下文噪音。

### 11.3 Misc：四个强场景、强工具约束的 Skill

Misc 不是“低价值”，而是“适用面窄”。使用前先确认仓库、运行时和团队政策真的匹配，不要把作者自己的工具链习惯误当通用工程原则。

#### 11.3.1 `git-guardrails-claude-code`：在 Claude Code 执行前拦截危险 Git 命令

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/misc/git-guardrails-claude-code/SKILL.md)

**一句话理解：** 安装 Claude Code `PreToolUse` hook，在 Bash 命令真正执行前阻止 push、hard reset、强制 clean 等动作。

**默认拦截：** `git push`、`git reset --hard`、`git clean -f/-fd`、`git branch -D`、`git checkout .`、`git restore .`。

**什么时候用：** 团队允许 Agent 读写本地仓库，但所有远程推送和破坏性 Git 动作必须由人单独授权。

**什么时候别用：** 当前不是 Claude Code；已有组织级命令策略；或者直接复制配置会覆盖现有 hooks。

**执行顺序：**

1. 选择项目级还是全局；
2. 复制 hook 脚本并赋执行权限；
3. 把 hook 合并进现有 settings，不覆盖其他数组项；
4. 询问团队是否调整阻止模式；
5. 用模拟 `git push origin main` 的 JSON 输入验证 exit code 2 和 BLOCKED 信息。

**UI 客户端操作例：** 新人练习 Agent 协作时可以允许本地提交，但避免未经复核就推送远程。项目级 hook 随仓库共享，全球设置则影响所有项目，二者不能悄悄替用户选择。

**产物与验收：** hook 文件存在且可执行；settings 合并正确；危险样例被拒绝；普通只读 Git 命令不受影响。

**新手误区：** 认为写进规则文件就能阻止命令。真正的 guardrail 必须位于运行时执行边界，并用可观察失败验证。

#### 11.3.2 `migrate-to-shoehorn`：只在测试里减少大型对象伪造

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/misc/migrate-to-shoehorn/SKILL.md)

**一句话理解：** 在 TypeScript 测试中，用 `@total-typescript/shoehorn` 的 helper 替换脆弱的 `as Type` 和双重断言。

**适合：** 测试只关心大型对象的少数字段；为了错误路径测试，需要故意传入错误类型；仓库已经接受该依赖。

**明确不适合：** 生产代码。原文强调 shoehorn 只用于 test data。

**三种 helper：**

| helper | 用途 |
|---|---|
| `fromPartial()` | 只提供部分字段，同时保留字段类型检查 |
| `fromAny()` | 故意构造错误类型的输入 |
| `fromExact()` | 要求完整对象，之后可再切回 partial |

**UI 客户端操作例：** 一个窗口对象有几十个字段，测试只关心 `id` 和 `isVisible`。使用 partial helper 比伪造整棵对象或 `as unknown as WindowState` 更清楚。

**产物与验收：** 依赖仅在 devDependencies；目标测试中的断言被有意选择的 helper 替换；typecheck 与测试通过；没有扩散到生产目录。

**新手误区：** 机械替换所有 `as`。类型断言可能有不同语义，迁移前必须先理解测试为什么需要不完整或错误数据。

#### 11.3.3 `scaffold-exercises`：按固定课程结构生成可 lint 的练习骨架

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/misc/scaffold-exercises/SKILL.md)

**一句话理解：** 为特定课程仓库创建编号 section、exercise，以及 problem/solution/explainer 目录，并通过专用 lint。

**什么时候用：** 当前仓库确实使用 `pnpm ai-hero-cli internal lint` 和上游规定的练习布局。

**什么时候别用：** 普通产品仓库。不要仅因为“要写教程”就引入一套不匹配的课程目录。

**核心规则：** section 使用 `XX-name`；exercise 使用 `XX.YY-name`；每题至少有一个 variant；每个 variant 有非空 `readme.md`；有代码时 `main.ts` 不得是空壳；移动时使用 `git mv`。

**UI 客户端操作例：** 团队要做“状态管理诊断练习”。如果课程仓库匹配，先建 explainer；需要动手时再增加 problem 和 solution，而不是在产品源码旁生成练习目录。

**产物与验收：** 目录编号连续；readme 无断链；专用 lint 通过；重命名保留历史；提交只包含计划中的练习骨架。

**新手误区：** 看到一个 Skill 能生成目录就拿来做任何脚手架。Skill 的完成命令和目录规则已经把它绑定到特定仓库。

#### 11.3.4 `setup-pre-commit`：为已有 Node 仓库接入提交前检查

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/misc/setup-pre-commit/SKILL.md)

**一句话理解：** 检测包管理器，安装 Husky、lint-staged 和 Prettier，把格式化、typecheck 和测试接入 pre-commit。

**前置检查：** 包管理器锁文件；已有 Husky/Prettier/lint-staged 配置；`package.json` 是否真的有 `typecheck` 和 `test`；团队是否接受提交时运行完整测试。

**执行顺序：**

1. 检测 npm/pnpm/yarn/bun；
2. 安装 devDependencies；
3. 初始化 Husky；
4. 写 `.husky/pre-commit`；
5. 写或合并 lint-staged；
6. 仅在不存在时创建 Prettier 配置；
7. 验证 hook、prepare、执行权限和实际命令；
8. 用一次提交作为烟雾测试。

**UI 客户端操作例：** 大型桌面客户端完整测试需要十分钟，直接塞进 pre-commit 会伤害反馈。此时应先讨论把快速目标检查放 pre-commit、完整检查放 CI，而不是机械照抄。

**产物与验收：** 不覆盖已有配置；使用真实包管理器；缺少脚本时删除对应行并报告；一次实际提交能证明 hook 生效。

**新手误区：** 把“检查越多越安全”当绝对真理。慢到大家绕过的 hook 不是可靠门禁。

### 11.4 In-progress：八个实验 Skill，先读稳定性再试

这一组目录名就是警告。它们可以提供设计灵感，但名称、接口、工具依赖和工作流都可能变化。新人应先掌握前面的稳定 Skill，再在隔离分支或练习仓库里试。

#### 11.4.1 `claude-handoff`：把 handoff 直接启动成后台 Claude Agent

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/claude-handoff/SKILL.md)

**一句话理解：** 它不把交接只保存成文件，而是把脱敏摘要作为 prompt 传给 `claude --bg --name`，让后台 Agent 立即在当前目录接手。

**与稳定 `handoff` 的差别：** 稳定版产出可携带文档；实验版直接启动特定 CLI 的后台任务，运行时耦合更强。

**输入与步骤：** 根据用户给的下一阶段目标压缩对话；引用已有 spec、issue、commit 而不复制；加入 suggested skills；脱敏；使用描述性名称启动后台任务。

**UI 客户端操作例：** 当前 Agent 完成需求澄清，后台 Agent 只负责官方 API research。摘要应指向研究问题和输出路径，不能把本地 token、用户数据或完整聊天塞进命令参数。

**产物与验收：** 后台任务有可识别名称；工作目录正确；摘要有边界和指针；用户能通过 `claude agents` 管理；敏感信息未进入 prompt。

**实验风险：** CLI 参数、后台 Agent 能力和会话管理均为工具特定，不能当成跨 Agent 标准。

#### 11.4.2 `implement-spec`：把一份规格实现为单分支 PR 的并行任务图

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/implement-spec/SKILL.md)

**一句话理解：** 读取 spec 与 ticket 依赖图，持续抓取当前 frontier，通过多个 worktree/branch 并行实现，最终汇总到一个 PR。

**与稳定 `implement` 的差别：** 稳定版处理一块已定义工作；实验版是高并发编排器，负责 draft PR、多个 implementer、merger、frontier 更新和收尾 review。

**执行顺序：**

1. 读 spec 和 tickets，理解 task graph；
2. 必要时先让 exploration Agent 把共享研究保存到 repo 外；
3. 创建分支和 draft PR；
4. 为当前 frontier 的 tickets 分配独立 worktree；
5. 完成后由 merger 合入 PR 分支；
6. 依赖解除后启动下一批；
7. 全部完成后运行 code review 并集中修复；
8. 标记 ready，清理 worktrees。

**UI 客户端操作例：** “账号配置”有四张票，其中 UI 文案与配置存储可并行，真实请求依赖两者。task graph 应让前两张同时开始，不能按票号盲目串行。

**产物与验收：** 所有 tickets 在同一 PR 可追溯；依赖得到尊重；subagent 通过 context pointers 共享资料；worktree 清理完成；最终 review 有证据。

**实验风险：** 需要可靠的并行 Agent、worktree 和 PR 权限；缺任一项都应降级到稳定 `implement`，不能伪造并行完成。

#### 11.4.3 `loop-me`：把生活或工作中的重复循环写成可实现 workflow

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/loop-me/SKILL.md)

**一句话理解：** 用 stateful grilling 发现重复 loop，并把它们变成 `workflows/*.md` 中实现者无需再问问题的规格。

**核心词：**

- Trigger：事件或日程如何启动一轮；
- Checkpoint：哪些点必须由人决定；
- Push right：把人工确认尽量推迟，让自动部分先做完；
- Brief：给人的是决策摘要和资产指针，不是未经处理的原始输出。

**UI 客户端操作例：** 每周整理崩溃报告是一个 loop。workflow 可以在新报告到达时触发，自动聚类并生成 brief，只在需要决定优先级时设置一次 checkpoint。

**产物与验收：** `NOTES.md` 记录用户世界和术语；每个 workflow 有触发、步骤、外部系统、checkpoint、brief 和完成状态；实现者无需追加问题。

**实验风险：** 不要为了“自动化”强加 AI、定时器或 checkpoint。原文明确要求只有 grilling 证明需要时才加入结构。

#### 11.4.4 `retro`：复盘 Agent 环境，而不是评价一次回答好不好

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/retro/SKILL.md)

**一句话理解：** 从真实会话一手记录寻找环境改进，让下一次 Agent 更容易找到信息、得到反馈并少走弯路。

**候选类别：** Navigation、Automated checks、Coding standards、Global guidance、Tool economy、No-ops、Information access。

**关键分工：** 实现 Agent 上下文压力最大，应少背规范；review Agent 只需读 diff，更适合执行细致标准。根指导文件应该保留导航指针，具体标准放到 review 或自动检查。

**UI 客户端操作例：** Agent 三次才找到设置迁移入口。retro 可以建议在领域文档加导航指针；若错误可被静态测试捕获，则优先新增自动检查，而不是再写一句“请小心”。

**产物与验收：** 候选按严重度排列；每项都有会话证据、建议放置位置和预期行为变化；不会把偶发偏好升级成全局规则。

**实验风险：** 会话日志可能含隐私，读取、摘录和发布前必须单独脱敏；改环境前仍需维护者确认。

#### 11.4.5 `setup-ts-deep-modules`：用 dependency-cruiser 把深模块边界变成硬检查

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/setup-ts-deep-modules/SKILL.md)

**一句话理解：** 在 TypeScript 仓库中规定包根文件是公开入口，任意子目录都是私有实现，并用 dependency-cruiser 证明违规会失败。

**四条边界：**

1. 包外只能导入包根入口；
2. 包内文件可自由互相导入；
3. 测试也必须经入口验证，不得深导入内部；
4. 禁止依赖环。

**执行顺序：** 检测包管理器和 packages root；合并而非覆盖既有配置；安装依赖；写四条规则；接入 umbrella check；创建 example package；完成 pass → 人工加入 deep import 后 fail → 删除后 pass；最后写包目录 README 和根指针。

**UI 客户端操作例：** `settings` 包公开 `loadSettings` 与 `saveSettings`，内部迁移和文件实现放在 `lib/`。其他包深导入 `lib/migrate` 时，边界检查必须失败。

**产物与验收：** 最关键证据不是配置文件存在，而是同一规则真的观察到 pass-fail-pass；文档说明多个小入口优于一个巨型 barrel。

**实验风险：** 这是侵入性工具链改动。大型既有仓库应先在一个包或分支试验，评估历史 deep import 的迁移成本。

#### 11.4.6 `writing-fragments`：探索期只采集有生命力的写作碎片

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/writing-fragments/SKILL.md)

**一句话理解：** 写作 explore 阶段不排结构，只把可能进入成稿的句子、论点、片段、类比和 leading word 追加到 Markdown。

**片段可以是什么：** 一句锋利表达、带理由的主张、场景、代码、半成品想法、引语、观察簇，或能支撑全文的 leading word。

**文件规则：** 首次只写一个工作标题；片段之间用水平线分隔；正文内部不加层级和标签；每次写前重读磁盘；默认追加，不覆盖用户手工调整。

**UI 客户端操作例：** 为“AI 协作中的反馈环”写文章时，可以先保存“旧测试是历史，不是当前证据”这类句子、一次失败场景和“反馈债务”这个 leading word，不急着决定章节。

**产物与验收：** 每个片段作者自己能看懂；没有为了完整性补造素材；用户删改或重排后下一次追加不会覆盖。

**实验风险：** 这是写作能力，不是工程需求 Skill；不要在产品实现流程里自动触发。

#### 11.4.7 `writing-beats`：从固定素材中选择一条可达的叙事路径

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/writing-beats/SKILL.md)

**一句话理解：** 写作 exploit 阶段把素材当成固定矿堆，先确定读者已知概念，再逐 beat 选择下一步，每个 beat 只能依赖已经 grounded 的概念。

**工作循环：**

1. 确认读者带着哪些 prerequisite 进入文章；
2. 给 2–3 个可达的起始 beat，说明各自会引入什么概念；
3. 用户选一个，只把这个 beat 写进文章；
4. 重读文章；
5. 再给 2–3 个当前可达的下一 beat；
6. 直到自然结束。

**UI 客户端操作例：** 文章要讲“red-capable 反馈环”。如果读者还不知道 seam，就不能在第一段直接用“公共 seam”论证测试位置；要先用失败命令的场景把反馈环 grounded。

**产物与验收：** 有持续更新的 grounded 概念集合；每个 beat 都能说明需要哪些前提、引入什么；素材不足时明确指出缺口，不凭空扩写。

**实验风险：** 逐 beat 需要频繁人机选择，不适合用户想一次性自动生成完整文章的场景。

#### 11.4.8 `writing-shape`：从固定素材中逐段塑造一篇文章

[固定版本原文](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/in-progress/writing-shape/SKILL.md)

**一句话理解：** 同样属于 exploit，但粒度从“叙事 beat”变成“段落或内容块”，并要求每种格式都有理由。

**工作循环：** 通读素材；确认 reader prerequisites；给 2–3 个不同论点的开头；用户选择；逐段追问“读者下一步必须知道什么”；决定用 prose、list、table、callout、quote 还是 code；每次写后重读磁盘。

**格式判断：**

- prose 承担论证，list 承担真正并列项；
- callout 只容纳会打断主线的提示；
- 相同字段重复三次以上再考虑 table；
- 原措辞本身重要才引用，否则转述；
- 多行、可运行或示意代码使用 code block。

**UI 客户端操作例：** 把一组 Skill 访谈笔记整理成教程。开头承诺解决“为什么 Agent 总在没问清时开工”，后续段落若漂到工具安装，应回到开头承诺或调整 thesis。

**产物与验收：** 原材料只读；成稿单独保存；每个块对读者有新作用；未 grounded 的概念先补基础；素材缺例子时要求用户提供或删掉该论证。

**实验风险：** 它不是发布、平台排版或事实研究工具；这些必须由其他流程承担。

### 11.5 把 37 个名字压缩成 6 个新手问题

当你不确定时，不必从头翻这一章。只回答下面六问：

1. **需求还没问清吗？** 无仓库用 `grill-me`，有仓库用 `grill-with-docs`，超出一个会话用 `wayfinder`。
2. **决定已经清楚了吗？** 写 `to-spec`；需要多人或多会话交付，再用 `to-tickets`。
3. **现在已经进入施工了吗？** 用 `implement`，在预定 seam 内按需加载 `tdd`，结束前 `code-review`。
4. **是一个难 bug 吗？** 用 `diagnosing-bugs`，先拿到稳定红色。
5. **复杂度或词义正在泄漏吗？** 词义用 `domain-modeling`，模块形状用 `codebase-design`，候选调查用 `improve-codebase-architecture`。
6. **问题必须跨人、跨工具或跨会话吗？** 用 `to-questionnaire`、`wizard` 或 `handoff`，分别对应“答案在别人脑中”“动作只有人能做”“工作需要旅行”。

---
