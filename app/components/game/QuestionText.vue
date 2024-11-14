<script setup lang="ts">
import type { QuestionsEntity } from '~~/types/directus'

const { question, isAnswer } = defineProps<{
  question: QuestionsEntity
  isAnswer: boolean
}>()

const wordCountTextSizeMap = {
  question: {
    10: 'text-8xl',
    25: 'text-7xl',
    40: 'text-6xl',
    80: 'text-5xl',
    120: 'text-4xl',
  },
  answer: {
    3: 'text-8xl',
    8: 'text-7xl',
    14: 'text-6xl',
    16: 'text-5xl',
    24: 'text-4xl',
  },
}

function getFontSizeClassForText(text: string, isAnswer: boolean = false) {
  const strippedText = stripHtmlTags(text)
  const wordCount = countWords(strippedText)

  let finalTextSizeClass = 'text-3xl'
  const wordCountMapToUse = Object.entries(
    isAnswer ? wordCountTextSizeMap.answer : wordCountTextSizeMap.question,
  )

  for (const [value, textSizeClass] of wordCountMapToUse) {
    let adjustedValue = parseInt(value)

    if (
      (isAnswer && question.answer_image) ||
      (!isAnswer && question.question_image)
    ) {
      adjustedValue = adjustedValue / 2
    }

    if (wordCount > adjustedValue) {
      continue
    }

    finalTextSizeClass = textSizeClass
    break
  }

  return finalTextSizeClass
}

function getWrappedText(text: string) {
  return wrapWords(text)
}

const hiddenText = computed(() => {
  if (isAnswer) {
    return question.question || ''
  }

  return question.answer || ''
})

const visibleText = computed(() => {
  if (!isAnswer) {
    return question.question || ''
  }

  return question.answer || ''
})
</script>

<template>
  <div
    class="grid font-medium max-w-6xl self-center items-center justify-center"
  >
    <div
      class="col-span-full row-span-full invisible py-2 my-[-0.5rem]"
      :class="getFontSizeClassForText(hiddenText, !isAnswer)"
      v-html="hiddenText"
    />

    <div
      class="col-span-full row-span-full"
      :class="getFontSizeClassForText(visibleText, isAnswer)"
      v-html="getWrappedText(visibleText)"
    />
  </div>
</template>
