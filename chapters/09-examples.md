## 第 8 章 · 七个 UI 客户端实例，从浅到深

以下案例使用一个匿名桌面 AI 客户端作为教学背景。它有 renderer、preload、main 进程，支持多语言、Provider 配置和定时任务。所有名字、数据和代码均为公开可复现的合成示例。

### 实例一：设置页改一个文案

#### 任务

把设置页按钮从「保存」改成「保存并验证」，所有语言保持一致。

#### 传统开发的自然反应

全文搜索中文，找到 JSX，直接改字。

#### AI 协作里的风险

- 文案可能来自 i18n key，不在组件里；
- 不同 locale 可能漏改；
- 按钮行为没有验证逻辑，文案会承诺不存在的能力；
- 测试可能只断言旧 key。

#### Skill 选择

这是小改动，不需要完整规格链。先确认需求真实含义，必要时用 `ask-matt`；实现时使用项目既有验证，不启动 `wayfinder`。

#### 推荐输入

```text
请先定位按钮文案来源和现有点击行为。
确认“保存并验证”是否已经有对应验证动作；如果没有，停止并说明这是功能变化，不是纯文案变化。
如果行为已经存在，只修改语义 key 和所有 locale，并运行最小 i18n 检查。
```

#### 应留下的证据

- 被修改的语义 key；
- locale 完整性检查；
- 目标组件或交互测试；
- 没有新增硬编码用户文本的扫描结果。

#### 验收

- 文案与真实行为一致；
- 所有受支持语言均有值；
- 当前检查重新运行，而不是引用旧日志。

### 实例二：先做定时任务推荐面板原型

#### 任务

团队还没决定推荐项应该和现有任务列表并排，还是单独放在顶部。

#### 错误做法

直接进入产品代码，接真实任务数据，补状态管理和错误处理，然后让产品在接近完成时选布局。

#### Skill 选择

问题是「哪种结构更容易理解」，不是「怎样写生产代码」。使用 `prototype`。

#### 原型问题

```text
我们只需要回答一个问题：
推荐任务与现有任务，是并排比较更清楚，还是先处理推荐再进入列表更清楚？

请在同一路由提供三个结构明显不同的变体：
1. 左右双栏；
2. 顶部推荐带 + 下方任务表；
3. 统一列表，用来源标签区分。

使用固定假数据，不接真实 API，不进入生产状态管理。
```

#### 应留下的证据

- 一条启动命令；
- 三个结构差异足够大的变体；
- 评审人选择与理由；
- 被淘汰方案的关键失败点；
- 一条可以写进 spec 的明确决定。

#### 验收

原型回答了结构问题就结束。不要因为代码看起来能用，就直接合并到主分支。

### 实例三：推理强度保存后被重置

#### 症状

用户把某个 Provider 的推理强度设为 high，界面当下显示正确；重启客户端后恢复为 medium。

#### 错误做法

先搜索 `reasoning`，看到一个默认值，就把 medium 改成 high。

#### Skill 选择

使用 `diagnosing-bugs`。这类问题可能发生在 renderer state、IPC payload、main 持久化、schema 默认值或反序列化任一环节。没有反馈环时，任何理论都只是猜。

#### 建立 red-capable 命令

```text
目标症状：通过公共设置接口保存 high，重建应用状态后读取，得到 medium。

先写一条最小集成测试，只穿过公开设置接口：
1. 创建临时配置目录；
2. 保存 reasoningEffort=high；
3. 销毁并重新创建配置服务；
4. 读取同一 Provider；
5. 断言仍为 high。

运行目标测试，确认当前实现因实际症状失败后，再列假设。
```

#### 排序假设示例

1. 写入 schema 未包含该字段，因此序列化时丢失；
2. IPC contract 接收字段，但 main 侧映射遗漏；
3. 读取 schema 把合法 high 误判为未知值并回退；
4. renderer 重启后读取了另一份配置作用域。

每个假设都要有预测。例如假设 1 的预测是：磁盘文件中不存在 `reasoningEffort`，但 IPC 请求载荷存在。

#### 验收

- 目标命令先红后绿；
- 最小复现成为回归测试；
- 一次只验证一个假设；
- 临时日志全部清理；
- 不把默认值修改伪装成持久化修复。

### 实例四：新增一个 Provider 垂直切片

#### 任务

新增一个需要 API key 的 Provider，用户可以保存、验证、设为默认并删除。

#### 为什么不能直接 implement

至少有这些未决问题：

- key 存在哪里；
- renderer 是否能读取明文；
- 验证失败有哪些可区分状态；
- 删除默认 Provider 后怎样回退；
- 离线时能否保存但暂不验证；
- 测试 seam 是设置服务、IPC contract 还是端到端 UI。

#### Skill 链

```text
grill-with-docs
  → 必要时 prototype
  → to-spec
  → to-tickets
  → implement（一张票一个会话）
  → code-review
```

#### 规格中的关键内容

```markdown
## User Stories

1. As a user, I can save a Provider credential without exposing its plaintext to the renderer.
2. As a user, I can verify the credential and see distinct invalid, offline, and server-error states.
3. As a user, I can make a verified Provider the default.
4. As a user, deleting the default Provider selects a valid fallback or returns to an unconfigured state.

## Testing Decisions

- Primary seam: public Provider settings service.
- Contract coverage: typed request/response schema.
- UI coverage: one happy path and three user-visible failure states.

## Out of Scope

- Provider-specific billing UI.
- Automatic key rotation.
- Import from other clients.
```

#### Tracer-bullet tickets

1. 保存最小配置并在重启后读取；
2. 验证凭据并显示区分后的结果；
3. 设为默认并用于一次请求；
4. 删除默认项并安全回退。

每张票都包含一个用户可观察行为，不按 renderer/main/test 横向拆。

#### 验收

- 规格中有明确 seam 与 out-of-scope；
- 每张票都可单独演示；
- secret 不进入日志、截图和聊天；
- Standards 与 Spec 两条 review 轴分别给出结论。

### 实例五：把配置模块做深

#### 症状

新增任何 Provider 都要同时修改六个文件：默认值、序列化、验证、UI 映射、删除回退和测试 fixture。调用方知道过多内部规则。

#### Skill 选择

先用 `improve-codebase-architecture` 形成候选，不直接重构。讨论时使用 `codebase-design` 的精确词汇。

#### 候选描述

```text
当前配置 module 很浅：
它的 interface 暴露存储格式、默认值选择和删除回退，
调用方需要重复维护同一组不变量。

候选方向：
把 Provider 生命周期规则放进一个更深的 module，
对外只暴露 register、verify、selectDefault、remove 四个行为。
```

#### 必须回答的问题

- 复杂度是否真的会集中，还是只是换一层包装；
- 删除该模块后，复杂度会不会重新散到调用方；
- 当前是否存在两个真实适配器，足以证明 seam；
- 测试能否只通过 interface 观察行为；
- 迁移是否需要 expand–migrate–contract。

#### 验收

- 重构由实际霰弹式修改证据驱动；
- interface 比实现显著更小；
- 不新增纯转发 wrapper；
- 行为测试在重构前后保持；
- 相关 ADR 若存在，明确说明是否冲突。

### 实例六：合并两条都正确的分支

#### 冲突

分支 A 把 `providerId` 重命名为 `connectionId`，因为领域语言发生变化；分支 B 在旧字段上增加了删除默认项后的回退验证。

#### 错误做法

整批选 `--ours` 保留重命名，或整批选 `--theirs` 保留验证。

#### Skill 选择

使用 `resolving-merge-conflicts`，逐 hunk 读取两边意图。

#### 意图合并

正确结果通常是：保留新领域词 `connectionId`，同时把 B 的回退验证迁移到新字段和新接口上。文本上不是任何一侧原样，但意图上保留了两侧价值。

#### 验收

- 每个 hunk 都能说明两侧原始意图；
- 没有批量 ours/theirs；
- merge/rebase 完成到终态；
- 类型检查、目标测试和格式化在合并后重新运行。

### 实例七：需要人工配置第三方密钥

#### 任务

代码已经支持 Provider，但需要团队管理员去第三方控制台创建 key，并写入 CI secret。

#### 错误做法

让管理员把 key 粘贴到聊天里，Agent 再执行命令。

#### Skill 选择

使用 `wizard` 生成交互式 Bash 脚本；Agent 不运行它。

#### 向导应该做什么

1. 打开官方控制台链接；
2. 提示管理员创建最小权限 key；
3. 使用无回显输入读取 key；
4. 写入本地 `.env` 或 CI secret；
5. 运行不暴露凭据的连通性检查；
6. 支持中断后重新开始。

#### 验收

- secret 从未进入聊天、日志和 shell history；
- 人只处理必须由人完成的外部步骤；
- 连通性检查输出脱敏；
- 向导文件可审阅、可重跑、可删除。

---
