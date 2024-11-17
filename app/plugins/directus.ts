import {
  createDirectus,
  readItem,
  readItems,
  readSingleton,
  realtime,
  rest,
  staticToken,
  updateSingleton,
} from '@directus/sdk'
import type { DirectusTypes } from '~~/types/directus'

export default defineNuxtPlugin(() => {
  const { hostname, protocol } = useRequestURL()
  const { DIRECTUS_PORT, DIRECTUS_API_TOKEN } = useRuntimeConfig().public

  const DIRECTUS_URL = `${protocol}//${hostname}:${DIRECTUS_PORT}`

  const directus = createDirectus<DirectusTypes>(DIRECTUS_URL)
    .with(staticToken(DIRECTUS_API_TOKEN))
    .with(rest())

  const directusWebsocket = createDirectus<DirectusTypes>(
    `${DIRECTUS_URL}/websocket`,
  )
    .with(staticToken(DIRECTUS_API_TOKEN))
    .with(realtime())

  return {
    provide: {
      DIRECTUS_URL,
      directus,
      directusWebsocket,
      readItem,
      readItems,
      readSingleton,
      updateSingleton,
    },
  }
})
