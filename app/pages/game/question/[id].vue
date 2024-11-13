<script setup lang="ts">
definePageMeta({
  pageTransition: {
    css: false,
    mode: 'out-in',
  },
})

const route = useRoute()
const gameDataStore = useGameDataStore()

const question = computed(() => {
  return gameDataStore.getQuestionById(route.params.id as string)!
})

const questionWordCount = computed(() => {
  const strippedText = stripHtmlTags(question.value.question!)
  return countWords(strippedText)
})

const questionAdditionalClasses = computed(() => {
  const wordCountTextSizeMap = {
    10: 'text-8xl',
    25: 'text-7xl',
    40: 'text-6xl',
    80: 'text-5xl',
    120: 'text-4xl',
  }

  let finalTextSizeClass = 'text-3xl'
  for (const [value, textSizeClass] of Object.entries(wordCountTextSizeMap)) {
    if (questionWordCount.value > parseInt(value)) {
      continue
    }

    finalTextSizeClass = textSizeClass

    break
  }

  return [finalTextSizeClass]
})
</script>

<template>
  <div class="q-absolute-full grid place-items-center text-center p-20">
    <div class="flex flex-col gap-4 h-full w-full justify-center">
      <div v-if="question?.question_image" class="flex-1 relative">
        <DirectusImage
          :size-key="2880"
          :image-id="question?.question_image"
          class="w-full h-full absolute object-contain"
        />
      </div>

      <div v-if="question?.question_audio" class="relative mb-10">
        <GameQuestionAudio :question="question" />
      </div>

      <div
        v-if="question?.question"
        class="font-medium max-w-6xl self-center"
        :class="questionAdditionalClasses"
        v-html="question?.question"
      />
    </div>
  </div>
</template>

<style lang="scss">
small {
  font-size: 60%;
}
</style>
