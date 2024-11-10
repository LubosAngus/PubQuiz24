import type { CurrentGameEntity } from '~~/types/directus'

export const useCurrentGameStore = defineStore('currentGame', () => {
  const { $directusWebsocket } = useNuxtApp()
  const gameDataStore = useGameDataStore()
  const data = ref<CurrentGameEntity>()
  const isInitialized = ref(false)
  const isUpdating = ref(new Set()) as Ref<Set<string>>
  const fieldsToFetch = ['quiz', 'topic', 'question', 'round_index', 'state']

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

      $directusWebsocket.onWebSocket('message', async (message) => {
        const isSubscription = message.uid === 'current_game_subscription'
        const messageData = isSubscription ? message.data[0] : message.data
        const shouldRefreshData = data.value?.quiz !== messageData.quiz

        data.value = messageData

        if (shouldRefreshData) {
          await gameDataStore.refreshData()
        }

        if (!isInitialized.value) {
          isInitialized.value = true
        }

        if (!isSubscription && isUpdating.value.has(message.uid)) {
          isUpdating.value.delete(message.uid)
        }
      })

      $directusWebsocket.sendMessage({
        uid: 'current_game_subscription',
        type: 'subscribe',
        collection: 'current_game',
        action: 'update',
        query: {
          fields: fieldsToFetch,
        },
      })
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
        fields: fieldsToFetch,
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
