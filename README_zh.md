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
| [book.md](book.md) | 权威正文，适合审阅、版本管理和引用 |
| [chapters](chapters) | 15 个编号章节源，是内容事实源 |
| [html/index.html](html/index.html) | 本地 HTML 阅读版 |
| [research](research) | Matt Pocock 公开一手材料的研究底稿 |
| [assets/azhou](assets/azhou) | 6 张阿舟小白图解的最终 PNG |
| [assets/diagrams](assets/diagrams) | 9 张可编辑 Excalidraw 图源、SVG 和 PNG |

## 这次不再只做索引

正文逐项讲解固定版本中的 37 个 Skill。每个 Skill 都尽量回答：

1. 一句话应该怎样理解；
2. 什么时候用，什么时候不要用；
3. 开始前必须提供什么；
4. Agent 应按什么顺序执行；
5. 在匿名桌面 UI 客户端里会怎样落地；
6. 应留下什么文件、决定或命令证据；
7. 新人最容易犯什么错误。

此外还有 7 个由浅入深的合成案例，从文案小改、UI 原型、疑难 bug，
一路到垂直切票、深模块、冲突解决和人工密钥向导。第 0 章先按小白、
中级和高阶给出三条阅读路径，不要求所有人从头顺序读到尾。

第 12 章吸收 15 条 Matt Pocock 公开一手材料，区分固定仓库事实、后续官方站表述
和本书的工程推论。第 13 章提供 37 个 Skills 的完整索引、资料来源与适用边界。

## 材料基准

- 上游仓库：[`mattpocock/skills`](https://github.com/mattpocock/skills)
- 固定提交：[`6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76)
- 提交时间：2026-08-24
- 书稿核验日期：2026-09-01
- 范围：18 个 engineering、7 个 productivity、4 个 misc、8 个 in-progress

仓库后续会变化，尤其是 `in-progress`。本书只对固定提交负责，不把实验目录写成稳定接口。

## 公开边界

所有 UI 客户端示例都是匿名化、合成化教学场景。仓库不包含：

- 私有项目名、私有源码和内部接口；
- 用户本机绝对路径；
- 密钥、账号、客户或发布信息；

书中讲的是公开 Skill 如何用于一类工程问题，不是在披露某个非开源项目的真实 case。

## 构建与公开审计

```bash
npm ci
npm run check
```

`chapters/` 下 15 个编号 Markdown 是内容事实源。构建脚本依次装配出
`book.md`、`html/index.html` 和 `html/book.html`，并复制全部 PNG 到
`html/assets/`。公开审计会检查：

- 37/37 个 Skill 是否都有逐项讲解；
- 15 个章节源是否能逐字装配成完整书；
- 至少 15 张正文图片是否在 Markdown 和 HTML 中都存在；
- 15 条作者材料和 GitHub Pages 工作流是否存在；
- 固定上游 commit 是否仍被声明；
- 常见本机路径、会话目录、token 和私钥模式是否泄漏。

## 图片说明

- 阿舟图解：公开仓库只保留最终 PNG，不包含私有 Skill、提示包、模板、运行脚本或机器回执。
- Excalidraw：保留可编辑 `.excalidraw`、SVG 和 PNG，方便社区纠错与再设计。
- 图中嵌入字体子集继续遵守各自许可证，详见 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

## 许可与归属

- Matt Pocock Skills 仓库及其代码/文档归原作者所有，采用 MIT License。
- 本橙皮书原创讲解、匿名实例、HTML 和图示采用 CC BY-NC-SA 4.0。
- 当前项目版权与归属范围见 [NOTICE.md](NOTICE.md)。
- 本书不是 Matt Pocock 官方文档，不代表原作者背书。
