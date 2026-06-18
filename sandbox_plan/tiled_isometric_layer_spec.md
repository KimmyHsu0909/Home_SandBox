# Isometric 智能家居沙盒 Tiled 图层与对象规范

## 1. 文档目标

这份文档用于指导在 Tiled 中搭建 isometric 形式的智能家居 AI Identity 沙盒场景。

当前需要安排交互的设备包括：

```text
冰箱
烤炉
面包机
洗衣机
微波炉
电视
音响
```

静态家具和场景元素包括：

```text
沙发
橱柜
植物
茶几
地面
墙壁
```

目标是让 Tiled 地图既能用于 Phaser 渲染，也能为后续 LLM 设备 NPC、物理触发、语义区域、事件日志和设备状态管理提供结构化信息。

## 2. Tiled 地图基础设置

如果素材是真等距素材，建议使用：

```text
Orientation: Isometric
Tile size: 根据素材决定，例如 64x32、128x64
Map size: 第一版建议 30 x 30 左右
Tile render order: Right Down 或默认
```

如果素材只是视觉上类似等距，但实际是普通网格素材，也可以使用：

```text
Orientation: Orthogonal
```

不过本项目既然采用 isometric 形式，建议优先使用 Tiled 的 `Isometric` 地图模式。

## 3. 总体图层分类

建议把图层分成三类：

```text
A. 可见 Tile 图层
B. Object 对象层
C. 调试 / 语义辅助层
```

核心原则：

```text
静态视觉归 Tile Layer
可交互设备归 Object Layer
运行时状态归 Phaser Sprite
```

也就是说：

- 地板、墙体、静态家具放在 tile layer。
- 冰箱、烤炉、电视等会交互或会变状态的设备，不画死在 tile layer。
- 可交互设备的位置、尺寸、碰撞、触发区、语义区域、气泡锚点放在 object layer。
- Phaser 读取 object layer 的矩形对象后，动态创建设备 sprite，并负责动画、状态和输入。

## 4. 可见 Tile 图层

推荐从下到上按这个顺序创建：

```text
00_floor
01_floor_details
02_walls_back
03_walls_front
04_static_furniture_back
05_static_furniture_mid
06_static_furniture_front
07_foreground_occluders
```

### 4.1 `00_floor`

用途：

- 地面主 tile。
- 厨房地砖。
- 客厅地板。
- 洗衣区地板。

放置内容：

```text
木地板
瓷砖
普通地面
```

建议属性：

```text
layerType = visual
semanticType = floor
collidable = false
```

### 4.2 `01_floor_details`

用途：

- 地毯。
- 地面阴影。
- 地面装饰。
- 设备底座阴影。

放置内容：

```text
地毯
地面纹理
阴影 tile
小污渍
扫地机器人路径标记，可选
```

建议属性：

```text
layerType = visual
semanticType = floor_detail
collidable = false
```

### 4.3 `02_walls_back`

用途：

- 后墙。
- 左上 / 右上方向墙体。
- 墙面装饰背景。

放置内容：

```text
厨房后墙
客厅后墙
墙纸
墙面瓷砖
```

建议属性：

```text
layerType = visual
semanticType = wall
collidable = true
```

### 4.4 `03_walls_front`

用途：

- 前景墙。
- 会遮挡玩家或家具的墙体。
- 等距场景中靠前的墙。

放置内容：

```text
前墙
半墙
门框前景部分
```

建议属性：

```text
layerType = visual
semanticType = wall_front
collidable = true
depthGroup = foreground
```

### 4.5 `04_static_furniture_back`

用途：

- 放置靠后的静态家具。

放置内容：

```text
橱柜后排
墙边柜
墙上架子
大型植物靠后部分
```

建议属性：

```text
layerType = visual
semanticType = static_furniture
collidable = mixed
```

### 4.6 `05_static_furniture_mid`

用途：

- 放置主要静态家具。

放置内容：

```text
沙发
橱柜
植物
茶几
餐桌
厨房台面
```

建议属性：

```text
layerType = visual
semanticType = static_furniture
collidable = mixed
```

### 4.7 `06_static_furniture_front`

用途：

- 放置需要遮挡玩家的前景家具部分。

放置内容：

```text
沙发前沿
茶几前沿
橱柜前沿
植物前景叶子
```

建议属性：

```text
layerType = visual
semanticType = foreground_furniture
collidable = false
depthGroup = foreground
```

这个图层在 isometric 场景里很重要。玩家可能走到家具后面，前景家具需要盖住玩家的一部分。

### 4.8 `07_foreground_occluders`

用途：

- 专门放置会遮挡角色的前景物体。

放置内容：

```text
前景墙
高植物顶部
高柜顶部
电视柜前缘
门框前景
```

建议属性：

```text
layerType = visual
semanticType = occluder
collidable = false
depthGroup = foreground
```

## 5. Object 对象层

可见 tile layer 负责画面。真正给 Phaser、React、Node 后端和 LLM agent 使用的信息，建议放在 object layer。

推荐对象层：

```text
OBJ_spawn_points
OBJ_collision
OBJ_interactables
OBJ_trigger_zones
OBJ_semantic_zones
OBJ_device_anchor_points
OBJ_navigation
OBJ_occlusion_bounds
OBJ_camera_bounds
OBJ_debug_notes
```

## 6. `OBJ_spawn_points`

用途：

- 玩家出生点。
- 场景入口点。
- 后续可选 NPC / 设备 avatar 出生点。

对象类型：

```text
Point Object
```

建议对象：

```text
player_default
front_door_entry
kitchen_entry
debug_spawn
```

建议属性：

```json
{
  "spawnId": "player_default",
  "spawnType": "player",
  "direction": "south_east",
  "roomId": "living_room"
}
```

## 7. `OBJ_collision`

用途：

- 定义不能穿过的区域。

对象类型：

```text
Rectangle Object
Polygon Object
```

isometric 地图建议优先用 polygon，因为家具和墙体视觉上通常不是普通正方形。

建议对象命名：

```text
col_wall_back_01
col_sofa_01
col_cabinet_01
col_fridge_01
col_washing_machine_01
```

建议属性：

```json
{
  "collisionType": "solid",
  "blocksPlayer": true,
  "blocksRobot": true,
  "blocksLineOfSight": false,
  "heightClass": "medium"
}
```

`heightClass` 可选值：

```text
low
medium
high
wall
```

示例：

```text
茶几: low
沙发: medium
冰箱: high
墙: wall
```

## 8. `OBJ_interactables`

这是最重要的一层。所有需要 LLM、点击、状态变化、动画的设备都放在这里。

这个层里的设备对象建议直接用 `Rectangle Object` 框出设备在画面中的位置和尺寸。Tiled 不需要再放一个冰箱 tile；矩形对象就是 Phaser 生成冰箱 sprite 的位置来源。

对象类型：

```text
Rectangle Object
Polygon Object
```

第一版建议：

```text
设备外观生成: Rectangle Object
复杂碰撞轮廓: OBJ_collision 中单独 Polygon Object
靠近交互范围: OBJ_trigger_zones 中单独 Rectangle / Polygon Object
```

建议对象：

```text
dev_fridge_01
dev_oven_01
dev_toaster_01
dev_washing_machine_01
dev_microwave_01
dev_tv_01
dev_speaker_01
```

通用属性：

```json
{
  "objectRole": "device",
  "deviceId": "fridge_01",
  "deviceType": "fridge",
  "displayName": "冰箱",
  "spriteKey": "fridge",
  "closedFrame": 0,
  "openFrame": 2,
  "openAnimationKey": "fridge-open",
  "closeAnimationKey": "fridge-close",
  "interactionKey": "open_door",
  "renderFromObjectBounds": true,
  "personaId": "fridge_food_keeper",
  "roomId": "kitchen",
  "zoneId": "food_storage",
  "anchorId": "anchor_fridge_01",
  "triggerId": "trg_fridge_01_proximity",
  "initialPower": "on",
  "initialStatus": "idle",
  "capabilities": "check_inventory,suggest_recipe,open_door,close_door,speak",
  "knowledgeScope": "food_inventory,door_open_history,expiration_dates",
  "privacySensitivity": "medium",
  "requiresConfirmation": "none",
  "logLevel": "full"
}
```

注意：Tiled 自定义属性可以用字符串保存数组式内容。第一版建议用逗号字符串：

```text
capabilities = check_inventory,suggest_recipe,open_door,close_door,speak
```

Phaser 读取后再用 `split(',')` 转成数组。

冰箱在 Tiled 中的最小对象配置可以是：

```text
Layer: OBJ_interactables
Object type: Rectangle
name: dev_fridge_01
type: device
x / y: 冰箱矩形左上角
width / height: 冰箱 sprite 的显示尺寸
```

对应属性：

```json
{
  "deviceId": "fridge_01",
  "deviceType": "fridge",
  "spriteKey": "fridge",
  "initialStatus": "closed",
  "interactionKey": "open_door",
  "openAnimationKey": "fridge-open"
}
```

Phaser 创建设备时，以矩形中心作为 sprite 坐标：

```ts
function getProperty<T = unknown>(
  object: Phaser.Types.Tilemaps.TiledObject,
  name: string
): T | undefined {
  return object.properties?.find((item: { name: string }) => item.name === name)?.value
}

function createDeviceSprites(scene: Phaser.Scene, map: Phaser.Tilemaps.Tilemap) {
  const layer = map.getObjectLayer('OBJ_interactables')

  if (!layer) return []

  return layer.objects
    .filter((object) => getProperty(object, 'objectRole') === 'device' || object.type === 'device')
    .map((object) => {
      const spriteKey = getProperty<string>(object, 'spriteKey') ?? getProperty<string>(object, 'deviceType') ?? object.name
      const x = (object.x ?? 0) + (object.width ?? 0) / 2
      const y = (object.y ?? 0) + (object.height ?? 0) / 2

      const sprite = scene.physics.add.staticSprite(x, y, spriteKey, getProperty<number>(object, 'closedFrame') ?? 0)

      if (object.width && object.height) {
        sprite.setDisplaySize(object.width, object.height)
        sprite.refreshBody()
      }

      sprite.setData('deviceId', getProperty<string>(object, 'deviceId') ?? object.name)
      sprite.setData('deviceType', getProperty<string>(object, 'deviceType') ?? object.type)
      sprite.setData('interactionKey', getProperty<string>(object, 'interactionKey'))
      sprite.setData('openAnimationKey', getProperty<string>(object, 'openAnimationKey'))
      sprite.setData('isOpen', false)

      return sprite
    })
}
```

按 `E` 打开冰箱时，只改变 Phaser sprite 状态，不改 Tiled 地图：

```ts
function openFridge(fridge: Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.StaticSprite) {
  if (fridge.getData('isOpen')) return

  fridge.setData('isOpen', true)

  const animationKey = fridge.getData('openAnimationKey') ?? 'fridge-open'
  fridge.play(animationKey)
}
```

## 9. 设备对象属性模板

### 9.1 冰箱 `fridge_01`

```json
{
  "deviceId": "fridge_01",
  "deviceType": "fridge",
  "displayName": "冰箱",
  "spriteKey": "fridge",
  "closedFrame": 0,
  "openFrame": 2,
  "openAnimationKey": "fridge-open",
  "closeAnimationKey": "fridge-close",
  "interactionKey": "open_door",
  "renderFromObjectBounds": true,
  "personaId": "fridge_food_keeper",
  "roomId": "kitchen",
  "zoneId": "food_storage",
  "capabilities": "check_inventory,suggest_recipe,open_door,close_door,speak",
  "knowledgeScope": "food_inventory,expiration_dates,door_open_history,late_night_visits",
  "privacySensitivity": "medium",
  "initialPower": "on",
  "initialStatus": "closed",
  "stateKeys": "doorOpen,temperature,foodFreshness"
}
```

### 9.2 烤炉 `oven_01`

```json
{
  "deviceId": "oven_01",
  "deviceType": "oven",
  "displayName": "烤炉",
  "personaId": "oven_heat_guardian",
  "roomId": "kitchen",
  "zoneId": "cooking_area",
  "capabilities": "preheat,set_temperature,start_timer,stop_heating,speak",
  "knowledgeScope": "temperature,timer,cooking_status,safety_state",
  "privacySensitivity": "low",
  "initialPower": "off",
  "initialStatus": "idle",
  "stateKeys": "temperature,timerRemaining,isHeating"
}
```

### 9.3 面包机 `toaster_01`

```json
{
  "deviceId": "toaster_01",
  "deviceType": "toaster",
  "displayName": "面包机",
  "personaId": "toaster_breakfast_optimist",
  "roomId": "kitchen",
  "zoneId": "countertop",
  "capabilities": "start_toast,cancel_toast,set_browning_level,speak",
  "knowledgeScope": "toast_level,timer,status",
  "privacySensitivity": "low",
  "initialPower": "off",
  "initialStatus": "idle",
  "stateKeys": "browningLevel,timerRemaining,isToasting"
}
```

### 9.4 洗衣机 `washing_machine_01`

```json
{
  "deviceId": "washing_machine_01",
  "deviceType": "washing_machine",
  "displayName": "洗衣机",
  "personaId": "washer_routine_manager",
  "roomId": "utility_room",
  "zoneId": "laundry_area",
  "capabilities": "start_cycle,pause_cycle,set_mode,report_remaining_time,speak",
  "knowledgeScope": "laundry_mode,cycle_status,remaining_time,energy_usage",
  "privacySensitivity": "medium",
  "initialPower": "off",
  "initialStatus": "idle",
  "stateKeys": "mode,remainingTime,isRunning,doorLocked"
}
```

### 9.5 微波炉 `microwave_01`

```json
{
  "deviceId": "microwave_01",
  "deviceType": "microwave",
  "displayName": "微波炉",
  "personaId": "microwave_quick_helper",
  "roomId": "kitchen",
  "zoneId": "countertop",
  "capabilities": "start_heat,stop_heat,set_timer,speak",
  "knowledgeScope": "timer,status,door_state,safety_state",
  "privacySensitivity": "low",
  "initialPower": "off",
  "initialStatus": "idle",
  "stateKeys": "timerRemaining,isHeating,doorOpen"
}
```

### 9.6 电视 `tv_01`

```json
{
  "deviceId": "tv_01",
  "deviceType": "tv",
  "displayName": "电视",
  "personaId": "tv_attention_broker",
  "roomId": "living_room",
  "zoneId": "media_area",
  "capabilities": "turn_on,turn_off,set_volume,change_channel,suggest_content,speak",
  "knowledgeScope": "watch_history,current_content,volume,time_of_day",
  "privacySensitivity": "high",
  "initialPower": "off",
  "initialStatus": "idle",
  "stateKeys": "volume,currentChannel,currentContent"
}
```

### 9.7 音响 `speaker_01`

```json
{
  "deviceId": "speaker_01",
  "deviceType": "speaker",
  "displayName": "音响",
  "personaId": "speaker_mood_curator",
  "roomId": "living_room",
  "zoneId": "media_area",
  "capabilities": "play_music,stop_music,set_volume,set_playlist,speak",
  "knowledgeScope": "current_music,volume,user_mood,time_of_day",
  "privacySensitivity": "medium",
  "initialPower": "off",
  "initialStatus": "idle",
  "stateKeys": "volume,currentPlaylist,isPlaying"
}
```

## 10. `OBJ_trigger_zones`

用途：

- 定义靠近触发。
- 定义感知范围。
- 定义自动化触发。

每个交互设备建议至少一个 proximity trigger。

第一版可以把“靠近自动问候”和“按 E 互动”合在同一个 trigger 区域里：

```text
玩家进入区域:
- 根据冷却时间和概率，设备随机发起一句问候。
- 同时显示按 E 的交互提示。

玩家在区域内按 E:
- 执行 interactionAction，例如打开冰箱、和电视对话、启动洗衣机面板。

玩家离开区域:
- 隐藏交互提示。
- 标记玩家已经离开，方便下次重新进入时再判断是否问候。
```

建议对象：

```text
trg_fridge_01_proximity
trg_oven_01_proximity
trg_toaster_01_proximity
trg_washing_machine_01_proximity
trg_microwave_01_proximity
trg_tv_01_proximity
trg_speaker_01_proximity
```

通用属性：

```json
{
  "triggerId": "trg_fridge_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "fridge_01",
  "roomId": "kitchen",
  "zoneId": "food_storage",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.55,
  "greetingCooldownMs": 12000,
  "greetingContextKeys": "time_of_day,device_state,user_history,room_activity",
  "showPrompt": true,
  "promptText": "打开冰箱",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "open_or_talk",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

可选 `triggerType`：

```text
proximity
interaction
sensor
state_condition
scenario
```

建议属性说明：

```text
triggerType = proximity
表示这是靠近设备的感应范围。

shapeType = ellipse / rectangle / polygon
对应你在 Tiled 中画的形状。圆形或椭圆就填 ellipse。

onEnterEvent = device_random_greeting
玩家刚进入区域时，进入随机问候逻辑。

greetingMode = conditional_random
不是纯随机，而是根据时间、设备状态、用户历史等上下文筛选台词，再随机选一句。

greetingChance = 0.0 到 1.0
每次进入时触发问候的概率。

greetingCooldownMs
同一个 trigger 多久内不能重复主动问候。

showPrompt = true
玩家在区域内时显示按键提示。

requiresInput = E
玩家需要按 E 才执行正式互动。

interactionAction
按 E 后具体做什么，由 Phaser 读取后分发给对应设备逻辑。
```

### 10.1 冰箱 `trg_fridge_01_proximity`

```json
{
  "triggerId": "trg_fridge_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "fridge_01",
  "roomId": "kitchen",
  "zoneId": "food_storage",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.6,
  "greetingCooldownMs": 12000,
  "greetingContextKeys": "time_of_day,door_open_history,food_inventory,late_night_visits",
  "showPrompt": true,
  "promptText": "按 E 打开冰箱",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "open_or_talk",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

### 10.2 烤炉 `trg_oven_01_proximity`

```json
{
  "triggerId": "trg_oven_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "oven_01",
  "roomId": "kitchen",
  "zoneId": "cooking_area",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.45,
  "greetingCooldownMs": 15000,
  "greetingContextKeys": "time_of_day,temperature,timer,cooking_status,safety_state",
  "showPrompt": true,
  "promptText": "按 E 使用烤炉",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "talk_or_open_controls",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

### 10.3 面包机 `trg_toaster_01_proximity`

```json
{
  "triggerId": "trg_toaster_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "toaster_01",
  "roomId": "kitchen",
  "zoneId": "countertop",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.5,
  "greetingCooldownMs": 12000,
  "greetingContextKeys": "time_of_day,browningLevel,timerRemaining,isToasting",
  "showPrompt": true,
  "promptText": "按 E 使用面包机",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "talk_or_start_toast",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

### 10.4 洗衣机 `trg_washing_machine_01_proximity`

```json
{
  "triggerId": "trg_washing_machine_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "washing_machine_01",
  "roomId": "utility_room",
  "zoneId": "laundry_area",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.45,
  "greetingCooldownMs": 15000,
  "greetingContextKeys": "time_of_day,mode,remainingTime,isRunning,doorLocked",
  "showPrompt": true,
  "promptText": "按 E 使用洗衣机",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "talk_or_open_controls",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

### 10.5 微波炉 `trg_microwave_01_proximity`

```json
{
  "triggerId": "trg_microwave_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "microwave_01",
  "roomId": "kitchen",
  "zoneId": "countertop",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.5,
  "greetingCooldownMs": 12000,
  "greetingContextKeys": "time_of_day,timerRemaining,isHeating,doorOpen,safety_state",
  "showPrompt": true,
  "promptText": "按 E 使用微波炉",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "talk_or_open_controls",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

### 10.6 电视 `trg_tv_01_proximity`

```json
{
  "triggerId": "trg_tv_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "tv_01",
  "roomId": "living_room",
  "zoneId": "media_area",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.55,
  "greetingCooldownMs": 12000,
  "greetingContextKeys": "time_of_day,watch_history,current_content,volume",
  "showPrompt": true,
  "promptText": "按 E 与电视互动",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "talk_or_open_controls",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

### 10.7 音响 `trg_speaker_01_proximity`

```json
{
  "triggerId": "trg_speaker_01_proximity",
  "triggerType": "proximity",
  "shapeType": "ellipse",
  "targetDeviceId": "speaker_01",
  "roomId": "living_room",
  "zoneId": "media_area",
  "onEnterEvent": "device_random_greeting",
  "onExitEvent": "device_proximity_exit",
  "greetingEnabled": true,
  "greetingMode": "conditional_random",
  "greetingChance": 0.55,
  "greetingCooldownMs": 12000,
  "greetingContextKeys": "time_of_day,current_music,volume,user_mood,isPlaying",
  "showPrompt": true,
  "promptText": "按 E 与音响互动",
  "requiresInput": "E",
  "interactionEvent": "device_interact",
  "interactionAction": "talk_or_open_controls",
  "interactionMode": "press_e",
  "repeatWhileInside": false
}
```

## 11. `OBJ_semantic_zones`

用途：

- 定义房间和功能区。
- 让 agent 理解空间，而不是只知道坐标。

建议对象：

```text
zone_kitchen
zone_living_room
zone_food_storage
zone_cooking_area
zone_countertop
zone_laundry_area
zone_media_area
zone_relax_area
```

通用属性：

```json
{
  "zoneId": "food_storage",
  "roomId": "kitchen",
  "zoneType": "functional_area",
  "displayName": "食物储藏区",
  "visibleTo": "fridge_01,oven_01,toaster_01,microwave_01",
  "privacyLevel": "medium",
  "defaultActivity": "food_preparation"
}
```

媒体区示例：

```json
{
  "zoneId": "media_area",
  "roomId": "living_room",
  "zoneType": "functional_area",
  "displayName": "媒体区",
  "containsDeviceIds": "tv_01,speaker_01",
  "primaryDeviceId": "tv_01",
  "secondaryDeviceIds": "speaker_01",
  "visibleTo": "tv_01,speaker_01",
  "privacyLevel": "medium",
  "defaultActivity": "watching_tv,listening_music,relaxing",
  "ambientStateKeys": "current_content,current_music,volume,room_occupancy,time_of_day",
  "sharedContextKeys": "watch_history,current_content,current_music,user_mood,volume",
  "entryEvent": "user_entered_media_area",
  "exitEvent": "user_left_media_area",
  "notes": "客厅中的电视和音响共享这个媒体区上下文。电视可感知观看内容和音量，音响可感知音乐、音量和用户情绪。"
}
```

厨房区域示例：

```json
{
  "zoneId": "kitchen",
  "roomId": "kitchen",
  "zoneType": "room",
  "displayName": "厨房",
  "containsDeviceIds": "fridge_01,oven_01,toaster_01,microwave_01",
  "primaryDeviceId": "fridge_01",
  "secondaryDeviceIds": "oven_01,toaster_01,microwave_01",
  "visibleTo": "fridge_01,oven_01,toaster_01,microwave_01",
  "privacyLevel": "medium",
  "defaultActivity": "food_storage,cooking,heating_food,breakfast_preparation",
  "subZoneIds": "food_storage,cooking_area,countertop",
  "ambientStateKeys": "time_of_day,room_occupancy,food_smell,cooking_status,appliance_power_states",
  "sharedContextKeys": "food_inventory,expiration_dates,cooking_status,timer,status,door_state,safety_state",
  "entryEvent": "user_entered_kitchen",
  "exitEvent": "user_left_kitchen",
  "notes": "厨房是冰箱、烤炉、面包机和微波炉共享的房间级语义区域。设备可以根据用户进入厨房、当前时间、食物状态和烹饪状态生成问候或建议。"
}
```

建议功能区：

```text
kitchen
  food_storage
  cooking_area
  countertop
  washing_area

living_room
  media_area
  relax_area
  entry_area

utility_room 或 kitchen_side
  laundry_area
```

## 12. `OBJ_device_anchor_points`

用途：

- 给设备气泡、状态图标、交互提示、动画、音效定位。

对象类型：

```text
Point Object
```

建议对象：

```text
anchor_fridge_01
anchor_oven_01
anchor_toaster_01
anchor_washing_machine_01
anchor_microwave_01
anchor_tv_01
anchor_speaker_01
```

通用属性：

```json
{
  "anchorId": "anchor_fridge_01",
  "targetDeviceId": "fridge_01",
  "anchorType": "speech_bubble",
  "offsetX": 0,
  "offsetY": -48
}
```

同一个设备可以有多个 anchor：

```text
speech_bubble
status_icon
interaction_prompt
animation_origin
sound_origin
```

电视状态图标示例：

```json
{
  "anchorId": "anchor_tv_01_status",
  "targetDeviceId": "tv_01",
  "anchorType": "status_icon",
  "offsetX": 16,
  "offsetY": -32
}
```

## 13. `OBJ_navigation`

用途：

- 给玩家和扫地机器人提供导航信息。

对象类型：

```text
Rectangle Object
Polygon Object
Polyline Object
```

建议对象：

```text
nav_walkable_living_room
nav_walkable_kitchen
nav_robot_cleaning_area
nav_robot_dock_point
```

通用属性：

```json
{
  "navType": "walkable",
  "allowedActors": "player,robot_vacuum",
  "roomId": "living_room",
  "movementCost": 1
}
```

扫地机器人专用：

```json
{
  "navType": "robot_cleaning_area",
  "allowedActors": "robot_vacuum",
  "roomId": "living_room",
  "movementCost": 1,
  "cleaningPriority": "medium"
}
```

## 14. `OBJ_occlusion_bounds`

用途：

- 处理 isometric 场景中的遮挡。
- 例如玩家走到沙发后面时，沙发前沿应盖住玩家。

对象类型：

```text
Polygon Object
```

通用属性：

```json
{
  "occluderId": "occ_sofa_01",
  "targetVisualId": "sofa_01",
  "occlusionType": "foreground",
  "appliesTo": "player,robot_vacuum",
  "fadeOnOverlap": false
}
```

第一版可以先用图层顺序解决遮挡。如果遮挡不准确，再加入这个层。

## 15. `OBJ_camera_bounds`

用途：

- 限制摄像机范围。

对象类型：

```text
Rectangle Object
```

建议属性：

```json
{
  "cameraBoundsId": "main_home_bounds",
  "target": "main_camera"
}
```

## 16. `OBJ_debug_notes`

用途：

- 写设计备注。
- 不参与运行。

对象类型：

```text
Text Object
Rectangle Object
```

建议属性：

```json
{
  "noteType": "design_note",
  "content": "这里后续可以放餐桌或增加窗户。"
}
```

## 17. 推荐最终图层顺序

在 Tiled 中从下到上建议这样排列：

```text
00_floor
01_floor_details
02_walls_back
03_walls_front
04_static_furniture_back
05_static_furniture_mid
06_static_furniture_front
07_foreground_occluders

OBJ_spawn_points
OBJ_collision
OBJ_interactables
OBJ_trigger_zones
OBJ_semantic_zones
OBJ_device_anchor_points
OBJ_navigation
OBJ_occlusion_bounds
OBJ_camera_bounds
OBJ_debug_notes
```

Object layers 可以放在上面或下面，主要看编辑方便。Phaser 读取时应按图层名称读取，不依赖视觉顺序。

## 18. 最小可行版本图层

如果完整图层太多，第一版最低限度只需要：

```text
00_floor
02_walls_back
05_static_furniture_mid
07_foreground_occluders

OBJ_spawn_points
OBJ_collision
OBJ_interactables
OBJ_trigger_zones
OBJ_semantic_zones
```

这已经足够支持：

- 地图显示。
- 玩家移动。
- 碰撞。
- 点击设备。
- 靠近触发。
- 设备 sprite 动画。
- LLM agent 语义信息。

## 19. 关键规则

### 19.1 视觉归视觉，逻辑归 object layer

静态家具可以画在 tile layer 上。可交互设备不要画死在 tile layer；只在 `OBJ_interactables` 中用矩形框出位置，由 Phaser 根据对象属性创建 sprite。

设备的开门、发光、运行、亮屏等状态变化都属于 Phaser 运行时状态，不属于 Tiled 静态 tile。

### 19.2 所有可交互设备必须有 `deviceId`

后续 Phaser、React、Node、LLM、日志都靠这个 ID 对齐。

### 19.3 所有触发区必须有 `triggerId` 和 `targetDeviceId`

这样用户靠近哪个设备、触发什么事件会很清楚。

### 19.4 所有语义区域必须有 `roomId` 和 `zoneId`

这样 agent 才能理解：

```text
用户在厨房食物储藏区
```

而不是只知道：

```text
x = 320, y = 180
```

### 19.5 isometric 场景要额外注意遮挡和碰撞

视觉图块看起来是斜的，但碰撞区域最好用 polygon object 单独标。

### 19.6 第一版不要把所有家具都做成交互对象

沙发、橱柜、植物、茶几、地面、墙壁先作为静态物体即可。

进入 `OBJ_interactables` 的只有：

```text
冰箱
烤炉
面包机
洗衣机
微波炉
电视
音响
```
