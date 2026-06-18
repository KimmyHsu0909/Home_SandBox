export type TiledProperty = {
  name: string
  type?: string
  value: unknown
}

export type TiledObjectWithProperties = Phaser.Types.Tilemaps.TiledObject & {
  ellipse?: boolean
  properties?: TiledProperty[]
}

export function getProperty<T = unknown>(object: TiledObjectWithProperties, name: string): T | undefined {
  return object.properties?.find((property: TiledProperty) => property.name === name)?.value as T | undefined
}

export function getConfigProperty(object: TiledObjectWithProperties): Record<string, unknown> {
  const raw = getProperty<string>(object, 'config')

  if (!raw) return {}

  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch (error) {
    console.warn(`Invalid config JSON on Tiled object "${object.name}"`, error)
    return {}
  }
}

export function getObjectConfigValue<T = unknown>(
  object: TiledObjectWithProperties,
  key: string,
  fallback?: T
): T | undefined {
  const direct = getProperty<T>(object, key)
  if (direct !== undefined) return direct

  const config = getConfigProperty(object)
  if (config[key] !== undefined) return config[key] as T

  return fallback
}

export function getObjectId(object: TiledObjectWithProperties, fallbackPrefix: string) {
  return (
    getObjectConfigValue<string>(object, 'deviceId') ??
    getObjectConfigValue<string>(object, 'triggerId') ??
    getObjectConfigValue<string>(object, 'zoneId') ??
    object.name ??
    `${fallbackPrefix}_${object.id}`
  )
}
