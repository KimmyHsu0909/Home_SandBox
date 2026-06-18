import { assetPath } from '../../config/assetPaths'

export type PropDefinition = {
  spriteKey: string
  displayName: string
  assetPath: string
  fallbackColor: number
}

export const props: Record<string, PropDefinition> = {
  window: {
    spriteKey: 'window',
    displayName: '窗户',
    assetPath: assetPath('assets/props/window.png'),
    fallbackColor: 0x93c5fd
  },
  picture: {
    spriteKey: 'picture',
    displayName: '墙画',
    assetPath: assetPath('assets/props/picture.png'),
    fallbackColor: 0xf9a8d4
  },
  shelving: {
    spriteKey: 'shelving',
    displayName: '置物架',
    assetPath: assetPath('assets/props/shelving.png'),
    fallbackColor: 0xa16207
  },
  kitchen_furniture: {
    spriteKey: 'kitchen_furniture',
    displayName: '厨房家具',
    assetPath: assetPath('assets/props/kitchen_furniture.png'),
    fallbackColor: 0x78716c
  }
}

export function getPropBySpriteKey(spriteKey: string) {
  return props[spriteKey]
}
