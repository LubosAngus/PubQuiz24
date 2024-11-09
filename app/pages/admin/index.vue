<script setup lang="ts">
const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()

const isSomethingLoading = computed(() => {
  if (currentGameStore.isUpdating.size !== 0) {
    return true
  }

  return gameDataStore.status === 'pending'
})
</script>

<template>
  <div class="flex flex-row p-6 h-[100dvh]">
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

    <div class="basis-56 grow-0 shrink-0 flex flex-col">
      <QuizSelector />
      <Divider />
      <RoundSelector />
      <div class="mt-auto">
        <Divider />
      </div>
      <AdminQuickActions />
    </div>

    <Divider layout="vertical" />

    <div class="flex-auto overflow-auto">
      <TopicAndQuestionSelector />
    </div>
  </div>
</template>
