import type { DeviceDefinition, DeviceId } from './types'
import { assetPath } from '../../config/assetPaths'

export const devices: Record<DeviceId, DeviceDefinition> = {
  fridge_01: {
    deviceId: 'fridge_01',
    deviceType: 'fridge',
    displayName: '冰箱',
    spriteKey: 'fridge',
    assetPath: assetPath('assets/devices/fridge.png'),
    promptPath: assetPath('prompts/devices/fridge_01.md'),
    fallbackColor: 0x8ed1fc
  },
  oven_01: {
    deviceId: 'oven_01',
    deviceType: 'oven',
    displayName: '烤炉',
    spriteKey: 'oven',
    assetPath: assetPath('assets/devices/oven.png'),
    promptPath: assetPath('prompts/devices/oven_01.md'),
    fallbackColor: 0xf28c28
  },
  toaster_01: {
    deviceId: 'toaster_01',
    deviceType: 'toaster',
    displayName: '面包机',
    spriteKey: 'toaster',
    assetPath: assetPath('assets/devices/toaster.png'),
    assetType: 'spritesheet',
    frameWidth: 64,
    frameHeight: 64,
    promptPath: assetPath('prompts/devices/toaster_01.md'),
    fallbackColor: 0xf4c542,
    initialFrame: 0,
    animations: {
      popToast: {
        key: 'toaster-pop-toast',
        start: 0,
        end: 3,
        frameRate: 10,
        repeat: 0
      }
    }
  },
  washing_machine_01: {
    deviceId: 'washing_machine_01',
    deviceType: 'washing_machine',
    displayName: '洗衣机',
    spriteKey: 'washing_machine',
    assetPath: assetPath('assets/devices/washing_machine.png'),
    assetType: 'spritesheet',
    frameWidth: 128,
    frameHeight: 128,
    promptPath: assetPath('prompts/devices/washing_machine_01.md'),
    fallbackColor: 0x7aa7ff,
    initialFrame: 0,
    animations: {
      openDoor: {
        key: 'washing-machine-open-door',
        start: 0,
        end: 1,
        frameRate: 8,
        repeat: 0
      },
      closeDoor: {
        key: 'washing-machine-close-door',
        start: 1,
        end: 0,
        frameRate: 8,
        repeat: 0
      }
    }
  },
  microwave_01: {
    deviceId: 'microwave_01',
    deviceType: 'microwave',
    displayName: '微波炉',
    spriteKey: 'microwave',
    assetPath: assetPath('assets/devices/microwave.png'),
    promptPath: assetPath('prompts/devices/microwave_01.md'),
    fallbackColor: 0xb7b7b7
  },
  tv_01: {
    deviceId: 'tv_01',
    deviceType: 'tv',
    displayName: '电视',
    spriteKey: 'tv',
    assetPath: assetPath('assets/devices/tv.png'),
    assetType: 'spritesheet',
    frameWidth: 128,
    frameHeight: 128,
    promptPath: assetPath('prompts/devices/tv_01.md'),
    fallbackColor: 0x2f3542,
    initialFrame: 0,
    animations: {
      playScreen: {
        key: 'tv-play-screen',
        start: 1,
        end: 6,
        frameRate: 6,
        repeat: -1
      }
    }
  },
  speaker_01: {
    deviceId: 'speaker_01',
    deviceType: 'speaker',
    displayName: '音响',
    spriteKey: 'speaker',
    assetPath: assetPath('assets/devices/speaker.png'),
    promptPath: assetPath('prompts/devices/speaker_01.md'),
    fallbackColor: 0x9b59b6
  }
}

export function getDeviceBySpriteKey(spriteKey: string) {
  return Object.values(devices).find((device) => device.spriteKey === spriteKey)
}
