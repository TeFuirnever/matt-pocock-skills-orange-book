# Matt Pocock public statements: Skills and AI coding workflow

## Scope and reading rules

- **Research date:** 2026-09-01 (Asia/Shanghai).
- **Allowed evidence only:** Matt Pocock's official AI Hero site and the public `mattpocock/skills` repository/commits. No secondary blog, commentary, or social-media repost is used.
- **Fixed repository baseline:** [`mattpocock/skills@6654f6b60cd9d5be8b54c6fafe44346dabeb3b76`](https://github.com/mattpocock/skills/tree/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76), committed by Matt Pocock on 2026-08-24 14:19:57 UTC. Repository findings below describe that snapshot only unless marked otherwise.
- **Evidence labels:**
  - **Author explicit statement**: text published under Matt Pocock's name on his official site.
  - **Repository behavior fact**: an observable instruction, file, or commit in the pinned repository; it is not treated as a separate spoken or personal endorsement.
  - **Inference**: a bounded editorial implication drawn from the cited material, never presented as his wording.
- **Important boundary:** These sources support teaching about a public workflow. They do **not** mean Matt Pocock endorses this Orange Book, its Chinese interpretation, or any downstream use.

## Evidence records

### 1. Skills are process-level steering, not a platform lock-in

- **Type:** Author explicit statement.
- **Theme:** Agent Skills and repository philosophy.
- **Date:** Not shown on page; retrieved 2026-09-01. This live page is later than the fixed repository baseline and is not used to redefine it.
- **Original URL:** [AI Skills for Real Engineers](https://www.aihero.dev/skills)
- **Short quote (8 words):** “small, sharp instructions you hand your coding agent”
- **Accurate Chinese paraphrase:** Skills 是交给编码代理的简短、聚焦指令，目的是让代理按资深工程师式的工作方式执行。
- **Teaching implication safe for the Orange Book:** 可以把 Skill 解释为把某一工程习惯变成可重复调用的过程约束；不要把它描述成某个模型或平台专属的魔法能力。
- **Strength / limits:** High for this author's current public framing: official page carries his name and links to the repository. It is mutable web content and has no immutable publication snapshot on the page.

### 2. Skills form an ordered workflow whose artifacts feed later work

- **Type:** Author explicit statement.
- **Theme:** AI coding workflow and planning-to-delivery chain.
- **Date:** Not shown on page; retrieved 2026-09-01; later than the fixed baseline.
- **Original URL:** [AI Skills for Real Engineers](https://www.aihero.dev/skills)
- **Short quote (8 words):** “Each one's output is the next one's input.”
- **Accurate Chinese paraphrase:** Skills 可以组成链路：前一个 Skill 的产出成为下一个 Skill 的输入。
- **Teaching implication safe for the Orange Book:** 可教学为“先把决策和规范外化，再把其作为实现和评审的输入”；这是工作流组织方式，不保证每次都会产出正确结果。
- **Strength / limits:** High for the author's stated workflow model; it does not establish a universal dependency graph or require every project 使用完整链路。

### 3. Stateless sessions require explicit context and steering mechanisms

- **Type:** Author explicit statement.
- **Theme:** Context, instructions, and `AGENTS.md`/Skills.
- **Date:** Not shown on page; course start shown as March 30, but no year/publication date; retrieved 2026-09-01.
- **Original URL:** [My Claude Code Cohort - A Teaser](https://www.aihero.dev/my-claude-code-cohort-a-teaser)
- **Short quote (7 words):** “language models don't retain memory between sessions”
- **Accurate Chinese paraphrase:** 语言模型不会在会话之间保留记忆，因此需要额外机制来引导其行为。
- **Teaching implication safe for the Orange Book:** 可以说明项目级说明文件和 Skills 的作用是把可重复的工作规则放到会话外；不能由此推导出它们会自动、完整地恢复所有项目上下文。
- **Strength / limits:** High for the author's pedagogical claim on his official site. “Do not retain memory” is a simplified workflow framing, not a formal statement about every vendor's memory implementation.

### 4. Large work should be split around context-window boundaries

- **Type:** Author explicit statement.
- **Theme:** Planning, context windows, and tracer-bullet execution.
- **Date:** Not shown on page; retrieved 2026-09-01.
- **Original URL:** [My Claude Code Cohort - A Teaser](https://www.aihero.dev/my-claude-code-cohort-a-teaser)
- **Short quote (6 words):** “split massive features into multiple phases.”
- **Accurate Chinese paraphrase:** 将大型功能拆分为多个阶段来处理。
- **Teaching implication safe for the Orange Book:** 对超过单次上下文承载量的工作，应先切成可独立讨论、实现和验证的阶段，再在阶段之间清理或交接上下文；阶段边界仍需由项目风险和依赖关系决定。
- **Strength / limits:** High for the stated course guidance. The page does not specify a universal token threshold, phase size, or a particular issue-tracker implementation.

### 5. Feedback loops are the quality mechanism, not an optional afterthought

- **Type:** Author explicit statement.
- **Theme:** AI coding feedback loops and TDD.
- **Date:** Not shown on page; retrieved 2026-09-01.
- **Original URL:** [My Claude Code Cohort - A Teaser](https://www.aihero.dev/my-claude-code-cohort-a-teaser)
- **Short quote (6 words):** “feedback loops that guide the agent”
- **Accurate Chinese paraphrase:** 需要用反馈闭环把代理引向更好的解决方案。
- **Teaching implication safe for the Orange Book:** 将类型检查、测试、运行时观察和评审写成实现过程的输入与门槛，而不是在生成代码后才补做的装饰性检查。
- **Strength / limits:** High for the author's workflow recommendation. “Better” is qualitative; the source does not claim that a given loop eliminates defects.

### 6. The official course packages feedback as skills, hooks, and red-green-refactor

- **Type:** Author explicit statement.
- **Theme:** AI coding workflow and feedback-loop components.
- **Date:** Not shown on page; retrieved 2026-09-01.
- **Original URL:** [Day 4: Feedback Loops](https://www.aihero.dev/workshops/day-4-feedback-loops-fcqu2)
- **Short quote (18 words):** “Build feedback loops into your Claude Code workflow with do-work skills, pre-commit hooks, and red-green-refactor TDD.”
- **Accurate Chinese paraphrase:** 在 Claude Code 工作流中，可用 do-work Skills、提交前钩子和 red-green-refactor TDD 建立反馈闭环。
- **Teaching implication safe for the Orange Book:** 可将“Skill 定义过程、钩子提供自动门禁、TDD 提供局部验证”作为一组可组合的例子；不应把该课程页面当成对其他工具链的兼容性承诺。
- **Strength / limits:** High for official course positioning. It describes a teaching program, not a benchmark or proof of deterministic code quality.

### 7. Planning interviews separate facts the environment can answer from decisions only the human can make

- **Type:** Author explicit statement.
- **Theme:** Planning, human-in-the-loop, and research delegation.
- **Date:** Not shown on page; retrieved 2026-09-01.
- **Original URL:** [The /grilling Skill](https://www.aihero.dev/skills-grilling)
- **Short quote (6 words):** “Facts are the skill's own job”
- **Accurate Chinese paraphrase:** 若前沿问题需要环境可查证的事实，Skill 应让子代理去获取；决策本身则应等待人来作答。
- **Teaching implication safe for the Orange Book:** 在规划中区分“可检索事实”和“需要业务负责人选择的决策”；研究可以并行，替用户做价值判断不可以。
- **Strength / limits:** High for the page's intended behavior. The same page explicitly notes that the frontier is the agent's judgment and may be imperfect, so this is a design target rather than a guarantee.

### 8. Planning ends at shared understanding, not merely when questions run out

- **Type:** Author explicit statement.
- **Theme:** Planning completion gate and feedback.
- **Date:** Not shown on page; retrieved 2026-09-01.
- **Original URL:** [The /grilling Skill](https://www.aihero.dev/skills-grilling)
- **Short quote (7 words):** “confirm you have reached a shared understanding”
- **Accurate Chinese paraphrase:** 即使待问问题已清空，会话也要等用户确认已形成共同理解后，才进入行动。
- **Teaching implication safe for the Orange Book:** 把“确认理解”作为从规划转入实现的显式门槛，尤其适用于需求仍有分支或人员偏好的工作；不应把它误写成所有 Skill 都会自动停止实施。
- **Strength / limits:** High for the named `grilling` mechanism, not a general claim about all agents or all workflows.

### 9. Handoffs are a deliberate response to context exhaustion during planning

- **Type:** Author explicit statement.
- **Theme:** Context handoff and multi-agent workflow.
- **Date:** 2026-05-11 (shown in the official Skills changelog index); retrieved 2026-09-01.
- **Original URL:** [Skills Changelog: /handoff, /prototype, /review and /writing](https://www.aihero.dev/skills/skills-changelog-handoff-prototype-review-and-writing)
- **Short quote (20 words):** “Instead of cramming that work into your remaining context window, you can hand off to a fresh agent with full context.”
- **Accurate Chinese paraphrase:** 与其把后续工作硬塞进所剩不多的上下文窗口，不如将上下文交接给新的代理继续处理。
- **Teaching implication safe for the Orange Book:** 长会话应交接目标、已确认的决策、未决问题和下一步，而不是依靠新会话猜测前情；交接文档是辅助材料，仍需核查其是否遗漏关键状态。
- **Strength / limits:** Medium-high: official named changelog post. The phrase “full context” describes the intended handoff payload, not a proof that every relevant fact is preserved.

### 10. Implementation is downstream of an already-settled plan

- **Type:** Author explicit statement.
- **Theme:** Boundary between planning and implementation.
- **Date:** Not shown on page; retrieved 2026-09-01.
- **Original URL:** [The /implement Skill](https://www.aihero.dev/skills-implement)
- **Short quote (5 words):** “It never reopens the plan.”
- **Accurate Chinese paraphrase:** `implement` 不会重新打开或重议计划。
- **Teaching implication safe for the Orange Book:** 在教学流程中应先把需求、范围和测试切面确认清楚，再进入实现；若实现阶段发现前提错误，应回到上游规划环节，而不是悄悄改变目标。
- **Strength / limits:** High for the current official `/implement` page. It is a behavioral contract for that Skill's intended use, not a claim that an LLM can never deviate from instructions.

### 11. The pinned repository says its skills are daily-use, adaptable, composable practices

- **Type:** Repository behavior fact (published repository README; authorial wording, but recorded here as a snapshot fact).
- **Theme:** Skills repository and portability.
- **Date:** Baseline snapshot 2026-08-24; original README revision date not independently established here.
- **Original URL:** [README at the fixed commit](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/README.md)
- **Short quote (11 words):** “These skills are designed to be small, easy to adapt, and composable.”
- **Accurate Chinese paraphrase:** 这些 Skills 被设计为小巧、容易调整，并且可以组合使用。
- **Teaching implication safe for the Orange Book:** 固定版本下可将每个 Skill 讲成可替换的过程部件，鼓励读者按项目修改；不要据此宣称所有组合都已经经过作者验证。
- **Strength / limits:** High for what the pinned README says. It does not identify which adaptations preserve quality or compatibility.

### 12. The pinned repository mandates a red-before-green, one-slice-at-a-time loop

- **Type:** Repository behavior fact.
- **Theme:** AI coding workflow, feedback loops, and test seams.
- **Date:** Baseline snapshot 2026-08-24; original file revision date not independently established here.
- **Original URL:** [`tdd/SKILL.md` at the fixed commit](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/tdd/SKILL.md)
- **Short quote (11 words):** “Write the failing test first, then only enough code to pass it.”
- **Accurate Chinese paraphrase:** 先写会失败的测试，再只写足以让测试通过的最小代码。
- **Teaching implication safe for the Orange Book:** 把 TDD 讲为每次只跨越一个已确认测试切面的小闭环，随后再依据下一轮反馈继续；这是一份 Skill 内的规范，不等于对所有前端、集成或探索性工作的强制要求。
- **Strength / limits:** High for the pinned file's stated instructions. The file also requires user confirmation of seams, which means autonomous使用仍依赖前置决策。

### 13. The pinned repository treats context pointers and progressive disclosure as design levers

- **Type:** Repository behavior fact.
- **Theme:** Context, instructions, and Skill authoring.
- **Date:** Baseline snapshot 2026-08-24; original file revision date not independently established here.
- **Original URL:** [`writing-for-agents/SKILL.md` at the fixed commit](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/writing-for-agents/SKILL.md)
- **Short quote (20 words):** “The pointer's wording, not its target, decides when the agent reaches the material, and how reliably.”
- **Accurate Chinese paraphrase:** 决定代理何时、以多可靠的方式读取材料的，是指针文字本身，而不是其指向的目标文件。
- **Teaching implication safe for the Orange Book:** `AGENTS.md` 或 Skill 描述应明确写出触发条件，按需把参考资料放到外部文件；不要只靠“文件存在”就假设代理一定会加载它。
- **Strength / limits:** High for the pinned documentation model. It is a heuristic for stochastic agents, not a formally proven retrieval guarantee.

### 14. The pinned repository separates synthesis into a spec from live interviewing

- **Type:** Repository behavior fact.
- **Theme:** Planning and specification handoff.
- **Date:** Baseline snapshot 2026-08-24; original file revision date not independently established here.
- **Original URL:** [`to-spec/SKILL.md` at the fixed commit](https://github.com/mattpocock/skills/blob/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/engineering/to-spec/SKILL.md)
- **Short quote (11 words):** “Do NOT interview the user; just synthesize what you already know.”
- **Accurate Chinese paraphrase:** 将当前对话整理为规格说明；不再访谈，只综合已经讨论过的信息。
- **Teaching implication safe for the Orange Book:** 规格阶段应消费已确认的对话与仓库理解，并明确测试切面与范围；发现缺失决策时，应回到访谈或研究，不要把猜测伪装成规格事实。
- **Strength / limits:** High for this pinned Skill's intended boundary. The file assumes prerequisite tracker and domain vocabulary may already exist.

### 15. The fixed baseline added information access as a retrospective category

- **Type:** Repository behavior fact.
- **Theme:** Agent information access and process improvement.
- **Date:** 2026-08-24 14:19:57 UTC.
- **Original URL:** [commit `6654f6b...`](https://github.com/mattpocock/skills/commit/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76)
- **Short quote (11 words):** “add 'Information access' category to retrospective skill for improved agent insights”
- **Accurate Chinese paraphrase:** 该固定基线新增了“信息访问”这一复盘类别，用来寻找提高代理获取关键信息的机会。
- **Teaching implication safe for the Orange Book:** 复盘代理表现时，除了提示词和模型，也可检查其是否缺少关键日志、只读服务访问或可验证的外部信息；这是一次具体提交，不应扩大为作者对任何访问权限的泛化主张。
- **Strength / limits:** Very high for the commit's existence, author identity as recorded by GitHub, date, and one-line patch. It does not prove the change's effectiveness or safety in every environment.

## Bounded synthesis for the Orange Book

The primary evidence supports this teaching frame: **a Skill is a small, inspectable process instruction; reliable AI-assisted engineering comes from an explicit chain of planning, context handling, small execution slices, and feedback; facts can be researched, but human decisions require confirmation.** This is a synthesis of records 1-15, not a quotation and not an endorsement by Matt Pocock.

For version safety, cite records 11-15 when describing what the Orange Book's fixed upstream snapshot contains. Cite records 1-10 only as separately dated official-site statements; do not use them to claim that the 2026-08-24 repository shipped the later site behavior.

## Source inventory

- **Primary URLs cited:** 12 distinct URLs.
- **Records:** 15 (10 official-site author statements; 5 pinned-repository/commit facts).
- **Excluded on purpose:** no YouTube/X/Bluesky/LinkedIn quotation was included without a directly inspectable original post or official video-page transcript. No secondary source was used to establish any fact.
