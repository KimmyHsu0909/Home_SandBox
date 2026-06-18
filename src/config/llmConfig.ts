export const llmConfig = {
  provider: 'mock' as 'mock' | 'openai-compatible',
  endpoint: 'https://api.openai.com/v1/chat/completions',
  apiKey: '',
  model: 'gpt-4.1-mini',
  temperature: 0.8,
  maxTokens: 180,
  requestTimeoutMs: 20000
} as const

