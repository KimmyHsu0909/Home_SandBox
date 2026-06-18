import { layerNames } from '../../config/layerNames'
import { getObjectConfigValue, type TiledObjectWithProperties } from './properties'

export function getObjectLayersByName(map: Phaser.Tilemaps.Tilemap, names: readonly string[]) {
  return names.map((name) => map.getObjectLayer(name)).filter((layer): layer is Phaser.Tilemaps.ObjectLayer => Boolean(layer))
}

export function getInteractableObjects(map: Phaser.Tilemaps.Tilemap) {
  return getObjectLayersByName(map, layerNames.interactables).flatMap((layer) => layer.objects as TiledObjectWithProperties[])
}

export function getStaticFurnitureObjects(map: Phaser.Tilemaps.Tilemap) {
  return (map.getObjectLayer(layerNames.staticFurniture)?.objects ?? []) as TiledObjectWithProperties[]
}

export function getSpawnPoint(map: Phaser.Tilemaps.Tilemap, spawnId = 'player_default') {
  const objects = (map.getObjectLayer(layerNames.spawnPoints)?.objects ?? []) as TiledObjectWithProperties[]

  return objects.find((object) => {
    return getObjectConfigValue<string>(object, 'spawnId') === spawnId || object.name === spawnId
  })
}

export function getTriggerObjects(map: Phaser.Tilemaps.Tilemap) {
  return (map.getObjectLayer(layerNames.triggerZones)?.objects ?? []) as TiledObjectWithProperties[]
}

