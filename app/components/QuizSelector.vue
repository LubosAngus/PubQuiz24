<script setup lang="ts">
const currentGameStore = useCurrentGameStore()
const isDialogVisible = ref(false)

function openDialog() {
  isDialogVisible.value = true
}
</script>

<template>
  <div>
    <Button
      type="button"
      :label="
        !currentGameStore.isInitialized
          ? '...'
          : currentGameStore.data?.quiz?.name || 'Vyber kvíz'
      "
      class="w-full"
      :loading="!currentGameStore.isInitialized"
      size="small"
      style="--p-button-label-font-weight: 700"
      @click="openDialog"
    />

    <QuizSelectorDialog v-model="isDialogVisible" />
  </div>
</template>
