# Phaser Sandbox Framework Summary

这份文档说明当前智能家居沙盒项目的目录结构、每个路径的用途，以及你接下来还需要补充的资源。

## 1. 当前技术框架

当前项目是一个 Vite + Phaser + TypeScript 沙盒。

```text
Tiled 负责:
- 地板和墙壁 tile layer
- semantic zone
- interactable object
- collision object
- trigger zone
- spawn point

Phaser 负责:
- 加载 Tiled 地图
- 根据对象层生成静态家具和交互设备 sprite
- 玩家移动
- 碰撞
- 固定相机视角
- 靠近 trigger 后由 LLM 生成设备问候
- 区域内按 E 与设备互动，并把设备回复写入左侧聊天框
```

核心原则：

```text
地板 / 墙壁 = Tiled tile layer
静态家具 = Tiled object layer + Phaser sprite
交互设备 = Tiled object layer + Phaser sprite + prompt
设备角色文本 = prompts/devices/*.md
```

## 2. 顶层文件

```text
package.json
```

项目依赖和脚本。常用命令：

```bash
npm run dev
npm run build
```

```text
index.html
```

Vite 入口 HTML。

```text
vite.config.ts
```

Vite 开发服务器配置。当前默认端口是 `5173`。

```text
tsconfig.json
```

TypeScript 配置。

```text
map.tmj
background.png
```

根目录里的原始 Tiled 导出和原始背景 tileset。它们可以作为备份。运行时实际读取的是 `public/assets/maps/home.tmj` 和 `public/assets/tilesets/background.png`。

## 3. 运行资源目录

```text
public/assets/maps/home.tmj
```

Phaser 当前实际加载的 Tiled 地图文件。

如果你之后在 Tiled 里修改地图，建议导出后覆盖这个文件。

注意检查里面的 tileset 图片路径应为：

```text
../tilesets/background.png
```

```text
public/assets/tilesets/background.png
```

地板和墙壁打包后的 tileset 图片。Tiled 里的 tileset 名称目前应保持为：

```text
home_background
```

如果你在 Tiled 中改了 tileset 名称，需要同步修改：

```text
src/config/gameConfig.ts
```

```text
public/assets/devices/
```

交互设备图片目录。这里放由 `OBJ_interactables` 生成的设备 sprite。

当前需要补：

```text
fridge.png               单张 PNG
oven.png                 单张 PNG
toaster.png              spritesheet
washing_machine.png      spritesheet
microwave.png            单张 PNG
tv.png                   spritesheet
speaker.png              单张 PNG
```

```text
public/assets/props/
```

静态家具和装饰物图片目录。这里放由 `OBJ_static_furniture` 生成的静态 sprite。

根据当前地图对象，当前需要补：

```text
window.png
picture.png
shelving.png
kitchen_furniture.png
```

```text
public/assets/player/
```

玩家图片目录。

当前需要补：

```text
player.png
```

当前玩家图片按 spritesheet 读取，不是单张静态图。

如果这些图片暂时不存在，代码会生成彩色占位图，方便你先检查地图和对象层逻辑。

## 4. 源码目录

```text
src/main.ts
```

Phaser 游戏入口。创建 Phaser Game，并加载 `HomeScene`。

```text
src/styles.css
```

页面基础样式。

```text
src/config/gameConfig.ts
```

全局配置，包括：

```text
viewport 尺寸
camera zoom
地图路径
tileset 名称
tileset 图片路径
debug 开关
```

如果你改地图文件名、tileset 名称或 tileset 图片路径，优先改这里。

```text
src/config/llmConfig.ts
```

LLM API 配置。默认是：

```text
provider: mock
```

如果要接入 OpenAI-compatible API，修改：

```text
provider
endpoint
apiKey
model
temperature
maxTokens
requestTimeoutMs
```

注意：当前是前端直连 API 的原型配置，`apiKey` 会暴露在浏览器代码里。正式展示或上线时，应改成后端代理。

```text
src/config/layerNames.ts
```

Tiled 图层名称配置。

当前代码会读取这些层：

```text
OBJ_spawn_points
OBJ_collision
OBJ_interactables
OBJ_interactables_02
OBJ_static_furniture
OBJ_trigger_zones
OBJ_semantic_zones
```

如果你在 Tiled 里改图层名，需要同步改这里。

```text
src/data/devices/registry.ts
```

交互设备注册表。每台设备在这里定义：

```text
deviceId
deviceType
displayName
spriteKey
assetPath
promptPath
fallbackColor
```

后续新增设备时，需要在这里添加一项。

```text
src/data/devices/types.ts
```

设备类型定义。

当前 `DeviceId` 包含：

```text
fridge_01
oven_01
toaster_01
washing_machine_01
microwave_01
tv_01
speaker_01
```

新增设备时，也需要把新的 `deviceId` 加到这里。

```text
src/data/props/registry.ts
```

静态家具 / 装饰物注册表。

当前包含：

```text
window
picture
shelving
kitchen_furniture
```

如果之后在 `OBJ_static_furniture` 里新增静态物件，需要在这里注册它的 `spriteKey` 和图片路径。

```text
src/game/scenes/HomeScene.ts
```

当前主场景，负责：

```text
加载地图和资源
创建 tile layer
创建静态家具 sprite
创建交互设备 sprite
创建玩家
创建 collision
创建 trigger zones
处理玩家移动
处理靠近随机问候
处理按 E 互动
```

```text
src/game/tiled/properties.ts
```

Tiled 对象属性读取工具。

当前支持读取对象里的 `config` 字符串，并把它解析为 JSON。

```text
src/game/tiled/mapObjects.ts
```

Tiled 对象层读取工具。

例如：

```text
getInteractableObjects
getStaticFurnitureObjects
getSpawnPoint
getTriggerObjects
```

```text
src/game/systems/PromptSystem.ts
```

屏幕底部的按键提示系统。

例如：

```text
按 E 打开冰箱
按 E 与电视互动
```

```text
src/game/systems/SpeechSystem.ts
```

旧的设备气泡文本系统。当前设备对话已经切换到左侧聊天框，不再使用场景内 bubble。

```text
src/game/systems/ChatPanelSystem.ts
```

左侧固定聊天框系统。玩家消息显示为 `@用户`，设备消息显示为 `@设备名`。

```text
src/game/systems/LlmClient.ts
```

LLM 客户端。默认 mock 回复；当 `src/config/llmConfig.ts` 配置为 `openai-compatible` 且填入 `apiKey` 后，会向配置的 endpoint 发起请求。

## 5. Prompt 文档目录

```text
prompts/devices/
```

每台设备的 prompt 都单独放在这里，方便后续直接修改设备人格、语气、能力边界和可用上下文。

当前文件：

```text
fridge_01.md
oven_01.md
toaster_01.md
washing_machine_01.md
microwave_01.md
tv_01.md
speaker_01.md
```

后续接 LLM 时，可以根据 `deviceId` 找到对应 prompt。

例如：

```text
fridge_01 -> prompts/devices/fridge_01.md
tv_01 -> prompts/devices/tv_01.md
```

当前代码通过 `src/data/devices/prompts.ts` 将这些 Markdown prompt 作为文本导入。

## 6. 聊天交互

左侧聊天框固定在页面左侧，游戏画面不会把设备对话画成气泡。

玩家发言格式：

```text
@冰箱 晚上吃什么？
@电视 推荐点东西
@洗衣机 现在能洗吗？
```

设备昵称格式：

```text
@冰箱
@电视
@用户
```

靠近设备 trigger 时，设备会尝试由 LLM 生成一条问候。按 E 互动时，也会由对应设备生成回复。

## 7. 你现在还需要添加什么

### 7.1 设备 PNG

放到：

```text
public/assets/devices/
```

需要：

```text
fridge.png
oven.png
toaster.png
washing_machine.png
microwave.png
tv.png
speaker.png
```

文件名必须和 `src/data/devices/registry.ts` 里的 `assetPath` 对上。

不是所有设备都必须是单张无动画图片。当前配置是：

```text
单张 PNG:
- fridge.png
- oven.png
- microwave.png
- speaker.png

spritesheet:
- washing_machine.png
- toaster.png
- tv.png
```

### 7.1.1 洗衣机动画 spritesheet

放到：

```text
public/assets/devices/washing_machine.png
```

当前代码按这个规格读取：

```text
frameWidth: 128
frameHeight: 128
```

当前图片尺寸为 `256 x 128`，横向排列 2 帧：

```text
frame 0 = 门关闭
frame 1 = 门打开
```

交互逻辑：

```text
用户靠近 washing_machine_01 trigger
按 E
如果门是关的 -> 播放 frame 0 到 frame 1
再按 E
如果门是开的 -> 播放 frame 1 到 frame 0
```

如果你的洗衣机帧尺寸不是 `128x128`，需要修改：

```text
src/data/devices/registry.ts
washing_machine_01.frameWidth
washing_machine_01.frameHeight
```

### 7.1.2 吐司机动画 spritesheet

放到：

```text
public/assets/devices/toaster.png
```

当前代码按这个规格读取：

```text
frameWidth: 64
frameHeight: 64
```

当前图片尺寸为 `256 x 64`，横向排列 4 帧：

```text
frame 0 = 普通状态
frame 1 = 面包开始弹出
frame 2 = 面包半弹出
frame 3 = 面包完全弹出
```

交互逻辑：

```text
用户靠近 toaster_01 trigger
按 E
播放 frame 0 到 frame 3
再按 E
回到 frame 0 普通状态
```

如果你的吐司机帧尺寸不是 `64x64`，需要修改：

```text
src/data/devices/registry.ts
toaster_01.frameWidth
toaster_01.frameHeight
```

### 7.1.3 电视动画 spritesheet

放到：

```text
public/assets/devices/tv.png
```

当前代码按这个规格读取：

```text
frameWidth: 128
frameHeight: 128
```

当前图片尺寸为 `896 x 128`，横向排列 7 帧：

```text
frame 0 = 黑屏
frame 1-6 = 播放画面循环
```

交互逻辑：

```text
用户靠近 tv_01 trigger
按 E
如果电视是黑屏 -> 播放 frame 1 到 frame 6 的循环动画
再按 E
如果电视正在播放 -> 停止动画并回到 frame 0 黑屏
```

### 7.2 静态家具 PNG

放到：

```text
public/assets/props/
```

当前地图需要：

```text
window.png
picture.png
shelving.png
kitchen_furniture.png
```

文件名必须和 `src/data/props/registry.ts` 里的 `assetPath` 对上。

### 7.3 玩家 PNG

放到：

```text
public/assets/player/player.png
```

当前玩家按 spritesheet 读取：

```text
frameWidth: 32
frameHeight: 32
```

当前图片尺寸为 `128 x 160`，一共 5 行，每行 4 帧：

```text
frame 0-3   = 正面向下走
frame 4-7   = 向屏幕右下方走
frame 8-11  = 向屏幕右方走
frame 12-15 = 向屏幕右上方走
frame 16-19 = 背面向上走
```

向屏幕左方、左上方、左下方走会复用右侧方向动画，并水平翻转。

如果你的角色帧尺寸不是 `32x32`，需要修改：

```text
src/game/scenes/HomeScene.ts
this.load.spritesheet('player', ...)
```

### 7.4 可选：更多设备动画 spritesheet

当前洗衣机、吐司机和电视已经是 spritesheet。其他设备暂时仍是单张 PNG。

如果你之后希望冰箱开门、音响声波，可以把对应设备从单张图片升级成 spritesheet。

通常需要改：

```text
src/data/devices/registry.ts
src/game/scenes/HomeScene.ts interactWithTrigger()
```

### 7.5 Collision 物理

当前项目使用 Phaser Matter 物理引擎。

```text
src/main.ts
physics.default = matter
```

`OBJ_collision` 中的 polygon 会被转换成 Matter static body，不再使用外接矩形近似。

```text
Tiled OBJ_collision polygon
-> Phaser.Geom.Polygon
-> Matter static body
```

玩家是 Matter sprite，移动时通过 Matter velocity 推动。设备和静态家具本身仍是普通 sprite；它们是否挡路由 `OBJ_collision` 单独决定。

## 8. 添加新设备的流程

1. 在 Tiled 的 `OBJ_interactables` 中画设备矩形。
2. 在对象属性 `config` 中写：

```json
{
  "deviceId": "new_device_01",
  "deviceType": "new_device",
  "displayName": "新设备",
  "spriteKey": "new_device",
  "personaId": "new_device_persona",
  "roomId": "living_room",
  "zoneId": "some_zone"
}
```

3. 在 `OBJ_trigger_zones` 中画靠近区域，并让：

```json
{
  "targetDeviceId": "new_device_01",
  "onEnterEvent": "device_random_greeting",
  "requiresInput": "E"
}
```

4. 把图片放到：

```text
public/assets/devices/new_device.png
```

5. 修改：

```text
src/data/devices/types.ts
src/data/devices/registry.ts
```

6. 新增 prompt：

```text
prompts/devices/new_device_01.md
```

## 9. 添加新静态家具的流程

1. 在 Tiled 的 `OBJ_static_furniture` 中画矩形。
2. 在对象属性 `config` 中写：

```json
{
  "objectRole": "prop",
  "spriteKey": "new_prop"
}
```

3. 把图片放到：

```text
public/assets/props/new_prop.png
```

4. 修改：

```text
src/data/props/registry.ts
```

## 10. 修改地图后的导出流程

在 Tiled 修改完成后：

```text
File -> Export As...
```

导出为：

```text
public/assets/maps/home.tmj
```

然后检查：

```text
1. tileset 名称仍然是 home_background
2. background tileset 图片路径是 ../tilesets/background.png
3. 不再引用 ../../Downloads/...
4. 不再引用不需要的外部 devices.tsx
5. 对象层名称和 src/config/layerNames.ts 对齐
```

## 11. 当前运行状态

已经验证：

```text
npm install
npm run build
```

构建通过。

开发服务器命令：

```bash
npm run dev
```

当前测试地址：

```text
http://127.0.0.1:5173/
```
