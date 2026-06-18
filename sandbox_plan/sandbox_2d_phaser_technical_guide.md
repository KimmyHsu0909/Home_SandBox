# 2D 像素风智能家居 AI Identity 沙盒技术指南

## 1. 背景和目标

原始方案以 3D 智能家居沙盒为目标，推荐使用 React、Three.js、React Three Fiber、Rapier 和 Node/Express。现在如果希望先用 2D 像素风快速制作一个研究原型，同时保留设备 NPC 接入 LLM、自定义物理触发、设备状态变化、多设备协作和日志记录，建议把技术路线调整为：

```text
Phaser + React + Zustand + Node/Express + LLM API
```

这个方向更适合第一阶段原型，因为 2D 像素风资产更容易获得，tilemap 场景更容易搭建，碰撞区域和触发器更容易调试，网页部署和用户研究数据记录也更直接。

第一版目标建议控制为：

- 一个俯视角 2D 像素风开放式厨房和客厅。
- 用户角色可以移动、靠近、点击设备。
- 5 个核心设备：冰箱、灯、空调、门锁、扫地机器人。
- 每个设备有独立 persona、状态、能力和对话风格。
- 用户通过文本 prompt 与设备交互。
- LLM 返回结构化动作，由后端校验后改变场景状态。
- 物理触发区支持靠近提示、区域事件、碰撞检测和设备感知范围。
- 系统记录用户输入、agent 回复、动作执行、验证结果和 world state 变化。

## 2. 为什么推荐 Phaser + React + Node

### 2.1 Phaser 负责 2D 沙盒场景

Phaser 是成熟的 HTML5 2D 游戏框架，适合制作像素风、tilemap、sprite 动画、碰撞、触发区域和 top-down 角色移动。

在本项目中，Phaser 负责：

- 加载 Tiled 导出的 tilemap。
- 显示地板、墙体、家具和设备 sprite。
- 管理玩家移动。
- 处理碰撞和障碍物。
- 处理 hover、click、proximity、overlap trigger。
- 播放设备动画，例如冰箱开门、灯光变暖、门锁状态变化、扫地机器人移动。

Phaser 的 Arcade Physics 适合轻量、清晰、可控的物理触发，例如矩形碰撞、靠近检测、区域 overlap。若后续需要更复杂刚体、旋转、约束和碰撞形状，可以再使用 Matter Physics。

### 2.2 React 负责研究型 UI

Phaser 不适合承担复杂 UI。聊天面板、设备状态面板、事件日志、scenario 控制器和研究数据导出更适合用 React 写。

React 负责：

- 右侧设备对话面板。
- 当前设备状态面板。
- 能力列表和可执行动作。
- 多设备协作消息流。
- event log。
- scenario runner。
- 日志导出按钮。

### 2.3 Node/Express 负责 LLM 和安全边界

LLM API key 不应该放在前端。后端负责构建 prompt、调用 LLM、校验动作和记录日志。

Node/Express 负责：

- `/api/chat`：设备对话。
- `/api/scenario`：多设备场景协作。
- `/api/logs`：研究日志写入和导出。
- prompt builder。
- action validator。
- device capability 检查。
- 高风险动作确认，例如解锁门。

## 3. 与原 3D 方案的对应关系

| 原 3D 方案 | 2D Phaser 方案 |
|---|---|
| `.glb` / `.gltf` 家居模型 | Tiled `.json` tilemap |
| meshName | objectId / tile object name |
| 3D mesh click | sprite click / object layer click |
| 3D proximity | Arcade Physics overlap zone |
| 3D 高亮 | sprite tint / outline / floating icon |
| 3D 动画 | sprite animation / tile state swap |
| React Three Fiber | Phaser scene |
| @react-three/rapier | Phaser Arcade Physics / Matter Physics |
| 3D SceneManager | 2D TilemapScene |

核心数据结构可以继续沿用原方案：

- `WorldState`
- `DeviceState`
- `DevicePersona`
- `DeviceAction`
- `WorldEvent`
- `ActionValidator`

也就是说，真正变化最大的是渲染和交互层，agent、prompt、日志和动作验证逻辑都可以复用原方案思想。

## 4. 平台选择建议

### 4.1 首选：Phaser + React + Node/Express

适合条件：

- 希望快速做网页原型。
- 需要 LLM NPC、聊天面板、状态面板、日志导出。
- 需要用于 HCI / design research / workshop / 展示。
- 希望用现成像素风资产搭场景。
- 第一版重点是交互和研究，不是复杂游戏发行。

推荐理由：

- 2D 场景开发快。
- Web 技术栈和 LLM API 集成自然。
- React UI 与研究工具容易实现。
- Phaser 的 tilemap 和 physics trigger 足够支撑智能家居沙盒。
- 部署和分享比传统游戏引擎简单。

### 4.2 备选：Godot 4

Godot 适合喜欢可视化编辑器、节点系统和本地游戏引擎工作流的情况。它的 2D、TileMap、Area2D 和 physics 系统成熟，适合做复杂一些的本地交互原型。

但如果重点是 Web 展示、LLM 对话、研究日志和 React 式 UI，Godot 第一版会比 Phaser 重一些。Godot 4 的 Web 导出也有额外限制，例如 WebAssembly / WebGL 2.0 要求，C# 项目目前不能导出到 Web。

### 4.3 不建议第一版用 Unity

Unity 可以完成这个项目，但第一版不推荐：

- 工程复杂度更高。
- Web 集成和 React UI 不如 Phaser 直接。
- LLM 后端、日志、网页实验流程需要更多胶水代码。
- 除非后续明确要做复杂游戏、多平台发行或较重的 2D/3D 混合玩法，否则第一版不划算。

## 5. 现成美术资产来源

Phaser 可以直接使用现成 2D 像素资产。主要需要三类资产：

- 室内 tileset：地板、墙、厨房、客厅、家具。
- 角色 sprite：玩家角色、行走动画。
- 设备/道具 sprite：冰箱、灯、空调、门锁、扫地机器人、电视等。

### 5.1 itch.io

itch.io 是最推荐的素材来源。可以搜索：

```text
pixel art top down interior tileset
RPG interior tileset
modern interior pixel art
top down furniture sprite
```

入口：

https://itch.io/game-assets/tag-pixel-art/tag-top-down

特别推荐：

```text
Modern Interiors - RPG Tileset [16x16] by LimeZu
```

链接：

https://limezu.itch.io/moderninteriors

它适合本项目的原因：

- 包含厨房、客厅、卧室、浴室、办公室等大量室内 tiles。
- 有冰箱、沙发、桌子、电视、柜子等家具。
- 风格统一。
- 适合 top-down 2D 沙盒。
- 可以快速搭出开放式厨房 + 客厅。

使用时注意阅读素材页 license。通常可以用于商业和非商业项目，但不能转售或再分发素材本身；付费完整版本可能要求署名。

### 5.2 Kenney

Kenney 适合补充通用游戏资产、UI、图标和原型素材。Kenney 官方说明其游戏资产页素材为 CC0，可商用，不要求署名。

链接：

https://kenney.nl/assets

授权说明：

https://kenney.nl/support

适合补充：

- UI 按钮。
- 图标。
- 输入提示。
- 交互标记。
- 状态图标。
- 通用 props。

### 5.3 OpenGameArt

OpenGameArt 可以找到免费开源素材，但素材风格和授权差异较大，需要逐个确认 license。

链接：

https://opengameart.org/

适合补充：

- 角色 sprite。
- 小道具。
- 音效。
- 临时 prototype 资产。

注意：

- CC0 最省心。
- CC BY 需要署名。
- CC BY-SA 可能要求相同方式共享。
- GPL 类授权不一定适合直接混入项目资产，需要谨慎。

### 5.4 Tiled 地图编辑器

建议用 Tiled 搭建 2D 房间。Tiled 是常用 tilemap 编辑器，支持 tile layer、object layer、collision、rectangle / polygon object 和 JSON 导出。

链接：

https://www.mapeditor.org/

建议地图层级：

```text
Tile Layer: floor
Tile Layer: walls
Tile Layer: furniture_static
Tile Layer: device_base
Object Layer: collision
Object Layer: devices
Object Layer: trigger_zones
Object Layer: spawn_points
```

`devices` object layer 中可以放设备元数据：

```json
{
  "id": "fridge_01",
  "type": "fridge",
  "personaId": "fridge_nutritionist",
  "capabilities": ["check_inventory", "suggest_recipe", "open_door", "close_door"]
}
```

Phaser 加载地图后，可以读取 object layer，自动生成设备对象、绑定 trigger zone，并连接到 React UI 和后端 agent。

## 6. 推荐工程结构

建议新建一个独立原型工程，例如：

```text
acc-ai-identity-2d-sandbox/
  client/
    public/
      assets/
        tilesets/
        sprites/
        audio/
        maps/
          home.json
    src/
      game/
        PhaserGame.tsx
        scenes/
          BootScene.ts
          HomeScene.ts
        systems/
          createPlayer.ts
          createDevices.ts
          createTriggers.ts
          applyDeviceAction.ts
        config/
          phaserConfig.ts
      components/
        DialoguePanel.tsx
        DeviceStatusPanel.tsx
        EventLogPanel.tsx
        ScenarioPanel.tsx
      state/
        worldStore.ts
        dialogueStore.ts
        eventBus.ts
      types/
        world.ts
        device.ts
        agent.ts
      api/
        chatClient.ts
  server/
    src/
      index.ts
      routes/
        chat.ts
        logs.ts
        scenario.ts
      agents/
        personas/
          fridge.json
          lamp.json
          ac.json
          doorlock.json
          robotVacuum.json
        buildPrompt.ts
        actionValidator.ts
        parseAgentResponse.ts
      types/
        world.ts
        device.ts
        agent.ts
    data/
      logs/
      scenarios/
        tired_evening.json
        guest_visit.json
        midnight_snack.json
```

## 7. 快速上手步骤

### 7.1 创建前端

推荐使用 Vite + React + TypeScript：

```bash
npm create vite@latest client -- --template react-ts
cd client
npm install
npm install phaser zustand
```

后续如需要 UI 组件库，可以再加入。第一版可以先用普通 CSS，减少依赖。

### 7.2 创建后端

```bash
mkdir server
cd server
npm init -y
npm install express cors dotenv zod
npm install -D typescript tsx @types/node @types/express @types/cors
```

后端第一版只需要三个接口：

```text
POST /api/chat
POST /api/scenario
POST /api/logs
```

### 7.3 准备地图资产

建议流程：

```text
下载 tileset
  -> 用 Tiled 新建地图
  -> 设置 tile size，例如 16x16 或 32x32
  -> 搭建开放式厨房 + 客厅
  -> 添加 collision object layer
  -> 添加 devices object layer
  -> 添加 trigger_zones object layer
  -> 导出 JSON
  -> 放入 client/public/assets/maps/home.json
```

建议第一版房间只包含：

- 厨房区域。
- 客厅区域。
- 一扇门。
- 一个玩家出生点。
- 5 个设备。
- 少量障碍物。

不要一开始做完整房子。

## 8. Phaser 场景核心逻辑

### 8.1 加载 tilemap

示例结构：

```ts
export class HomeScene extends Phaser.Scene {
  constructor() {
    super('HomeScene')
  }

  preload() {
    this.load.tilemapTiledJSON('home', '/assets/maps/home.json')
    this.load.image('interiors', '/assets/tilesets/interiors.png')
    this.load.spritesheet('player', '/assets/sprites/player.png', {
      frameWidth: 16,
      frameHeight: 32
    })
  }

  create() {
    const map = this.make.tilemap({ key: 'home' })
    const tileset = map.addTilesetImage('interiors', 'interiors')

    if (!tileset) {
      throw new Error('Tileset not found')
    }

    map.createLayer('floor', tileset, 0, 0)
    const walls = map.createLayer('walls', tileset, 0, 0)
    map.createLayer('furniture_static', tileset, 0, 0)

    if (walls) {
      walls.setCollisionByProperty({ collides: true })
    }
  }
}
```

### 8.2 读取设备 object layer

Tiled 的 object layer 可以承载设备 ID、类型和 persona：

```ts
type DeviceMapObject = {
  id: string
  name: string
  type: string
  x: number
  y: number
  width: number
  height: number
  properties?: Array<{ name: string; value: string }>
}
```

读取后创建设备：

```ts
function getProperty(object: Phaser.Types.Tilemaps.TiledObject, name: string) {
  return object.properties?.find((item: { name: string }) => item.name === name)?.value
}

function createDevices(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const objectLayer = map.getObjectLayer('devices')

  if (!objectLayer) {
    return []
  }

  return objectLayer.objects.map((object) => {
    const deviceId = getProperty(object, 'deviceId') ?? object.name
    const deviceType = getProperty(object, 'deviceType') ?? object.type
    const personaId = getProperty(object, 'personaId')

    const sprite = scene.add.sprite(object.x ?? 0, object.y ?? 0, deviceType)
    sprite.setInteractive({ useHandCursor: true })

    sprite.on('pointerdown', () => {
      window.dispatchEvent(new CustomEvent('device:selected', {
        detail: { deviceId, deviceType, personaId }
      }))
    })

    return { deviceId, deviceType, personaId, sprite }
  })
}
```

更完整的项目里，不建议长期使用 `window.dispatchEvent` 作为核心架构；但第一版它足够快。之后可以替换为 typed event bus 或 Zustand action。

## 9. 物理触发设计

### 9.1 碰撞层

墙、桌子、沙发、厨房台面等静态障碍物建议放在 collision layer 或 object layer。

用途：

- 阻止玩家穿墙。
- 阻止扫地机器人穿过家具。
- 标记设备周围不可通行区域。

### 9.2 感知范围 trigger zone

每个设备可以有一个矩形或圆形触发区域：

```text
fridge_01_trigger
lamp_01_trigger
doorlock_01_trigger
robot_vacuum_01_trigger
```

当玩家进入区域：

- UI 显示“按 E 与冰箱对话”。
- `WorldState.userLocation` 更新。
- 设备可以获得 proximity context。
- 触发研究日志事件。

示例：

```ts
const zone = scene.add.zone(x, y, width, height)
scene.physics.add.existing(zone, true)

scene.physics.add.overlap(player, zone, () => {
  window.dispatchEvent(new CustomEvent('device:nearby', {
    detail: { deviceId: 'fridge_01' }
  }))
})
```

### 9.3 自定义物理触发示例

可以从一开始定义这些触发器：

```text
proximity_trigger:
  用户靠近设备。

collision_trigger:
  扫地机器人撞到障碍物。

state_trigger:
  空调开启但窗户没关。

time_trigger:
  深夜打开冰箱。

scenario_trigger:
  用户输入“我今天很累”后触发多设备协作。
```

这些触发器不应该直接让 LLM 修改世界状态，而是生成事件：

```ts
type WorldEvent = {
  id: string
  timestamp: number
  actor: 'user' | 'agent' | 'system'
  targetDeviceId?: string
  type: 'message' | 'action' | 'state_change' | 'trigger' | 'error'
  payload: Record<string, unknown>
}
```

## 10. LLM 设备 NPC 接入

### 10.1 设备 persona

示例：`server/src/agents/personas/fridge.json`

```json
{
  "id": "fridge_nutritionist",
  "deviceType": "fridge",
  "role": "食物记忆者和营养提醒者",
  "personality": ["有点焦虑", "记忆力强", "喜欢用温和吐槽提醒用户"],
  "knowledgeScope": ["食物库存", "开门频率", "过期时间", "用户饮食习惯"],
  "capabilities": ["check_inventory", "suggest_recipe", "open_door", "close_door", "speak"],
  "boundaries": ["不能诊断疾病", "不能羞辱用户饮食", "不能假装知道没有记录的数据"],
  "speechStyle": "短句、具体、带一点自嘲",
  "privacySensitivity": "medium"
}
```

### 10.2 Chat API 输入

```ts
type ChatRequest = {
  userPrompt: string
  selectedDeviceId: string
  worldState: WorldState
}
```

### 10.3 Chat API 输出

建议后端始终返回结构化结果：

```ts
type ChatResponse = {
  message: string
  proposedActions: DeviceAction[]
  rejectedActions?: Array<{
    action: unknown
    reason: string
  }>
  events: WorldEvent[]
}
```

示例：

```json
{
  "message": "我建议你别和炉灶打持久战。昨天的汤还在，热一下就好。",
  "proposedActions": [
    {
      "type": "speak",
      "deviceId": "fridge_01",
      "text": "昨天的汤还在，热一下就好。"
    }
  ]
}
```

## 11. 动作白名单和验证

LLM 不能直接修改 Phaser 场景。它只能提出动作，由后端验证。

动作类型示例：

```ts
type DeviceAction =
  | { type: 'set_light'; deviceId: string; brightness: number; color?: 'warm' | 'cool' | 'neutral' }
  | { type: 'set_temperature'; deviceId: string; temperature: number }
  | { type: 'lock_door'; deviceId: string }
  | { type: 'unlock_door'; deviceId: string; reason: string }
  | { type: 'move_robot'; deviceId: string; target: string }
  | { type: 'open_fridge'; deviceId: string }
  | { type: 'close_fridge'; deviceId: string }
  | { type: 'speak'; deviceId: string; text: string }
```

验证规则：

- 设备只能执行 persona capability 中声明的动作。
- 参数必须在合法范围内。
- 高风险动作需要用户确认。
- LLM 不得伪造传感器数据。
- LLM 不得直接覆盖 world state。
- 所有动作必须写入 event log。

示例：

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

  if (action.type === 'unlock_door') {
    return { ok: false, reason: 'Door unlock requires explicit user confirmation.' }
  }

  return { ok: true }
}
```

## 12. Phaser 执行动作

前端收到 validated actions 后，再改变 Phaser 场景和 Zustand 状态。

```ts
function applyDeviceAction(scene: Phaser.Scene, action: DeviceAction) {
  switch (action.type) {
    case 'set_light':
      scene.events.emit('light:set', action)
      break
    case 'open_fridge':
      scene.events.emit('fridge:open', action)
      break
    case 'move_robot':
      scene.events.emit('robot:move', action)
      break
    case 'speak':
      scene.events.emit('device:speak', action)
      break
    default:
      break
  }
}
```

建议将视觉反馈做得明确：

- 灯：改变局部光照颜色或覆盖半透明 warm tint。
- 冰箱：切换开门 sprite 或播放开门动画。
- 空调：显示风流线动画或温度数字。
- 门锁：锁图标从红色变绿色。
- 扫地机器人：沿路径移动，撞到障碍物后产生事件。

## 13. Zustand WorldState

前端维护一个统一 world store：

```ts
type WorldState = {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  temperature: number
  humidity: number
  energyUsage: number
  userLocation: string
  selectedDeviceId?: string
  nearbyDeviceIds: string[]
  devices: Record<string, DeviceState>
  recentEvents: WorldEvent[]
}
```

建议第一版只保存必要字段，不要一开始做长期记忆系统。

## 14. 第一版 MVP 流程

推荐实现这个 5 分钟演示：

```text
用户进入 2D 像素风开放式厨房 + 客厅
  -> WASD 移动到冰箱附近
  -> 冰箱出现交互提示
  -> 用户点击冰箱或按 E
  -> 右侧打开冰箱聊天面板
  -> 用户输入：“我今天状态很差，晚上吃什么？”
  -> 后端加载冰箱 persona 和 world state
  -> LLM 返回冰箱回复和建议动作
  -> 灯插话：“我可以把厨房灯调暖一点。”
  -> 用户接受
  -> 灯光变暖
  -> 系统记录 multi-device care interaction
```

这个流程同时展示：

- 2D 场景导航。
- 设备 proximity。
- 单设备 LLM 身份。
- 多设备协作。
- 动作验证。
- 场景状态变化。
- 研究日志。

## 15. 开发里程碑

### 第 1 阶段：Phaser 场景跑起来

验收标准：

- 浏览器中能显示 tilemap 房间。
- 玩家可以移动。
- 玩家不能穿墙。
- 至少一个设备可以点击。

### 第 2 阶段：设备和触发器

验收标准：

- 5 个设备在 Tiled 中定义。
- Phaser 能读取设备 object layer。
- 靠近设备会显示提示。
- 点击设备会打开 React 面板。

### 第 3 阶段：WorldState 和动作

验收标准：

- 每个设备有独立状态。
- 灯、冰箱、门锁、扫地机器人至少有一种可视化状态变化。
- 所有状态变化写入 event log。

### 第 4 阶段：LLM 接入

验收标准：

- 点击不同设备时，后端使用不同 persona。
- LLM 返回文本和结构化动作。
- 无效动作会被后端拒绝。
- 前端只执行 validated actions。

### 第 5 阶段：多设备协作和研究日志

验收标准：

- 至少一个 scenario 中有两个以上设备参与。
- coordinator 控制发言顺序。
- 每轮最多 2 到 3 个设备发言。
- 日志可以导出为 JSON。

## 16. 实施建议

第一版不要追求复杂系统。优先做一个稳定、可演示、可研究的小闭环。

优先级建议：

1. Tiled 房间。
2. Phaser 加载地图。
3. 玩家移动和碰撞。
4. 设备 object layer。
5. 设备点击和 React 面板。
6. 本地 mock agent 回复。
7. 后端 LLM 接入。
8. action validator。
9. 设备视觉状态变化。
10. 多设备 scenario。
11. 日志导出。

第一版不建议做：

- 完整房屋。
- 大量可交互家具。
- 复杂物理模拟。
- 长期记忆。
- 语音输入输出。
- 自动自治 multi-agent。
- 完整任务系统。

## 17. 借鉴斯坦福小镇 Generative Agents 的实现方式

斯坦福小镇论文《Generative Agents: Interactive Simulacra of Human Behavior》的沙盒实现，对本项目非常有参考价值。它不是 3D 引擎，也不是 Unity / Unreal，而是一个 2D 像素风 Web 沙盒。

公开代码显示，其整体实现形式可以概括为：

```text
Django frontend server
  + Phaser 3
  + Tiled tilemap JSON
  + Arcade Physics
  + pixel art sprites / tilesets

Python Reverie simulation server
  + generative agent runtime
  + memory / reflection / planning
  + LLM calls
```

这说明本项目选择 `Phaser + Tiled + Web 后端` 是合理路线。区别在于，本项目可以用更适合前端 UI 和 LLM API 集成的现代 Web 栈改写：

```text
Phaser + React + Node/Express
```

### 17.1 它的沙盒不是只做视觉地图，而是做语义地图

斯坦福小镇最值得借鉴的一点是：地图不仅是可见 tilemap，还有一套后端可理解的 semantic map。

可以理解为两层：

```text
视觉地图：
  Tiled JSON + tileset image
  用于 Phaser 渲染房屋、道路、家具、角色。

语义地图：
  world / sector / arena / object / collision / events
  用于 agent 理解自己在哪里、周围有什么、可以做什么。
```

本项目也应该从第一版开始建立语义层，而不是只把设备当成普通 sprite。

建议每个 Tiled object 至少包含：

```json
{
  "deviceId": "fridge_01",
  "deviceType": "fridge",
  "world": "smart_home",
  "sector": "kitchen",
  "arena": "food_storage",
  "gameObject": "fridge",
  "personaId": "fridge_nutritionist",
  "capabilities": ["suggest_recipe", "open_door", "close_door"],
  "privacySensitivity": "medium"
}
```

这样 agent 看到的不是：

```text
sprite at x=120, y=80
```

而是：

```text
The user is near fridge_01 in the kitchen food storage area.
fridge_01 can suggest recipes, open door, close door, and speak.
```

### 17.2 前端负责表现，agent 大脑放在后端

斯坦福小镇没有让 Phaser 直接运行 agent。Phaser 只负责世界表现、角色位置、动画和状态展示。真正的 generative agent runtime 在后端。

本项目也建议保持这个边界：

```text
Phaser
  render map
  move player
  detect proximity / collision / clicks
  play animations

React
  show chat
  show device state
  show event log
  show scenario controls

Node/Express
  build prompts
  run device agents
  validate actions
  update world model
  write logs
```

不要让 LLM 直接控制 Phaser，也不要让前端持有 API key。前端只发送事件和用户输入，后端返回 validated actions。

### 17.3 用离散 step 驱动，而不是每帧调用 LLM

斯坦福小镇采用 simulation step。其论文和代码说明中，一个 game step 对应游戏内一段时间，而不是每一帧都调用 LLM。

本项目也应该使用 step / tick 思路：

```text
render frame:
  Phaser 每秒 60 帧，只处理移动、碰撞、动画。

simulation tick:
  每 5-10 秒检查一次环境事件。

interaction tick:
  用户输入、点击设备、进入触发区时立即触发。

scenario tick:
  特定研究场景启动时触发多设备协商。
```

这样可以避免：

- LLM 调用成本失控。
- agent 行为过于频繁。
- 多设备同时说话导致混乱。
- 实时渲染和 agent 推理耦合。

建议第一版使用：

```ts
type SimulationTick = {
  id: string
  timestamp: number
  reason: 'timer' | 'user_input' | 'proximity' | 'state_change' | 'scenario'
  visibleEvents: WorldEvent[]
  affectedDeviceIds: string[]
}
```

### 17.4 借鉴 memory / reflection / planning，但先做轻量版

斯坦福小镇 agent 架构的核心包括：

```text
memory stream
reflection
planning
```

它的 agent 会记录经历，用 recency、relevance、importance 检索记忆，再生成计划和行动。

本项目第一版不需要完整复刻，但可以做轻量版本：

```ts
type DeviceMemory = {
  deviceId: string
  observations: MemoryItem[]
  conversations: MemoryItem[]
  actions: MemoryItem[]
  reflections: MemoryItem[]
}

type MemoryItem = {
  id: string
  timestamp: number
  text: string
  importance: number
  tags: string[]
}
```

第一版检索策略可以简单些：

```text
score = recencyScore + relevanceScore + importanceScore
```

例如冰箱在回应“我今天很累，晚上吃什么？”时，只检索：

- 最近库存状态。
- 最近一次用户饮食相关对话。
- 当前时间。
- 过期食物提醒。
- 与 tired_evening scenario 相关的记忆。

不要一开始做复杂长期人格成长系统。先让设备有少量、可解释、可导出的记忆。

### 17.5 为设备建立三类状态：memory、spatial、scratch

斯坦福小镇代码中 agent 有不同类型的记忆和临时状态。智能家居设备也可以借鉴类似拆分：

```text
device_memory:
  长期事件、对话、历史动作、重要观察。

spatial_memory:
  设备知道哪些房间、相邻设备、自己能感知的区域。

scratch_state:
  当前任务、短期上下文、当前对话、临时计划。
```

示例：

```ts
type DeviceAgentState = {
  deviceId: string
  memory: DeviceMemory
  spatial: {
    roomId: string
    zoneId: string
    nearbyDeviceIds: string[]
    perceptionRadius: number
  }
  scratch: {
    currentGoal?: string
    currentConversationId?: string
    lastUserPrompt?: string
    pendingActions: DeviceAction[]
  }
}
```

这样设备 identity 不只是 prompt 风格，而是由功能、位置、记忆、权限和当前状态共同决定。

### 17.6 用事件流连接物理世界和 agent 世界

斯坦福小镇里环境状态会转换成 agent 可理解的事件。本项目也应该把物理触发和设备状态变化统一写成事件流。

示例事件：

```ts
type SemanticEvent = {
  id: string
  timestamp: number
  subject: string
  predicate: string
  object: string
  description: string
  location?: {
    roomId: string
    zoneId: string
  }
  visibleToDeviceIds: string[]
}
```

例子：

```json
{
  "subject": "user",
  "predicate": "entered",
  "object": "kitchen",
  "description": "The user entered the kitchen at night.",
  "visibleToDeviceIds": ["fridge_01", "lamp_01"]
}
```

```json
{
  "subject": "fridge_01",
  "predicate": "door_is",
  "object": "open",
  "description": "The fridge door is open during midnight.",
  "visibleToDeviceIds": ["fridge_01", "lamp_01"]
}
```

LLM 不应该看到完整世界状态，而应该看到当前设备可感知的事件子集。

### 17.7 对智能家居沙盒的推荐 agent loop

建议本项目采用下面的轻量 agent loop：

```text
1. observe
   收集当前设备可见的事件、用户输入、附近状态。

2. retrieve
   从设备 memory 中取出相关记忆。

3. decide
   判断是否需要回应、插话、建议动作或保持沉默。

4. respond
   生成设备身份一致的文本回复。

5. propose_actions
   生成结构化候选动作。

6. validate
   后端检查 capability、权限、参数、安全规则。

7. execute
   前端执行 validated actions，更新 Phaser 和 WorldState。

8. log
   写入 memory 和 research event log。
```

对应 TypeScript 结构：

```ts
type AgentLoopInput = {
  tick: SimulationTick
  device: DeviceState
  persona: DevicePersona
  visibleEvents: SemanticEvent[]
  retrievedMemories: MemoryItem[]
  worldSummary: string
  userPrompt?: string
}

type AgentLoopOutput = {
  shouldSpeak: boolean
  message?: string
  proposedActions: DeviceAction[]
  memoryWrites: MemoryItem[]
}
```

### 17.8 推荐的最小借鉴版本

不要一开始完整复刻斯坦福小镇。它的完整 agent simulation 比本项目第一版需要的复杂很多。

建议只借鉴这五点：

1. **Phaser + Tiled 2D 沙盒**  
   用 tilemap 做可视化世界。

2. **语义地图**  
   给房间、区域、设备和触发器加 metadata。

3. **后端 agent runtime**  
   agent 推理、LLM、动作验证和日志都放后端。

4. **离散 simulation tick**  
   用户输入、区域触发、状态变化和定时器驱动 agent，而不是每帧调用。

5. **事件流 + 轻量记忆**  
   把物理触发、对话、动作和状态变化统一记录为事件，并让设备只读取自己能感知的部分。

### 17.9 适合本项目的改写版架构

最终推荐架构：

```text
Phaser Scene
  load Tiled map
  read object layers
  handle player movement
  handle collision / proximity / clicks
  play device animations

React UI
  dialogue panel
  device status
  event log
  scenario controls

Semantic World Layer
  rooms
  zones
  devices
  triggers
  visible events

Node Agent Runtime
  observe
  retrieve
  decide
  respond
  propose actions
  validate actions
  write memory
  write research logs

LLM API
  device persona response
  coordinator response
  structured action proposal
```

一句话总结：

```text
斯坦福小镇的可借鉴重点不是“做一个小镇”，而是：
用 2D tilemap 承载可视化世界，用语义地图承载 agent 可理解的世界，
再用后端 step simulation 把感知、记忆、计划、行动和日志连接起来。
```

## 18. 参考链接

- Phaser Arcade Physics: https://docs.phaser.io/phaser/concepts/physics/arcade
- Phaser Matter Physics: https://docs.phaser.io/phaser/concepts/physics/matter
- Tiled Map Editor: https://www.mapeditor.org/
- itch.io top-down pixel art assets: https://itch.io/game-assets/tag-pixel-art/tag-top-down
- Modern Interiors by LimeZu: https://limezu.itch.io/moderninteriors
- Kenney assets: https://kenney.nl/assets
- Kenney support / license notes: https://kenney.nl/support
- OpenGameArt: https://opengameart.org/
- Godot TileMaps: https://docs.godotengine.org/en/stable/tutorials/2d/using_tilemaps.html
- Godot Area2D: https://docs.godotengine.org/en/stable/tutorials/physics/using_area_2d.html
- Godot Web export: https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html
- Unity 2D Physics: https://docs.unity3d.com/Manual/2d-physics/2d-physics.html
- Unity Web: https://docs.unity3d.com/Manual/webgl.html
- Generative Agents paper: https://arxiv.org/abs/2304.03442
- Generative Agents official code: https://github.com/joonspk-research/generative_agents
