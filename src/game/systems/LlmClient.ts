import { llmConfig } from '../../config/llmConfig'
import type { DeviceDefinition } from '../../data/devices/types'

export type LlmMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type DeviceLlmRequest = {
  device: DeviceDefinition
  prompt: string
  eventType: 'greeting' | 'chat' | 'interaction'
  userMessage?: string
  context?: Record<string, unknown>
  history?: LlmMessage[]
}

export class LlmClient {
  async generateDeviceReply(request: DeviceLlmRequest) {
    if (llmConfig.provider === 'mock' || !llmConfig.apiKey) {
      return this.generateMockReply(request)
    }

    return this.generateOpenAiCompatibleReply(request)
  }

  private async generateOpenAiCompatibleReply(request: DeviceLlmRequest) {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), llmConfig.requestTimeoutMs)

    try {
      const response = await fetch(llmConfig.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${llmConfig.apiKey}`
        },
        body: JSON.stringify({
          model: llmConfig.model,
          temperature: llmConfig.temperature,
          max_tokens: llmConfig.maxTokens,
          messages: this.buildMessages(request)
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`LLM request failed: ${response.status}`)
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>
      }

      return data.choices?.[0]?.message?.content?.trim() || this.generateMockReply(request)
    } catch (error) {
      console.warn('LLM request failed; using mock reply.', error)
      return this.generateMockReply(request)
    } finally {
      window.clearTimeout(timeout)
    }
  }

  private buildMessages(request: DeviceLlmRequest): LlmMessage[] {
    const system = [
      request.prompt,
      '你正在一个智能家居沙盒里作为设备发言。',
      '回复要短，1-3 句，像聊天消息，不要写旁白，不要写动作描述。',
      `当前事件类型: ${request.eventType}`,
      `上下文: ${JSON.stringify(request.context ?? {})}`
    ].join('\n\n')

    return [
      { role: 'system', content: system },
      ...(request.history ?? []).slice(-8),
      {
        role: 'user',
        content:
          request.userMessage ??
          (request.eventType === 'greeting'
            ? '用户靠近了你，请自然地打一个招呼。'
            : '用户与你互动，请自然回应。')
      }
    ]
  }

  private generateMockReply(request: DeviceLlmRequest) {
    const seed = Math.floor(Math.random() * 1000)

    if (request.eventType === 'greeting') {
      return `我注意到你靠近了。${request.device.displayName}先上线打个招呼。`
    }

    if (request.userMessage) {
      return `收到：${request.userMessage.replace(/^@\\S+\\s*/, '') || '我在听'}。这是${request.device.displayName}的临时模拟回复 #${seed}。`
    }

    return `${request.device.displayName}已响应这次互动。模拟回复 #${seed}。`
  }
}

