import Phaser from 'phaser'
import { gameConfig } from './config/gameConfig'
import { HomeScene } from './game/scenes/HomeScene'
import './styles.css'

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  width: gameConfig.viewport.width,
  height: gameConfig.viewport.height,
  backgroundColor: '#d8d0bf',
  pixelArt: false,
  roundPixels: true,
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 0
      },
      debug: gameConfig.debug.physics
    }
  },
  scene: [HomeScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
})
