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
  <div class="flex flex-row h-[100dvh]">
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

    <div class="basis-64 grow-0 shrink-0 flex flex-col p-6 overflow-auto">
      <AdminQuizSelector />
      <Divider />
      <AdminRoundSelector />
      <div class="mt-auto">
        <Divider />
      </div>
      <AdminSpotify />
      <Divider />
      <AdminQuickActions />
    </div>

    <Divider layout="vertical" class="[&&]:m-0" />

    <div class="flex-auto overflow-auto p-6">
      <AdminTopicAndQuestionSelector />
    </div>
  </div>
</template>
