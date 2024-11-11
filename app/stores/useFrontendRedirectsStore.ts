export const useFrontendRedirectsStore = defineStore(
  'frontendRedirects',
  () => {
    const currentGameStore = useCurrentGameStore()
    const navigateMap = new Map(
      Object.entries({
        logo: '/game/logo',
        gameplay: '/game/gameplay',
        countdown: '/game/countdown',
        break: '/game/break',
        leaderboard: '/game/leaderboard',
      }),
    )

    const currentRedirectTo = computed(() => {
      const state = currentGameStore.data?.state

      if (!state) {
        return
      }

      if (!navigateMap.has(state)) {
        return
      }

      return navigateMap.get(state)
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
