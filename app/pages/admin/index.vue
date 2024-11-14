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
  <div class="flex h-[100dvh] flex-col sm:flex-row">
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

    <div
      class="basis-auto sm:basis-64 grow-0 shrink-0 p-4 sm:p-6 overflow-auto order-last sm:order-first border-t border-[var(--p-divider-border-color)] sm:border-none"
    >
      <div class="grid grid-cols-[1fr_180px] gap-3 sm:flex sm:flex-col h-full">
        <div>
          <AdminQuizSelector />
          <Divider />
          <AdminRoundSelector />
        </div>

        <div v-if="gameDataStore.data" class="sm:mt-auto">
          <Divider class="[&&]:hidden [&&]:sm:flex" />
          <AdminActionsSpotify />
          <Divider />
          <AdminActionsState />
          <Divider />
          <AdminActionsVolumeSlider class="mb-3" />
          <AdminActionsGame />
        </div>
      </div>
    </div>

    <div class="hidden sm:block">
      <Divider layout="vertical" class="[&&]:m-0" />
    </div>

    <div class="flex-auto overflow-auto p-4 sm:p-6">
      <AdminTopicAndQuestionSelector />
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Inter', sans-serif;
  background-color: var(--p-surface-950);
  color: var(--p-surface-0);
}
</style>
