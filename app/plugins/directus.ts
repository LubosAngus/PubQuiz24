import {
  createDirectus,
  readItem,
  readItems,
  readSingleton,
  rest,
} from '@directus/sdk'
import type { DirectusTypes } from '~~/types/directus'

const directus = createDirectus<DirectusTypes>('http://localhost:8055').with(
  rest(),
)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      directus,
      readItem,
      readItems,
      readSingleton,
    },
  }
})
