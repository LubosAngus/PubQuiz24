<script setup lang="ts">
const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()
const isDialogVisible = ref(false)

async function refreshData() {
  clearNuxtData('game_data')

  currentGameStore.updateCurrentGame('refresh_data', {
    action_pressed: 'refresh_data',
  })
}

function openDialog() {
  isDialogVisible.value = true
}

const buttonLabel = computed(() => {
  if (!gameDataStore.data) {
    return '...'
  }

  if (gameDataStore.selectedQuizName) {
    return gameDataStore.selectedQuizName
  }

  return 'Vyber kvíz'
})
</script>

<template>
  <Skeleton
    v-if="!gameDataStore.data"
    height="2.25rem"
    :style="{
      '--p-skeleton-background':
        'color-mix(in srgb, var(--p-primary-color) 15%, transparent)',
      '--p-skeleton-animation-background':
        'color-mix(in srgb, var(--p-primary-color) 50%, transparent)',
    }"
  />

  <div v-else class="flex gap-1">
    <Button
      type="button"
      class="flex-1"
      :style="{
        '--p-button-padding-y': '0.75rem',
      }"
      size="small"
      @click="openDialog"
    >
      <span class="font-bold text-sm tracking-wide leading-4">{{
        buttonLabel
      }}</span>
    </Button>

    <Button
      type="button"
      class="grow-0 aspect-square"
      variant="outlined"
      size="small"
      @click="refreshData()"
    >
      <font-awesome-icon :icon="['fas', 'rotate-right']" />
    </Button>
  </div>

  <AdminQuizSelectorDialog v-model="isDialogVisible" />
</template>
