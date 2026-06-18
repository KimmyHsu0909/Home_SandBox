import fridgePrompt from '../../../prompts/devices/fridge_01.md?raw'
import microwavePrompt from '../../../prompts/devices/microwave_01.md?raw'
import ovenPrompt from '../../../prompts/devices/oven_01.md?raw'
import speakerPrompt from '../../../prompts/devices/speaker_01.md?raw'
import toasterPrompt from '../../../prompts/devices/toaster_01.md?raw'
import tvPrompt from '../../../prompts/devices/tv_01.md?raw'
import washingMachinePrompt from '../../../prompts/devices/washing_machine_01.md?raw'
import type { DeviceId } from './types'

export const devicePrompts: Record<DeviceId, string> = {
  fridge_01: fridgePrompt,
  oven_01: ovenPrompt,
  toaster_01: toasterPrompt,
  washing_machine_01: washingMachinePrompt,
  microwave_01: microwavePrompt,
  tv_01: tvPrompt,
  speaker_01: speakerPrompt
}

