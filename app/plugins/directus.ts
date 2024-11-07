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

const { hostname, protocol } = useRequestURL()

const DIRECTUS_PORT = '8055'
const DIRECTUS_URL = `${protocol}//${hostname}:${DIRECTUS_PORT}`

const directus = createDirectus<DirectusTypes>(DIRECTUS_URL).with(rest())
const directusWebsocket = createDirectus<DirectusTypes>(
  `${DIRECTUS_URL}/websocket`,
)
  .with(staticToken('DGPX7KoJnjajm_2F6VPU91iB0Jy427L4'))
  .with(realtime())

export default defineNuxtPlugin(() => {
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
