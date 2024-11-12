import type { CurrentGameEntity } from '~~/types/directus'

export const useFrontendRedirectsStore = defineStore(
  'frontendRedirects',
  () => {
    const currentGameStore = useCurrentGameStore()
    const navigateMap = new Map(
      Object.entries({
        logo: '/game/logo',
        gameplay: (currentGameData: CurrentGameEntity) => {
          const { question, topic } = currentGameData
          if (question) {
            return `/game/question/${question}`
          }

          if (topic) {
            return `/game/topic/${topic}`
          }

          // This state should never happen in game, but you never know.
          return '/game/gameplay'
        },
        countdown: '/game/countdown',
        break: '/game/break',
        leaderboard: '/game/leaderboard',
      }),
    )

    const currentRedirectTo = computed(() => {
      if (!currentGameStore.data) {
        return
      }

      const { state } = currentGameStore.data

      if (!state) {
        return
      }

      if (!navigateMap.has(state)) {
        return
      }

      const redirectTo = navigateMap.get(state)

      if (typeof redirectTo === 'function') {
        return redirectTo(currentGameStore.data)
      }

      return redirectTo
    })

    function startWatchingForRedirects() {
      watch(
        currentGameStore,
        () => {
          if (!currentRedirectTo.value) {
            return
          }

          navigateTo(currentRedirectTo.value, {
            replace: true,
          })
        },
        {
          immediate: true,
        },
      )
    }

    return {
      navigateMap,
      currentRedirectTo,
      startWatchingForRedirects,
    }
  },
)
