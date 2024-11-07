<script setup lang="ts">
const { $directusWebsocket } = useNuxtApp()

const currentGameData = ref()

onMounted(async () => {
  const { subscription } = await $directusWebsocket.subscribe('current_game', {
    query: {
      fields: ['*.*'],
    },
  })

  for await (const item of subscription) {
    currentGameData.value = item.data[0]
  }
})

watchEffect(() => {
  console.log(currentGameData.value)
})
</script>

<template>
  <div>
    <Button
      type="button"
      :label="currentGameData?.quiz?.name || 'Vyber kvíz'"
      class="min-w-48"
    />
  </div>
</template>
