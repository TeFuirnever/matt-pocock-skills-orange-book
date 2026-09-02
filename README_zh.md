# Matt Pocock Skills 橙皮书

![阿舟图解：Skill 不是更长的 Prompt](assets/azhou/skill-not-prompt.png)

> 不是背 37 个命令，而是学会在 AI 写代码之前、之中和之后，建立可复用的决策与反馈环。

这本橙皮书以 Matt Pocock 的公开仓库
[`mattpocock/skills`](https://github.com/mattpocock/skills) 为唯一主线，
面向刚从传统开发切换到 AI 协作开发的工程师。

## 阅读入口

| 入口 | 用途 |
|---|---|
| [在线阅读版](https://tefuirnever.github.io/matt-pocock-skills-orange-book/) | GitHub Pages 文档站，支持目录、搜索、移动端阅读和打印 |
| [实践路径](https://tefuirnever.github.io/matt-pocock-skills-orange-book/#practice-readme) | 六个实践关卡与一个综合交付，把阅读变成可验证的工程练习 |
| [book.md](book.md) | 权威正文，适合审阅、版本管理和引用 |
| [chapters](chapters) | 16 个编号章节源，是内容事实源 |
| [labs](labs) | 六个实践关卡与一个综合交付的权威 Markdown 源 |
| [html/index.html](html/index.html) | 本地 HTML 阅读版 |
| [research](research) | Matt Pocock 公开一手材料的研究底稿 |
| [assets/azhou](assets/azhou) | 15 张阿舟小白图解的最终 PNG |
| [assets/diagrams](assets/diagrams) | 10 张可编辑 Excalidraw 图源、SVG 和 PNG |

## 阿舟编辑与图解导航

阿舟是本书的编辑与图解伙伴：把可追溯的公开材料译成可执行、可验证的中文工程行动。
它坚持证据先行、人来定权衡、交付留痕；不是上游作者，也不替读者做取舍。

本书使用阿舟图解，把两个新人最容易混淆的判断先变得可见：Skill 是可重复的
工作方法，不是更长的一次性请求；Agent 应先查环境事实，再由人做取舍。它们是
本书原创的教学隐喻，不是 Matt Pocock 原话、上游一手材料，也不代表作者背书。

![阿舟图解：事实、取舍与规格的分流](assets/azhou/decision-source-router.png)

仓库只收录可公开分发的最终 PNG。阿舟 Skill 源码、角色母版、提示词、模板、
运行文件、回执和审计材料均不进入仓库；正文事实仍以固定上游提交和
`research/` 下的材料记录为准。

## 这次不再只做索引

正文逐项讲解固定版本中的 37 个 Skill。每个 Skill 都尽量回答：

1. 一句话应该怎样理解；
2. 什么时候用，什么时候不要用；
3. 开始前必须提供什么；
4. Agent 应按什么顺序执行；
5. 在教学用桌面 UI 客户端里会怎样落地；
6. 应留下什么文件、决定或命令证据；
7. 新人最容易犯什么错误。

此外还有 7 个由浅入深的合成案例，从文案小改、UI 原型、疑难 bug，
一路到垂直切票、深模块、冲突解决和人工密钥向导。第 0 章先按小白、
中级和高阶给出三条阅读路径，不要求所有人从头顺序读到尾。

读完对应章节后，读者进入同一条实践路径：先查证一个工程结论，再把
决策写成规格，让 bug 先变红，用最小修复闭合证据，分开两条 review 轴，
交接前先复述，最后完成一次可交接交付。每关都明确要求留下产物、验收
证据和停止条件。

第 12 章吸收 15 条 Matt Pocock 公开一手材料，区分固定仓库事实、后续官方站表述
和本书的工程推论。第 13 章给出审报告、迁逻辑、修白屏三个端到端操作案例，
第 14 章提供 37 个 Skills 的完整索引、资料来源与适用边界。

## 材料基准

- 当前阅读版：`v0.1.0`
- 上游仓库：[`mattpocock/skills`](https://github.com/mattpocock/skills)
- 固定提交：[`6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76)
- 提交时间：2026-08-24
- 书稿核验日期：2026-09-01
- 范围：18 个 engineering、7 个 productivity、4 个 misc、8 个 in-progress

仓库后续会变化，尤其是 `in-progress`。本书只对固定提交负责，不把实验目录写成稳定接口。
页面只会在存在至少两份真实发布版时显示版本选择器；当前显示本版标签，未来历史版会保持可读并标注为历史快照。

## 公开边界

所有 UI 客户端示例都是为教学构造的可迁移场景。仓库不包含：

- 私有项目名、私有源码和内部接口；
- 用户本机绝对路径；
- 密钥、账号、客户或发布信息；

书中讲的是公开 Skill 如何用于一类工程问题，读者应把示例路径、命令和验收映射到自己的项目。

## 构建与公开审计

```bash
npm ci
npm run check
```

`chapters/` 下 16 个编号 Markdown 和 `labs/` 下六个实践关卡、一个综合交付是内容事实源。
构建脚本依次装配出 `book.md`、`html/index.html`、`html/book.html` 和
`html/labs/` 下的独立实践页面，并复制全部 PNG 到 `html/assets/`。公开审计会检查固定
上游 commit、GitHub Pages 工作流以及常见本机路径、会话目录、token 和私钥模式是否泄漏。

当前核验快照（`2026-09-01`）：

| 维度 | 已核验数量 |
|---|---:|
| 编号章节源 | 16 |
| 实践关卡 | 6 |
| 综合交付 | 1 |
| 逐项讲解的 Skill | 37 |
| 一手材料记录 | 15 |
| 正文引用图片 | 25 |
| 阿舟最终 PNG 图解 | 15 |
| 可编辑 Excalidraw 图源 | 10 |
| 生成的实践页面 | 8 |

## 图片说明

- 阿舟图解：它们是教学注释，不替代上游证据。公开仓库只保留最终 PNG，不包含
  私有 Skill、角色母版、提示包、模板、运行脚本或机器回执。
- Excalidraw：保留可编辑 `.excalidraw`、SVG 和 PNG，方便社区纠错与再设计。
- 图中嵌入字体子集继续遵守各自许可证，详见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

## 许可与归属

- Matt Pocock Skills 仓库及其代码/文档归原作者所有，采用 MIT License。
- 本橙皮书原创讲解、教学实例、HTML 和图示采用 CC BY-NC-SA 4.0。
- 当前项目版权与归属范围见 [NOTICE.md](NOTICE.md)。
- 本书不是 Matt Pocock 官方文档，不代表原作者背书。
