export const useDirectusWebsocketStore = defineStore(
  'directusWebsocket',
  () => {
    const { $directusWebsocket } = useNuxtApp()
    const isConnected = ref(false)
    const isConnecting = ref(false)

    async function connectWebsocket() {
      if (isConnecting.value) {
        return new Promise((resolve) => {
          if (isConnected.value) {
            return resolve(true)
          }

          const unWatch = watch(isConnected, (value) => {
            if (!value) {
              return
            }

            unWatch()
            resolve(true)
          })
        })
      }

      if (isConnected.value) {
        return
      }

      isConnecting.value = true

      await $directusWebsocket.connect()

      isConnected.value = true
      isConnecting.value = false

      return
    }

    return {
      directusWS: $directusWebsocket,
      connectWebsocket,
    }
  },
)
