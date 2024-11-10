<script setup lang="ts">
const currentGameStore = useCurrentGameStore()

const stateItems = [
  {
    key: 'logo',
    icon: 'house',
    severity: 'info',
  },
  {
    key: 'gameplay',
    icon: 'person-chalkboard',
    severity: 'success',
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
    key: 'ladderboard',
    icon: 'ranking-star',
    severity: 'warn',
  },
]

function isStateSelected(state: string) {
  return currentGameStore?.data?.state === state
}

function selectState(state: string) {
  currentGameStore.updateCurrentGame('state_select', {
    state,
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

  <Divider />

  <!-- TODO: these actions -->
  <div class="grid grid-cols-5 gap-1">
    <Button
      type="button"
      class="aspect-square"
      severity="secondary"
      variant="outlined"
    >
      <font-awesome-icon :icon="['fas', 'play']" />
    </Button>

    <Button
      type="button"
      class="aspect-square"
      severity="secondary"
      variant="outlined"
    >
      <font-awesome-icon :icon="['fas', 'expand']" />
    </Button>

    <div></div>
    <div></div>

    <Button
      type="button"
      class="aspect-square"
      severity="danger"
      variant="outlined"
    >
      <font-awesome-icon :icon="['fas', 'comment']" />
    </Button>
  </div>
</template>
