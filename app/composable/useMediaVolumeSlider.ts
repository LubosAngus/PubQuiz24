export default function () {
  const gameActionsStore = useGameActionsStore()

  const volume = ref(gameActionsStore.data?.media_volume || 100)
  const isVolumeChanging = ref(false)

  async function changeVolume() {
    if (isVolumeChanging.value) {
      return
    }

    const volumeToChange = volume.value

    isVolumeChanging.value = true
    await gameActionsStore.updateGameAction('volume_change', {
      media_volume: volumeToChange,
    })

    await sleep(150)
    isVolumeChanging.value = false

    if (volumeToChange !== volume.value) {
      changeVolume()
    }
  }

  return {
    volume,
    changeVolume,
  }
}
