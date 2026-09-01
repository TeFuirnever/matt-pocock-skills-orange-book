## 第 13 章 · 三个端到端操作案例：审报告、迁逻辑、修白屏

第 8 章解决的是「遇到某类任务，应该选哪个 Skill」。这一章再往前一步：把三个真实工程中常见的任务，从收到需求一直走到可验证完成。

这里不比较 Agent 品牌，也不复盘聊天过程。案例只关心五件事：任务怎样失败、为什么选择这些 Skills、Agent 具体执行什么、哪些失败可以降级、什么证据才允许宣布完成。

![三个端到端操作案例](assets/diagrams/end-to-end-operation-cases.png)

### 13.1 先看共同操作骨架

三个案例表面不同，底层都遵循同一条操作链：

```text
写出可观察目标
  → 找到拥有答案的代码、配置或文档
  → 选择能约束最大失败风险的 Skill
  → 建立修正前就能捕获问题的反馈环
  → 做最小修改
  → 重跑当前验证
  → 记录有限结论和未覆盖边界
```

开始前先写一张任务卡：

```markdown
## Goal
用户最终能观察到什么变化？

## Primary failure risk
这次任务最可能怎样“看起来完成、实际上失败”？

## Evidence owner
哪个代码、配置、外部文档或运行结果拥有答案？

## Red-capable check
哪条命令或哪个现象能在修正前暴露问题？

## Done
哪些新鲜证据同时成立，才允许结束？
```

这张卡不是形式主义。它会直接决定该用 `research`、`diagnosing-bugs`、`implement`，还是先退回 `grill-with-docs`。

### 13.2 案例一：审查一份技术报告的事实准确性

#### 任务

团队准备发布一份桌面客户端架构报告。报告里写了模块数量、状态枚举、调度阶段、公开接口和后端能力。文字已经很顺，但没有人能确认这些具体说法是否仍与当前仓库一致。

目标不是润色，而是把每个可证伪断言变成「有一手证据支持」「需要修正」或「当前无法确认」。

#### 最大失败风险

Agent 很容易继续用文字理解文字：发现前后不矛盾，就判断报告正确。可技术报告最危险的不是语病，而是一个过期数字、漏掉的状态，或者把默认路径写成唯一入口。

#### Skill 链

```text
research
  → code-review
  → writing-for-agents
```

- `research` 负责为每条断言找到真正拥有答案的一手来源；
- `code-review` 把事实错误与表达规范问题分开；
- `writing-for-agents` 把容易漂移的绝对表述改成能指导后续 Agent 回到证据的写法。

需求本身已经清楚，不需要重新 `grill`。报告也不是功能规格，不应该进入 `implement`。

#### 可直接交给 Agent 的输入

```text
审查 docs/architecture-report.md 的事实准确性，不要先改文风。

按以下顺序执行：
1. 抽取所有可证伪断言，优先处理数量、枚举、阶段、默认值、
   “全部”“唯一”“从不”这类绝对表述。
2. 为每条断言指定拥有答案的一手代码、配置或官方资料。
3. 实际读取定义并运行可重复检查；不要用另一份说明文档互相证明。
4. 输出断言账本：断言、证据、判定、建议改写、覆盖限制。
5. 只修改已被证据推翻的内容；无法确认的标为未知。
6. 修改后重新检查账本与报告是否一致。
```

示例路径只是占位符。真正执行时，Agent 必须先定位你的报告和代码边界。

#### 操作一：抽取断言，不要从头顺读

先把能被事实推翻的句子列出来：

```text
- 调度流程一共有四个阶段。
- ProviderManager 是唯一的请求入口。
- 所有后端都支持流式输出。
- 设置变更会立即持久化到磁盘。
```

「架构清晰」「体验流畅」不是这一轮的事实断言。把主观评价混进来，会让审查范围无限扩大。

#### 操作二：给断言分配证据所有者

| 断言类型 | 优先证据 | 不够强的证据 |
|---|---|---|
| 状态或阶段 | enum、schema、状态机分支 | 旧流程图、变量名 |
| 模块数量 | 当前注册表、目录清单、构建入口 | README 中的旧数字 |
| 唯一入口 | 调用关系、路由表、公开导出 | 只找到一个熟悉的调用点 |
| 能力支持 | 实际注册能力、功能开关、契约测试 | 接口里存在可选字段 |
| 持久化行为 | 写入与重建后的读取测试 | UI 当下显示正确 |

搜索命令要围绕断言，而不是漫无目的浏览：

```bash
rg -n '<状态名或阶段名>' src packages electron
rg -n 'register|provider|capabilities' src packages electron
rg -n 'persist|serialize|save|load' src packages electron
```

这些命令只负责定位候选。最终判定必须读取定义、调用关系或运行结果。

#### 操作三：维护断言账本

```markdown
| 断言 | 证据 | 判定 | 修改 |
|---|---|---|---|
| 调度流程有四个阶段 | 状态定义列出五个可达阶段 | 错误 | 改为五个，并列出名称 |
| 某模块是唯一入口 | 默认路由走该模块，但测试入口绕过 | 部分成立 | 改为默认生产入口 |
| 所有后端支持同一能力 | 两个后端没有显式能力声明 | 未知 | 删除“所有”，记录待验证范围 |
```

「没搜到」不能自动写成「不存在」。只有搜索范围、生成代码、动态注册和排除目录都被说明后，负向结论才有足够强度。

#### 操作四：分两轴修改

第一轴只处理事实：数字、状态、流程和能力。第二轴再处理文档规范：标题、术语、链接和可读性。

如果同时改事实和文风，reviewer 很难判断某段变化是纠错还是改写偏好。

#### 可以降级与不能降级

| 情况 | 能否降级 | 动作 |
|---|---|---|
| 代码图工具不可用 | 可以 | 用定向搜索、调用点清单和逐文件读取代替，注明覆盖范围 |
| 某条构建命令耗时过长 | 可以 | 先跑能直接验证该断言的目标命令，再决定是否扩大 |
| 找不到断言的一手来源 | 不可以猜 | 标为未知，交给维护者或删除绝对表述 |
| 报告与当前代码冲突 | 不可以用文档覆盖代码事实 | 修正文档，或另开明确的代码变更任务 |

#### 完成证据

- 每个已修改事实都能指向一手来源；
- 未验证内容仍明确标为未知；
- 报告没有用另一份二手文档自证；
- 事实 review 与文风 review 分开；
- 修改后重新运行了相关检查，而不是引用旧日志。

#### 举一反三

同一操作法可用于 API 文档、迁移指南、发布说明、ADR 和安全设计文档。只需替换断言类型与证据所有者，不要替换「先抽断言、再找一手证据」的顺序。

### 13.3 案例二：把配置规范化逻辑迁入中央同步处理器

#### 任务

桌面客户端有两类 Provider 配置：

- `custom` 保留用户填写的 endpoint 和 options；
- `preset` 必须移除 endpoint 和只对自定义模式有效的字段。

原逻辑散落在一个辅助函数中。现在要把完整语义收口到中央同步处理器，不新建文件，不顺手设计框架。

#### 最大失败风险

这不是把几个 `if` 复制到另一个文件。真正风险包括：

1. 漏掉原函数中的某个分支；
2. 新位置的输入处于不同生命周期；
3. `delete field` 与 `field = undefined` 在序列化后不等价；
4. 旧函数仍有调用者；
5. 类型检查通过，但持久化结果已经变化。

#### Skill 链

```text
implement
  → diagnosing-bugs（仅在验证失败时进入）
  → code-review
```

任务边界与目标位置已经确定，所以从 `implement` 开始。若测试或写入通道失败，再用 `diagnosing-bugs` 区分代码问题、测试问题和环境问题。最后用 `code-review` 分开检查工程标准与迁移规格。

#### 可直接交给 Agent 的输入

```text
将现有 Provider 配置规范化逻辑完整迁入 ConfigSyncService.sync。

约束：
- 不新建文件，不引入新依赖，不设计通用框架。
- 编辑前列出原逻辑的全部分支、调用者和不变式。
- 先用公共输入输出锁定 custom 与 preset 行为。
- 修改后逐分支双向对照，不能只报告 typecheck 通过。
- 特别检查字段删除与 undefined 在真实序列化边界是否等价。
- 只有确认旧 helper 无调用者后才能删除。
```

#### 操作一：把原语义写成行为表

| 输入 | 必须保留 | 必须移除 | 默认行为 |
|---|---|---|---|
| `kind=custom` | endpoint、options、credentialRef | preset-only fields | endpoint 去首尾空格 |
| `kind=preset` | id、model、credentialRef | endpoint、options | 使用注册表中的 endpoint |
| 未知 kind | 无 | 无 | schema 应先拒绝，不在同步器里静默猜测 |

这张表是迁移规格。没有它，Agent 只能比较两段代码长得像不像。

#### 操作二：先锁定公共行为

下面是教学用测试骨架，路径和 API 名称要替换为项目真实边界：

```typescript
it('preserves custom endpoint and options after sync', async () => {
  await syncService.sync({
    id: 'custom-a',
    kind: 'custom',
    endpoint: ' https://example.test/v1 ',
    options: { compatibility: 'openai' },
  });

  expect(await repository.read('custom-a')).toMatchObject({
    endpoint: 'https://example.test/v1',
    options: { compatibility: 'openai' },
  });
});

it('removes custom-only fields from preset serialization', async () => {
  await syncService.sync({
    id: 'preset-a',
    kind: 'preset',
    endpoint: 'https://stale.example.test',
    options: { compatibility: 'legacy' },
  });

  const persisted = await repository.readRaw('preset-a');
  expect(Object.hasOwn(persisted, 'endpoint')).toBe(false);
  expect(Object.hasOwn(persisted, 'options')).toBe(false);
});
```

第二个断言故意检查字段是否存在，而不只是值是否为 `undefined`。这样才能捕获序列化语义差异。

#### 操作三：运行修改前基线

```bash
pnpm vitest run tests/config-sync.test.ts
pnpm typecheck
```

这是行为保持型迁移，测试在修改前应该是绿色。若缺少覆盖，先补测试并确认它能在破坏某个不变式时变红，再开始移动代码。

#### 操作四：做最小迁移

编辑只完成三件事：

1. 在中央同步处理器中复现行为表；
2. 让现有入口经过新位置；
3. 在确认无调用者后删除旧 helper 和本次产生的无用 import。

不要趁机创建 `UniversalConfigNormalizer`、feature flag 或兼容层。只有真实调用方证明需要复用时，抽象才有成本收益。

#### 操作五：做双向语义对照

| 对照方向 | 问题 |
|---|---|
| 旧 → 新 | 旧逻辑的每个分支在新位置是否都有对应行为？ |
| 新 → 旧 | 新逻辑是否增加了原任务未要求的默认值、错误吞掉或字段变换？ |
| 调用方 | 是否仍有入口绕过中央处理器？ |
| 序列化 | `undefined`、缺失字段和 `null` 的最终 JSON 是否相同？ |
| 生命周期 | 规范化发生在校验前、校验后还是写盘前，是否改变错误行为？ |

#### 操作六：验证最终状态

```bash
pnpm vitest run tests/config-sync.test.ts
pnpm typecheck
rg -n 'legacyNormalizeProviderConfig' src packages electron
```

最后一条搜索应该没有有效调用者；但生成文件、fixture 和历史文档命中要逐项判断，不能看到任何命中就机械删除。

#### 失败分支

| 失败 | 正确处理 |
|---|---|
| 编辑工具拒绝目标路径 | 换可审查的编辑通道，保留同一补丁目标 |
| 测试失败且磁盘输出不符 | 进入 `diagnosing-bugs`，先判断迁移位置还是序列化假设错误 |
| typecheck 通过但 raw JSON 不同 | 以行为测试为准，类型检查不能替代持久化等价性 |
| 独立 reviewer 不可用 | 当前 Agent 串行执行 Standards/Spec 两轴 review，并明确验证边界 |
| 旧 helper 仍有调用者 | 暂不删除；完成调用方迁移或缩小本次范围 |

#### 完成证据

- 修改前后的行为测试都通过；
- custom、preset 与非法输入的分支完整；
- 原逻辑与新逻辑已双向对照；
- 持久化输出证明字段删除语义不变；
- 旧 helper 没有有效调用者；
- 没有新增与任务无关的抽象和依赖。

#### 举一反三

同一操作法可用于字段重命名、schema 升级、缓存归一化和 IPC payload 迁移。核心不是「搬代码」，而是先锁定公共行为，再证明新旧边界等价。

### 13.4 案例三：定位并修复 Electron renderer 白屏

#### 症状

设置页合入一个共享配置工具后，开发模式偶尔正常，打包后的桌面客户端启动却只显示白屏。DevTools 控制台出现：

```text
Dynamic require of "path" is not supported
```

目标不是让错误消失一次，而是找到 Node-only 依赖怎样进入 renderer，并建立以后能自动阻止同类回归的边界检查。

#### 最大失败风险

白屏可能来自 React 运行错误、资源路径、CSP、preload 失配、IPC 契约或 Node 依赖泄漏。直接升级打包器、打开 `nodeIntegration`，或者给 `path` 加 polyfill，都可能掩盖真正的进程边界破坏。

#### Skill 链

```text
diagnosing-bugs
  → tdd
  → code-review
```

- `diagnosing-bugs` 先建立稳定复现和导入链证据；
- `tdd` 把 renderer 不得 value-import Node-only 模块变成可自动执行的边界；
- `code-review` 检查修复是否遵守进程、安全与规格边界。

如果打包器行为不熟悉，才插入 `research`，并只查当前版本的官方文档。

#### 可直接交给 Agent 的输入

```text
修复打包后 renderer 白屏。不要先升级依赖或增加 polyfill。

1. 用当前打包产物稳定复现，并记录第一条根错误。
2. 从出错组件向下追踪完整 value-import 链，找到第一个 Node-only 边界。
3. 为每个假设写预测，并一次只验证一个。
4. 在修复前增加 renderer boundary 回归检查，确认它能因当前泄漏变红。
5. 若 renderer 只需要类型，改为 type-only import；若需要能力，通过 typed preload/IPC 暴露最小接口。
6. 重跑目标测试、renderer build 和桌面 smoke test。
7. 删除临时日志，不改变 nodeIntegration 等安全设置。
```

#### 操作一：建立可重复复现

至少保留两个反馈环：

```bash
pnpm vitest run tests/integration/renderer-boundary.test.ts
pnpm build:renderer
```

第一个负责快速边界回归，第二个证明真实打包链不再包含失败。若问题只出现在完整桌面包，再补最小启动 smoke；不要一开始就反复跑整个发布流水线。

#### 操作二：写出排序假设

| 顺序 | 假设 | 可观察预测 |
|---:|---|---|
| 1 | renderer value-import 了 Node-only 配置服务 | bundle 或导入图能追到 `path`、`fs` 或 Electron main 依赖 |
| 2 | preload 暴露对象与 renderer 类型不一致 | 控制台第一条错误是 API 缺失，而不是动态 require |
| 3 | 静态资源 base 路径错误 | Network 面板出现入口 JS 404，错误发生在业务模块加载前 |
| 4 | React 组件自身抛错 | bundle 能加载，错误栈停在组件逻辑且没有 Node 模块命中 |

当前错误文本强烈支持假设 1，但仍要用导入链证明，不能凭经验直接改。

#### 操作三：追踪第一条非法导入链

教学示例：

```text
SettingsPanel.tsx
  → @app/shared-config
  → ConfigFileStore
  → node:path
```

真正需要修复的是第一个不该跨过 renderer 边界的 value import，通常不是最底层报错的 `node:path`。

#### 操作四：先让边界测试变红

边界测试可以扫描 renderer 源码与构建产物，至少禁止：

- `node:*`、`fs`、`path`、`os`、`child_process`；
- Electron main-only 包；
- 会把上述依赖继续带入 bundle 的项目包；
- 绕过 preload 的直接系统访问。

测试必须先因当前导入链失败。一个从未捕获过问题的绿色测试，不能证明它约束了目标行为。

#### 操作五：按真实需求选择修法

| renderer 真正需要什么 | 修法 |
|---|---|
| 只需要 TypeScript 类型 | 使用 `import type`，保证运行时 bundle 不加载目标包 |
| 需要读取或写入本地配置 | main 执行文件操作，preload 暴露最小 typed API，renderer 通过 IPC 调用 |
| 需要纯函数转换 | 将纯函数拆到无 Node 依赖的共享模块，Node adapter 留在 main |
| 只是为了复用一个常量 | 把常量放到无副作用的契约包，不导入整个服务模块 |

一个最小 IPC 方向示例：

```typescript
// renderer
const config = await window.desktopApi.providerConfig.load();

// preload 暴露最小能力，文件系统仍留在 main
contextBridge.exposeInMainWorld('desktopApi', {
  providerConfig: {
    load: () => ipcRenderer.invoke('provider-config:load'),
  },
});
```

通道名、schema 和错误类型应来自项目现有 IPC 契约，不要照抄字符串创建第二套协议。

#### 操作六：分层验证

```bash
pnpm vitest run tests/integration/renderer-boundary.test.ts
pnpm build:renderer
pnpm test --filter settings-panel
```

然后启动打包产物或等价 smoke，确认：

1. 首屏不再白屏；
2. 设置读取仍可用；
3. DevTools 没有新的 preload/IPC 错误；
4. `nodeIntegration`、context isolation 和 CSP 没有被放宽；
5. 临时日志已清理。

#### 错误修法

- 给 `path` 或 `fs` 加浏览器 polyfill；
- 开启 renderer 的 Node 能力；
- 捕获启动异常后显示空页面；
- 只删掉报错 import，却不验证功能仍可用；
- 只跑单元测试，不重新构建 renderer；
- 因为开发模式正常，就忽略打包产物的真实错误。

#### 完成证据

- 有一条能稳定捕获非法导入的回归检查；
- 完整导入链已经记录，根因不是猜测；
- 修复保持 renderer/Node 安全边界；
- renderer 构建、目标功能测试和桌面 smoke 当前通过；
- 没有用安全降级或 polyfill 掩盖问题。

#### 举一反三

同一诊断方式可用于 Web Worker 引入 DOM API、SSR 代码引用浏览器全局、React Native 引入 Node 包，以及浏览器扩展 content script 越过权限边界。先找非法依赖怎样穿过边界，再决定是 type-only import、纯模块拆分还是受控桥接。

### 13.5 三个案例怎样选

| 你看到的症状 | 首个 Skill | 第一个产物 | 不可省略的验证 |
|---|---|---|---|
| 文档写得像真的，但数字和绝对表述很多 | `research` | 可证伪断言账本 | 断言到一手证据的映射 |
| 逻辑要从旧位置迁到新边界 | `implement` | 原行为与不变式表 | 新旧公共输出等价 |
| 客户端白屏或跨运行时失败 | `diagnosing-bugs` | 稳定复现与导入链 | 回归检查、真实构建、smoke |

不要因为都能用 `code-review`，就从 review 开始。review 是后置反馈；它不能替代一开始对事实、行为或根因的建模。

### 13.6 把案例映射到自己的仓库

复制下面模板，填真实路径和命令：

```text
任务：
一句话写出用户可观察结果。

最大失败风险：
哪一种假完成最危险？

Skill 选择：
哪个 Skill 直接限制这个失败风险？为什么不是别的 Skill？

证据所有者：
哪些代码、配置、官方资料或运行结果拥有答案？

操作顺序：
1. 修改前调查或基线。
2. 能捕获目标问题的反馈环。
3. 最小修改。
4. 失败分支与允许的降级。
5. 修改后的当前验证。

完成收据：
- 改了什么。
- 实际运行了什么。
- 证明了什么有限结论。
- 哪些范围没有验证。
```

如果模板里只填得出「让 Agent 看一下」「测试通过」，说明任务还没有形成可执行工程案例。继续缩小目标或补齐证据所有者。

### 13.7 本章验收

- 能按失败风险选择 Skill，而不是按 Agent 品牌或聊天习惯选择。
- 能把一个抽象要求拆成实际输入、命令、文件产物和验收证据。
- 能区分工具通道失败、工程假设被证伪和验证门槛失败。
- 能将案例迁移到新项目，同时保留反馈环与安全边界。
- 能说明当前证据证明了什么，也能说明它没有证明什么。

---
