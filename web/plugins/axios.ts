import axios from 'axios'

type NuxtWindow = Window & {
  __NUXT__?: {
    config?: {
      apiBaseUrl?: string
    }
  }
}

function resolveBaseURL() {
  if (typeof window !== 'undefined') {
    return (
      (window as NuxtWindow).__NUXT__?.config?.apiBaseUrl ||
      process.env.API_BASE_URL ||
      'http://localhost:8000'
    )
  }

  return process.env.API_BASE_URL || 'http://localhost:8000'
}

const client = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    'X-Client-Version': process.env.GITHUB_SHA || 'dev',
  },
})

export function setAuthHeader(token: string | null) {
  client.defaults.headers.common.Authorization = 'Bearer ' + token
}

export function setApiKey(apiKey: string | null) {
  client.defaults.headers.common['x-api-key'] = apiKey ?? ''
}

export default client
