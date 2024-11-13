import type { CurrentGameEntity } from '~~/types/directus'

/**
 * TODO: DRY? This and useGameActionsStore share a lot of same code.
 *
 * Optimize it somehow
 */

export const useCurrentGameStore = defineStore('currentGame', () => {
  const { directusWS, connectWebsocket } = useDirectusWebsocketStore()
  const gameDataStore = useGameDataStore()
  const toast = useToast()
  const data = ref<CurrentGameEntity>()
  const isUpdating = ref(new Set()) as Ref<Set<string>>
  const fieldsToFetch: (keyof CurrentGameEntity)[] = [
    'quiz',
    'topic',
    'question',
    'round_index',
    'state',
  ]

  const initWebsocket = async () => {
    try {
      await connectWebsocket()

      directusWS.onWebSocket('message', async (message) => {
        if (message.type === 'auth') {
          if (message.status !== 'ok') {
            toast.add({ severity: 'error', detail: message })
          }

          return
        }

        const isSubscription = message.type === 'subscription'

        // Multiple connections go through websockets, so filter only one we want
        if (
          (isSubscription && message.uid !== 'current_game_subscription') ||
          (!isSubscription && !isUpdating.value.has(message.uid))
        ) {
          return
        }

        const messageData: CurrentGameEntity = isSubscription
          ? message.data[0]
          : message.data

        const dataKeys = [
          ...Object.keys(data.value || {}),
          ...Object.keys(messageData || {}),
        ] as (keyof CurrentGameEntity)[]

        const changedData: Map<
          keyof CurrentGameEntity,
          CurrentGameEntity[keyof CurrentGameEntity]
        > = new Map()

        for (const dataKey of dataKeys) {
          const oldValue = data.value?.[dataKey]
          const newValue = messageData?.[dataKey]

          if (oldValue !== newValue) {
            changedData.set(dataKey, newValue)
          }
        }

        // no changes has been made
        if (changedData.size === 0) {
          if (isUpdating.value.has(message.uid)) {
            isUpdating.value.delete(message.uid)
          }

          return
        }

        // Assign data from response to current data object
        data.value = messageData

        if (isUpdating.value.has(message.uid)) {
          isUpdating.value.delete(message.uid)
        }

        if (changedData.has('quiz')) {
          gameDataStore.refreshData()
        }
      })

      directusWS.sendMessage({
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

  async function updateCurrentGame(
    uid: string,
    newData: Partial<CurrentGameEntity>,
  ) {
    if (isUpdating.value.has(uid)) {
      console.warn(`"${uid}" is already pending`)
      return
    }

    isUpdating.value.add(uid)

    directusWS.sendMessage({
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
    updateCurrentGame,
    isUpdating,
  }
})
