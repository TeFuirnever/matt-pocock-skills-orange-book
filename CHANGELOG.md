# Changelog

本书按「阅读版」发布。上游证据基线与阅读版号解耦：基线前移本身不构成阅读版号变更，
重锚规则见 [research/upstream-release-1.3.2-standby.md](research/upstream-release-1.3.2-standby.md)。

## v0.2.1 — 2026-10-15

内容增补版。证据基线不变：上游固定提交
[`49dd158d1076134a641b33efb035946536778336`](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336)。

- 第 2 章新增「仓库怎样管住自己」（四件套同步、`SCOPE.md` 收录门槛、`.agents/` 治理）与「这套仓库不做什么」（`.out-of-scope/` 九份否决档案、结构性空白）两节，并补「按起点选链路」入口表。
- 第 1 章新增「七个贯穿全书的设计决定」，把分散在第 3–7 章的跨 Skill 设计原则点名成图；运行时词典补 smart zone。
- 第 7 章新增「阶段边界」节：五选项决策树与三条会话纪律（同窗口、冷启动、复盘在当场）。
- 第 11 章 11.4 引言补「实验目录即空白地图」视角；附录「业界方法来源」补 Feathers 与门框架并建立 Skill 映射；第 0 章直达表加两行。
- 新增证据笔记 `research/governance-and-boundaries-2026-10-15.md`（治理与边界事实，固定提交逐项核对）。

## v0.2.0 — 2026-10-13

内容与站点修订版。证据基线不变：上游固定提交
[`49dd158d1076134a641b33efb035946536778336`](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336)。

- 第 2–9 章补齐「常见失败」清单与可复制的 Agent 输入示例；第 8、9 章补「本章验收」。
- 第 10 章四周路线与实践路径双向衔接；labs 增加 7/30 天复测表与微练习使用规程。
- 新增预备知识（第 0 章）、运行时小白词典（第 1 章）、全书术语表（附录 F）、
  三档就绪自检表（附录 G）、Agent 失控排障表（附录 I）；旧版教学图移入附录 H。
- 新增执行前 60 秒审阅（第 7 章）、会话成本约束与团队灰度推广（第 9 章）、
  三种技术栈的迁移填法（第 13 章）、安装排障表（第 2 章）、第 6 章设计词汇注释。
- 站点：38 Skill 速查与搜索直达 h4、章节前后导航与阅读时长、labs 与正文双向链接、
  移动端键盘可达性、og/twitter 卡片、404/sitemap/robots、打印显示外链 URL、页脚。
- 工程：内部锚点校验、secrets 扫描扩展（AKIA/JWT/Slack/Windows 路径）、
  `.gitignore` 防泄露、CHANGELOG 门禁、基线单点化、上游 release 月度监视、
  dependabot、装配层单元测试。

## v0.1.0 — 2026-10-12

首个公开阅读版。

- 证据基线：上游固定提交
  [`49dd158d1076134a641b33efb035946536778336`](https://github.com/mattpocock/skills/tree/49dd158d1076134a641b33efb035946536778336)（上游包版本 v1.3.1 之后）。
- 16 个编号章节，逐项讲解全部 38 个 Skill
  （20 engineering / 7 productivity / 4 misc / 7 in-progress）。
- 三条阅读路径（小白 / 中级 / 高阶）、六个实践关卡与一个综合交付、
  七个渐进合成桌面 UI 实例、三个端到端操作案例。
- 15 条 Matt Pocock 公开一手材料记录（`research/`），含来源、日期与推断边界。
- 15 张阿舟 PNG 图解与 10 个可编辑 Excalidraw 场景（含 SVG/PNG 导出）。
- 构建与公开审计门禁：`npm run check`
  （装配一致性、Skill 清单、锚点、公开边界扫描、Pages 契约）。
