<script setup lang="ts">
const currentGameStore = useCurrentGameStore()
const actionItems = [
  {
    key: 'play',
    icon: 'play',
    severity: 'info',
  },
  {
    key: 'go_backward',
    icon: 'backward-step',
    severity: 'success',
  },
  {
    key: 'go_forward',
    icon: 'forward-step',
    severity: 'success',
  },
  {
    key: '_BLANK',
  },
  {
    // TODO: on fullscreen, don't forget to block sleep
    key: 'fullscreen',
    icon: 'expand',
    severity: 'secondary',
  },
]

function selectGameAction(gameAction: string) {
  currentGameStore.updateCurrentGame('game_action', {
    action_pressed: gameAction,
  })
}
</script>

<template>
  <div class="grid grid-cols-5 gap-1">
    <template v-for="item in actionItems" :key="item.key">
      <div v-if="item.key === '_BLANK'" />

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
