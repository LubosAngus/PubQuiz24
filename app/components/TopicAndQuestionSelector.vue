<script setup lang="ts">
const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()
</script>

<template>
  <pre>{{ gameDataStore.selectedRound }}</pre>

  <div v-if="!gameDataStore.selectedRound">
    <Message severity="info">Select round first</Message>
  </div>

  <div v-else class="flex flex-col gap-2">
    <Button
      v-for="round in gameDataStore.selectedRound?.topics"
      :key="round.index"
      severity="contrast"
      :variant="isRoundSelected(round) ? undefined : 'outlined'"
      type="button"
      class="w-full text-left"
      size="small"
    >
      <div class="flex w-full gap-2 leading-5">
        <div class="font-bold italic text-slate-500">
          #{{ round.index + 1 }}
        </div>

        <div class="flex flex-col font-semibold">
          <span v-for="topic in round.topics" :key="topic.id">{{
            topic.name
          }}</span>
        </div>
      </div>
    </Button>
  </div>
</template>
