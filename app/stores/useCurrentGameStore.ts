import type { CurrentGameEntity } from '~~/types/directus'

export const useCurrentGameStore = defineStore('currentGame', () => {
  const { $directusWebsocket } = useNuxtApp()
  const data = ref<CurrentGameEntity>()
  const isInitialized = ref(false)
  const isUpdating = ref(new Set(['initial_request'])) as Ref<Set<string>>

  const waitForInitialization = () => {
    return new Promise((resolve) => {
      if (isInitialized.value) {
        return resolve(true)
      }

      watch(
        isInitialized,
        (value) => {
          if (!value) return

          resolve(true)
        },
        { once: true },
      )
    })
  }

  const initWebsocket = async () => {
    try {
      await $directusWebsocket.connect()

      $directusWebsocket.onWebSocket('message', (message) => {
        if (isUpdating.value.has(message.uid)) {
          isUpdating.value.delete(message.uid)
        } else {
          console.warn(`"${message.uid}" is not in updating set.`)
        }

        data.value = message.data
      })

      $directusWebsocket.sendMessage({
        uid: 'initial_request',
        type: 'items',
        collection: 'current_game',
        action: 'read',
        query: {
          fields: ['quiz', 'topic', 'question', 'round_index', 'state'],
        },
      })

      if (!isInitialized.value) {
        isInitialized.value = true
      }
    } catch (error) {
      console.error('Error initializing subscription:', error)
    }
  }

  initWebsocket()

  async function updateCurrentGame(uid: string, newData: object) {
    if (isUpdating.value.has(uid)) {
      throw new Error(`"${uid}" is already pending`)
    }

    isUpdating.value.add(uid)

    $directusWebsocket.sendMessage({
      uid,
      type: 'items',
      collection: 'current_game',
      action: 'update',
      query: {
        fields: ['quiz', 'topic', 'question', 'round_index', 'state'],
      },
      data: newData,
    })

    return new Promise((resolve) => {
      if (!isUpdating.value.has(uid)) {
        return resolve(true)
      }

      const unWatch = watch(isUpdating.value, (value) => {
        if (value.has(uid)) {
          return
        }

        unWatch()
        resolve(true)
      })
    })
  }

  return {
    data,
    isInitialized,
    waitForInitialization,
    updateCurrentGame,
    isUpdating,
  }
})
