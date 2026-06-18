export type DeviceId =
  | 'fridge_01'
  | 'oven_01'
  | 'toaster_01'
  | 'washing_machine_01'
  | 'microwave_01'
  | 'tv_01'
  | 'speaker_01'

export type DeviceDefinition = {
  deviceId: DeviceId
  deviceType: string
  displayName: string
  spriteKey: string
  assetPath: string
  assetType?: 'image' | 'spritesheet'
  frameWidth?: number
  frameHeight?: number
  promptPath: string
  fallbackColor: number
  initialFrame?: number
  animations?: Record<
    string,
    {
      key: string
      start: number
      end: number
      frameRate: number
      repeat?: number
    }
  >
}
