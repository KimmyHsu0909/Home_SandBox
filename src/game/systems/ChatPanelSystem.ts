import type { DeviceDefinition } from '../../data/devices/types'

export type ChatSpeaker = 'user' | 'system' | DeviceDefinition

export type UserChatHandler = (message: string) => void | Promise<void>

export class ChatPanelSystem {
  private readonly root: HTMLElement
  private readonly messages: HTMLDivElement
  private readonly input: HTMLInputElement
  private readonly form: HTMLFormElement
  private onUserMessage?: UserChatHandler

  constructor(devices: DeviceDefinition[]) {
    this.root = document.createElement('aside')
    this.root.className = 'chat-panel'

    const header = document.createElement('div')
    header.className = 'chat-panel__header'
    header.textContent = '设备聊天室'

    this.messages = document.createElement('div')
    this.messages.className = 'chat-panel__messages'

    this.form = document.createElement('form')
    this.form.className = 'chat-panel__form'

    this.input = document.createElement('input')
    this.input.className = 'chat-panel__input'
    this.input.type = 'text'
    this.input.placeholder = '@冰箱 晚上吃什么？'
    this.input.autocomplete = 'off'

    const send = document.createElement('button')
    send.className = 'chat-panel__send'
    send.type = 'submit'
    send.textContent = '发送'

    const hint = document.createElement('div')
    hint.className = 'chat-panel__hint'
    hint.textContent = `可用：${devices.map((device) => `@${device.displayName}`).join(' ')}`

    this.form.append(this.input, send)
    this.root.append(header, this.messages, hint, this.form)
    document.body.append(this.root)

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      const message = this.input.value.trim()
      if (!message) return

      this.input.value = ''
      void this.onUserMessage?.(message)
    })
  }

  destroy() {
    this.root.remove()
  }

  setUserMessageHandler(handler: UserChatHandler) {
    this.onUserMessage = handler
  }

  focusInput() {
    this.input.focus()
  }

  isTyping() {
    return document.activeElement === this.input
  }

  addMessage(speaker: ChatSpeaker, text: string) {
    const item = document.createElement('div')
    item.className = 'chat-message'

    const name = document.createElement('span')
    name.className = 'chat-message__name'
    name.textContent = this.getSpeakerName(speaker)

    const body = document.createElement('span')
    body.className = 'chat-message__body'
    body.textContent = text

    item.append(name, body)
    this.messages.append(item)
    this.messages.scrollTop = this.messages.scrollHeight
  }

  setBusy(isBusy: boolean) {
    this.input.disabled = isBusy
    const button = this.form.querySelector('button')
    if (button) button.toggleAttribute('disabled', isBusy)
  }

  private getSpeakerName(speaker: ChatSpeaker) {
    if (speaker === 'user') return '@用户'
    if (speaker === 'system') return '@系统'
    return `@${speaker.displayName}`
  }
}
