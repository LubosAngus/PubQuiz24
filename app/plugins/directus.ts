import {
  createDirectus,
  readItem,
  readItems,
  readSingleton,
  realtime,
  rest,
  updateSingleton,
} from '@directus/sdk'
import type { DirectusTypes } from '~~/types/directus'

const directus = createDirectus<DirectusTypes>('http://localhost:8055').with(
  rest(),
)
const directusWebsocket = createDirectus<DirectusTypes>(
  'http://localhost:8055/websocket',
).with(realtime())

export default defineNuxtPlugin(() => {
  return {
    provide: {
      directus,
      directusWebsocket,
      readItem,
      readItems,
      readSingleton,
      updateSingleton,
    },
  }
})
