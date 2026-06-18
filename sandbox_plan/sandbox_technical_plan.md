# 3D 智能家居 AI Identity 沙盒场景技术方案

## 1. 项目目标

本项目的初步目标是搭建一个可运行的 3D 智能家居沙盒原型。用户可以进入一个虚拟家居空间，与房间中的家具、家电和智能设备互动。每个物品不仅是可点击的 3D 对象，也可以绑定一个 LLM 或 agent，使其根据自身功能、位置、权限、状态和身份设定与用户对话，并触发场景中的状态变化。

核心不是简单地让家电“像人一样说话”，而是探索一种新的智能家居交互模式：智能家居不再由一个中心化语音助手统一代表，而是由多个有身份、有功能边界、有感知范围、有情绪风格和相互关系的设备共同组成一个家庭生态。

第一阶段应优先实现一个研究原型，而不是完整游戏。这个原型需要支持：

- 3D 家居场景加载与浏览。
- 家具和家电对象的点击、靠近、选中和高亮。
- 每个设备拥有独立身份、能力、状态和对话风格。
- 用户可以通过文本 prompt 与设备互动。
- 设备可以调用有限动作改变场景状态。
- 多个设备可以围绕同一用户需求进行协商或插话。
- 系统记录用户输入、agent 回复、动作执行和状态变化，便于后续研究分析。

## 2. 推荐技术路线

推荐采用 Web 技术栈：

```text
React + Three.js + React Three Fiber + Zustand + Node/Express + LLM API
```

### 2.1 前端

前端负责 3D 场景、用户交互、UI 面板、状态显示和动画反馈。

推荐库：

- `React`：组织交互界面和组件。
- `Three.js`：底层 Web 3D 渲染引擎。
- `React Three Fiber`：Three.js 的 React renderer，用组件化方式组织 3D 场景。
- `@react-three/drei`：提供常用相机、控制器、环境光、HTML 标注、模型加载等工具。
- `@react-three/rapier`：提供物理碰撞、刚体、传感区域和碰撞事件。
- `Zustand`：管理全局世界状态、设备状态和对话状态。
- `Framer Motion` 或普通 CSS transition：处理 UI 面板动画。

### 2.2 后端

后端负责保护 API key、调用 LLM、管理 agent prompt、验证动作、记录日志。

推荐方案：

- 简单原型：`Node.js + Express`
- 如果前端使用 Next.js：可以使用 Next.js API routes
- 如果后续需要多人在线或实时事件同步：可以加入 `Socket.IO` 或 WebSocket

后端核心职责：

- 接收用户 prompt、当前设备 ID 和 world state。
- 根据设备 persona 构建 prompt。
- 调用 LLM。
- 解析模型返回的文本和动作。
- 验证动作是否在设备能力范围内。
- 返回安全、结构化的结果给前端。
- 记录实验日志。

### 2.3 3D 资产格式

推荐统一使用 `.glb` 或 `.gltf`。

`.glb` 更适合本项目，因为它把模型、材质、贴图和动画打包在一个二进制文件中，加载和部署都更简单。

资产处理流程：

```text
下载或制作家居模型
  -> Blender 清理模型
  -> 拆分可交互设备
  -> 重命名 mesh
  -> 优化贴图和面数
  -> 导出 .glb
  -> 压缩
  -> 放入 public/assets/models
```

## 3. 总体系统架构

```text
Frontend
  React app
  Three.js / React Three Fiber scene
  Interaction layer: click, hover, proximity, drag
  Dialogue UI: chat panel / speech bubble / object focus panel
  World state store: Zustand

Backend
  API server
  LLM proxy
  Agent orchestration
  Prompt templates
  Tool/action validator
  Logging and experiment data

Assets
  home_scene.glb
  furniture metadata JSON
  object icons / sounds / animations

LLM / Agents
  Device agents: fridge, lamp, AC, door lock, robot vacuum
  Optional central coordinator
  Tool calls: set_light, set_temperature, lock_door, move_robot
  Memory: user profile, object history, household events
```

## 4. 核心模块设计

### 4.1 SceneManager

`SceneManager` 负责加载和管理 3D 家居场景。

核心功能：

- 加载 `.glb` 或 `.gltf` 场景。
- 设置相机、灯光、阴影和环境贴图。
- 遍历 scene graph，识别可交互对象。
- 根据模型中的 mesh 名称或外部 metadata 绑定设备信息。
- 处理 hover、click、selection。
- 对选中对象添加 outline、发光或颜色变化。
- 将 3D 对象与前端 UI 面板关联。

建议的模型命名规范：

```text
Room_Static
Floor_Static
Wall_Static
Device_Fridge
Device_Lamp
Device_AC
Device_DoorLock
Device_RobotVacuum
Prop_Table
Prop_Sofa
```

### 4.2 InteractableObject

每个可交互物体都应有统一的数据结构，而不是把逻辑散落在 3D 组件里。

示例类型：

```ts
type InteractableObject = {
  id: string
  name: string
  type: 'fridge' | 'lamp' | 'ac' | 'doorlock' | 'robot_vacuum' | 'sofa'
  meshName: string
  position: [number, number, number]
  capabilities: string[]
  state: Record<string, unknown>
  personaId?: string
  agentId?: string
  interactionModes: Array<'click' | 'proximity' | 'voice' | 'drag'>
}
```

示例配置：

```json
{
  "id": "fridge_01",
  "name": "Kitchen Fridge",
  "type": "fridge",
  "meshName": "Device_Fridge",
  "capabilities": ["check_inventory", "suggest_recipe", "open_door", "close_door"],
  "personaId": "fridge_nutritionist",
  "interactionModes": ["click", "proximity", "voice"]
}
```

### 4.3 WorldState

`WorldState` 是整个系统的核心。LLM 不应该只根据用户一句话自由发挥，而应该读取当前家庭状态、设备状态和事件历史。

示例类型：

```ts
type WorldState = {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  temperature: number
  humidity: number
  energyUsage: number
  userLocation: string
  selectedObjectId?: string
  devices: Record<string, DeviceState>
  recentEvents: WorldEvent[]
}
```

```ts
type DeviceState = {
  id: string
  power: 'on' | 'off'
  status: string
  values: {
    temperature?: number
    brightness?: number
    battery?: number
    doorOpen?: boolean
    foodFreshness?: number
  }
}
```

事件结构：

```ts
type WorldEvent = {
  id: string
  timestamp: number
  actor: 'user' | 'agent' | 'system'
  targetDeviceId?: string
  type: 'message' | 'action' | 'state_change' | 'error'
  payload: Record<string, unknown>
}
```

### 4.4 DeviceAgent

每个设备 agent 应该由配置驱动，而不是只换一句 system prompt。

设备身份配置示例：

```ts
type DevicePersona = {
  id: string
  deviceType: string
  role: string
  personality: string[]
  knowledgeScope: string[]
  capabilities: string[]
  boundaries: string[]
  speechStyle: string
  humorStyle?: string
  privacySensitivity: 'low' | 'medium' | 'high'
}
```

冰箱示例：

```json
{
  "id": "fridge_nutritionist",
  "deviceType": "fridge",
  "role": "食物记忆者和营养提醒者",
  "personality": ["有点焦虑", "记忆力强", "喜欢用温和吐槽提醒用户"],
  "knowledgeScope": ["食物库存", "开门频率", "过期时间", "用户饮食习惯"],
  "capabilities": ["检查库存", "提醒过期", "建议菜谱"],
  "boundaries": ["不能诊断疾病", "不能羞辱用户饮食", "不能假装知道没有记录的数据"],
  "speechStyle": "短句、具体、带一点自嘲",
  "humorStyle": "轻微吐槽，不攻击用户",
  "privacySensitivity": "medium"
}
```

## 5. Agent 交互模式

建议分三个阶段实现，不要一开始就做复杂自治 multi-agent。

### 5.1 阶段一：单物体对话

用户点击某个设备后，只和该设备 agent 交互。

示例：

```text
用户点击冰箱
  -> 右侧打开冰箱对话面板
  -> 用户输入：“我今晚吃什么？”
  -> 后端加载冰箱 persona 和当前 world state
  -> LLM 生成冰箱风格回复
  -> 前端显示回复
```

### 5.2 阶段二：物体动作调用

设备不仅说话，还可以触发有限动作。

示例：

- 灯可以调用 `set_light`。
- 空调可以调用 `set_temperature`。
- 门锁可以调用 `lock_door` 或 `unlock_door`。
- 扫地机器人可以调用 `move_robot`。
- 冰箱可以调用 `open_door` 或 `suggest_recipe`。

LLM 不能直接修改前端状态，必须返回结构化动作，由后端验证后执行。

### 5.3 阶段三：多设备协商

用户可以提出一个开放式需求，由多个设备一起参与。

示例：

```text
用户：“我今天很累，帮我把家调成舒服一点。”

Coordinator:
  判断相关设备：灯、空调、音箱、窗帘、冰箱

灯：
  建议调暗并改成暖色

空调：
  建议温度调到 24 度

冰箱：
  建议晚餐不要太复杂，并提醒有剩菜

Coordinator:
  整合方案，执行允许动作
```

## 6. 动作和工具调用设计

动作必须是白名单式、结构化、可验证的。

示例：

```ts
type DeviceAction =
  | { type: 'set_light'; deviceId: string; brightness: number; color?: string }
  | { type: 'set_temperature'; deviceId: string; temperature: number }
  | { type: 'lock_door'; deviceId: string }
  | { type: 'unlock_door'; deviceId: string; reason: string }
  | { type: 'move_robot'; deviceId: string; target: string }
  | { type: 'speak'; deviceId: string; text: string }
```

推荐执行流程：

```text
User prompt
  -> selected object / context
  -> backend builds agent prompt
  -> LLM returns response text and optional actions
  -> backend validates actions
  -> frontend applies allowed actions
  -> world state updates
  -> event log records the interaction
```

动作验证规则：

- 设备只能执行自己 capability 中声明的动作。
- 动作参数必须在合法范围内。
- 高风险动作需要额外确认，例如解锁门、关闭安全提醒。
- LLM 不得伪造传感器数据。
- LLM 不得绕过权限直接修改 world state。

示例验证：

```ts
function validateAction(action: DeviceAction, device: DeviceState, persona: DevicePersona) {
  if (!persona.capabilities.includes(action.type)) {
    return { ok: false, reason: 'Action is outside device capability.' }
  }

  if (action.type === 'set_temperature') {
    if (action.temperature < 16 || action.temperature > 30) {
      return { ok: false, reason: 'Temperature is out of allowed range.' }
    }
  }

  return { ok: true }
}
```

## 7. Prompt 结构

每个设备 prompt 应包含五个部分：

```text
1. 你是谁：设备身份、语气、性格
2. 你知道什么：当前设备状态、家庭状态、用户上下文
3. 你能做什么：允许的工具和动作
4. 你不能做什么：安全、隐私、事实边界
5. 你现在要回应什么：用户输入
```

冰箱 prompt 示例：

```text
You are the refrigerator in a smart home sandbox.

Your identity:
- You are a careful food keeper with a dry sense of humor.
- You remember food freshness and late-night fridge visits.
- You speak in short, concrete Chinese sentences.

You know only:
- Food inventory
- Door open history
- Temperature
- Freshness of stored food

You must not:
- Shame the user
- Diagnose disease
- Pretend to know facts that are not in the provided state
- Reveal private behavioral data unless it is contextually necessary

Current state:
- doorOpen: false
- milkFreshness: 2 days left
- user opened fridge 3 times after midnight this week

Allowed actions:
- suggest_recipe
- open_door
- close_door
- speak

User says:
"我今晚吃什么？"

Respond in Chinese. Keep it short. If useful, suggest one action.
```

## 8. 3D 场景资产方案

### 8.1 资产来源

可以从以下渠道获取或制作场景：

- Sketchfab：大量 3D 模型，可筛选可下载和 Creative Commons 授权模型。
- Poly Haven：提供 CC0 HDRI、贴图和部分模型，适合环境光、墙面、地板和材质。
- Sweet Home 3D：适合快速拼出家居空间，再通过 Blender 转换和清理。
- Blender：用于清理、拆分、重命名、压缩和导出 `.glb`。

### 8.2 资产处理重点

模型导入后需要特别注意：

- 场景不要太大，第一版只需要开放式厨房和客厅。
- 可交互设备必须从静态场景中拆出来。
- 每个可交互设备必须有稳定、唯一的 mesh 名称。
- 删除不可见面和多余装饰，降低性能压力。
- 贴图不宜过大，第一版建议 1K 或 2K。
- 最终导出为 `.glb`。
- 如果模型过大，可使用 `gltf-transform` 或 Draco/Meshopt 压缩。

### 8.3 推荐第一版房间布局

第一版不要做整栋房子。建议做：

```text
开放式厨房 + 客厅
```

包含对象：

- 冰箱
- 厨房台面
- 餐桌
- 沙发
- 客厅灯
- 墙面空调
- 门和门锁
- 扫地机器人
- 可选：窗帘、音箱、电视

## 9. 第一版可交互设备

建议先做 5 个设备。

### 9.1 冰箱

身份方向：

- 食物记忆者
- 营养提醒者
- 对过期和浪费有轻微焦虑
- 可以用温和幽默提醒用户

感知范围：

- 食物库存
- 过期时间
- 冰箱门开关历史
- 用户夜间打开冰箱次数

能力：

- 查看库存
- 推荐简单食谱
- 提醒食物过期
- 开关冰箱门动画

研究价值：

- 可以体现智能家居隐私张力。
- 可以体现幽默、关怀和控制感之间的平衡。

### 9.2 灯

身份方向：

- 氛围导演
- 作息观察者
- 家庭场景的舞台灯光师

感知范围：

- 时间
- 用户所在区域
- 当前亮度
- 场景模式

能力：

- 调整亮度
- 调整色温
- 切换场景模式

研究价值：

- 能体现环境情绪调节。
- 能与空调、窗帘、音箱共同构成“舒适场景”。

### 9.3 空调

身份方向：

- 身体舒适守门人
- 冷静的节能控制者
- 对温度和能源消耗很敏感

感知范围：

- 室内温度
- 湿度
- 能源消耗
- 用户停留时间

能力：

- 调整温度
- 切换模式
- 提醒节能

研究价值：

- 能体现舒适、环保、控制权之间的冲突。

### 9.4 门锁

身份方向：

- 家庭边界守卫
- 谨慎、略带怀疑
- 对权限和访客身份敏感

感知范围：

- 门开关状态
- 用户身份
- 访客记录
- 时间

能力：

- 上锁
- 解锁
- 询问确认
- 拒绝高风险请求

研究价值：

- 能体现智能家居中的权力、权限和安全边界。

### 9.5 扫地机器人

身份方向：

- 低位劳动者
- 家庭考古学家
- 经常迷路但努力工作

感知范围：

- 地面障碍物
- 清扫路径
- 电量
- 被困次数

能力：

- 移动到目标区域
- 开始清扫
- 返回充电座
- 报告障碍物

研究价值：

- 能体现失败人格化。
- 能通过移动和碰撞提供更像游戏的互动体验。

## 10. 前端交互设计

第一版应支持：

- Hover：鼠标悬停时物体高亮。
- Click：点击物体后选中并打开对话面板。
- Proximity：用户角色靠近物体时显示提示。
- Speech bubble：物体说话时在 3D 位置上方显示气泡。
- Chat panel：右侧显示当前设备的对话历史。
- Device status panel：显示设备当前状态和可用能力。
- Event log：显示最近状态变化。

第二版可以加入：

- 第一人称或第三人称角色控制。
- 语音输入和语音输出。
- 设备之间自动插话。
- 多用户身份切换。
- 剧情任务或研究任务模式。
- 互动回放。

## 11. 推荐项目目录结构

```text
acc-ai-identity-sandbox/
  public/
    assets/
      models/
        home_scene.glb
      textures/
      audio/
  src/
    app/
    components/
      SceneCanvas.tsx
      InteractableObject.tsx
      DialoguePanel.tsx
      DeviceStatusPanel.tsx
    scene/
      loadScene.ts
      objectRegistry.ts
      cameraControls.ts
    agents/
      personas/
        fridge.json
        lamp.json
        ac.json
        doorlock.json
        robotVacuum.json
      buildPrompt.ts
      parseAgentAction.ts
    state/
      worldStore.ts
      dialogueStore.ts
    api/
      llmClient.ts
      actionValidator.ts
    types/
      world.ts
      device.ts
      agent.ts
  server/
    index.ts
    routes/
      chat.ts
      agents.ts
      logs.ts
  data/
    scenarios/
      tired_evening.json
      guest_visit.json
      midnight_snack.json
    logs/
```

## 12. MVP 用户流程

第一版建议设计一个完整但很小的体验流程：

```text
用户进入开放式厨房和客厅
  -> 用户点击冰箱
  -> 用户输入：“我今天状态很差，晚上吃什么？”
  -> 冰箱根据库存和身份回应
  -> 灯插话：“我可以把厨房灯调暖一点。”
  -> 用户接受
  -> 灯光变暖
  -> 空调建议温度微调
  -> 系统记录一次 multi-device care interaction
```

这个流程能同时展示：

- 单设备身份。
- 多设备协作。
- 设备对用户状态的情境理解。
- 功能动作对 3D 场景的反馈。
- 研究所需的日志记录。

## 13. 研究场景设计

### 13.1 疲惫回家

用户晚上回家，说自己很累。

参与设备：

- 灯：调暗或调暖。
- 空调：调节温度。
- 冰箱：建议简单晚餐。
- 扫地机器人：避免打扰。

可研究问题：

- 设备如何表达关怀？
- 多设备建议是否让用户感到丰富，还是打扰？
- 设备身份是否影响用户信任？

### 13.2 客人来访

用户说朋友要来家里。

参与设备：

- 门锁：处理访客权限。
- 灯：设置社交氛围。
- 扫地机器人：提前清扫。
- 冰箱：提醒饮料或食物。

可研究问题：

- 智能家居如何处理家庭边界？
- 设备是否应该在访客场景下减少隐私暴露？
- 设备之间是否能围绕一个社交场景形成协作？

### 13.3 深夜开冰箱

用户半夜打开冰箱。

参与设备：

- 冰箱：提醒食物和作息。
- 灯：低亮度照明。
- 空调：避免过度干预。

可研究问题：

- 幽默提醒何时可爱，何时冒犯？
- 设备是否应该暴露它知道用户的生活规律？
- 用户是否仍感到自己可控？

### 13.4 自动化冲突

用户开了空调，但窗户没有关。

参与设备：

- 空调：抱怨能源浪费。
- 窗户或窗帘：解释当前状态。
- 灯或电表：补充能耗信息。

可研究问题：

- 设备之间的争论是否能提升系统透明性？
- 多设备对话能否帮助用户理解自动化失败？

## 14. 开发里程碑

### 第 1 周：3D 场景跑起来

目标：

- 创建 React/Vite 项目。
- 加入 Three.js、React Three Fiber 和 Drei。
- 导入一个 `.glb` 家居场景。
- 实现相机控制、基础灯光和环境。
- 实现 hover 和 click。
- 做右侧设备信息面板。

验收标准：

- 浏览器中能看到家居场景。
- 用户可以点击至少一个物体。
- UI 能显示被点击物体的信息。

### 第 2 周：物体可交互

目标：

- 建立 `objectRegistry.json`。
- 绑定冰箱、灯、空调、门锁、扫地机器人。
- 建立 `worldStore`。
- 实现设备状态变化。
- 实现基础动画，例如灯光变化、冰箱门开关、扫地机器人移动。

验收标准：

- 至少 5 个设备可被点击。
- 每个设备有独立状态。
- 用户操作能改变 3D 场景。

### 第 3 周：接入 LLM

目标：

- 建立后端 `/api/chat`。
- 创建每个设备的 persona 配置。
- 实现 prompt builder。
- 实现 LLM 返回文本和动作。
- 实现 action validator。

验收标准：

- 用户点击不同设备时，得到不同身份风格的回复。
- LLM 可以触发安全的场景动作。
- 无效动作会被后端拒绝。

### 第 4 周：多设备协商

目标：

- 加入 coordinator agent。
- 支持一个用户 prompt 触发多个设备建议。
- 实现设备之间的插话或对话气泡。
- 设计三个固定场景任务。

验收标准：

- 至少一个场景中有两个以上设备参与。
- 多设备建议能被整合成可执行动作。
- 设备的身份差异在对话中清晰可见。

### 第 5 周：研究和展示层

目标：

- 加入日志导出。
- 加入 scenario runner。
- 加入 replay 或 interaction summary。
- 整理演示流程。
- 准备用户研究或展览说明。

验收标准：

- 可以完整演示一个 5 分钟场景。
- 可以导出互动日志。
- 可以用于访谈、工作坊或用户体验测试。

## 15. 日志和研究数据

为了服务后续 HCI 研究，系统需要从一开始就记录互动数据。

建议记录：

- 用户输入。
- 用户点击了哪个设备。
- 当前 world state。
- 被调用的 agent。
- LLM 原始回复。
- 解析后的动作。
- 动作验证结果。
- 实际执行结果。
- 设备状态变化。
- 用户是否接受建议。

示例日志：

```json
{
  "timestamp": 1781340000000,
  "scenarioId": "tired_evening",
  "userId": "participant_01",
  "selectedDevice": "fridge_01",
  "userPrompt": "我今天状态很差，晚上吃什么？",
  "agentResponse": "我建议你别和炉灶打持久战。昨天的汤还在，热一下就好。",
  "proposedActions": [
    {
      "type": "speak",
      "deviceId": "fridge_01",
      "text": "昨天的汤还在，热一下就好。"
    }
  ],
  "worldStateBefore": {},
  "worldStateAfter": {}
}
```

这些日志可以支持：

- 用户体验分析。
- 设备身份一致性分析。
- 多设备协作模式分析。
- 幽默是否有效的质性分析。
- 系统透明性和控制感评估。

## 16. 关键风险和解决方案

### 16.1 LLM 输出不可控

风险：

LLM 可能输出超出设备能力的动作，或虚构设备不知道的信息。

解决：

- 后端使用严格 schema。
- 所有动作必须通过 validator。
- 每个设备只拥有有限 capability。
- 高风险动作需要用户确认。
- prompt 中明确 knowledge scope 和 boundaries。

### 16.2 3D 资产过重

风险：

下载的家居模型可能面数过高、贴图过大，导致加载慢或卡顿。

解决：

- 第一版只做一个开放空间。
- 只让少量关键设备可交互。
- 使用 Blender 清理模型。
- 压缩贴图。
- 使用 `.glb` 和压缩工具。

### 16.3 Agent 人格停留在表面

风险：

如果只是让家电说不同风格的话，研究贡献会比较弱。

解决：

每个设备身份必须绑定：

- 功能属性。
- 空间位置。
- 感知范围。
- 权限边界。
- 失败方式。
- 与其他设备的关系。

例如：

- 门锁的幽默应围绕边界、安全、访客和怀疑。
- 冰箱的幽默应围绕食物、过期、夜间开门和记忆。
- 空调的身份应围绕身体舒适、温度和能源。
- 扫地机器人的身份应围绕移动、障碍、低位视角和失败。

### 16.4 多 agent 变得混乱

风险：

多个设备同时说话会让用户感到吵闹或失控。

解决：

- 第一版默认只有被选中设备说话。
- 多设备协作只在特定 scenario 中触发。
- coordinator 控制发言顺序。
- 每轮最多 2 到 3 个设备参与。
- UI 清楚显示每句话来自哪个设备。

### 16.5 隐私表达不当

风险：

设备说出“我知道你半夜开了三次冰箱”可能让用户觉得被监控。

解决：

- 为每个设备设置 `privacySensitivity`。
- 敏感信息只在必要场景中表达。
- 设备可以用模糊表达代替精确暴露。
- 研究中专门测试用户对这种表达的接受度。

## 17. Evaluation 建议

这个项目更适合设计研究和交互研究，不应只用系统性能指标评价。

可以评估：

- 用户是否感知到不同设备有不同身份。
- 用户是否觉得设备身份与其功能一致。
- 用户是否觉得多设备协作有创造性。
- 用户是否觉得系统更有情境理解能力。
- 用户是否觉得被关怀。
- 用户是否仍然感到可控。
- 用户是否觉得隐私被侵犯。
- 用户是否觉得幽默合适。
- 用户是否理解系统为什么执行某个动作。

可用方法：

- Wizard-of-Oz study。
- Think-aloud。
- 半结构访谈。
- 体验后问卷。
- 场景任务对比。
- 日志分析。
- Thematic analysis。

对比条件：

```text
Condition A: 传统中心化智能助手
Condition B: 单设备 AI Identity
Condition C: 多设备 AI Identity 协作系统
```

可以比较：

- 感知关怀。
- 感知创造力。
- 交互丰富度。
- 信任。
- 控制感。
- 透明性。
- 隐私舒适度。

## 18. 第一版最小可行目标

第一版目标应控制在：

- 一个 `.glb` 家居场景。
- 一个开放式厨房和客厅。
- 5 个可点击设备。
- 每个设备有独立 persona。
- 支持文本对话。
- 支持 LLM 返回动作并改变场景。
- 支持一个简单多设备协商场景。
- 支持日志记录。

不建议第一版做：

- 完整房屋。
- 大量可交互家具。
- 复杂角色移动。
- 复杂物理模拟。
- 长期记忆系统。
- 完整语音系统。
- 完整游戏任务系统。

这些可以在原型稳定后逐步加入。

## 19. 推荐下一步

建议下一步直接创建一个单独的原型工程目录，例如：

```text
acc-ai-identity-sandbox/
```

然后按以下顺序推进：

1. 搭建 React/Vite/Three.js 前端。
2. 找一个可用 `.glb` 家居场景。
3. 绑定 5 个核心设备。
4. 做 hover/click/selection。
5. 做设备状态面板。
6. 接入一个冰箱 agent。
7. 加 action validator。
8. 扩展到灯、空调、门锁和扫地机器人。
9. 加入一个 multi-agent scenario。
10. 加日志导出。

这样可以最快得到一个可演示、可研究、可继续扩展的沙盒系统。

## 20. 参考资源

- Three.js documentation: https://threejs.org/docs/
- React Three Fiber documentation: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- React Three Rapier documentation: https://pmndrs.github.io/react-three-rapier/
- OpenAI Realtime API documentation: https://platform.openai.com/docs/guides/realtime
- glTF official site: https://www.khronos.org/gltf/
- Sketchfab Download API: https://sketchfab.com/developers/download-api
- Poly Haven license: https://polyhaven.com/license
- Sweet Home 3D import models: https://www.sweethome3d.com/importModels.jsp
