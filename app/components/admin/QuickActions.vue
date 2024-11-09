<script setup lang="ts">
const gameDataStore = useGameDataStore()

function refreshData() {
  clearNuxtData('game_data')

  gameDataStore.refreshData()
}
</script>

<template>
  <div>
    <Button type="button" class="aspect-square" @click="refreshData()">
      <font-awesome-icon :icon="['fas', 'rotate-right']" />
    </Button>
  </div>
</template>
