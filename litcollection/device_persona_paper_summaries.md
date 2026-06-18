# Device Persona / AI Identity Related Paper Summaries

## 1. Products as Agents: Metaphors for Designing the Products of the IoT Age

**论文链接:**  
https://doi.org/10.1145/3025453.3025797  
https://www.researchgate.net/publication/316650808_Products_as_Agents_Metaphors_for_Designing_the_Products_of_the_IoT_Age

**论文内容总结:**  
这篇 CHI 2017 论文讨论了 IoT 时代的产品不再只是被动工具，而是开始具有一定的 agency，即能够感知数据、解释情境、采取行动，并影响人和其他物之间的关系。作者提出将智能产品理解为 agent 的设计隐喻，并进一步区分了不同类型的产品代理，例如收集信息的 Collector、能够自主响应和介入的 Actor，以及能够生成新可能性的 Creator。论文的重点不是把产品拟人化，而是帮助设计者理解智能产品在系统中的行动能力、影响范围和责任边界。

**我们可以学到什么:**  
这篇论文可以作为智能家居设备 AI Identity 设计的理论基础。我们可以借鉴其 agency 分类，区分不同设备身份的行动层级：有些设备只负责观察和提醒，有些设备可以主动调节环境，有些设备则可以参与生成新的生活方案。它也提醒我们，设备 identity 不应只是“性格设定”，还应包括设备能做什么、什么时候能主动介入、对谁产生影响、如何解释自身行为。

## 2. Thing Ethnography: Doing Design Research with Non-Humans

**论文链接:**  
https://doi.org/10.1145/2901790.2901905  
https://research.hva.nl/en/publications/thing-ethnography-doing-design-research-with-non-humans/

**论文内容总结:**  
这篇 DIS 2016 论文提出了 thing ethnography，即从物的视角研究日常生活实践。作者通过让日常物品成为“共同民族志研究者”的方式，挑战传统以人为中心的设计研究方法。论文认为，很多家庭实践并不能仅通过访谈用户来充分理解，因为物品本身的位置、使用轨迹、与其他物品的关系、被忽视或被依赖的方式，都会揭示人和家庭生活的结构。

**我们可以学到什么:**  
这篇论文为“从设备自身出发设计 identity”提供了方法论。设计智能家居设备角色时，不应只问用户想要什么，也要问设备在家庭中看到了什么、经历了什么、和哪些设备或人形成关系。对于我们的项目来说，可以把摄像头、灯、空调、冰箱、扫地机器人等设备看作拥有不同情境视角的观察者，并让这些视角成为 multi-agent 交互的输入。

## 3. Thing-Centered Narratives: A Study of Object Personas

**论文链接:**  
https://www.research.ed.ac.uk/en/publications/thing-centered-narratives-a-study-of-object-personas/

**论文内容总结:**  
这篇论文直接讨论 object personas，即为物品生成“以物为中心”的角色叙事。作者认为，物品不仅反映人的生活方式，也会参与塑造人的日常实践。因此，设计研究可以通过构建物品的 persona，描述它的历史、关系、需求、情绪、使用场景和与其他物品的联系，从而帮助设计者发现传统用户画像难以揭示的设计机会。

**我们可以学到什么:**  
这篇论文对我们的 AI Identity 设计最直接有用。它说明 persona 不一定只属于用户，也可以属于设备或物品。我们可以借鉴 object persona 的写法，为每个智能家居设备设计身份卡片，例如设备的功能职责、家庭位置、交互语气、关注点、情绪倾向、行动边界、与其他设备的关系，以及它如何理解不同用户。这样可以让设备 identity 从抽象设定变成可操作的设计工具。

## 4. Making Everyday Things Talk: Speculative Conversations into the Future of Voice Interfaces at Home

**论文链接:**  
https://doi.org/10.1145/3411763.3450390  
https://colab.ws/articles/10.1145%2F3411763.3450390

**论文内容总结:**  
这篇 CHI 2021 Extended Abstracts 论文探讨了一个问题：如果我们不是通过 Alexa 或 Google Assistant 这样的中心化语音助手与家庭设备交互，而是直接和日常物品对话，会发生什么？作者使用 speculative conversations 和 Thing Interviews 方法，想象靴子、卫生用品、香水瓶、厕纸等日常物品如何表达自身视角、需求和与人类及其他非人对象的关系。论文关注的重点是 conversational capabilities，即日常物品作为说话主体时会呈现出怎样的关系、语气和世界观。

**我们可以学到什么:**  
这篇论文非常适合支撑我们从“中心助手模式”转向“设备各自发声”的研究动机。它提示我们，智能家居交互不必总由一个统一助手代言；不同设备可以基于自身位置、功能和情境经验发出不同声音。对我们的系统来说，可以设计设备之间的对话机制，让冰箱、灯、空调、门锁等设备不只是被控制对象，而是拥有各自表达方式和生活视角的交互参与者。

## 5. Designing Personas for Expressive Robots: Personality in the New Breed of Moving, Speaking, and Colorful Social Home Robots

**论文链接:**  
https://doi.org/10.1145/3424153  
https://discovery.ucl.ac.uk/id/eprint/10122969/

**论文内容总结:**  
这篇 ACM THRI 2021 论文研究如何为非拟人化的家庭语音机器人设计 persona。作者设计了三种机器人角色：Butler、Buddy 和 Sidekick，并通过语言、语调、颜色和运动等多模态线索表达不同 personality。研究使用 Big Five 人格理论评估用户是否能够感知这些角色差异。结果表明，即使机器人外形并不拟人，用户也可以通过语音、动作和视觉反馈识别其人格特征。

**我们可以学到什么:**  
这篇论文能帮助我们把 AI Identity 从文本 prompt 扩展到多模态表达。设备身份不只体现在说什么，也体现在怎么说、什么时候说、是否主动、声音如何、灯光如何变化、动作是否克制或活跃。对于智能家居设备来说，灯可以通过亮度和色温表达状态，空调可以通过风速变化表达关怀，扫地机器人可以通过移动轨迹和提示语表达性格。它也提醒我们，persona 需要被用户准确感知，因此后续评估可以测试用户是否能理解设备身份设定。


## 6. Proceed with Care: Reimagining Home IoT Through a Care Perspective

**论文链接:**  
https://doi.org/10.1145/3411764.3445602  
https://nick-taylor.co.uk/wp-content/uploads/key_chi21_proceedwithcare.pdf

**论文内容总结:**  
这篇 CHI 2021 论文从 care 的角度重新思考 home IoT。作者并不只是讨论如何让智能家居更高效或更方便，而是关注家庭技术如何参与照护、维护、责任、权力和关系。论文指出，care 不是单向的“设备照顾用户”，而是嵌入在家庭、物品、环境和社会关系中的实践。智能家居设计需要关注谁被照顾、谁承担照护成本、什么被认为值得照顾，以及技术如何改变这些关系。

**我们可以学到什么:**  
这篇论文可以支撑我们关于“功能性与关怀性平衡”的设计目标。设备 AI Identity 不应只是可爱、温柔或情绪化，而应体现具体、负责任、情境合适的关怀。例如，设备可以在不打扰用户的前提下提醒能耗、空气质量或家庭成员状态，但也必须避免把 care 变成控制、规训或负担。它还提醒我们，评价系统时不能只看效率，也要看用户是否感到被尊重、被理解、被支持。

## 7. The Technology Is Enemy for Me at the Moment: How Smart Home Technologies Assert Control Beyond Intent

**论文链接:**  
https://doi.org/10.1145/3411764.3445058  
https://research.aalto.fi/en/publications/the-technology-is-enemy-for-me-at-the-moment-how-smart-home-techn/

**论文内容总结:**  
这篇 CHI 2021 论文研究智能家居技术如何在用户意图之外施加控制。作者指出，智能家居并不只是执行用户命令的中性工具，它会通过默认设置、自动化逻辑、访问权限、设备联动和远程控制等方式改变家庭中的权力关系。某些情况下，技术会让家庭成员被迫进入新的角色，例如谁能控制设备、谁被监测、谁需要适应系统规则。

**我们可以学到什么:**  
这篇论文为我们的 AI Identity 设计提供了重要的风险提醒。设备越具有身份、主动性和协作能力，就越需要清晰的可控性、透明性和边界。我们不能只追求设备更主动、更有个性或更“聪明”，还要避免让用户感到被系统管理、被设备评判或失去控制。对于 multi-agent smart home，尤其需要设计冲突解决、用户授权、行动解释和 override 机制，确保创造性和关怀不会演变为越权干预。

