export const useAssetLoaderStore = defineStore('assetLoader', () => {
  const gameDataStore = useGameDataStore()
  const loadingText = ref('načítavam dáta')
  const fakeLoaderPercentage = ref(0)
  const itemsToLoad = ref(0)
  const itemsLoaded = ref(0)
  const isAllLoaded = ref(false)

  const loadingProgressPercent = computed(() => {
    if (itemsToLoad.value === 0) {
      return fakeLoaderPercentage.value
    }

    const realProgress = Math.floor(
      (itemsLoaded.value / itemsToLoad.value) * 100,
    )

    if (fakeLoaderPercentage.value > 0) {
      const remainingPercentage = 100 - fakeLoaderPercentage.value

      const adjustedProgress = Math.floor(
        (realProgress / 100) * remainingPercentage,
      )

      return fakeLoaderPercentage.value + adjustedProgress
    }

    return realProgress
  })
  const imagesToLoad = computed(() => {
    if (!gameDataStore.questions || !gameDataStore.topics) {
      return
    }

    const topicsImagesIds = gameDataStore.topics.reduce((acc, topic) => {
      if (topic.background_image) {
        const imageSrc = getDirectusImageSrc(topic.background_image, 2880)
        acc.push(imageSrc)
      }

      return acc
    }, [] as string[])

    const questionsImagesIds = gameDataStore.questions.reduce(
      (acc, question) => {
        if (question.question_image) {
          const imageSrc = getDirectusImageSrc(question.question_image, 2880)
          acc.push(imageSrc)
        }
        if (question.answer_image) {
          const imageSrc = getDirectusImageSrc(question.answer_image, 2880)
          acc.push(imageSrc)
        }

        return acc
      },
      [] as string[],
    )

    return [...topicsImagesIds, ...questionsImagesIds]
  })

  const videosToLoad = computed(() => {
    if (!gameDataStore.questions) {
      return
    }

    return gameDataStore.questions.reduce((acc, question) => {
      if (question.question_video) {
        acc.push(getDirectusAssetUrl(question.question_video))
      }

      if (question.answer_video) {
        acc.push(getDirectusAssetUrl(question.answer_video))
      }

      return acc
    }, [] as string[])
  })

  const audiosToLoad = computed(() => {
    if (!gameDataStore.questions) {
      return
    }

    return gameDataStore.questions.reduce((acc, question) => {
      if (question.question_audio) {
        acc.push(getDirectusAssetUrl(question.question_audio))
      }
      if (question.answer_audio) {
        acc.push(getDirectusAssetUrl(question.answer_audio))
      }

      return acc
    }, [] as string[])
  })

  async function loadImagesToCache() {
    if (!imagesToLoad.value) {
      return
    }

    for (const imageToLoad of imagesToLoad.value) {
      await new Promise((resolve, reject) => {
        const image = document.createElement('img')

        image.onload = resolve
        image.onerror = reject

        image.src = imageToLoad
      })

      itemsLoaded.value++
    }

    return
  }

  async function loadVideosToCache() {
    if (!videosToLoad.value) {
      return
    }

    for (const videoToLoad of videosToLoad.value) {
      await new Promise((resolve, reject) => {
        const video = document.createElement('video')

        video.preload = 'auto'
        video.onloadeddata = resolve
        video.onerror = reject

        video.src = videoToLoad
      })

      itemsLoaded.value++
    }

    return
  }

  async function loadAudiosToCache() {
    if (!audiosToLoad.value) {
      return
    }

    for (const audioToLoad of audiosToLoad.value) {
      await new Promise((resolve, reject) => {
        const audio = document.createElement('audio')

        audio.onloadeddata = resolve
        audio.onerror = reject

        audio.src = audioToLoad
      })

      itemsLoaded.value++
    }

    return
  }

  async function startCachingData() {
    fakeLoaderPercentage.value = 0
    itemsLoaded.value = 0
    itemsToLoad.value = 0
    isAllLoaded.value = false

    let fakeLoaderActive = true
    async function fakeLoaderIncrement() {
      const sleepTimeMap = {
        25: 50,
        35: 150,
        45: 250,
        55: 750,
        60: 1000,
      }

      fakeLoaderPercentage.value++

      let sleepFor = 5000
      for (const [value, sleepTime] of Object.entries(sleepTimeMap)) {
        if (fakeLoaderPercentage.value > parseInt(value)) {
          continue
        }

        sleepFor = sleepTime

        break
      }

      await sleep(sleepFor)

      if (fakeLoaderActive) {
        fakeLoaderIncrement()
      }
    }

    fakeLoaderIncrement()

    await gameDataStore.waitForDataToLoad()

    fakeLoaderActive = false

    itemsToLoad.value =
      (imagesToLoad.value?.length || 0) +
      (videosToLoad.value?.length || 0) +
      (audiosToLoad.value?.length || 0)

    loadingText.value = 'načítavam hudbu'
    await loadAudiosToCache()

    loadingText.value = 'načítavam videá'
    await loadVideosToCache()

    loadingText.value = 'načítavam obrázky'
    await loadImagesToCache()

    loadingText.value = 'šicko načitane'

    isAllLoaded.value = true
  }

  const waitForAssetsToLoad = () => {
    return new Promise((resolve) => {
      if (isAllLoaded.value) {
        return resolve(true)
      }

      const unwatch = watch(isAllLoaded, async (value) => {
        if (!value) return

        unwatch()
        resolve(true)
      })
    })
  }

  async function initialize() {
    await startCachingData()
  }

  initialize()

  return {
    loadingText,
    loadingProgressPercent,
    itemsToLoad,
    isAllLoaded,
    waitForAssetsToLoad,
  }
})
