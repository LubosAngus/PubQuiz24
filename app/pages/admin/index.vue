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

    <div class="basis-64 grow-0 shrink-0 flex flex-col p-6 overflow-auto">
      <AdminQuizSelector />
      <Divider />
      <AdminRoundSelector />
      <div class="mt-auto">
        <Divider />
      </div>
      <template v-if="gameDataStore.data">
        <AdminActionsSpotify />
        <Divider />
        <AdminActionsState />
        <Divider />
        <AdminActionsGame class="mb-3" />
        <AdminActionsVolumeSlider />
        <Divider />
        <AdminActionsAnswer />
      </template>
    </div>

    <div class="hidden sm:block">
      <Divider layout="vertical" class="[&&]:m-0" />
    </div>

    <div class="flex-auto overflow-auto p-6">
      <AdminTopicAndQuestionSelector />
    </div>
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Inter', serif;
  background-color: var(--p-surface-950);
  color: var(--p-surface-0);
}
</style>
