import { assetPath } from './assetPaths'

export const gameConfig = {
  viewport: {
    width: 1280,
    height: 720
  },
  camera: {
    zoom: 1.75
  },
  assets: {
    mapKey: 'home',
    mapPath: assetPath('assets/maps/home.tmj'),
    backgroundTilesetName: 'home_background',
    backgroundTilesetKey: 'home_background',
    backgroundTilesetPath: assetPath('assets/tilesets/background.png')
  },
  debug: {
    physics: false,
    drawObjectBounds: false
  }
} as const
