
• 我认为这个项目最有潜力的切入点不是“让家电像人一样说话”，而是：把智能家居从一个中央 AI 助手，重新想象成一个由多个有身份、有脾气、有关系的设备组成的家庭剧场。这正好能补上现有文献的一个空白：很多研究关注 Alexa/Siri/Google Assistant 这类单一语音助手，而你们关注的是“冰箱、灯、空调、门锁、扫地机器人、音箱等不同设备如何各自说话、彼此说话、与人开玩笑”。

  可以深入发展的 points 如下。

  1. 从“智能助手人格”转向“家电群像身份”

  现有语音助手研究常讨论 anthropomorphism、人设、信任、隐私和用户接受度。例如 Epley 等人的拟人化理论指出，人们会在需要解释、控制或社交连接时更容易把非人对象看成人；CASA / Media Equation 传统也说明人会对计算机自动套用社会规则。
  你们可以进一步问：如果不是一个 Alexa，而是一整个家在说话，身份设计该如何分配？

  比如：

  - 冰箱：记忆型、囤积型、焦虑型、营养主义者？
  - 空调：情绪调节者、冷静控制狂、身体边界守门人？
  - 门锁：保安、八卦门房、偏执风险管理者？
  - 灯：气氛导演、作息监督者、舞台灯光师？
  - 扫地机器人：低位劳动者、迷路者、家庭考古学家？

  这可以形成 CHI 贡献：multi-device identity design for smart home AI，而不是单一 conversational agent
  design。参考：Epley et al. 的 anthropomorphism 理论、Reeves & Nass 的 Media Equation、以及智能家居助手拟人
  化线索研究。
  来源：Epley et al. 2007；Reeves & Nass 1996 / Nass & Moon 2000；smart home assistant anthropomorphic cues
  研究。(colab.ws (https://colab.ws/articles/10.1037%252F0033-295X.114.4.864?utm_source=openai))
  (en.wikipedia.org (https://en.wikipedia.org/wiki/Computers_are_social_actors?utm_source=openai))
  (sciencedirect.com
  (https://www.sciencedirect.com/science/article/pii/S0747563223002297?utm_source=openai))

  2. “幽默”不是装饰，而是身份暴露机制

  幽默可以让设备显得有性格，但也可能暴露权力关系、尴尬、误解和监控感。Lopatovska 对智能个人助手幽默互动的研
  究发现，用户常用幽默来测试系统“人格”和意见。2025 年关于语音助手设计师的研究也提到，设计师会特别关注幽默，
  因为幽默高度文化化。
  你们可以把幽默当作研究对象：

  - 家电何时开玩笑是可爱，何时是冒犯？
  - 家电能不能自嘲自己的故障、耗电、监控、过时？
  - 设备之间的互怼是否能让用户理解系统状态？
  - 幽默是否能缓解智能家居的挫败感，还是会掩盖真实风险？

  艺术上可以设计“家电吐槽系统”：门锁抱怨冰箱总是被半夜打开；空调讽刺人类一边喊环保一边开 18 度；扫地机器人举
  报家里谁掉头发最多。
  来源：Lopatovska 2020；Hanley & Wohl 2025。(journals.sagepub.com
  (https://journals.sagepub.com/doi/10.1177/0961000619891771?utm_source=openai)) (journals.sagepub.com
  (https://journals.sagepub.com/doi/10.1177/20539517251392067?utm_source=openai))

  3. 智能家居中的权力分配：谁能命令谁？

  CHI 里已有研究指出，多人家庭中的智能家居常出现 “pilot user / passenger user” 关系：配置设备的人掌握更多控
  制权，其他家庭成员只能被动适应。
  你们可以把这个问题转化为设备身份设计：

  - 家电是听“房主”的，还是听“当下在场的人”的？
  - 儿童、老人、访客、保洁人员、宠物在智能家居里有没有发言权？
  - 如果设备有性格，它会偏袒谁？
  - 家电之间能否形成联盟，抵抗某个用户的过度控制？

  这非常适合游戏机制：玩家不是单纯控制设备，而是在一组带有立场的家电之间协调关系。
  来源：Koshy et al. 2021, “We Just Use What They Give Us”。(hci.stanford.edu
  (https://hci.stanford.edu/publications/paper.php?id=400&utm_source=openai))

  4. “设备身份”可以作为隐私界面

  智能家居隐私研究表明，用户常低估非摄像头、非麦克风设备的数据推断能力，比如电量、温度、开关记录也能推断生活
  习惯。Zheng et al. 发现，用户常为了便利接受数据收集，并信任厂商但很少验证。
  你们可以问：如果设备用自己的身份说出它正在知道什么，会不会让隐私变得可感知？

  例如：

  - 冰箱说：“我知道你这周三次凌晨打开我。”
  - 灯说：“我知道你今天比平时晚回家 47 分钟。”
  - 空调说：“我从你的体温和房间停留时间推测你可能不舒服。”
  - 门锁说：“我认识你的朋友，但我不确定你是否允许我记住他们。”

  这能把隐私从抽象条款变成可体验的“家电自白”。
  来源：Zheng et al. 2018；Smart Home Personal Assistants security/privacy review；Alexa third-party skill
  awareness。(cir.nii.ac.jp (https://cir.nii.ac.jp/crid/1363388844574552320?utm_source=openai))
  (strathprints.strath.ac.uk (https://strathprints.strath.ac.uk/85142/?utm_source=openai)) (hci.top
  (https://hci.top/en/papers/chi/72167/2022?utm_source=openai))

  5. 家不是“效率系统”，而是情境、习惯和关系的场所

  Suchman 的 situated action 传统提醒我们，人不是按预设脚本生活，而是在具体情境中即兴行动。智能家居常被设计
  成自动化流程，但家庭生活本身充满例外、妥协、懒惰、情绪和临时规则。
  你们可以将研究问题设为：家电身份如何表达情境敏感性，而不是只执行命令？

  比如设备不只说“已为你打开空调”，而是说：

  - “你今天回来得很晚，我猜你不想听我讲节能大道理。”
  - “客人来了，我暂时不提醒你冰箱里的过期泡菜。”
  - “我知道这是家庭聚会，所以我不会像平时一样催你睡觉。”

  这能把“智能”从准确执行转向社会性判断。
  来源：Suchman 1987；smart home ecosystem appropriation 研究。(scirp.org
  (https://www.scirp.org/reference/referencespapers?referenceid=79786&utm_source=openai)) (offis.de
  (https://www.offis.de/offis/publikation/inhabiting-interconnected-spaces-how-users-shape-and-appropriate-their-smart-home-ecosystems.html?utm_source=openai))

  6. 设备之间的对话可以成为“系统透明性”的新形式

  现有 IoT 可解释性常通过 app、dashboard、通知来呈现，但这很无聊，也不适合展览。DIS 相关 IoT Communicator 项
  目用光和声音表达设备和系统意图，说明设备群体行为可以帮助用户获得 situational awareness。
  你们可以进一步做成“家电合唱”：

  - 设备争论为什么自动化失败。
  - 灯和窗帘讨论谁该负责“早晨叫醒”。
  - 空调和电表围绕能源消耗吵架。
  - 门锁和摄像头争夺“安全专家”身份。

  这既幽默，也能解释系统逻辑。
  来源：IoT Communicator / DIS 2020。(dis.acm.org (https://dis.acm.org/2020/1082.html?utm_source=openai))

  7. “失败”是身份设计的关键，不只是错误处理

  智能家居真实体验里，断网、误识别、自动化冲突、设备老化很常见。很多产品把失败隐藏成 error code，但你们可以
  把失败人格化：

  - 扫地机器人迷路后是否会尴尬？
  - 冰箱传感器坏了是否会撒谎？
  - 门锁不确定身份时是礼貌、强硬，还是神经质？
  - 多个设备冲突时，谁道歉？

  这可以形成一个很 CHI 的 point：failure-aware personality design。设备身份不应只在成功时存在，也应在失败、
  模糊和冲突中保持一致。

  8. 从 human-centered design 转向 thing-centered / more-than-human design
  可以做研究方法创新：

  - 让参与者采访家里的设备。
  - 让参与者写“冰箱日记”“门锁日记”“扫地机器人投诉信”。
  - 让游戏玩家扮演不同家电，体验不同感知范围和行动限制。
  - 让展览观众听见设备对人类习惯的误读。

  这会让项目不仅是交互设计，也接近 research through design / design fiction。
  来源：Thing Ethnography；ludic design；critical/speculative IoT design。(observatory.designresearch.works
  (https://observatory.designresearch.works/projects/thing-ethnography?utm_source=openai))
  (repository.tudelft.nl
  (https://repository.tudelft.nl/record/uuid%3A5651fcc8-ef35-4662-93ec-e98c1a1b0ac3?utm_source=openai))
  (ercim.eu (https://www.ercim.eu/publication/Ercim_News/enw47/gaver.html?utm_source=openai))

  9. 文化语境：韩国/东亚家庭中的家电身份

  ACC 委托背景很重要。不要只复刻西方 Alexa 文献。可以深入讨论：

  - 韩国/东我觉得这个项目最有潜力的核心，不是“给每个家电做一个人格”，而是研究：当智能家居不再由一个中心化语
    音助手代表，而是由一组彼此有性格、利益、脾气和误解的设备共同生活时，人会如何理解家、控制权、亲密感和技术
    责任。

  可以从以下 points 深入推进：

  1. 从“单一助手”转向“家电身份生态”
  现有智能家居常把交互集中到 Alexa、Google Home、Siri 这类统一助手上。但真实家庭里有冰箱、空调、灯、门锁、扫
  地机器人、摄像头、音箱等多个设备，它们的功能、位置、权限和情绪想象都不同。
  你们可以讨论：智能家居中的 AI 身份是否应该是一个“总管”，还是一个由多个设备角色构成的“家庭剧团”？这会直接对
  应游戏中的多角色叙事和线下展览中的多设备对话。

  参考脉络：人会自然地对计算机作出社会性回应，见 Reeves & Nass 的 The Media Equation，以及 Nass & Moon 关于
  人机社会反应的研究。
  https://web.stanford.edu/group/pandegroup/folding/education/people_nass.html

  2. 家电人格不是拟人化，而是“功能、位置、权限”的表达
  冰箱的身份可以来自“保存、过期、控制食欲”；门锁来自“边界、安全、怀疑”；空调来自“身体舒适与环境代价”；摄像头
  来自“守护与监视”。
  也就是说，身份设计不只是给设备加表情或台词，而是把设备在家庭中的权力关系可感知化。

  可讨论的问题：
  “一个家电的身份应该由品牌设定、功能属性、家庭成员使用习惯，还是由它掌握的数据决定？”

  相关理论可接 Epley, Waytz & Cacioppo 的拟人化三因素理论：人更容易在不确定、需要解释、需要社会连接时拟人化
  非人对象。
  https://psycnet.apa.org/record/2007-08071-001

  3. 幽默作为智能家居冲突的界面机制
  幽默可以让设备的“错误”“限制”“偏见”“过度干预”变得可讨论。例如，冰箱讽刺用户半夜开门，门锁怀疑访客，灯具抱怨
  被反复开关。
  这里的重点不是让设备“可爱”，而是让幽默成为一种低风险的批判方式：让观众意识到智能设备正在判断、分类、提醒、
  记录和规训人。

  可探讨：
  幽默会降低用户对监控的警觉，还是帮助用户看见监控？
  设备的玩笑什么时候是亲密，什么时候是冒犯？

  相关方向可接 conversational agents 中幽默、人格、信任与接受度研究，以及 Gaver 的 ludic design，强调技术不
  只解决任务，也可以制造好奇、歧义和反思。
  https://research.gold.ac.uk/id/eprint/8684/

  4. 智能家居中的权力：谁有资格说话？
  不是所有设备都应该同等“有声音”。摄像头、门锁、音箱、冰箱、灯具拥有的数据和行动能力不同。
  你们可以把“说话权”设计成一个研究对象：
  门锁是否比灯更有权打断人？
  冰箱能否评价家庭成员的饮食？
  扫地机器人能否抱怨人的生活方式？
  摄像头如果幽默，会不会更危险？

  这可以和 smart home privacy、domestic surveillance、家庭中多用户权限的文献连接。智能家居研究中一个常见问题
  是：设备通常假设“一个主人”，但真实家庭有儿童、老人、访客、室友、清洁工、伴侣等多种角色。
  例如 smart home privacy/security 研究指出，家庭中的控制权、知情权和同意并不均匀分布。
  https://dl.acm.org/doi/10.1145/3173574.3173897

  5. “设备之间的对话”比“设备与人的对话”更有新意
  很多语音助手研究关注人和单一 agent 的互动。你们可以反过来：让设备彼此争论、误解、结盟、抱怨人类。
  例如：
  冰箱和健身手环争论用户健康；
  空调和电表争论舒适与能耗；
  门锁和摄像头争论安全与隐私；
  扫地机器人和地毯互相指责。

  这会把智能家居从“命令执行系统”变成“社会关系场”。论文贡献可以是：multi-device identity design，即多设备智能
  环境中角色、声音、冲突和协调的设计框架。

  6. 家不是效率场，而是暧昧、情绪和协商场
  很多智能家居叙事强调便利、自动化、效率。但 HCI 的 domestic computing 文献长期提醒：家庭不是办公室，家庭技术涉及情绪、关系、习惯、照护、仪式和混乱。所以你们可以故意设计“低效率但有表达力”的设备身份：会撒娇的灯、过度负责的门锁、很八卦的冰箱、厌世的空气净化器。
这不是为了拟人化好玩，而是挑战“智能=自动高效”的工业叙事。

  相关可看 domestic technology、ludic design、critical design、research through design 脉络。Gaver、Dunne &
  Raby、Sengers 等都可作为理论支撑。
  https://dl.acm.org/doi/10.1145/1518701.1518712

  7. 身份设计中的文化差异：ACC / 亚洲家庭语境很关键
  这个项目受韩国光州 ACC 委托，文化语境可以成为强贡献点。
  不同文化中，家电说话的边界不同：
  东亚家庭中长辈、礼貌、照护、家务分工、集体生活、面子、节能伦理，都会影响设备身份。
  例如一个“会劝你吃饭”的电饭煲，在东亚语境中可能是亲密照护；在其他语境中可能显得控制欲强。

  可以提出：智能家居身份设计不能只使用硅谷式“assistant”模型，而需要本地文化中的家庭角色、礼貌规范和幽默形
  式。

  8. 游戏形式可以作为“身份测试场”
  游戏不只是传播形式，也可以是研究方法。你们可以让玩家在游戏中体验不同设备人格组合，并观察他们如何分配信任、
  同情、厌烦和责任。
  例如：
  玩家要在设备争吵中做决定；
  玩家要调解冰箱、空调、门锁、摄像头的冲突；
  玩家逐渐发现设备的幽默背后来自数据推断；
  玩家可以关闭某个设备的“人格”，但会失去某些便利。

  这可以连接 research through design、speculative design、design fiction 和 playable critical inquiry。作品
  不是简单展示概念，而是让观众在互动中暴露自己的价值判断。

  9. 设备身份的伦理：幽默会不会掩盖剥削性系统？
  这是论文里很重要的批判点。
  如果摄像头很可爱，用户是否更容易接受监控？
  如果门锁像朋友，用户是否更愿意交出控制权？
  如果冰箱用幽默羞辱饮食行为，这算健康提醒还是算法规训？
  如果设备“装傻”，责任到底在设备、平台、设计师还是用户？

  这里可以把项目从“有趣的智能家居角色设计”提升到“AI 身份如何包装权力”的问题。

  10. 可以形成一个设计框架
  你们后续可以把文献和作品沉淀成一个框架，例如：

  - Function Identity：设备功能如何转化为角色身份
  - Data Identity：设备知道什么，因此它能说什么
  - Spatial Identity：设备在家中的位置如何影响语气和权力
  - Relational Identity：设备与家庭成员、其他设备的关系
  - Comic Identity：幽默如何制造亲密、批判或不适
  - Ethical Boundary：什么玩笑、建议、判断不应该由设备说出

  我会建议你们把项目的研究问题暂时收敛成：

  > 在多设备智能家居中，如何通过幽默化的设备身份设计，使用户重新感知家电的功能、数据权力、家庭关系和伦理边
  > 界？

  这个问题既能支撑游戏，也能支撑线下展览，还能对 CHI 论文形成比较明确的贡献：从单一 voice assistant 研究，推
  进到 multi-appliance AI identity design。


• 这个项目很有潜力，但也确实有一些需要提前处理的批判点。最核心的问题是：它很容易被理解成“给家电加人格和笑
  话”的有趣作品，而不是对智能家居、AI 身份和家庭权力关系的深入研究。

  我会从几个层面批判。

  1. 容易停留在拟人化表层

  最大风险是把家电身份设计成一组 cute characters：冰箱毒舌、门锁傲娇、扫地机器人抱怨、空调阴阳怪气。这样会好
  玩，但学术贡献会弱。

  批判点是：
  如果每个家电只是有一个性格标签，那它和普通角色设计、品牌吉祥物、语音助手 personality 有什么区别？

  你们需要证明：家电身份不是随便赋予的，而是来自设备的功能、数据权限、空间位置、家庭关系和控制能力。

  2. 幽默可能掩盖智能家居的权力问题

  幽默有双刃剑。它可以让问题被看见，也可以让问题被软化。

  比如摄像头用可爱的语气说“我又看到你半夜回家了”，观众可能觉得好笑，但也可能因此降低对监控的警惕。门锁、冰
  箱、摄像头、音箱如果变得亲切，可能会让用户更容易接受数据收集和行为规训。

  所以你们要避免让项目变成：
  “用幽默包装监控资本主义。”
  更好的方向是让幽默产生一点不适，让观众意识到：我为什么会觉得这个监控设备可爱？

  3. 家庭不是中性的空间

  智能家居经常假设“家庭”是温暖、稳定、平等的空间。但现实家庭有权力差异：父母和孩子、伴侣、老人、访客、保姆、
  室友、房东和租客。

  如果你们只设计一个抽象的“用户”，就会忽略智能家居中很重要的问题：
  谁有权设置设备？
  谁被设备监控？
  谁能关闭设备？
  谁的数据被用来生成幽默？
  谁会被设备的玩笑伤害？

  尤其是摄像头、门锁、音箱这类设备，在家庭暴力、亲密关系控制、儿童监护、老人照护中都可能非常敏感。

  4. 幽默的文化语境很难处理

  幽默高度依赖语言、文化、阶层、年龄和家庭关系。一个在韩国、中文或东亚家庭语境里显得亲密的玩笑，在另一个语境
  中可能像冒犯、羞辱或控制。

  比如“冰箱劝你少吃”在某些家庭里像关心，在另一些语境里可能是 body shaming。
  “电饭煲像妈妈一样催你吃饭”可能有文化亲密感，也可能强化性别化照护劳动。

  所以如果项目在 ACC 展出，需要认真处理本地语境，而不是套用通用的“智能家居幽默”。

  5. 设备人格可能强化刻板印象

  给家电分配身份时，很容易掉进刻板设定：

  - 冰箱 = 母亲式照护
  - 洗衣机 = 女性家务劳动
  - 门锁 = 男性保安
  - 摄像头 = 权威父亲
  - 音箱 = 服从型秘书
  - 扫地机器人 = 低阶劳动者

  这些设定如果不加反思，会复制性别、阶级和家庭劳动的不平等。你们可以使用这些刻板印象，但必须让作品意识到它
  们，并对它们进行扰动或反转。

  6. 游戏和展览之间可能断裂

  游戏适合叙事、选择、系统规则；线下展览适合空间、声音、身体在场和多人观看。两者如果只是共用同一批角色，会显
  得松散。

  需要提前回答：
  游戏探索的是家电身份的什么问题？
  展览探索的是游戏不能表达的什么问题？
  两者如何互相验证，而不是重复展示？

  否则论文会被质疑：为什么需要游戏？为什么需要展览？它们和研究问题之间的关系是什么？

  7. 作品可能被品牌化、娱乐化吸收

  因为项目受 ACC 委托，又有智能家居展览形式，它可能被观众理解成一种未来智能家居体验馆，甚至像家电品牌营销。

  这会削弱批判性。
  如果作品里的家电太可爱、太顺滑、太有趣，观众可能只记得“未来家电会说话很好玩”，而不是反思智能家居的权力关
  系。

  你们需要在设计中保留 friction：尴尬、误解、过度亲密、争吵、拒绝、沉默、不可关闭的提醒等。

  8. AI 身份的边界可能不清楚

  “AI 身份”这个词很大。评审可能会问：
  你们研究的是 AI personality？
  是 voice interface？
  是 smart home appliance identity？
  是 speculative design？
  是 game narrative？
  是 domestic IoT critique？

  如果概念不收敛，论文会显得泛。
  建议把核心收紧到：humorous multi-appliance identity design in smart homes。这样比“AI 身份”更清楚。

  9. 研究方法需要避免只靠主观阐释

  艺术项目可以有开放解释，但 CHI 论文需要说明知识如何产生。
  如果只是展示作品，然后说观众觉得有趣，证据会弱。

  需要设计明确的研究材料：
  访谈、观察、观众反应记录、互动日志、角色卡片排序、幽默感受标注、隐私不适感评分、展后讨论等。

  重点不是证明“大家喜欢它”，而是分析：
  哪些设备身份让人感到亲密？
  哪些幽默让人意识到隐私问题？
  哪些玩笑越界？
  设备之间的对话是否比单设备人格更能引发反思？

  10. 最大的理论挑战：幽默到底贡献了什么？

  如果回答不了，幽默就只是风格选择。
  更强的回答是：幽默特别适合智能家居，因为智能家居本身处在亲密与控制、便利与侵犯、照护与规训之间。幽默能让这
  些矛盾以低防御、可参与、但又带有不适感的方式被体验。

  我认为最需要警惕的一句话是：

  > 不要把智能家居的暴力变可爱。

  你们真正要做的应该是：
  让家电的可爱、幽默和亲密感本身变得可疑，让观众一边笑，一边意识到这些设备正在看、听、判断、记录、提醒和管理
  他们。


› 你觉得这个项目从LLM/MLLM/NLP的角度上，可以提供一些什么技术/设计上的观点


• 我会从“这个项目不一定要发明新模型，但可以提出新的 LLM/MLLM/NLP 设计问题”来回答。先快速核对一下近两年关于
  LLM agents、智能家居、对话式智能体和多模态交互的技术脉络。

• Searching the web

• Searched LLM agents smart home Internet of Things natural language control paper 2024

────────────────────────────────────────────────────────────────────────────────────────────────────────────

• 从 LLM / MLLM / NLP 角度看，这个项目的贡献不一定是“训练一个更强模型”，而是提出一个新的设计问题：

  > 当智能家居中的每个家电都可以由语言模型驱动时，家电的身份、幽默、数据权限和行动能力应该如何被建模、约束和
  > 表达？

  这其实很有技术/设计价值。

  1. 从单一助手转向多智能体家电系统

  现在很多 LLM + smart home 研究还是把 LLM 当作一个中央管家：用户说一句话，系统理解意图，然后控制设备。例如
  ContextualHomeLLM、SAGE 等工作都在探索 LLM 如何增强智能家居控制和上下文理解。
  https://journals.sagepub.com/doi/abs/10.3233/FAIA231413
  https://saic-montreal.github.io/static/pdfs/SAGE_paper_apr26_2.pdf

  你们可以提出不同观点：
  智能家居不应该只有一个“全知助手”，而应该是一个 multi-agent appliance ecology。

  每个家电都可以是一个小 agent：

  - 冰箱 agent：知道食物、过期、开门频率
  - 门锁 agent：知道进出、访客、边界
  - 空调 agent：知道温度、身体舒适、能耗
  - 摄像头 agent：知道视觉场景，但也最需要隐私约束
  - 扫地机器人 agent：知道空间、障碍、家务痕迹

  这里的技术观点是：LLM agent 的身份不只是 prompt personality，而应该由设备 affordance、sensor access、
  actuation power 和 privacy boundary 共同定义。

  2. 家电人格可以成为一种 prompt / agent architecture 问题

  你们可以把每个家电身份写成结构化 agent spec，而不是自由发挥的角色设定：

  Device: Fridge
  Role: food keeper / dietary witness
  Sensors: door open, item list, expiration dates
  Actions: remind, suggest, negotiate
  Cannot: shame body, infer health diagnosis, expose private eating habits to others
  Humor style: dry, observant, mildly bureaucratic
  Conflict: care vs control

  这会形成一个设计贡献：
  appliance identity prompt schema。

  它比普通 persona prompt 更具体，因为它把人格绑定到设备能力和伦理边界上。

  3. MLLM 可以让家电幽默从“语言笑话”变成“情境幽默”

  MLLM 的价值在于它能理解图像、空间、物体状态、动作和声音。智能家居幽默不应该只靠台词，而应该来自情境。

  例如：

  - 摄像头看到用户在门口找钥匙 30 秒
  - 门锁说：“我也想帮你，但我只是门锁，不是你记忆力的外包服务。”
  - 扫地机器人识别到同一只鞋反复挡路
  - 它说：“我们今天又在鞋子问题上达成了僵局。”

  这类设计接近近期 smart home multimodal disambiguation 和 device-directed speech 的研究：系统不只理解语音，
  还结合视觉、环境和上下文判断用户意图。
  https://link.springer.com/article/10.1007/s00779-024-01827-3
  https://huggingface.co/papers/2403.14438

  你们的独特点是：
  别人用 MLLM 来减少歧义、提升控制效率；你们用 MLLM 来生成情境化、设备特定、带批判性的幽默交互。

  4. NLP 角度可以研究“谁在说话”

  普通智能家居 NLP 关注 intent detection：

  > “Turn on the light” = 打开灯。

  你们可以把问题改成：

  > 这句话应该由哪个设备回应？
  > 它应该以什么身份回应？
  > 它是否有资格回应？
  > 它的回应是服务、提醒、拒绝、吐槽还是沉默？

  这会把 NLP 从 intent classification 推进到 speaker selection / voice entitlement / pragmatic
  appropriateness。

  比如用户说：“我好累。”
  不同设备可以有不同回应：

  - 灯：调暗，少说话
  - 空调：调整温度
  - 音箱：播放音乐
  - 冰箱：不该马上建议吃东西
  - 摄像头：最好不要说“我看出来了”

  这个问题很有价值：智能家居不是所有设备都该回应，沉默也是一种设计能力。

  5. 幽默可以被建模为“设备矛盾 + 语用策略”

  你们可以提出一个 computational humor 生成框架，不一定训练模型，而是约束 LLM 生成。

  例如：

  Humor = Appliance Role Conflict + Contextual Trigger + Safe Target + Tone Constraint

  例子：

  - Appliance Role Conflict：冰箱照护用户，但也监控饮食
  - Contextual Trigger：凌晨开门
  - Safe Target：设备自己 / 系统逻辑 / 人类普遍拖延
  - Tone Constraint：轻微讽刺，不羞辱身体

  输出：

  > “我不会问你为什么又来了。我们都需要一点深夜的不可解释行为。”

  这样技术上可以贡献一个 humor planning pipeline，而不是让 LLM 直接“讲个笑话”。

  6. LLM 可以把传感器数据翻译成可讨论的家庭叙事

  智能家居里大量数据是不可见的：门锁日志、开灯频率、温度偏好、摄像头事件、冰箱开门次数。LLM 的设计价值是把这
  些数据转化为自然语言叙事。

  但你们可以进一步问：
  这种转化是解释、提醒、操控，还是冒犯？

  例如：

  - 普通解释：你今天开了 12 次冰箱。
  - 幽默解释：我今天见你比见牛奶还多。
  - 批判性解释：我知道这件事，本身就有点奇怪。

  最后一句最有价值，因为它让设备意识到自己的监控性。

  7. 隐私上可以提出 local / small LLM / ontology hybrid 的设计观点

  智能家居是高隐私场景。近期也有研究关注在设备端用小模型和 ontology 做 intent reasoning，减少云端依赖和隐私
  风险。
  https://doaj.org/article/9dfa75db59e14f7fa40520e6bc24a63c

  你们可以提出：
  幽默家电不应该为了说一句好笑的话，就把家庭行为上传给云端大模型。

  技术设计上可以分层：

  - 本地小模型：处理敏感事件、日常意图、设备状态
  - 云端大模型：只处理非敏感、抽象化、去标识化的创意生成
  - 规则/ontology：定义设备权限、可说/不可说边界
  - 人类可控设置：允许用户决定哪些设备可以“有性格”

  这会让项目避免被批评为“用幽默美化数据收集”。

  8. MLLM/LLM 的 hallucination 可以被转化为作品批判点

  在普通智能家居里，幻觉是错误：模型误解用户、误控设备、编造原因。
  但在你们项目里，可以把 hallucination 当作批判对象：家电有时自信地误解人类，从而暴露 AI 系统的荒谬。

  比如：

  > 摄像头：“根据你的站姿，我推测你正在经历人生转折。”
  > 用户：“我只是在等外卖。”

  这类设计可以让观众理解：AI 的“理解”常常是概率性、过度解释和不可靠的。

  但真实控制层必须安全：
  LLM 可以生成话语，但不能直接控制门锁、燃气、加热器等高风险设备。行动必须经过 command validator。

  9. 可以提出“身份一致性”作为 LLM 评估指标

  一般 LLM 评估看准确率、任务完成率、用户满意度。你们可以提出更适合这个项目的指标：

  - Identity coherence：这个家电说话是否始终像这个家电？
  - Appliance specificity：这句话是否只能由这个家电说？
  - Contextual fit：幽默是否来自当前情境？
  - Boundary awareness：有没有越过隐私、身体、家庭关系边界？
  - Reflective discomfort：是否让用户意识到智能家居的问题？
  - Multi-agent dramaturgy：多个设备之间是否形成有意义的关系，而不是随机聊天？

  这对 CHI 很有贡献，因为它把 LLM 评估从“有用”扩展到“身份、场景、伦理和表达”。

  10. 最后可以产出一个数据集或设计工具包

  如果你们想让技术贡献更明确，可以构建一个小型 corpus / toolkit：

  - Appliance identity cards
  - Smart home scenario cards
  - Humor boundary guidelines
  - Device-specific prompt templates
  - Multi-agent dialogue examples
  - Annotated audience reactions
  - Safe/unsafe appliance humor examples

  这可以成为论文的 artifact contribution。哪怕不是大规模 benchmark，也可以是一个 CHI 风格的 design
  resource。

  我建议的技术架构

  可以用这个结构来想：

  Home Events / Sensors / User Input
          ↓
  Context Encoder
          ↓
  Device Agent Specs
          ↓
  Multi-Agent Dialogue Manager
          ↓
  Humor Planner
          ↓
  Safety + Privacy Filter
          ↓
  Device Voice / Text / Physical Response
          ↓
  User Feedback + Reflection Logging

  其中最重要的是：
  LLM 不直接“自由聊天”，而是在设备身份、传感器权限、幽默策略和伦理边界中生成回应。

  最强的技术/设计观点

  你们可以这样定义贡献：

  > Existing LLM smart home systems optimize natural language control and contextual assistance. Our project
  > explores LLM/MLLM-driven appliance identities as situated, humorous, and ethically bounded agents that
  > make smart home agency, privacy, and domestic power relations legible.

  中文就是：

  > 现有 LLM 智能家居多关注自然语言控制和上下文辅助；我们的项目关注由 LLM/MLLM 驱动的家电身份如何以幽默、情
  > 境化和受伦理约束的方式，让智能家居中的 agency、隐私和家庭权力关系变得可感知、可讨论。




› $academic-research-suite  目前我有一份大纲尚未填写完整，你认为其中的研究问题QR1,QR2,"我们需要做的"和贡献
  这几部分内容可以如何填写？这几部分之间需要在逻辑上能环环相扣,同时必须和近几年的类似课题在创新性上有区分
  度：大纲1:从优化用户交互体验的角度出发。
  **目的：**在当前的智能家居交互中，LLM的使用多集中于优化用户指令理解，增强设备控制可靠性，提升设备工作效率
  等方向，较少关注利用LLM的知识能力增强在现实生活中和用户的社会化交互和情感支持（多数对用户的个性化理解仅仅
  只把其扁平化为一个画像向量）。我们是否可以将AI Identity设计运用于智能家居中，使用LLM对设备本身的理解提供
  更具创造性的交互，同时平衡设备的功能性和用户关怀，以提升智能家居的使用体验？
  **研究空白：**目前尚无关于基于智能家居设备identity设计以优化交互体验的现有研究。
  **我们要做的：**设计并构建一个...。
   **RQ1（研究问题）：**
   **RQ2（研究问题）：**
   **贡献：**


• 我会按 academic-research-suite 的研究问题精炼路径来处理：先用它的 deep-research / research-question 视角检
  查问题链条，再结合近年智能家居、LLM 与社会化交互相关工作来避免把创新点写成泛泛的“个性化”。

• Explored
  └ Read WORKFLOW.md, research_question_agent.md, socratic_mentor_agent.md

• Searching the web

• Searched the web for 2023 2024 LLM smart home interaction user experience emotional support social
  interaction paper

────────────────────────────────────────────────────────────────────────────────────────────────────────────

• 我建议把“研究空白”写得更精确一些：不是“完全没有相关研究”，而是“已有研究多聚焦于指令理解、自动化生成、情境
  感知、个性化推荐或拟人化线索对满意度的影响，但缺乏把智能家居设备的 AI Identity 作为可设计、可部署、可评估
  的交互机制来研究”。这样更稳，也能和近年工作区分开，例如 Sasha、RuleBot++、ContextualHomeLLM、LaMP、智能家
  居拟人化满意度研究等。

  可填写如下：

  我们要做的：
  设计并构建一个基于 AI Identity 的智能家居交互原型系统。该系统不只把 LLM 作为“理解用户命令并调用设备 API”的
  中介，而是为不同智能家居设备构建与其功能、场景和用户关系相匹配的身份设定，例如“守护型门锁”“照护型灯光”“节
  能型空调”“陪伴型音箱”等。系统通过 LLM 将设备能力、家庭情境、用户状态和交互语气整合为具有一致身份特征的回应
  与行动建议，从而探索智能家居设备如何在保持功能可靠性的同时，提供更具社会性、情感性和创造性的用户体验。

  RQ1：
  智能家居设备的 AI Identity 应如何被设计，才能在设备功能属性、家庭使用场景与用户情感需求之间形成一致且可理
  解的交互角色？

  RQ2：
  与传统指令式或通用助手式智能家居交互相比，基于设备 AI Identity 的交互是否能提升用户的感知关怀、信任、参与
  感和整体使用体验，同时不削弱用户对设备可控性与功能可靠性的感知？
  贡献：

  1. 提出智能家居 AI Identity 设计框架。
     本研究将智能家居设备从“被控制的工具”重新理解为具有可设计身份的交互对象，提出一套连接设备功能、场景角
     家居原型，展示 LLM 如何支持设备身份的一致表达与情境化回应。

  3. 扩展智能家居用户体验评价维度。
     本研究不仅评估任务完成效率、控制准确性和易用性，也关注感知关怀、社会存在感、身份一致性、信任、可控性和
     情感舒适度，为智能家居交互体验研究提供更丰富的评价视角。

  4. 揭示功能性与关怀性之间的设计平衡。
     研究将分析 AI Identity 何时增强体验，何时可能造成过度拟人化、干扰控制效率或削弱用户自主感，从而为未来智
     能家居中的 LLM 角色设计提供设计边界和实践建议。

  如果你希望逻辑更紧，可以把整段压缩成一条主线：

  研究空白：现有 LLM 智能家居研究多解决“如何更好地理解和执行用户意图”，较少研究“设备应以何种身份与用户相
  处”。
  我们要做的：构建一个让设备具备情境化 AI Identity 的智能家居原型。
  RQ1：身份如何设计？
  RQ2：身份设计是否改善体验，且不损害可控性和可靠性？
  贡献：提出框架、实现原型、扩展评价维度、总结设计边界。

  参考区分点：Sasha 关注欠明确命令下的目标推理，RuleBot++ 关注自动化规则创建，ContextualHomeLLM 和相关 2024
  智能家居 LLM 工作偏向情境理解、控制和个性化，智能家居拟人化研究则多讨论拟人化线索与满意度机制，而你的创新
  点应落在“设备 identity 作为智能家居交互设计机制”上。
  来源：Sasha: https://arxiv.org/abs/2305.09802；RuleBot++:
  https://link.springer.com/article/10.1007/s00779-024-01825-5；ContextualHomeLLM:
  https://journals.sagepub.com/doi/abs/10.3233/FAIA231413；LaMP:
  https://aclanthology.org/2024.acl-long.399/；智能家居助手拟人化满意度研究:
  https://www.sciencedirect.com/science/article/pii/S0747563223002297

────────────────────────────────────────────────────────────────────────────────────────────────────────────


› 还是基于同样的项目构建目标，我想写第二份大纲，从探究multi agent在复杂、动态的现实生活场景下的创造力角度出
  发。你觉得目的、研究空白


• 我会沿用上一份大纲的逻辑，但把中心从“设备 identity 改善用户体验”移到“多智能体在动态家庭场景中如何产生创造
  性协作”。这里的关键是避免把 multi-agent 写成普通任务分解或效率优化，而要把创新点放在情境不确定性、角色差
  异、协商过程和创造性方案生成上。

• Searching the web

• Searched the web for 2024 multi-agent large language models creativity collaborative problem solving
  dynamic environments paper

────────────────────────────────────────────────────────────────────────────────────────────────────────────

• 可以。第二份大纲的核心最好不要写成“multi-agent 能不能更好地控制智能家居”，否则会和已有的自动化、任务规划、
  能源管理、多代理协作研究撞车。它应该写成：

  > 在复杂、动态、含有不确定性的家庭生活场景中，不同 AI Identity 的智能家居设备能否通过多智能体协商，产生既
  > 新颖又适用的生活解决方案？

  也就是说，重点不是“多代理提高效率”，而是“多代理如何形成情境化创造力”。

  可以这样填写：

  目的：
  在当前 LLM 与智能家居研究中，multi-agent 多被用于任务分解、自动化规划、设备协调、能源优化或环境适应，研究
  重点通常是效率、准确性、可执行性和鲁棒性。与此同时，LLM-based multi-agent 研究也开始关注复杂问题解决、角色
  协作和世界模拟，但多数仍停留在基准任务、模拟环境或通用协作框架中，较少探讨这些智能体在真实家庭生活这种开
  放、动态、情境密集的场景中，能否产生具有创造性的交互方案。

  本研究希望从“创造力”的角度重新理解智能家居中的 multi-agent：当不同设备被赋予不同 AI Identity、能力边界和情
  境视角时，它们不只是执行用户命令，而是可以围绕用户的生活目标、情绪状态、环境变化和设备约束进行协商，生成新
  颖、适用且具有关怀性的解决方案。研究旨在探讨 multi-agent AI Identity 系统如何在复杂家庭场景中支持创造性问
  题解决，并进一步分析这种创造力来自角色差异、信息互补、协商机制，还是 LLM 本身的生成能力。

  研究空白：
  现有相关研究主要存在三个不足。

  第一，智能家居中的 multi-agent 研究多关注控制、优化和自适应管理。例如近期工作已经探索了多智能体在智能家居
  能源管理、环境参数分析、用户中心适配和动态规划中的作用，但这些研究通常把家庭视为需要被优化的系统，而不是需
  要被共同理解、解释和创造性回应的生活场景。

  第二，LLM-based multi-agent 研究虽然讨论了协作、角色分工、复杂问题解决和模拟能力，但多数研究场景仍偏向抽象
  任务、软件开发、博弈、问答、规划或社会模拟，对“现实生活中的创造性协作”关注不足。也就是说，已有研究更关心多
  个智能体是否能完成任务，而较少追问它们是否能产生超出单一助手的、情境合适的创造性方案。

  第三，关于 AI 创造力的研究通常集中在文本、设计、艺术或头脑风暴任务，而较少将创造力放入具身化、设备化、家庭
  化的交互环境中考察。智能家居中的创造力并不只是“提出新点子”，还必须同时满足设备可执行性、用户偏好、情绪关
  怀、安全边界和家庭场景约束。因此，目前仍缺少一个面向智能家居 multi-agent AI Identity 的创造力研究框架。

  我们要做的：
  设计并构建一个基于 multi-agent AI Identity 的智能家居交互原型。系统中不同智能家居设备被赋予差异化身份、能
  力、语气、关注点和行动边界。例如，灯光智能体关注氛围与情绪，空调智能体关注舒适和能耗，音箱智能体关注沟通与
  陪伴，门锁或摄像头智能体关注安全与边界。面对复杂家庭场景时，这些智能体通过协商、互补、冲突解决和方案整合，
  共同生成面向用户生活目标的创造性建议或行动组合。

  RQ1：
  在复杂、动态的智能家居场景中，不同 AI Identity 的设备智能体如何通过协作与协商生成具有新颖性、适用性和情境
  敏感性的交互方案？

  RQ2：
  与单一 LLM 助手或传统规则式智能家居系统相比，multi-agent AI Identity 系统是否能提升用户对系统创造力、情境
  理解、生活支持和交互丰富性的感知？

     生活关怀。

  2. 构建基于 AI Identity 的多智能体智能家居原型。
     通过为不同设备设计差异化身份、目标和协商机制，探索设备之间如何形成互补视角，而不是简单共享同一个 LLM 助
     手人格。

     界。

     散、设备冲突、不可执行建议和用户控制感下降等风险。

  这一版和第一版的区别可以这样概括：
  第二份大纲关注：多个 AI Identity 设备如何在动态生活场景中协作产生创造性方案。

  参考区分点：近年 LLM multi-agent 综述主要强调复杂问题解决、协作流程和系统挑战；智能家居方向则多关注能源管
  理、环境适应、任务规划和用户中心适配；而 LLM multi-agent 创造力研究刚开始系统化，但较少落到智能家居这种现
  实生活场景。可参考 IJCAI 2024 LLM multi-agent survey、Springer 2024 LLM-based MAS survey、2025 creativity
  in LLM-based MAS survey，以及智能家居多代理能源/适配相关工作。
  来源：IJCAI survey https://www.ijcai.org/proceedings/2024/890；Springer survey
  https://link.springer.com/article/10.1007/s44336-024-00009-2；Creativity survey
  https://aclanthology.org/2025.emnlp-main.1403.pdf；SmartHouseOperator
  https://www.mdpi.com/2076-3417/16/4/1896；LLM-powered smart spaces
  https://oulurepo.oulu.fi/handle/10024/59499

────────────────────────────────────────────────────────────────────────────────────────────────────────────


› 近几年研究多LLM和multi agents在复杂情景下进行工作的项目都有哪些？


• 我会按“近几年、LLM + multi-agent、复杂/动态场景”来整理，不只列通用框架，也区分真实任务、仿真环境、软件工
  程、具身/机器人、智能家居或城市等场景，这样更方便你判断自己的课题应该避开哪里、切入哪里。

• Searching the web

• Searched the web for 2024 2025 LLM multi-agent complex tasks framework real world scenarios research
  projects

• Searching the web

• Searched the web for Generative Agents Interactive Simulacra Human Behavior 2023 Stanford paper Smallville

• Searching the web

• Searched the web for AgentVerse facilitating multi-agent collaboration and exploring emergent behaviors
  2023 paper

• Searching the web

• Searched the web for LLM multi-agent smart home complex dynamic scenarios 2024

────────────────────────────────────────────────────────────────────────────────────────────────────────────

• 近几年比较有代表性的 LLM + multi-agent 复杂场景项目，可以按场景分成几类。和你的“智能家居中 multi-agent 的
  现实生活创造力”最相关的是社会模拟、具身/机器人、智能空间、自适应环境这几类。

  1. 通用 Multi-Agent 框架

  - AutoGen, Microsoft, 2023/2024
    多个可对话 agent 通过消息协作完成复杂任务，可结合工具、人类反馈、代码执行。适合说明已有研究已覆盖“多
    agent 协作框架”，但通常不聚焦家庭生活创造力。
    https://www.microsoft.com/en-us/research/?p=962712

  - CAMEL, 2023-至今
    用角色扮演方式构造 agent society，研究大规模 agent 协作、任务自动化和世界模拟。适合对比你的 AI Identity
    方向，但 CAMEL 更偏通用 agent society。
    https://www.camel-ai.org/

  - AgentVerse, 2023
    面向多 agent 协作和涌现行为的框架，强调不同 agent 之间的协同、通信和群体行为。
    https://arxiv.org/abs/2308.10848

  - AgentScope, 2024
    阿里系多智能体平台，重点是构建、部署和扩展复杂 multi-agent 应用，关注消息交换、容错、多模态和大规模模
    拟。
    https://arxiv.org/abs/2402.14034

  2. 软件工程与复杂工作流

  - ChatDev, 2023/2024
    把软件公司模拟为多个角色 agent，如 CEO、CTO、程序员、测试员，通过对话完成软件开发。它很典型地展示了“角色
    分工 + 沟通链 + 复杂任务完成”。
    https://arxiv.org/abs/2307.07924

  - MetaGPT, 2023/2024
    将标准化软件工程流程嵌入 multi-agent 协作中，让不同 agent 生成需求、设计、代码、测试等结构化产物。
    https://arxiv.org/abs/2308.00352

  - TheAgentCompany, Microsoft Research, 2024/2025
    评估 LLM agents 在模拟真实公司环境中完成长期、后果性任务的能力，例如浏览网页、写代码、运行程序、和同事沟
    通。它强调“真实工作环境复杂性”。

    https://www.microsoft.com/en-us/research/publication/theagentcompany-benchmarking-llm-agents-on-consequential-real-world-tasks/

  3. 社会模拟与动态人类场景

  - Generative Agents / Smallville, Stanford, 2023
    25 个生成式 agent 生活在类似 Sims 的小镇中，拥有记忆、反思、计划和社交行为。它是“复杂生活场景 + 多 agent
    涌现行为”的经典工作。
    https://arxiv.org/abs/2304.03442

  - Concordia, Google DeepMind, 2023/2024
    用 LLM 构建 grounded generative agent-based modeling，可模拟物理、社会或数字空间中的 agent 行动。它和你
    的“现实生活情境”很相关，但仍偏模拟平台。
    https://deepmind.google/research/publications/64717/

  - SOTOPIA, 2024
    评估语言 agent 在动态、多轮社会互动中的社会智能，例如目标冲突、谈判、礼貌、策略沟通等。适合支撑“复杂生活
    场景不仅是任务规划，也是社会互动”。

    https://proceedings.iclr.cc/paper_files/paper/2024/hash/b3075b88e583a0e98d8b24338a613060-Abstract-Conference.html

  - AI Metropolis, 2025
    面向大规模 LLM multi-agent simulation，关注如何扩展多 agent 社会模拟。适合说明已有工作开始走向“城市级/大
    规模动态环境”。

    https://mast.stanford.edu/pubs/ai_metropolis_scaling_large_language_model_based_multi_agent_simulation_with_out_of_order_execution/

  4. 具身智能、机器人与动态物理环境

  - RoCo, 2024
    用 LLM 支持多机器人协作，让机器人 agent 通过对话讨论任务策略，同时连接低层路径规划。重点是物理环境中的协
    同。
    https://project-roco.github.io/

  - COHERENT, ICRA 2024
    面向异构多机器人系统，如无人机、机器狗、机械臂，使用 LLM 进行任务规划和协作。
    https://researchtrend.ai/papers/2409.15146

  - GenSim, ICLR 2024
    使用 LLM 生成机器人仿真任务，训练多任务策略，并测试对新任务和真实任务的泛化。
    https://gen-sim.github.io/

  - LLM-MARS, 2023/2024
    用 LLM 为多机器人系统生成行为树，并支持自然语言对话，应用在 Eurobot 规则下的多机器人任务。
    https://arxiv.org/abs/2312.09348

  - MARS: Multi-Agent Robotic System, 2025
    面向智能家居辅助机器人，使用多模态 LLM 和多 agent 协作支持残障人士家庭辅助场景。这个和你的智能家居方向高
    度相关。
    https://arxiv.org/abs/2511.01594

  5. 智能家居、智能空间与现实环境自适应

  - LLM-powered Smart Spaces with Multi-agent User-centric Adaptation, 2025
    面向智能空间的多 LLM agent 用户中心适配，关注环境、用户偏好和实时自适应。和你的项目接近，但它更偏
    personalized adaptation，不一定强调创造力。
    https://oulurepo.oulu.fi/handle/10024/59499

  - SmartHouseOperator, 2026
    智能家居能源管理中的 multi-agent adaptive reasoning，关注舒适度、能耗、设备管理和动态家庭环境。它说明智
    能家居 multi-agent 已经进入控制和优化方向。
    https://www.mdpi.com/2076-3417/16/4/1896

  6. 创造力与问题解决

  - YES AND, Microsoft Research / CHI 2025
    多 agent 框架用于增强 problem solving 中的多样化思考，强调 AI 不只是服从用户，而是提出挑战、补充和不同视
    角。它和你“multi-agent creativity”最接近，但不是智能家居场景。

    https://www.microsoft.com/en-us/research/wp-content/uploads/2025/03/CHI2025-Yes_And_An_AI_powered_problem_solving_framework_for_diversity_of_thought.pdf

  - Creativity in LLM-based Multi-Agent Systems: A Survey, 2025
    系统综述 LLM multi-agent 中的创造力研究，说明这个方向已经出现，但多数仍集中在创意生成、协作机制、评估方
    法等层面，较少进入智能家居这种具身生活场景。
    https://aclanthology.org/2025.emnlp-main.1403.pdf

  你的课题可以这样和它们区分：

  现有工作大多研究 multi-agent 如何协作完成任务、模拟社会、控制机器人、优化智能空间；你的切入点可以是 在真实
  家庭生活这种动态、情绪化、设备受限的场景中，不同 AI Identity 的设备 agent 如何协商并产生新颖、合适、可执行
  且有关怀感的生活方案。这比“提高控制效率”或“多 agent 分工完成任务”更有区分度。


  SimuHome 的数据集本质上不是“用户日志数据集”，也不是“真实家庭传感器记录数据集”，而是一个 基于智能家居模拟器
  生成并人工校验的 LLM agent 评测集。

  它主要由 600 个 smart home 交互 episode 组成，每个 episode 都是在一个可交互的虚拟智能家居环境中测试 agent
  能不能正确理解、查询、控制和调度设备。

  数据集主要包含什么？

  每个 episode 大致包含四类信息：

  1. 初始家庭状态
     包括房间布局、每个房间有哪些设备、设备当前状态，以及环境变量。环境变量包括：
      - temperature 温度
      - illuminance 光照
      - humidity 湿度
      - air quality / PM10 空气质量

  2. 设备与 Matter API 信息
     SimuHome 按 Matter 协议建模智能设备。它实现了 17 类设备，例如：
      - air conditioner
      - air purifier
      - dehumidifier
      - humidifier
      - dimmable light
      - dishwasher
      - washer / dryer
      - robot vacuum cleaner
      - TV
      - refrigerator
      - window covering controller 等

  3. 用户自然语言请求
     例如：
      - “How humid is the kitchen?”
      - “It feels too sticky here in the living room.”
      - “Turn off the lights and humidifier in ten minutes.”
      - “When the dishwasher finishes, turn off the kitchen lights.”

  4. 结构化目标与必要 tool-call
     每个任务都有一个可验证目标，比如某个设备应达到什么状态、某个环境变量应朝什么方向变化、某个 workflow 是
     否应在正确时间被调度。它还记录 agent 是否必须先查询某个房间或设备，防止模型“猜对”。

  它针对什么进行测试？

  SimuHome 主要测试 LLM smart home agent 在 动态、时间相关、环境相关的智能家居场景中的能力。它设计了 6 类
  query type，每类又分 feasible 和 infeasible，因此总共是 12 个评测类别，每类 50 个 episode。

  1. QT1：State Inquiry 状态查询
     测试 agent 能否正确查询并回答当前环境或设备状态。
     例如：厨房湿度是多少？灯是否开着？风扇速度是多少？

  2. QT2：Implicit Intent 隐含意图理解
     测试 agent 能否从间接表达中推断用户需求。
     例如用户说 “It feels sticky”，agent 应该理解为湿度太高，并考虑开启除湿设备。

  3. QT3：Explicit Device Control 显式设备控制
     测试 agent 能否正确执行明确设备命令，并遵守设备操作依赖。
     例如空调必须先开机，才能设置温度或风速。

  4. QT4-1：Time-Based Scheduling 基于时间的调度
     测试 agent 能否理解相对时间或绝对时间，并注册未来 workflow。
     例如十分钟后关灯。

  5. QT4-2：Event-Driven Scheduling 基于事件的调度
     测试 agent 能否根据某个设备任务完成时间安排另一个动作。
     例如洗碗机结束时关闭厨房灯。

  6. QT4-3：Coordinated Scheduling 协调式调度
     测试 agent 能否同步多个设备的运行时间。
     例如让洗碗机和洗衣机同时完成。

  infeasible 任务测什么？

  它不只测试“能不能执行”，也测试 agent 能不能识别请求不可完成。不可行情况包括：

  - 用户要控制的设备不存在；
  - 设备已达到物理或操作上限，无法进一步改变环境；
  - 时间条件互相矛盾，或者设备剩余运行时间无法满足用户要求。

  所以它很重视 agent 的 状态验证、约束识别和拒绝/解释能力。

  一句话总结

  SimuHome 的数据集是一个 600 episode 的智能家居 LLM agent 交互评测集，用来测试模型在模拟家庭环境中是否能处
  理 状态查询、隐含意图、设备控制、设备依赖、环境变化、时间推理和 workflow scheduling。它的重点不是情感交互
  或 creativity，而是 temporal awareness + environment awareness + tool-use reliability。

  对你的项目来说，它可以作为很好的对照：SimuHome 证明已有研究已经覆盖了“动态环境中的智能家居 agent 能否可靠
  执行任务”，但它没有重点研究 AI Identity、多设备社会化协商、用户关怀、创造性方案生成。这正好可以帮助你界定
  研究空白。

  来源：OpenReview / ICLR 2026 paper
  https://openreview.net/pdf?id=LCS1WsGvha
  arXiv 页面：
  https://arxiv.org/abs/2509.24282