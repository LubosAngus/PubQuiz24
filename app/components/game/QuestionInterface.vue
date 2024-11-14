<script setup lang="ts">
import type { QuestionsEntity } from '~~/types/directus'

const { question, isAnswer = false } = defineProps<{
  question: QuestionsEntity
  isAnswer?: boolean
}>()

const imageId = computed(() => {
  if (isAnswer) {
    return question.answer_image
  }

  return question.question_image
})
</script>

<template>
  <div class="flex flex-col gap-4 justify-center class js-question-inner">
    <div v-if="imageId" class="relative flex-1 overflow-hidden">
      <GameQuestionImage :image-id="imageId" />
    </div>

    <GameQuestionText :question="question" :is-answer="isAnswer" />
  </div>
</template>
