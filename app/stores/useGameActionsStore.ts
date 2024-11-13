import type { GameActionsEntity } from '~~/types/directus'

/**
 * TODO: DRY? This and useCurrentGameStore share a lot of same code.
 *
 * Optimize it somehow
 */

export const useGameActionsStore = defineStore('gameActions', () => {
  const { directusWS, connectWebsocket } = useDirectusWebsocketStore()
  const gameDataStore = useGameDataStore()
  const toast = useToast()
  const data = ref<GameActionsEntity>()
  const isUpdating = ref(new Set()) as Ref<Set<string>>
  const fieldsToFetch: (keyof GameActionsEntity)[] = [
    'action_pressed',
    'media_volume',
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
          (isSubscription && message.uid !== 'game_actions_subscription') ||
          (!isSubscription && !isUpdating.value.has(message.uid))
        ) {
          return
        }

        const messageData: GameActionsEntity = isSubscription
          ? message.data[0]
          : message.data

        const dataKeys = [
          ...Object.keys(data.value || {}),
          ...Object.keys(messageData || {}),
        ] as (keyof GameActionsEntity)[]

        const changedData: Map<
          keyof GameActionsEntity,
          GameActionsEntity[keyof GameActionsEntity]
        > = new Map()

        for (const dataKey of dataKeys) {
          const oldValue = data.value?.[dataKey]
          const newValue = messageData?.[dataKey]

          if (oldValue !== newValue) {
            changedData.set(dataKey, newValue)
          }
        }

        if (isUpdating.value.has(message.uid)) {
          isUpdating.value.delete(message.uid)
        }

        // no changes has been made
        if (changedData.size === 0) {
          return
        }

        // Assign data from response to current data object
        data.value = messageData

        if (changedData.get('action_pressed') === 'refresh_data') {
          await gameDataStore.refreshData()
        }

        if (messageData.action_pressed !== null) {
          updateGameAction('reset_action_pressed', {
            action_pressed: null,
          })
        }
      })

      directusWS.sendMessage({
        uid: 'game_actions_subscription',
        type: 'subscribe',
        collection: 'game_actions',
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

  async function updateGameAction(
    uid: string,
    newData: Partial<GameActionsEntity>,
  ) {
    if (isUpdating.value.has(uid)) {
      console.warn(`"${uid}" is already pending`)
      return
    }

    isUpdating.value.add(uid)

    directusWS.sendMessage({
      uid,
      type: 'items',
      collection: 'game_actions',
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
    updateGameAction,
    isUpdating,
  }
})
