# Sandbox Project Structure

## Runtime Assets

```text
public/assets/maps/home.tmj
```

运行时使用的 Tiled 地图。根目录的 `map.tmj` 可以作为原始导出备份；项目代码默认读取 `public/assets/maps/home.tmj`。

```text
public/assets/tilesets/background.png
```

地板和墙壁 tileset。Tiled 中 tileset 名称应保持为 `home_background`，否则需要同步修改 `src/config/gameConfig.ts`。

```text
public/assets/devices/*.png
```

交互设备 sprite。设备不再画死在 tile layer，而是从 `OBJ_interactables` 的矩形对象生成。

```text
public/assets/props/*.png
```

静态家具和装饰物 sprite，例如 `window.png`、`picture.png`、`shelving.png`、`kitchen_furniture.png`。这些对象从 `OBJ_static_furniture` 生成。

```text
public/assets/player/player.png
```

玩家图片。没有图片时，代码会生成临时占位图。

## Device Prompts

每台设备的 prompt 放在：

```text
prompts/devices/fridge_01.md
prompts/devices/oven_01.md
prompts/devices/toaster_01.md
prompts/devices/washing_machine_01.md
prompts/devices/microwave_01.md
prompts/devices/tv_01.md
prompts/devices/speaker_01.md
```

后续接 LLM 时，只需要让后端或前端读取对应设备的 `promptPath`。

## Adding A New Device

1. 在 Tiled 的 `OBJ_interactables` 里画设备矩形，`config` 中写 `deviceId`、`deviceType`、`spriteKey`。
2. 在 `OBJ_trigger_zones` 里画靠近区域，`targetDeviceId` 指向该设备。
3. 把设备 png 放到 `public/assets/devices/`。
4. 在 `src/data/devices/registry.ts` 增加设备定义。
5. 在 `prompts/devices/` 增加对应 prompt 文档。

## Adding A Static Prop

1. 在 Tiled 的 `OBJ_static_furniture` 里画矩形。
2. 在对象 `config` 中写 `spriteKey`。
3. 把 png 放到 `public/assets/props/`。
4. 在 `src/data/props/registry.ts` 增加对应定义。

## Updating The Map

从 Tiled 重新导出 `.tmj` 后，覆盖：

```text
public/assets/maps/home.tmj
```

检查 tileset 图片路径应为：

```text
../tilesets/background.png
```

如果 Tiled 重新导出后又出现绝对路径或 `../../Downloads/...`，需要在 Tiled 中修正 tileset image 路径或重新替换。

## Source Map Cleanup Note

根目录原始 `map.tmj` 仍包含一个外部 tileset 引用：

```text
../../game_smarthome/devices.tsx
```

运行用 `public/assets/maps/home.tmj` 已移除这个未使用 tileset。后续如果从 Tiled 重新导出，建议在 Tiled 的 Tilesets 面板中删除未使用 tileset，然后再覆盖运行用地图。这样 Phaser 加载地图时更稳定。
