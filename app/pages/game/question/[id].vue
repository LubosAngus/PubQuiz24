<script setup lang="ts">
definePageMeta({
  pageTransition: {
    css: false,
    mode: 'out-in',
  },
})

const route = useRoute()
const gameDataStore = useGameDataStore()
const question = gameDataStore.getQuestionById(route.params.id as string)

const hasImage = !!question?.question_image
const hasVideo = !!question?.question_video
</script>

<template>
  <div class="q-absolute-full grid place-items-center text-center py-10 px-20">
    <div class="flex flex-col gap-4">
      <DirectusImage
        v-if="hasImage"
        :size-key="1440"
        :image-id="question?.question_image"
      />

      <h1 v-html="question?.question" />
    </div>
  </div>
</template>
