<script setup lang="ts">
import type { CurrentGameEntity } from '~~/types/directus'

const currentGameStore = useCurrentGameStore()

const stateItems: {
  key: CurrentGameEntity['state']
  icon: string
  severity: string
}[] = [
  {
    key: 'logo',
    icon: 'house',
    severity: 'info',
  },
  {
    key: 'countdown',
    icon: 'hourglass-half',
    severity: 'danger',
  },
  {
    key: 'break',
    icon: 'beer-mug-empty',
    severity: 'help',
  },
  {
    key: 'leaderboard',
    icon: 'ranking-star',
    severity: 'warn',
  },
]

function isStateSelected(state: CurrentGameEntity['state']) {
  return currentGameStore?.data?.state === state
}

function selectState(state: CurrentGameEntity['state']) {
  let newState = state

  if (isStateSelected(state)) {
    newState = 'gameplay'
  }

  currentGameStore.updateCurrentGame('state_select', {
    state: newState,
  })
}
</script>

<template>
  <div class="grid grid-cols-5 gap-1">
    <template v-for="item in stateItems" :key="item.key">
      <Button
        type="button"
        class="aspect-square"
        :severity="!isStateSelected(item.key) ? 'secondary' : item.severity"
        :variant="!isStateSelected(item.key) ? 'outlined' : undefined"
        @click="selectState(item.key)"
      >
        <font-awesome-icon :icon="['fas', item.icon]" />
      </Button>
    </template>
  </div>
</template>
