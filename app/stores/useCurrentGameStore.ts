import type { CurrentGameEntity } from '~~/types/directus'

export const useCurrentGameStore = defineStore('currentGame', () => {
  const { $directusWebsocket, $directus, $updateSingleton } = useNuxtApp()
  const data = ref<CurrentGameEntity>()
  const isInitialized = ref(false)
  const isUpdating = ref(false)

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

  const initSubscription = async () => {
    try {
      const { subscription } = await $directusWebsocket.subscribe(
        'current_game',
        {
          query: {
            // fields: ['*.*', 'quiz.topics.topics_id.*.*'],
            fields: [
              'quiz.id',
              'quiz.name',
              'topic.id',
              'question.id',
              'round_index',
              'state',
              // 'quiz.topics.topics_id.id',
              // 'quiz.topics.topics_id.name',
              // 'quiz.topics.topics_id.questions.id',
              // 'quiz.topics.topics_id.questions.question',
              // 'quiz.topics.topics_id.questions.answer',
              // 'quiz.topics.topics_id.questions.notes',
            ],
          },
        },
      )

      for await (const item of subscription) {
        data.value = item.data[0]

        if (!isInitialized.value) {
          isInitialized.value = true
        }
      }
    } catch (error) {
      console.error('Error initializing subscription:', error)
    }
  }

  initSubscription()

  async function updateCurrentGame(data) {
    isUpdating.value = true

    await $directusWebsocket.sendMessage({
      type: 'items',
      collection: 'current_game',
      action: 'update',
      data,
    })

    isUpdating.value = false
  }

  return {
    data,
    isInitialized,
    waitForInitialization,
    updateCurrentGame,
    isUpdating,
  }
})
