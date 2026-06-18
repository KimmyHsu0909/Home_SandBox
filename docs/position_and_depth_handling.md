# 位置与遮挡处理规范

> 这份文档是给后续接手本项目的 AI / 开发者用的"硬性约定"。地图基础约定一旦改动（尤其是 Tiled 朝向、tileset/map 的 tile 尺寸、infinite 模式）都会同时影响位置和遮挡两套逻辑。改之前先读完整篇。

## 0. 项目基础事实

- **Phaser 版本**：3.90.0
- **地图朝向**：`staggered`，`staggeraxis=y`，`staggerindex=odd`
- **地图 tile 尺寸**：`tilewidth=64`，`tileheight=32`（即每个逻辑格半高）
- **tileset 图片 tile 尺寸**：`tilewidth=64`，`tileheight=64`（图比格高一倍——iso 常见做法）
- **`infinite`**：必须保持 `false`。详见 §3.1。
- **物理引擎**：Matter（`src/main.ts`）

所有位置 / 深度约定都依赖以上前提。如果哪天换了朝向或 tile 尺寸，§2 和 §4.1 里的常量需要重算。

---

## 1. 三套坐标系，必须分清

| 坐标系 | 谁在用 | 单位 | 原点 |
|---|---|---|---|
| Tiled 世界像素 | Tiled 编辑器视图、所有对象层的 `x/y/width/height`、瓦片层的 `offsetx/offsety` | 像素 | Tiled "地图原点"（瓦片 (0,0) 的左上角） |
| Phaser 世界 | `add.sprite` 的 `(x,y)`、相机、物理体、深度值 | 像素 | 默认 (0,0) |
| 瓦片坐标 | `map.layers[*].data`、`Tile.x/y`（列、行） | 格 | 瓦片 (0,0) |

**核心规则**：所有"摆东西"的代码都直接用 Tiled 世界像素坐标，不做任何手动转换。Phaser 世界与 Tiled 世界**默认对齐**——前提是 §2 的 staggered iso 修正已套上。

---

## 2. 位置对齐（Position）

### 2.1 staggered iso 的 Y 偏移修正（**必读**）

**问题**：Phaser 3.90 的 staggered 瓦片渲染器把瓦片图片的**左上角**放在单元格的 `(pixelX, pixelY)`；但 Tiled 的视图是把瓦片图片的**左下角**贴到单元格的左下角。当 `tileset.tileHeight > map.tileHeight` 时，两者就差 `tileset.tileHeight - map.tileHeight` 像素——地板和墙整体在 Phaser 里比 Tiled 视图低这么多，而对象层 sprite 用绝对像素坐标不动，视觉上就是"家具悬在地面上方"。

**佐证**（Phaser 源码）：
- `node_modules/phaser/src/tilemaps/Tile.js:787-788` — staggered 单元格 `pixelX/pixelY` 的计算
- `node_modules/phaser/src/tilemaps/TilemapLayerWebGLRenderer.js:88-99` — 实际绘制时把图片左上角放在 `(pixelX, pixelY)`，没有做 Tiled 的"左下对齐"补偿
- `node_modules/phaser/src/tilemaps/Tile.js:464-466` — Phaser 自己的注释也承认 Tiled 用 bottom-left 锚点

**修法**（`src/game/scenes/HomeScene.ts:107-123`）：

```ts
private createTileLayers(map, tileset) {
  const isoYShift = this.getStaggeredIsoYShift(map, tileset)
  map.layers.forEach((layerData, index) => {
    map
      .createLayer(layerData.name, tileset, layerData.x, layerData.y + isoYShift)
      ?.setDepth(index)
  })
}

private getStaggeredIsoYShift(map, tileset) {
  const orientation = map.orientation as unknown as number
  if (orientation !== Phaser.Tilemaps.Orientation.STAGGERED) return 0
  const overhang = tileset.tileHeight - map.tileHeight
  return overhang > 0 ? -overhang : 0
}
```

**注意**：
- 只对 `STAGGERED` 朝向生效；改成 `ORTHOGONAL` / `ISOMETRIC` 时这一段会自动返回 0，但你要先验证那两种朝向 Phaser 是否也存在同样问题。
- `tileset.tileHeight - map.tileHeight` 在当前数据下是 `64 - 32 = 32`，所以瓦片层全体上移 32 像素。换尺寸时这个数会变。
- 不要把这套逻辑挪进对象 sprite——对象层无此 bug，挪了就会把对象也偏移走。

### 2.2 图层 `offsetx`/`offsety` 不需要手动处理

Phaser 的 Tiled 解析器在 `ParseTileLayers.js:222-223` 已经把每层的 `offsetx/offsety` 折进 `layerData.x/y`：

```js
x: (curGroupState.x + GetFastValue(curl, 'offsetx', 0) + curl.x),
y: (curGroupState.y + GetFastValue(curl, 'offsety', 0) + curl.y),
```

而 `Tilemap.createLayer` 在不传 `x/y` 时默认采用 `layerData.x/y`（`Tilemap.js:594-640`）。所以：

- **正确**：`createLayer(name, tileset, layerData.x, layerData.y + isoYShift)` —— 在已经折好的基础上再叠 iso 修正。
- **错误**：`createLayer(name, tileset, layerData.offsetX ?? 0, layerData.offsetY ?? 0)` —— `layerData` 没有 `offsetX/Y` 字段，`?? 0` 会把已折算好的 `layerData.x/y` 清零，墙体反而错位。

### 2.3 对象 sprite 的摆放约定

**位置约定**（`src/game/scenes/HomeScene.ts:180-202`）：

```ts
const sprite = this.add.sprite(object.x, object.y, spriteKey, frame)
sprite.setOrigin(0, 0)
if (object.width && object.height) {
  sprite.setDisplaySize(object.width, object.height)
}
```

含义：
- **Sprite 锚点 = 左上角**，与 Tiled 对象矩形的 `(x, y)` 完全对齐。
- **拉伸到矩形尺寸**：用 `setDisplaySize` 让 sprite 视觉大小 = Tiled 矩形大小。

**前提（必须满足）**：PNG 的尺寸 = Tiled 矩形的尺寸。比如 `kitchen_furniture.png` 是 256×256，那 Tiled 里画的矩形也是 ≈256×256。

这套约定下，"在 Tiled 里看到的位置 = 游戏里看到的位置"。如果哪一天美术给的 PNG 跟矩形大小不对应，要么改 PNG 尺寸、要么改矩形尺寸——**不要**在代码里手动缩放、平移单个 sprite，那样会让维护性崩。

### 2.4 `infinite` 必须保持 `false`

**为什么**：infinite 模式下，瓦片层会变成 chunk 数组，且 chunk 的 `startx/starty` 可能是负数。Phaser 对负坐标 chunk 的渲染原点处理与 Tiled 不一致（视情况会整体平移上千像素），但对象层坐标仍是绝对像素——结果就是地板整个跑到一边、对象留在原地、根本对不上。

**怎么保证**：在 Tiled 里 `Map → Map Properties` 把 `Infinite` 取消勾选；导出 `map.tmj` 之后看 JSON 顶层 `"infinite": false`。

### 2.5 玩家、碰撞体、触发器的位置

- **Spawn point**（`HomeScene.ts:125-135`）：直接读 Tiled `OBJ_spawn_points` 里 point 对象的 `x/y`，作为 Matter sprite 的位置。`setOrigin(0.5, 1)` —— 锚点放在脚下，方便后面用 `player.y` 做深度排序。
- **Collision polygon**（`HomeScene.ts:448-473`）：Tiled `OBJ_collision` 多边形的顶点是相对对象 `(x, y)` 的偏移，要 `point.x + object.x` 转成世界坐标，然后扔进 Matter 静态体。绝对不要近似成 AABB。
- **Trigger zone**（`HomeScene.ts:252-267`）：用对象矩形的中心点建 `Phaser.GameObjects.Zone`。命中检测自己用 `isPlayerInsideTrigger` 做（支持椭圆和矩形），不依赖 Phaser overlap。

---

## 3. 深度 / 遮挡（Depth / Occlusion）

### 3.1 三层架构

游戏里所有可见物按以下顺序绘制：

```
0 ~ N                                  瓦片层（floor / walls）
  ↓
1000 + idx0 * 1000 + (y+h) [+ zBias]   对象层第 0 个
  ↓
1000 + idx1 * 1000 + (y+h) [+ zBias]   对象层第 1 个
  ↓
...
```

具体到当前地图（Tiled 对象层 JSON 顺序见 `public/assets/maps/home.tmj`）：

| 对象层名 | `map.objects` 索引 | depth base | 含视觉对象？ |
|---|---|---|---|
| `OBJ_interactables_02` | 0 | 1000 | 是（烤炉） |
| `OBJ_static_furniture` | 1 | 2000 | 是（窗 / 画 / 货架 / 厨房橱柜） |
| `OBJ_spawn_points` | 2 | 3000 | 否 |
| `OBJ_collision` | 3 | 4000 | 否 |
| `OBJ_interactables` | 4 | 5000 | 是（冰箱 / 微波炉 / 面包机 / TV / 音响 / 洗衣机） |
| `OBJ_trigger_zones` | 5 | 6000 | 否 |
| `OBJ_semantic_zones` | 6 | 7000 | 否 |

含义：**Tiled 对象层的顺序就是渲染的前后顺序**——上面表的索引越大，渲染越靠前。

### 3.2 深度计算方式

**瓦片层**（`HomeScene.ts:113`）：

```ts
layer.setDepth(index)   // index = map.layers 中的下标，0..6
```

floor 是 0、leftwall03 是 6。最深的瓦片层（depth=6）永远在最浅的对象层（depth≈1000+）之下——不会被瓦片层挡住任何对象 sprite。

**对象 sprite**（`HomeScene.ts:180-202`）：

```ts
const zBias = Number(config.zBias ?? 0)
sprite.setDepth(depthBase + (object.y + object.height) + zBias)
```

`depthBase` 是 §3.1 那张表里的 base，按对象所在 Tiled 层算出来，由 `getObjectLayerDepthBase` 提供（`HomeScene.ts:125-129`）：

```ts
private getObjectLayerDepthBase(map, layerName) {
  const index = map.objects.findIndex((layer) => layer.name === layerName)
  if (index < 0) return OBJECT_LAYER_DEPTH_BASE
  return OBJECT_LAYER_DEPTH_BASE + index * OBJECT_LAYER_DEPTH_STEP
}
```

**层内排序**用 `y + height`，意味着"前底（脚印）更靠下"的对象画在更靠前。这是 iso 走路里看着最自然的关系。

**玩家**（`HomeScene.ts:82, 99`）：

```ts
// create():
this.playerDepthBase = this.getObjectLayerDepthBase(map, PLAYER_DEPTH_LAYER)
// 'OBJ_interactables' → depthBase = 5000

// update():
this.player.setDepth(this.playerDepthBase + this.player.y)
```

玩家挂在 `OBJ_interactables` 那一档（5000），每帧按自己的 `y` 实时排序——所以玩家会和冰箱、微波炉、面包机等设备**互相穿插遮挡**，玩家走到它们前面 → 挡住；走到后面 → 被挡。这正是想要的 iso 行走观感。

> 为什么 `player.y` 就是脚？因为玩家 `setOrigin(0.5, 1)`（`HomeScene.ts:131`），原点在脚下，`player.y` 已经是"脚印 y"，不用再加 `height`。

### 3.3 单对象逃生口：`zBias`

如果某个具体对象想偏离它所在层的默认顺序（罕见、但偶尔有用），在 Tiled 里给那个对象的 `config` JSON 加一个数字 `zBias`：

```json
{
  "deviceId": "microwave_01",
  "deviceType": "microwave",
  "zBias": 50
}
```

正值→更靠前，负值→更靠后。由 `placeObjectSprite` 自动读取（`HomeScene.ts:199-200`）。

**先决条件**：用之前先想清楚为什么不能靠"调整 Tiled 对象层顺序"解决。如果 80% 的对象都需要 `zBias`，说明应该重新设计对象层划分。`zBias` 是逃生口、不是常规手段。

---

## 4. 常量与可调参数

集中在 `src/game/scenes/HomeScene.ts:17-20`：

```ts
const OBJECT_LAYER_DEPTH_BASE = 1000   // 对象层起始深度
const OBJECT_LAYER_DEPTH_STEP = 1000   // 每层间距
const PLAYER_MOVE_SPEED = 130 * 0.016  // Matter 速度（约 2.08 单位/步）
const PLAYER_DEPTH_LAYER = 'OBJ_interactables'  // 玩家挂在哪一层 y-sort
```

调整这几个时要注意：
- `OBJECT_LAYER_DEPTH_STEP = 1000` 意味着同层内对象的 `y+h` 必须落在 (0, 1000) 范围内——当前地图最大 `y+h ≈ 260`，留足余量。如果以后地图变大让 `y+h > 1000`，相邻层的深度区间会重叠，需要调大 `STEP`。
- `PLAYER_DEPTH_LAYER` 改成别的层名，玩家就会跟那一层的对象 y-sort。如果想让玩家"永远在所有设备前"，可以挂到一个比 OBJ_interactables 更靠后的层（或者直接给一个超大的 depth）。

---

## 5. 常见场景食谱

### 5.1 "我想让 A 永远画在 B 前面"

判断 A 和 B 当前在哪两个 Tiled 对象层：

- **不同层 + 顺序已经对**：什么都不用做。
- **不同层 + 顺序反了**：在 Tiled 里把 A 所在的对象层拖到 B 所在层的**上面**（Tiled 面板从上往下 = 从前往后），导出。代码会自动重算 depth base。
- **同一层**：要么把 A 拆到另一个更靠前的对象层；要么给 A 加 `"zBias": 正数`。

### 5.2 "我想加一个新的对象层（比如天花板灯具）"

1. 在 Tiled 里新建对象层，按你想要的前后顺序放到对象层列表里。
2. 把层名加到 `src/config/layerNames.ts`。
3. 在 `HomeScene.create()` 里加一个 `createXxx(map)`，内部用 `getObjectLayerDepthBase(map, layerName)` 取 depth base、循环调用 `placeObjectSprite(...)`。
4. 如果这个层里有玩家可交互的设备，把层名加到 `layerNames.interactables` 数组里，`createDevices` 会自动遍历。

### 5.3 "我想让某台设备临时画在橱柜前面"

`config` 里加 `"zBias": 3000`（够大，能把它顶过 `OBJ_static_furniture` 整一档）。

但如果是**总是**要在橱柜前，把它从 `OBJ_interactables_02` 挪到 `OBJ_interactables`，不要堆 `zBias`。

### 5.4 "我想让玩家被某个家具永远挡住（比如墙后小角落）"

玩家深度按 `playerDepthBase + player.y` 算。要让玩家被挡住：
- **正确做法**：把那个家具挪到比玩家更靠前的对象层（深度 base 比 5000 大），玩家就一定在它之后画。
- **错误做法**：在代码里 hardcode 玩家深度上限。

### 5.5 "我想让某面墙挡住前面的对象"

瓦片层永远在对象层之下。**做不到**靠瓦片层来挡对象。解决方案：把那面"挡前面的墙"做成对象层里的 prop（一张 PNG），按 §5.1 的方法挂到合适的对象层。

---

## 6. 已知雷区（不要再踩）

1. **不要重新开 `infinite`**。§2.4。
2. **不要给 `createLayer` 传 `layerData.offsetX ?? 0`**——Phaser 已经折好了，这样传等于清零。§2.2。
3. **不要在对象 sprite 里手动加 staggered iso 偏移**——那是瓦片层独有的 Phaser 行为，对象层没这个问题。§2.1。
4. **不要靠 `y + height` 单一公式解决跨层级遮挡**。"一个家具的矩形把另一个家具的矩形包住"这种场景下 `y + height` 必然让大矩形画在小矩形之上。这就是为什么要引入对象层分级。§3.1-3.2。
5. **不要因为某个 PNG 视觉脚印不在 PNG 最底边就以为是"漂浮 bug"**——只要 PNG 尺寸 = Tiled 矩形尺寸，就是设计问题而不是代码问题，去裁 PNG 或挪 Tiled 矩形。§2.3。
6. **不要把瓦片层的深度搞得跟对象层混在一起**。`setDepth(index)` 里 index 是 0..6，远小于 1000，是有意的隔离。
7. **改了 `tilewidth/tileheight` 或换了 tileset 后**，§2.1 的偏移会变。重新算 `tileset.tileHeight - map.tileHeight` 并验证视觉对齐。

---

## 7. 调试技巧

- 想确认某个对象的实际深度：`sprite.depth` 直接打印。
- 想可视化所有对象的矩形：`gameConfig.debug.drawObjectBounds = true`（目前这个开关还没接线，需要时再实现）。
- Phaser 的物理 debug：`gameConfig.debug.physics = true`，能看到 Matter 静态体的多边形——验证 §2.5 中"碰撞多边形位置 = 视觉位置"。
- 想确认地图层顺序：在 `npm run dev` 启动后用 `python3` 跑一行 JSON 读取（参考之前对话里 `print('  [{i}] {l[type]:15s} {l[name]}')` 的写法）。

---

## 8. 修改本文档的时机

下列改动**必须**同步更新本文档：

- `src/game/scenes/HomeScene.ts` 里 §3.2 / §2.1 那几段函数的行号或语义变了。
- `src/config/layerNames.ts` 增删了对象层。
- Tiled 里对象层的顺序变了（§3.1 的表要重画）。
- Phaser 版本升级且涉及 tilemap 渲染（§2.1 的源码引用可能失效）。
- 改了 `infinite`、`orientation`、`tileset` 任何一个基础设置。
