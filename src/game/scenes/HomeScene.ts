import Phaser from 'phaser'
import { gameConfig } from '../../config/gameConfig'
import { assetPath } from '../../config/assetPaths'
import { layerNames } from '../../config/layerNames'
import { devices, getDeviceBySpriteKey } from '../../data/devices/registry'
import { devicePrompts } from '../../data/devices/prompts'
import type { DeviceDefinition } from '../../data/devices/types'
import { getPropBySpriteKey, props } from '../../data/props/registry'
import { getSpawnPoint, getStaticFurnitureObjects, getTriggerObjects } from '../tiled/mapObjects'
import { getConfigProperty, getObjectConfigValue, type TiledObjectWithProperties } from '../tiled/properties'
import { ChatPanelSystem } from '../systems/ChatPanelSystem'
import { LlmClient, type LlmMessage } from '../systems/LlmClient'
import { PromptSystem } from '../systems/PromptSystem'

type DeviceSprite = Phaser.GameObjects.Sprite & {
  deviceId?: string
}

type TriggerZone = Phaser.GameObjects.Zone

const OBJECT_LAYER_DEPTH_BASE = 1000
const OBJECT_LAYER_DEPTH_STEP = 1000
const PLAYER_MOVE_SPEED = 130 * 0.016
const PLAYER_DEPTH_LAYER = 'OBJ_interactables'

export class HomeScene extends Phaser.Scene {
  private player!: Phaser.Physics.Matter.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private keyE!: Phaser.Input.Keyboard.Key
  private devicesById = new Map<string, DeviceSprite>()
  private activeTrigger?: TriggerZone
  private triggerZones: TriggerZone[] = []
  private promptSystem!: PromptSystem
  private chatPanel!: ChatPanelSystem
  private llmClient!: LlmClient
  private chatHistory: LlmMessage[] = []
  private playerDepthBase = OBJECT_LAYER_DEPTH_BASE

  constructor() {
    super('HomeScene')
  }

  preload() {
    this.load.tilemapTiledJSON(gameConfig.assets.mapKey, gameConfig.assets.mapPath)
    this.load.image(gameConfig.assets.backgroundTilesetKey, gameConfig.assets.backgroundTilesetPath)
    this.load.spritesheet('player', assetPath('assets/player/player.png'), {
      frameWidth: 32,
      frameHeight: 32
    })

    for (const device of Object.values(devices)) {
      if (device.assetType === 'spritesheet') {
        this.load.spritesheet(device.spriteKey, device.assetPath, {
          frameWidth: device.frameWidth ?? 64,
          frameHeight: device.frameHeight ?? 64
        })
      } else {
        this.load.image(device.spriteKey, device.assetPath)
      }
    }

    for (const prop of Object.values(props)) {
      this.load.image(prop.spriteKey, prop.assetPath)
    }
  }

  create() {
    this.promptSystem = new PromptSystem(this)
    this.chatPanel = new ChatPanelSystem(Object.values(devices))
    this.llmClient = new LlmClient()
    this.chatPanel.setUserMessageHandler((message) => this.handleUserChatMessage(message))
    this.chatPanel.addMessage('system', '使用 @设备名 和设备聊天，例如：@冰箱 晚上吃什么？')

    this.ensureFallbackTexture('player', 0x4ade80, 32, 32)
    for (const device of Object.values(devices)) {
      this.ensureFallbackTexture(device.spriteKey, device.fallbackColor, 64, 64)
    }

    this.createAnimations()

    const map = this.make.tilemap({ key: gameConfig.assets.mapKey })
    const backgroundTileset = map.addTilesetImage(
      gameConfig.assets.backgroundTilesetName,
      gameConfig.assets.backgroundTilesetKey
    )

    if (backgroundTileset) {
      this.createTileLayers(map, backgroundTileset)
    }

    this.playerDepthBase = this.getObjectLayerDepthBase(map, PLAYER_DEPTH_LAYER)

    this.createStaticFurniture(map)
    this.createDevices(map)
    this.createPlayer(map)
    this.createCollision(map)
    this.createTriggers(map)

    this.cameras.main.setZoom(gameConfig.camera.zoom)
    this.centerFixedCamera(map)

    this.cursors = this.input.keyboard!.createCursorKeys()
    this.keyE = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E)
  }

  update() {
    this.updatePlayerMovement()
    this.player.setDepth(this.playerDepthBase + this.player.y)
    this.updateTriggerZones()

    if (this.activeTrigger && Phaser.Input.Keyboard.JustDown(this.keyE)) {
      this.interactWithTrigger(this.activeTrigger)
    }
  }

  shutdown() {
    this.chatPanel?.destroy()
  }

  private createTileLayers(map: Phaser.Tilemaps.Tilemap, tileset: Phaser.Tilemaps.Tileset) {
    const isoYShift = this.getStaggeredIsoYShift(map, tileset)

    map.layers.forEach((layerData, index) => {
      map
        .createLayer(layerData.name, tileset, layerData.x, layerData.y + isoYShift)
        ?.setDepth(index)
    })
  }

  private getStaggeredIsoYShift(map: Phaser.Tilemaps.Tilemap, tileset: Phaser.Tilemaps.Tileset) {
    const orientation = map.orientation as unknown as number
    if (orientation !== Phaser.Tilemaps.Orientation.STAGGERED) return 0

    const overhang = tileset.tileHeight - map.tileHeight
    return overhang > 0 ? -overhang : 0
  }

  private getObjectLayerDepthBase(map: Phaser.Tilemaps.Tilemap, layerName: string) {
    const index = map.objects.findIndex((layer) => layer.name === layerName)
    if (index < 0) return OBJECT_LAYER_DEPTH_BASE
    return OBJECT_LAYER_DEPTH_BASE + index * OBJECT_LAYER_DEPTH_STEP
  }

  private createPlayer(map: Phaser.Tilemaps.Tilemap) {
    const spawn = getSpawnPoint(map)
    const x = spawn?.x ?? 160
    const y = spawn?.y ?? 80

    this.player = this.matter.add.sprite(x, y, 'player')
    this.player.setOrigin(0.5, 1)
    this.player.setRectangle(18, 14)
    this.player.setFixedRotation()
    this.player.setFrictionAir(0.18)
  }

  private createAnimations() {
    this.createPlayerAnimation('player-walk-down', 0, 3)
    this.createPlayerAnimation('player-walk-down-right', 4, 7)
    this.createPlayerAnimation('player-walk-right', 8, 11)
    this.createPlayerAnimation('player-walk-up-right', 12, 15)
    this.createPlayerAnimation('player-walk-up', 16, 19)

    for (const device of Object.values(devices)) {
      if (!device.animations) continue

      for (const animation of Object.values(device.animations)) {
        if (this.anims.exists(animation.key)) continue

        this.anims.create({
          key: animation.key,
          frames: this.anims.generateFrameNumbers(device.spriteKey, {
            start: animation.start,
            end: animation.end
          }),
          frameRate: animation.frameRate,
          repeat: animation.repeat ?? 0
        })
      }
    }
  }

  private createPlayerAnimation(key: string, start: number, end: number) {
    if (this.anims.exists(key)) return

    this.anims.create({
      key,
      frames: this.anims.generateFrameNumbers('player', { start, end }),
      frameRate: 8,
      repeat: -1
    })
  }

  private placeObjectSprite(
    object: TiledObjectWithProperties,
    spriteKey: string,
    fallbackColor: number,
    depthBase: number,
    frame?: number
  ) {
    const config = getConfigProperty(object)
    const width = object.width || 64
    const height = object.height || 64
    this.ensureFallbackTexture(spriteKey, fallbackColor, width, height)

    const sprite = this.add.sprite(object.x ?? 0, object.y ?? 0, spriteKey, frame)
    sprite.setOrigin(0, 0)

    if (object.width && object.height) {
      sprite.setDisplaySize(object.width, object.height)
    }

    const zBias = Number(config.zBias ?? 0)
    sprite.setDepth(depthBase + (object.y ?? 0) + (object.height ?? 0) + zBias)
    return sprite
  }

  private createStaticFurniture(map: Phaser.Tilemaps.Tilemap) {
    const depthBase = this.getObjectLayerDepthBase(map, layerNames.staticFurniture)
    for (const object of getStaticFurnitureObjects(map)) {
      const config = getConfigProperty(object)
      const spriteKey = String(config.spriteKey ?? object.name)
      const propDefinition = getPropBySpriteKey(spriteKey)
      this.placeObjectSprite(object, spriteKey, propDefinition?.fallbackColor ?? 0x64748b, depthBase)
    }
  }

  private createDevices(map: Phaser.Tilemaps.Tilemap) {
    for (const layerName of layerNames.interactables) {
      const depthBase = this.getObjectLayerDepthBase(map, layerName)
      const layer = map.getObjectLayer(layerName)
      if (!layer) continue

      for (const object of layer.objects as TiledObjectWithProperties[]) {
        const config = getConfigProperty(object)
        const spriteKey = String(config.spriteKey ?? config.deviceType ?? object.name)
        const deviceDefinition = getDeviceBySpriteKey(spriteKey)
        const deviceId = String(config.deviceId ?? object.name)
        const frame = Number(config.closedFrame ?? deviceDefinition?.initialFrame ?? 0)

        const sprite = this.placeObjectSprite(
          object,
          spriteKey,
          deviceDefinition?.fallbackColor ?? 0x94a3b8,
          depthBase,
          frame
        ) as DeviceSprite

        sprite.deviceId = deviceId
        sprite.setData('config', config)
        sprite.setData('deviceId', deviceId)
        sprite.setData('isOpen', false)

        this.devicesById.set(deviceId, sprite)
      }
    }
  }

  private createCollision(map: Phaser.Tilemaps.Tilemap) {
    const collisionLayer = map.getObjectLayer(layerNames.collision)
    if (!collisionLayer) return

    for (const object of collisionLayer.objects as TiledObjectWithProperties[]) {
      const polygon = this.createObjectPolygon(object)

      if (polygon) {
        this.createMatterCollisionBody(polygon)
      }
    }
  }

  private createTriggers(map: Phaser.Tilemaps.Tilemap) {
    for (const object of getTriggerObjects(map)) {
      const zone = this.add.zone(
        (object.x ?? 0) + (object.width ?? 0) / 2,
        (object.y ?? 0) + (object.height ?? 0) / 2,
        object.width ?? 32,
        object.height ?? 32
      ) as TriggerZone

      zone.setData('config', getConfigProperty(object))
      zone.setData('object', object)
      zone.setData('playerInside', false)
      zone.setData('hasGreeted', false)
      this.triggerZones.push(zone)
    }
  }

  private handleTriggerOverlap(zone: TriggerZone) {
    const object = zone.getData('object') as TiledObjectWithProperties
    if (!this.isPlayerInsideTrigger(object)) return

    this.activeTrigger = zone

    const promptText = getObjectConfigValue<string>(object, 'promptText', '按 E 互动')
    this.promptSystem.show(promptText ?? '按 E 互动')

    if (zone.getData('playerInside')) return

    zone.setData('playerInside', true)
    this.maybeGreet(zone)
  }

  private updateTriggerZones() {
    const nextActiveTrigger = this.triggerZones.find((zone) => {
      const object = zone.getData('object') as TiledObjectWithProperties
      return this.isPlayerInsideTrigger(object)
    })

    if (nextActiveTrigger) {
      this.handleTriggerOverlap(nextActiveTrigger)
    }

    if (!this.activeTrigger) {
      this.promptSystem.hide()
      return
    }

    const object = this.activeTrigger.getData('object') as TiledObjectWithProperties
    if (this.isPlayerInsideTrigger(object)) return

    this.activeTrigger.setData('playerInside', false)
    this.activeTrigger = undefined
    this.promptSystem.hide()
  }

  private maybeGreet(zone: TriggerZone) {
    const object = zone.getData('object') as TiledObjectWithProperties
    const greetingEnabled = getObjectConfigValue<boolean>(object, 'greetingEnabled', true)
    if (!greetingEnabled) return

    if (zone.getData('hasGreeted')) return

    const chance = getObjectConfigValue<number>(object, 'greetingChance', 0.5) ?? 0.5
    if (Math.random() > chance) return

    zone.setData('hasGreeted', true)

    const deviceId = getObjectConfigValue<string>(object, 'targetDeviceId')
    const device = deviceId ? this.devicesById.get(deviceId) : undefined
    if (!device || !deviceId) return

    void this.generateDeviceMessage(deviceId, 'greeting')
  }

  private interactWithTrigger(zone: TriggerZone) {
    const object = zone.getData('object') as TiledObjectWithProperties
    const deviceId = getObjectConfigValue<string>(object, 'targetDeviceId')
    if (!deviceId) return

    const device = this.devicesById.get(deviceId)
    if (!device) return

    const action = getObjectConfigValue<string>(object, 'interactionAction', 'talk_or_open_controls')

    if (deviceId === 'fridge_01' && action === 'open_or_talk') {
      const isOpen = Boolean(device.getData('isOpen'))
      device.setData('isOpen', !isOpen)
      void this.generateDeviceMessage(deviceId, 'interaction', isOpen ? '用户关上了冰箱门。' : '用户打开了冰箱门。')
      return
    }

    if (deviceId === 'washing_machine_01') {
      const isOpen = Boolean(device.getData('isOpen'))
      device.setData('isOpen', !isOpen)
      device.play(isOpen ? 'washing-machine-close-door' : 'washing-machine-open-door')
      void this.generateDeviceMessage(deviceId, 'interaction', isOpen ? '用户关上了洗衣机门。' : '用户打开了洗衣机门。')
      return
    }

    if (deviceId === 'toaster_01') {
      const isPopped = Boolean(device.getData('isPopped'))
      device.setData('isPopped', !isPopped)

      if (isPopped) {
        device.stop()
        device.setFrame(0)
        void this.generateDeviceMessage(deviceId, 'interaction', '用户让吐司机回到普通状态。')
        return
      }

      device.play('toaster-pop-toast')
      void this.generateDeviceMessage(deviceId, 'interaction', '用户让吐司机弹出面包。')
      return
    }

    if (deviceId === 'tv_01') {
      const isOn = Boolean(device.getData('isOn'))
      device.setData('isOn', !isOn)

      if (isOn) {
        device.stop()
        device.setFrame(0)
        void this.generateDeviceMessage(deviceId, 'interaction', '用户关闭了电视。')
        return
      }

      device.play('tv-play-screen')
      void this.generateDeviceMessage(deviceId, 'interaction', '用户打开了电视。')
      return
    }

    void this.generateDeviceMessage(deviceId, 'interaction')
  }

  private updatePlayerMovement() {
    let dirX = 0
    let dirY = 0

    if (this.cursors.left?.isDown) dirX -= 1
    if (this.cursors.right?.isDown) dirX += 1
    if (this.cursors.up?.isDown) dirY -= 1
    if (this.cursors.down?.isDown) dirY += 1

    if (this.chatPanel.isTyping()) {
      dirX = 0
      dirY = 0
    }

    if (dirX === 0 && dirY === 0) {
      this.player.setVelocity(0, 0)
      this.player.anims.stop()
      this.player.setFrame(0)
      return
    }

    const vector = new Phaser.Math.Vector2(dirX, dirY).normalize()
    this.player.setVelocity(vector.x * PLAYER_MOVE_SPEED, vector.y * PLAYER_MOVE_SPEED)
    this.player.setFlipX(dirX < 0)

    if (dirX !== 0 && dirY > 0) {
      this.player.anims.play('player-walk-down-right', true)
      return
    }

    if (dirX !== 0 && dirY < 0) {
      this.player.anims.play('player-walk-up-right', true)
      return
    }

    if (dirX !== 0) {
      this.player.anims.play('player-walk-right', true)
      return
    }

    this.player.anims.play(dirY < 0 ? 'player-walk-up' : 'player-walk-down', true)
  }

  private isPlayerInsideTrigger(object: TiledObjectWithProperties) {
    const shapeType = getObjectConfigValue<string>(object, 'shapeType', object.ellipse ? 'ellipse' : 'rectangle')

    if (shapeType === 'ellipse' || object.ellipse) {
      const cx = (object.x ?? 0) + (object.width ?? 0) / 2
      const cy = (object.y ?? 0) + (object.height ?? 0) / 2
      const rx = Math.max((object.width ?? 1) / 2, 1)
      const ry = Math.max((object.height ?? 1) / 2, 1)
      const dx = this.player.x - cx
      const dy = this.player.y - cy

      return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1
    }

    return Phaser.Geom.Rectangle.Contains(
      new Phaser.Geom.Rectangle(object.x ?? 0, object.y ?? 0, object.width ?? 0, object.height ?? 0),
      this.player.x,
      this.player.y
    )
  }

  private createObjectPolygon(object: TiledObjectWithProperties) {
    if (object.polygon?.length) {
      return new Phaser.Geom.Polygon(
        object.polygon.map((point) => ({
          x: (object.x ?? 0) + point.x,
          y: (object.y ?? 0) + point.y
        }))
      )
    }

    if (object.width && object.height) {
      const x = object.x ?? 0
      const y = object.y ?? 0
      const width = object.width
      const height = object.height

      return new Phaser.Geom.Polygon([
        { x, y },
        { x: x + width, y },
        { x: x + width, y: y + height },
        { x, y: y + height }
      ])
    }

    return undefined
  }

  private createMatterCollisionBody(polygon: Phaser.Geom.Polygon) {
    const bounds = Phaser.Geom.Polygon.GetAABB(polygon)
    const centerX = bounds.centerX
    const centerY = bounds.centerY
    const vertices = polygon.points.map((point) => ({
      x: point.x - centerX,
      y: point.y - centerY
    }))

    this.matter.add.fromVertices(
      centerX,
      centerY,
      vertices,
      {
        isStatic: true,
        label: 'tiled_collision'
      },
      true
    )
  }

  private ensureFallbackTexture(key: string, color: number, width: number, height: number) {
    if (this.textures.exists(key)) return

    const graphics = this.make.graphics({ x: 0, y: 0 }, false)
    graphics.fillStyle(color, 1)
    graphics.fillRoundedRect(0, 0, width, height, 6)
    graphics.lineStyle(2, 0xffffff, 0.8)
    graphics.strokeRoundedRect(1, 1, width - 2, height - 2, 6)
    graphics.generateTexture(key, width, height)
    graphics.destroy()
  }

  private centerFixedCamera(map: Phaser.Tilemaps.Tilemap) {
    const bounds = this.getSceneBounds(map)
    this.cameras.main.centerOn(bounds.centerX, bounds.centerY)
  }

  private getSceneBounds(map: Phaser.Tilemaps.Tilemap) {
    const points: Phaser.Types.Math.Vector2Like[] = []

    for (const objectLayer of map.objects) {
      for (const object of objectLayer.objects as TiledObjectWithProperties[]) {
        if (object.polygon?.length) {
          for (const point of object.polygon) {
            points.push({ x: (object.x ?? 0) + point.x, y: (object.y ?? 0) + point.y })
          }
        } else {
          points.push({ x: object.x ?? 0, y: object.y ?? 0 })
          points.push({
            x: (object.x ?? 0) + (object.width ?? 0),
            y: (object.y ?? 0) + (object.height ?? 0)
          })
        }
      }
    }

    if (!points.length) {
      return new Phaser.Geom.Rectangle(0, 0, this.scale.width, this.scale.height)
    }

    const xs = points.map((point) => point.x)
    const ys = points.map((point) => point.y)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    return new Phaser.Geom.Rectangle(minX, minY, maxX - minX, maxY - minY)
  }

  private async handleUserChatMessage(message: string) {
    this.chatPanel.addMessage('user', message)
    this.chatHistory.push({ role: 'user', content: message })

    const device = this.resolveMentionedDevice(message)
    if (!device) {
      this.chatPanel.addMessage('system', '请用 @设备名 指定设备，例如 @冰箱 或 @电视。')
      return
    }

    await this.generateDeviceMessage(device.deviceId, 'chat', message)
  }

  private resolveMentionedDevice(message: string): DeviceDefinition | undefined {
    const normalized = message.trim().toLowerCase()

    return Object.values(devices).find((device) => {
      const names = [
        `@${device.displayName}`.toLowerCase(),
        `@${device.deviceId}`.toLowerCase(),
        `@${device.deviceType}`.toLowerCase()
      ]

      return names.some((name) => normalized.startsWith(name))
    })
  }

  private async generateDeviceMessage(
    deviceId: string,
    eventType: 'greeting' | 'chat' | 'interaction',
    userMessage?: string
  ) {
    const device = devices[deviceId as keyof typeof devices]
    if (!device) return

    const response = await this.llmClient.generateDeviceReply({
      device,
      prompt: devicePrompts[device.deviceId],
      eventType,
      userMessage,
      history: this.chatHistory,
      context: {
        timeOfDay: new Date().toLocaleTimeString(),
        deviceId,
        deviceType: device.deviceType
      }
    })

    this.chatPanel.addMessage(device, response)
    this.chatHistory.push({ role: 'assistant', content: `@${device.displayName} ${response}` })
  }
}
