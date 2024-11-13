import type { CurrentGameEntity } from '~~/types/directus'

export const useCurrentGameStore = defineStore('currentGame', () => {
  const { $directusWebsocket } = useNuxtApp()
  const gameDataStore = useGameDataStore()
  const data = ref<CurrentGameEntity>()
  const isInitialized = ref(false)
  const isUpdating = ref(new Set()) as Ref<Set<string>>
  const fieldsToFetch = [
    'quiz',
    'topic',
    'question',
    'round_index',
    'state',
    'media_volume',
    'action_pressed',
  ]

  const initWebsocket = async () => {
    try {
      await $directusWebsocket.connect()

      $directusWebsocket.onWebSocket('message', async (message) => {
        const isSubscription = message.uid === 'current_game_subscription'
        const messageData = isSubscription ? message.data[0] : message.data
        const changedData = {}

        if (data.value) {
          for (const dataKey of Object.keys(data.value)) {
            if (data.value[dataKey] !== messageData[dataKey]) {
              changedData[dataKey] = messageData[dataKey]
            }
          }

          // no data has been changed
          if (!Object.keys(changedData).length) {
            return
          }
        }

        let shouldRefreshData = data.value?.quiz !== messageData.quiz
        if (messageData.action_pressed !== null) {
          if (messageData.action_pressed === 'refresh_data') {
            shouldRefreshData = true
          }
        }

        // Assign data from response to current data object
        data.value = messageData

        if (!isSubscription && isUpdating.value.has(message.uid)) {
          isUpdating.value.delete(message.uid)
        }

        if (shouldRefreshData) {
          await gameDataStore.refreshData()
        }

        if (!isInitialized.value) {
          isInitialized.value = true
        }

        // TODO: move this to GameActionsStore
        if (messageData.action_pressed !== null) {
          updateCurrentGame('reset_action_pressed', {
            action_pressed: null,
          })
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
      console.warn(`"${uid}" is already pending`)
      return
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
    updateCurrentGame,
    isUpdating,
  }
})
