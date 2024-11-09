<script setup lang="ts">
const currentGameStore = useCurrentGameStore()
const isDialogVisible = ref(false)

function openDialog() {
  isDialogVisible.value = true
}

const buttonLabel = computed(() => {
  if (!currentGameStore.isInitialized) {
    return '...'
  }

  if (currentGameStore.data?.quiz?.name) {
    return currentGameStore.data?.quiz?.name
  }

  return 'Vyber kvíz'
})
</script>

<template>
  <Button
    type="button"
    class="w-full"
    :style="{
      '--p-button-padding-y': '0.75rem',
    }"
    :loading="!currentGameStore.isInitialized"
    @click="openDialog"
  >
    <span class="font-bold tracking-wide leading-4">{{ buttonLabel }}</span>
  </Button>

  <QuizSelectorDialog v-model="isDialogVisible" />
</template>
