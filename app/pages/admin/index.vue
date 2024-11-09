<script setup lang="ts">
const currentGameStore = useCurrentGameStore()

const isSomethingLoading = computed(() => {
  return currentGameStore.isUpdating.size !== 0
})
</script>

<template>
  <div class="flex flex-row p-6 min-h-[100dvh]">
    <div class="fixed top-1 left-1">
      <ProgressSpinner
        v-if="isSomethingLoading"
        :style="{
          width: '1.2rem',
          height: '1.2rem',
        }"
        stroke-width="8"
        animation-duration=".5s"
      />
    </div>

    <div class="basis-56 grow-0 shrink-0">
      <QuizSelector />
      <Divider />
      <RoundSelector />
    </div>

    <Divider layout="vertical" />

    <div class="flex-auto">
      <TopicAndQuestionSelector />
    </div>
  </div>
</template>
