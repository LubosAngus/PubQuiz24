<script setup lang="ts">
import type { GameActionsEntity } from '~~/types/directus'

const gameActionsStore = useGameActionsStore()

const actionItems: ({
  key: GameActionsEntity['action_pressed']
  icon: string
  severity: string
} | null)[] = [
  {
    key: 'play',
    icon: 'play',
    severity: 'info',
  },
  {
    // TODO: on fullscreen, don't forget to block sleep
    key: 'fullscreen',
    icon: 'expand',
    severity: 'secondary',
  },
  null,
  {
    key: 'play_answer',
    icon: 'play',
    severity: 'danger',
  },
  {
    key: 'show_anser',
    icon: 'comment',
    severity: 'danger',
  },
  // {
  //   key: 'go_backward',
  //   icon: 'backward-step',
  //   severity: 'success',
  // },
  // {
  //   key: 'go_forward',
  //   icon: 'forward-step',
  //   severity: 'success',
  // },
]

const { $noSleep } = useNuxtApp()
function selectGameAction(gameAction: GameActionsEntity['action_pressed']) {
  $noSleep.enable()

  gameActionsStore.updateGameAction('game_action', {
    action_pressed: gameAction,
  })
}

onMounted(() => {
  window.addEventListener('beforeunload', () => {
    $noSleep.disable()
  })
})
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
