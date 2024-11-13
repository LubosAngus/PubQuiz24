<script setup lang="ts">
import type { GameActionsEntity } from '~~/types/directus'

const gameActionsStore = useGameActionsStore()

const actionItems: ({
  key: GameActionsEntity['action_pressed']
  icon: string
  severity: string
} | null)[] = [
  {
    key: 'play_answer',
    icon: 'play',
    severity: 'danger',
  },
  null,
  null,
  null,
  {
    key: 'show_anser',
    icon: 'comment',
    severity: 'danger',
  },
]

function selectGameAction(gameAction: GameActionsEntity['action_pressed']) {
  gameActionsStore.updateGameAction('answer_action', {
    action_pressed: gameAction,
  })
}
</script>

<template>
  <div class="grid grid-cols-5 gap-1">
    <template
      v-for="item in actionItems"
      :key="item ? item.key : Math.random()"
    >
      <div v-if="!item" />

      <Button
        v-else
        type="button"
        class="aspect-square"
        :severity="item.severity"
        variant="outlined"
        @click="selectGameAction(item.key)"
      >
        <font-awesome-icon :icon="['fas', item.icon]" />
      </Button>
    </template>
  </div>
</template>
