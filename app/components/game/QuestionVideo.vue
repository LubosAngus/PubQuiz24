<script setup lang="ts">
/**
 * TODO: doesn't work with current setup
 */

import type { QuestionsEntity } from '~~/types/directus'

const props = defineProps<{
  question: QuestionsEntity
}>()

const gameActionsStore = useGameActionsStore()
const videoEl = ref()
const videoId = ref(props.question.question_video!)
const videoSrc = computed(() => {
  return getDirectusAssetUrl(videoId.value)
})

const motionAnalyzerVisible = ref(false)
const videoMotionInstance = ref()

onUnmounted(() => {
  if (typeof videoMotionInstance.value?.destroy === 'function') {
    videoMotionInstance.value.destroy()
  }
})

watch(
  () => gameActionsStore.data.media_volume,
  (updatedVolume) => {
    videoMotionInstance.value.volume = updatedVolume / 100
  },
)

watch(
  () => gameActionsStore.data.action_pressed,
  async (actionPressed) => {
    if (actionPressed === null) return

    if (actionPressed === 'play' || actionPressed === 'play_answer') {
      motionAnalyzerVisible.value = true

      if (actionPressed === 'play' && props.question.question_video) {
        videoId.value = props.question.question_video
      }

      if (actionPressed === 'play_answer' && props.question.answer_video) {
        videoId.value = props.question.answer_video
      }

      await sleep(50)

      if (videoEl.value.paused) {
        videoEl.value.play()
      } else {
        videoEl.value.pause()
        videoEl.value.currentTime = 0
      }
    }
  },
)
</script>

<template>
  <div class="w-full h-full">
    <video
      ref="videoEl"
      :src="videoSrc"
      crossorigin="anonymous"
      class="w-full h-full absolute object-contain will-change-[opacity, transform] js-video"
    />
  </div>
</template>
