import type { Device } from '@spotify/web-api-ts-sdk'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

export const useSpotifySdkStore = defineStore('spotifySdkStore', () => {
  const sdk = ref<ReturnType<typeof SpotifyApi.withUserAuthorization>>()
  const volume = ref(100)
  const isPlaying = ref(false)
  const isInitialized = ref(false)
  const isVolumeChanging = ref(false)
  const devices = ref<Device[]>()
  const selectedDeviceId = ref()

  async function initialize() {
    const { origin } = useRequestURL()

    sdk.value = await SpotifyApi.withUserAuthorization(
      'f99c79c2eca246979aaeea29faee5372',
      `${origin}/admin`,
      [
        'app-remote-control',
        'streaming',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
      ],
    )

    devices.value = (await sdk.value.player.getAvailableDevices()).devices

    if (!devices.value.length) {
      throw new Error('No spotify devices are active')
    }

    selectedDeviceId.value = devices.value.find((device) => {
      return device.is_active
    })?.id

    if (!selectedDeviceId.value) {
      selectedDeviceId.value = devices.value[0]?.id
    }

    const playbackState = await sdk.value.player.getPlaybackState()

    if (playbackState) {
      volume.value = playbackState.device.volume_percent || 0
      isPlaying.value = playbackState.is_playing
    }

    isInitialized.value = true
  }

  async function deviceChanged() {
    await sdk.value?.player.transferPlayback(
      [selectedDeviceId.value],
      isPlaying.value,
    )
  }

  async function changeVolume() {
    if (!sdk.value) {
      return
    }

    if (isVolumeChanging.value) {
      return
    }

    const volumeToChange = volume.value

    isVolumeChanging.value = true
    await sdk.value.player.setPlaybackVolume(volumeToChange)
    isVolumeChanging.value = false

    if (volumeToChange !== volume.value) {
      changeVolume()
    }
  }

  async function togglePlayback() {
    if (isPlaying.value) {
      sdk.value?.player.pausePlayback(selectedDeviceId.value)
    } else {
      sdk.value?.player.startResumePlayback(selectedDeviceId.value)
    }

    isPlaying.value = !isPlaying.value
  }

  async function nextSong() {
    if (!sdk.value) {
      return
    }

    sdk.value.player.skipToNext(selectedDeviceId.value)
  }

  async function prevSong() {
    if (!sdk.value) {
      return
    }

    sdk.value.player.skipToPrevious(selectedDeviceId.value)
  }

  onMounted(() => {
    const { query } = useRoute()

    if (query.code) {
      initialize()
    }
  })

  return {
    sdk,
    initialize,
    isInitialized,
    devices,
    deviceChanged,
    selectedDeviceId,
    volume,
    isPlaying,
    togglePlayback,
    nextSong,
    prevSong,
    changeVolume,
  }
})
