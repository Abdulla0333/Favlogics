import { env } from '../../config/env'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'GET' })
  }

  post<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...init,
      method: 'POST',
      headers: { ...JSON_HEADERS, ...init?.headers },
      body: JSON.stringify(body),
    })
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, init)

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`)
    }

    return response.json() as Promise<T>
  }
}

export const dummyJsonClient = new ApiClient(env.dummyJsonApiUrl)
export const jsonPlaceholderClient = new ApiClient(env.jsonPlaceholderApiUrl)
