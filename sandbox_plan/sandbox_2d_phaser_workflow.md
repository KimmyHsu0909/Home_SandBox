# 2D 像素风智能家居 AI Identity 沙盒开发工作流

## 1. 工作流目标

这份文档把 2D 像素风智能家居 AI Identity 沙盒的开发过程拆成从第一步到最终验收的执行流程。

推荐技术路线：

```text
Phaser + React + Zustand + Node/Express + LLM API
```

第一版目标不是做完整游戏，而是做一个可运行、可演示、可研究的最小原型：

- 一个 2D 像素风开放式厨房 + 客厅。
- 一个可移动玩家角色。
- 5 个可交互智能设备。
- 每个设备有独立身份、状态、能力和对话风格。
- 用户可以与设备进行文本对话。
- LLM 可以提出结构化动作。
- 后端验证动作后，前端改变场景状态。
- 系统记录完整交互日志。

## 2. 总体顺序

完整流程可以分成 10 个阶段：

```text
1. 明确第一版范围
2. 准备美术资产和地图
3. 搭建前端工程
4. 实现 Phaser 2D 场景
5. 搭建 React UI 和状态管理
6. 先做 mock agent
7. 搭建 Node 后端
8. 接入 LLM 和动作验证
9. 加入语义地图、事件流和 simulation tick
10. 完成第一个演示场景并验收
```

## 3. 阶段一：明确第一版范围

### 3.1 要做什么

第一版只做一个小而完整的智能家居沙盒，不做完整房屋。

场景范围：

```text
开放式厨房 + 客厅
```

核心设备：

```text
冰箱
灯
空调
门锁
扫地机器人
```

核心交互：

```text
玩家移动
靠近设备
点击设备
打开聊天面板
输入 prompt
设备回复
设备提出动作
动作改变场景
记录事件日志
```

### 3.2 暂时不做什么

第一版不建议做：

- 完整房子。
- 大量可交互家具。
- 复杂游戏任务系统。
- 复杂物理模拟。
- 长期记忆系统。
- 语音输入输出。
- 自动自治 multi-agent。
- 多人在线。

### 3.3 阶段验收

完成这个阶段后，你应该有一个清晰决定：

```text
第一版只做 2D 像素风厨房 + 客厅，
只做 5 个设备，
目标是跑通 LLM 设备 NPC + 动作验证 + 研究日志。
```

## 4. 阶段二：准备美术资产和地图

### 4.1 下载素材

优先从 itch.io 找室内像素素材。

推荐搜索关键词：

```text
pixel art top down interior tileset
RPG interior tileset
modern interior pixel art
top down furniture sprite
```

推荐素材：

```text
Modern Interiors - RPG Tileset [16x16] by LimeZu
```

链接：

https://limezu.itch.io/moderninteriors

补充素材来源：

```text
Kenney: UI、图标、通用资产
OpenGameArt: 免费开源角色、道具、音效
```

### 4.2 安装 Tiled

安装 Tiled Map Editor：

https://www.mapeditor.org/

Tiled 用来搭建 tilemap、collision layer、device object layer 和 trigger zone。

### 4.3 创建地图

建议地图设置：

```text
Tile size: 16x16 或 32x32
Map type: Orthogonal
Perspective: top-down
Scene: kitchen + living room
```

建议图层：

```text
floor
walls
furniture_static
devices
collision
trigger_zones
spawn_points
```

### 4.4 添加设备对象

在 Tiled 的 `devices` object layer 中添加 5 个设备。

每个设备建议包含 metadata：

```json
{
  "deviceId": "fridge_01",
  "deviceType": "fridge",
  "personaId": "fridge_nutritionist",
  "roomId": "kitchen",
  "zoneId": "food_storage",
  "capabilities": "suggest_recipe,open_door,close_door,speak",
  "privacySensitivity": "medium"
}
```

其他设备示例：

```text
lamp_01
ac_01
doorlock_01
robot_vacuum_01
```

### 4.5 添加碰撞和触发区

`collision` layer 用于：

- 墙。
- 桌子。
- 沙发。
- 厨房台面。
- 其他不可穿越家具。

`trigger_zones` layer 用于：

- 冰箱感知范围。
- 灯的照明区域。
- 门锁靠近区域。
- 扫地机器人工作区域。
- scenario 触发区。

### 4.6 导出地图

导出为：

```text
home.json
```

后续放到：

```text
client/public/assets/maps/home.json
```

### 4.7 阶段验收

完成这个阶段后，应该有：

- 一套可用 tileset。
- 一个 `home.json`。
- 地图包含厨房和客厅。
- 地图中有 5 个设备对象。
- 地图中有 collision 和 trigger zones。

## 5. 阶段三：搭建前端工程

### 5.1 创建 Vite React 项目

```bash
npm create vite@latest client -- --template react-ts
cd client
npm install
npm install phaser zustand
```

### 5.2 建议目录结构

```text
client/
  public/
    assets/
      maps/
        home.json
      tilesets/
      sprites/
      audio/
  src/
    game/
      PhaserGame.tsx
      config/
        phaserConfig.ts
      scenes/
        BootScene.ts
        HomeScene.ts
      systems/
        createPlayer.ts
        createDevices.ts
        createTriggers.ts
        applyDeviceAction.ts
    components/
      DialoguePanel.tsx
      DeviceStatusPanel.tsx
      EventLogPanel.tsx
      ScenarioPanel.tsx
    state/
      worldStore.ts
      dialogueStore.ts
      eventBus.ts
    api/
      chatClient.ts
    types/
      world.ts
      device.ts
      agent.ts
```

### 5.3 阶段验收

完成这个阶段后，应该能：

- 启动 Vite 开发服务器。
- 在 React 页面中挂载一个 Phaser canvas。
- 项目目录已经准备好承载游戏、UI、状态和 API 代码。

## 6. 阶段四：实现 Phaser 2D 场景

### 6.1 加载地图

在 Phaser 中加载：

```text
home.json
tileset image
player sprite
device sprites
```

基本目标：

- 浏览器中显示 Tiled 地图。
- 地板、墙、家具正确显示。
- 像素风不模糊。

### 6.2 加入玩家

实现：

- 玩家出生点读取 `spawn_points` layer。
- WASD 或方向键移动。
- 简单行走动画。
- 摄像机跟随玩家。

### 6.3 加入碰撞

实现：

- 玩家不能穿墙。
- 玩家不能穿过主要家具。
- 扫地机器人后续也不能穿过障碍物。

### 6.4 读取设备对象

从 Tiled 的 `devices` object layer 读取：

```text
deviceId
deviceType
personaId
roomId
zoneId
capabilities
privacySensitivity
```

Phaser 中为每个设备创建：

```text
sprite
interactive hit area
hover / click behavior
device metadata
```

### 6.5 实现靠近检测

从 `trigger_zones` object layer 读取区域。

当玩家进入设备触发区时：

- UI 显示交互提示。
- Zustand 更新 `nearbyDeviceIds`。
- 生成 `user approached device` 事件。

### 6.6 实现点击设备

当用户点击设备时：

- 选中设备。
- 设备 sprite 高亮。
- React 打开聊天面板。
- `WorldState.selectedDeviceId` 更新。
- 记录 `device_selected` 事件。

### 6.7 阶段验收

完成这个阶段后，应该能：

- 在浏览器中看到像素风厨房和客厅。
- 玩家可以移动。
- 玩家不能穿墙。
- 5 个设备都能显示。
- 靠近设备有提示。
- 点击设备能选中。

## 7. 阶段五：搭建 React UI 和状态管理

### 7.1 创建 Zustand WorldStore

建议第一版状态：

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

### 7.2 创建设备状态

示例：

```ts
type DeviceState = {
  id: string
  type: string
  name: string
  power: 'on' | 'off'
  status: string
  values: Record<string, unknown>
  capabilities: string[]
}
```

### 7.3 创建 UI 面板

需要四个基础面板：

```text
DialoguePanel
DeviceStatusPanel
EventLogPanel
ScenarioPanel
```

第一版 UI 重点是清晰，不需要复杂视觉设计。

### 7.4 打通 Phaser 和 React

第一版可以用简单 event bus：

```text
Phaser emits: device:selected
React listens: update selectedDeviceId
React sends: action received
Phaser listens: apply visual change
```

后续再替换成更严格的 typed event bus。

### 7.5 阶段验收

完成这个阶段后，应该能：

- 点击设备后 React 面板显示设备信息。
- 事件日志能显示最近事件。
- 设备状态能在 UI 中更新。
- Phaser 和 React 状态能互相同步。

## 8. 阶段六：先做 mock agent

### 8.1 为什么先 mock

不要一开始接 LLM。先用 mock agent 跑通完整闭环：

```text
点击设备
输入文本
设备回复
提出动作
动作改变场景
写入日志
```

这样可以先验证产品和系统结构，不被 LLM 接口、prompt 和费用拖慢。

### 8.2 创建本地 persona

先在前端或共享配置中写 5 个 persona：

```text
fridge_nutritionist
lamp_mood_director
ac_comfort_guardian
doorlock_boundary_guard
robot_vacuum_low_worker
```

### 8.3 创建 mock 回复

示例：

```text
冰箱：
  “我建议你别和炉灶打持久战。昨天的汤还在，热一下就好。”

灯：
  “我可以把厨房灯调暖一点，别让晚上看起来像办公室。”

空调：
  “室温有点闷，24 度会舒服一些，也不会太耗电。”

门锁：
  “门已经锁好。边界感是我唯一的爱好。”

扫地机器人：
  “我在沙发下面发现了三种历史时期的灰尘。”
```

### 8.4 创建 mock actions

示例动作：

```json
{
  "type": "set_light",
  "deviceId": "lamp_01",
  "brightness": 40,
  "color": "warm"
}
```

先让 mock actions 改变场景：

- 灯变暖。
- 冰箱开门。
- 门锁图标变色。
- 扫地机器人移动。
- 空调温度数字变化。

### 8.5 阶段验收

完成这个阶段后，即使没有 LLM，也应该能完整演示：

```text
用户点击冰箱
输入一句话
冰箱回复
灯提出动作
场景视觉变化
事件日志记录
```

## 9. 阶段七：搭建 Node 后端

### 9.1 创建后端工程

```bash
mkdir server
cd server
npm init -y
npm install express cors dotenv zod
npm install -D typescript tsx @types/node @types/express @types/cors
```

### 9.2 建议目录结构

```text
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

### 9.3 创建基础接口

第一版只需要：

```text
POST /api/chat
POST /api/logs
POST /api/scenario
```

`/api/chat` 输入：

```ts
type ChatRequest = {
  userPrompt: string
  selectedDeviceId: string
  worldState: WorldState
  recentEvents: WorldEvent[]
}
```

`/api/chat` 输出：

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

### 9.4 阶段验收

完成这个阶段后，应该能：

- 前端成功请求 `/api/chat`。
- 后端能根据 `selectedDeviceId` 找到 persona。
- 后端能返回 mock 或规则生成的结构化 response。
- 前端能执行 response 中的 validated actions。

## 10. 阶段八：接入 LLM 和动作验证

### 10.1 接入原则

LLM 只负责：

- 生成设备身份一致的回复。
- 提出候选动作。

LLM 不负责：

- 直接修改 world state。
- 直接控制 Phaser。
- 绕过权限。
- 伪造传感器状态。

### 10.2 构建 prompt

每次调用 LLM 时，prompt 应包含：

```text
1. 设备身份
2. 设备知道什么
3. 设备能做什么
4. 设备不能做什么
5. 当前 world summary
6. 当前可见事件
7. 用户输入
8. 输出 JSON schema
```

### 10.3 定义动作白名单

示例：

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

### 10.4 实现 action validator

验证规则：

- 设备只能执行自己 capability 中声明的动作。
- 参数必须在合法范围。
- 高风险动作需要用户确认。
- 无效动作必须拒绝并写入日志。
- 前端只执行 validated actions。

### 10.5 阶段验收

完成这个阶段后，应该能：

- 用户和不同设备对话时得到不同风格回复。
- LLM 能提出动作。
- 后端能拒绝非法动作。
- 前端只执行合法动作。
- 日志记录原始回复、解析动作、验证结果和执行结果。

## 11. 阶段九：加入语义地图、事件流和 simulation tick

### 11.1 加入语义地图

不要只让 agent 看到坐标。要让 agent 看到语义。

示例：

```text
user is near fridge_01
fridge_01 is in kitchen / food_storage
lamp_01 is in living_room / ambient_light
doorlock_01 controls home boundary
```

### 11.2 建立事件流

统一记录：

```text
用户移动
用户靠近设备
用户点击设备
用户输入
agent 回复
agent 提出动作
动作验证
动作执行
设备状态变化
错误和拒绝
```

事件结构：

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

### 11.3 加入设备可见性

每个设备不应该读取完整世界，只读取自己能感知的事件。

示例：

```text
冰箱能看到：
  用户进入厨房
  用户打开冰箱
  食物库存状态
  夜间开门事件

门锁能看到：
  用户靠近门
  门开关状态
  访客事件
  权限确认状态
```

### 11.4 加入 simulation tick

不要每帧调用 LLM。只在关键时刻触发：

```text
用户输入
用户靠近设备
设备状态变化
scenario 开始
每 5-10 秒一次轻量检查
```

tick 流程：

```text
observe
retrieve
decide
respond
propose_actions
validate
execute
log
```

### 11.5 阶段验收

完成这个阶段后，应该能：

- 每次交互都转成事件。
- 设备只读取自己可见的事件。
- agent 调用由事件或 tick 触发。
- 系统可以导出完整事件日志。

## 12. 阶段十：完成第一个演示场景

### 12.1 推荐场景：疲惫回家

场景流程：

```text
用户进入客厅
  -> 灯感知用户进入
  -> 用户靠近冰箱
  -> 冰箱提示可交互
  -> 用户点击冰箱
  -> 用户输入：“我今天很累，晚上吃什么？”
  -> 冰箱根据库存和身份回应
  -> 灯插话建议调暖
  -> 用户接受
  -> 灯光变暖
  -> 空调建议轻微调温
  -> 系统记录完整 multi-device care interaction
```

### 12.2 这个场景展示什么

这个场景应该展示：

- 设备身份。
- 设备能力边界。
- 设备之间的协作。
- 场景动作反馈。
- 用户控制权。
- 研究日志。

### 12.3 最终验收标准

第一版完成时，应该能做到：

```text
浏览器打开一个 2D 像素风家居空间。
玩家可以移动。
玩家可以靠近和点击设备。
设备有不同身份和状态。
用户可以和设备聊天。
LLM 可以提出动作。
动作经过后端验证。
Phaser 场景发生变化。
多个设备能参与一个简单场景。
系统可以导出研究日志。
```

## 13. 最短路线总结

如果只记一个执行顺序，可以记这个：

```text
先搭地图和玩家移动，
再做设备点击和 React 面板，
然后用 mock agent 跑通动作，
最后接 LLM、事件流和日志。
```

更细的最短路线：

```text
1. 下载像素素材
2. 用 Tiled 画厨房 + 客厅
3. 创建 React + Phaser 前端
4. 加载地图
5. 加玩家移动和碰撞
6. 读取设备 object layer
7. 点击设备打开 React 面板
8. 写 mock agent 回复
9. 执行 mock actions 改变场景
10. 创建 Node 后端
11. 接入 LLM
12. 添加 action validator
13. 添加 event log
14. 添加 semantic metadata
15. 做疲惫回家 demo
16. 导出日志并验收
```
