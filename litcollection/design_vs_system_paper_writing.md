# 设计类论文与 System 类论文的写作区别

## 总体说明

设计导向的 HCI 论文和 system paper 的写作逻辑有明显区别。设计类论文通常不是为了证明某个系统在技术性能上更好，而是为了提出一种新的理解方式、设计方法、概念框架或设计空间。

对于 device persona、AI Identity、smart objects、care-oriented smart home interaction 这类主题，许多相关的 CHI/DIS 论文更接近 design research，而不是典型的 system research。

## 设计类论文的写作逻辑

### 1. 从现象或概念问题出发

设计类论文通常不是从技术问题出发，而是从一个社会、体验或概念问题出发。

例如：

- *Products as Agents* 关注的是：当 IoT 产品开始感知、行动并影响人类实践时，我们应该如何理解它们的 agency？
- *Proceed with Care* 关注的是：home IoT 如何参与 care、责任和家庭关系？
- *Thing Ethnography* 关注的是：如果我们把日常物品看作主动参与者，而不是被动工具，设计研究会发生什么变化？

因此，它们的核心问题通常不是“如何让系统更准确”，而是“我们应该如何理解和设计这种交互”。

### 2. 先批判现有视角，再提出新的研究视角

设计类论文通常会先指出已有研究视角的局限。例如，已有研究可能过于以人为中心、过于追求效率、过于功能主义，或过于关注控制和自动化。

然后，论文会提出一个新的 lens，例如：

- Products as agents
- Thing ethnography
- Object personas
- Care perspective
- Conversational things
- Smart home technologies as actors of control

这个新的研究视角通常就是论文最重要的思想贡献。

### 3. 贡献通常是概念性、方法性或设计性的

设计类论文的贡献不一定是一个可复用系统或算法，而可能是：

- 一个概念框架
- 一种研究方法
- 一组设计维度
- 一个设计空间
- 一套设计原则
- 一组 speculative concepts
- 对某类技术关系的新解释

例如，*Thing-Centered Narratives* 的贡献是 object personas 这一设计方法；*Products as Agents* 的贡献是对 smart product agency 的分类方式。

### 4. 方法更强调生成理解，而不是测量性能

设计类论文通常使用能够揭示关系、意义、张力和设计机会的方法。

常见方法包括：

- Ethnography
- Interviews
- Research through Design
- Speculative design
- Design workshops
- Diary studies
- Mapping exercises
- Thematic analysis
- Wizard-of-Oz studies

这些方法的目的不一定是证明某个系统性能更好，而是生成对设计问题更丰富、更细致的理解。

### 5. 结果通常呈现为主题、概念或设计启发

设计类论文的结果部分通常不会以 accuracy、latency、task completion rate 这类指标为核心，而更常呈现为：

- Themes
- Design tensions
- Design opportunities
- Personas
- Typologies
- Frameworks
- Annotated design concepts
- Implications for design

也就是说，结果不是“系统提升了多少”，而是“我们通过这个研究发现了哪些新的设计关系、问题和可能性”。

### 6. Discussion 部分非常关键

在设计类论文中，discussion 往往是最重要的部分之一。它需要解释：

- 本文提出的新视角如何改变我们对问题的理解
- 哪些关系、张力或风险过去被忽视了
- 这个方法或框架如何支持未来设计
- 出现了哪些伦理、社会、情感或权力相关问题
- 未来系统应该如何被设计得不同

## 设计类论文与 System 类论文的主要区别

| 维度 | 设计类论文 | System 类论文 |
|---|---|---|
| 核心目标 | 提出新的理解、方法、设计空间或理论视角 | 构建一个可运行系统，并证明其有效性 |
| 研究问题 | 我们应如何理解或设计这种交互？ | 这个系统是否能更好地完成任务？ |
| 主要贡献 | 概念框架、设计方法、设计启发、设计空间 | 系统架构、算法、实现、benchmark、性能结果 |
| 方法 | 民族志、访谈、RtD、speculative design、workshop、thematic analysis | 系统设计、模型集成、算法、原型、ablation、benchmark |
| 证据形式 | 质性材料、案例、参与者反馈、主题、设计产物 | 定量指标、任务成功率、延迟、准确率、可用性评分 |
| 评价重点 | 解释力、设计启发性、可信度、用户感知、反思价值 | 性能提升、鲁棒性、效率、可扩展性、可用性 |
| 写作重心 | Framing、method、themes、implications | Problem、system architecture、implementation、evaluation |

## 设计类论文的典型结构

```text
1. Introduction
   提出现象、问题和研究缺口。
   解释为什么现有技术或设计视角不足。

2. Related Work
   搭建理论和方法背景。
   可能包括 HCI、STS、design theory、care ethics、more-than-human design 等。

3. Conceptual Framing / Research Lens
   引入本文使用的研究视角。
   例如 agency、care、thing perspective、object persona。

4. Method
   说明研究材料如何生成。
   方法可能包括访谈、民族志、workshop、RtD、speculative design、Wizard-of-Oz 等。

5. Findings / Themes / Concepts
   呈现主题、设计张力、概念分类或设计案例。

6. Discussion
   解释这些发现如何改变我们对设计问题的理解。
   提出 design implications。

7. Conclusion
   总结本文的概念、方法或设计贡献。
```

## System 类论文的典型结构

```text
1. Introduction
   提出技术问题和系统目标。

2. Related Work
   对比已有系统、模型、算法或应用。

3. System Overview
   描述系统架构、模块和数据流。

4. Implementation
   说明模型、算法、工程实现和接口。

5. Evaluation
   通过实验、benchmark、用户任务或 ablation study 验证系统效果。

6. Discussion / Limitations
   解释系统边界、限制和未来改进方向。

7. Conclusion
   总结系统贡献和评估结果。
```

## 对我们项目的启发

对于 smart home device AI Identity 这个项目，可以有两种不同写法。

### 如果写成设计类论文

核心问题可以是：

> AI Identity 如何帮助智能家居设备成为具有社会性和情感意义的交互对象？

可能贡献包括：

- 一个 smart home device AI Identity framework
- 一组 device persona 设计维度
- 一个 multi-agent smart home interaction design space
- 若干设计案例或 speculative scenarios
- 用户对 care、control、trust、creativity 的感知发现

### 如果写成 System 类论文

核心问题可以是：

> 与中心助手模式相比，具有设备级 AI Identity 的 multi-agent smart home system 是否能提升交互体验？

可能贡献包括：

- 一个系统架构
- 一个 multi-agent coordination mechanism
- 一套 device identity prompt structure
- 一个 simulator 或 prototype implementation
- 对比评估
- 用户研究或任务评估

## 更适合当前项目的混合方向

这个项目可能更适合写成 design-led system paper。也就是说，论文可以先使用设计研究方法来定义问题和提出 framework，再构建 prototype 或 simulator，最后评估这个 framework 对用户体验的影响。

可能结构如下：

```text
1. Problem: smart homes lack device-level social identity
2. Lens: device AI Identity / object persona / products as agents
3. Framework: dimensions for designing smart home device identities
4. Prototype: multi-agent smart home system
5. Study: compare central assistant interaction with device-identity multi-agent interaction
6. Findings: perceived care, creativity, controllability, trust, and engagement
7. Implications: balancing functionality, expressiveness, and control
```

这种混合写法的好处是：它不会让论文显得只是概念讨论，同时也不会把贡献完全压缩成技术性能。对于 AI Identity 与智能家居交互这样的题目，它更容易同时保留设计贡献和系统贡献。
