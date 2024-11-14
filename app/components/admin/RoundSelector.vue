<script setup lang="ts">
import type { Round } from '~~/types/directus'

const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()

function isRoundSelected(round: Round) {
  return currentGameStore.data?.round_index === round.index
}

function selectRound(round: Round) {
  currentGameStore.updateCurrentGame('round_select', {
    round_index: round.index,
    topic: round.topics[0]?.id || null,
    question: null,
  })
}
</script>

<template>
  <div class="grid grid-cols-2 sm:flex sm:flex-col gap-2">
    <template v-if="!gameDataStore.data">
      <Skeleton height="3.4rem" width="100%" />
      <Skeleton height="3.4rem" width="100%" />
      <!-- <Skeleton height="3.4rem" width="100%" /> -->
      <Skeleton height="2.1rem" width="100%" />
    </template>

    <template v-else>
      <Button
        v-for="round in gameDataStore.rounds"
        :key="round.index"
        severity="contrast"
        :variant="isRoundSelected(round) ? undefined : 'outlined'"
        type="button"
        class="w-full text-left"
        size="small"
        @click="selectRound(round)"
      >
        <div
          class="flex w-full gap-2 text-xs leading-none sm:text-sm sm:leading-4"
        >
          <div class="font-bold italic text-slate-500 hidden sm:block">
            #{{ round.index + 1 }}
          </div>

          <div class="flex flex-col font-semibold gap-1 sm:gap-0">
            <span v-for="topic in round.topics" :key="topic.id">{{
              topic.name
            }}</span>
          </div>
        </div>
      </Button>
    </template>
  </div>
</template>
