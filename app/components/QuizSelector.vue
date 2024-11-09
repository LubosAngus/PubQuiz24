<script setup lang="ts">
const gameDataStore = useGameDataStore()
const isDialogVisible = ref(false)

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
    height="2.63rem"
    :style="{
      '--p-skeleton-background':
        'color-mix(in srgb, var(--p-primary-color) 15%, transparent)',
      '--p-skeleton-animation-background':
        'color-mix(in srgb, var(--p-primary-color) 50%, transparent)',
    }"
  />

  <Button
    v-else
    type="button"
    class="w-full"
    :style="{
      '--p-button-padding-y': '0.75rem',
    }"
    @click="openDialog"
  >
    <span class="font-bold tracking-wide leading-4">{{ buttonLabel }}</span>
  </Button>

  <QuizSelectorDialog v-model="isDialogVisible" />
</template>
