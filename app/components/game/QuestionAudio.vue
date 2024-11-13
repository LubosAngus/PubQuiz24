<script setup lang="ts">
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import type { QuestionsEntity } from '~~/types/directus'

const props = defineProps<{
  question: QuestionsEntity
}>()

const gameActionsStore = useGameActionsStore()
const motionAnalyzerEl = ref()
const audioEl = ref()
const audioId = ref(props.question.question_audio!)
const audioSrc = computed(() => {
  return getDirectusAssetUrl(audioId.value)
})

const audioMotionInstance = ref()
onMounted(() => {
  audioMotionInstance.value = new AudioMotionAnalyzer(motionAnalyzerEl.value, {
    source: audioEl.value,
    volume: gameActionsStore.data?.media_volume / 100,
  })

  audioMotionInstance.value.registerGradient('quiz-gradient', {
    bgColor: 'white',
    dir: 'h',
    colorStops: ['#ff6e00', '#918c2b', '#34828f', '#015fe1'],
  })

  audioMotionInstance.value.setOptions({
    alphaBars: false,
    ansiBands: false,
    barSpace: 0.2,
    bgAlpha: 1,
    channelLayout: 'single',
    colorMode: 'gradient',
    fadePeaks: false,
    fftSize: 8192,
    fillAlpha: 0.2,
    frequencyScale: 'log',
    gradient: 'quiz-gradient',
    gravity: 3.8,
    ledBars: false,
    linearAmplitude: true,
    linearBoost: 2,
    lineWidth: 2,
    loRes: false,
    lumiBars: false,
    maxDecibels: -35,
    maxFPS: 0,
    maxFreq: 16000,
    minDecibels: -85,
    minFreq: 30,
    mirror: 0,
    mode: 2,
    noteLabels: false,
    outlineBars: false,
    overlay: false,
    peakFadeTime: 750,
    peakHoldTime: 500,
    peakLine: false,
    radial: false,
    radialInvert: false,
    radius: 0.3,
    reflexAlpha: 1,
    reflexBright: 1,
    reflexFit: true,
    reflexRatio: 0.5,
    roundBars: true,
    showBgColor: true,
    showFPS: false,
    showPeaks: false,
    showScaleX: false,
    showScaleY: false,
    smoothing: 0.7,
    spinSpeed: 0,
    splitGradient: false,
    trueLeds: true,
    useCanvas: true,
    weightingFilter: 'D',
  })
})

onUnmounted(() => {
  if (typeof audioMotionInstance.value.destroy === 'function') {
    audioMotionInstance.value.destroy()
  }
})

watch(
  () => gameActionsStore.data.media_volume,
  (updatedVolume) => {
    audioMotionInstance.value.volume = updatedVolume / 100
  },
)

watch(
  () => gameActionsStore.data.action_pressed,
  async (actionPressed) => {
    if (actionPressed === null) return

    if (actionPressed === 'play' || actionPressed === 'play_answer') {
      if (actionPressed === 'play' && props.question.question_audio) {
        audioId.value = props.question.question_audio
      }

      if (actionPressed === 'play_answer' && props.question.answer_audio) {
        audioId.value = props.question.answer_audio
      }

      await sleep(50)

      if (audioEl.value.paused) {
        audioEl.value.play()
      } else {
        audioEl.value.pause()
        audioEl.value.currentTime = 0
      }
    }
  },
)
</script>

<template>
  <div class="w-full h-[25dvh]">
    <div ref="motionAnalyzerEl" class="w-full h-full" />

    <audio
      ref="audioEl"
      class="hidden"
      controls
      :src="audioSrc"
      crossorigin="anonymous"
    />
  </div>
</template>
