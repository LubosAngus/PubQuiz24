<script setup lang="ts">
const currentGameStore = useCurrentGameStore()
const actionItems = [
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
]

function selectGameAction(gameAction: string) {
  currentGameStore.updateCurrentGame('answer_action', {
    action_pressed: gameAction,
  })
}
</script>

<template>
  <div class="grid grid-cols-5 gap-1">
    <template v-for="item in actionItems" :key="item.key">
      <Button
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
