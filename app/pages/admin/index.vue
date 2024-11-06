<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

const { $directus, $readSingleton } = useNuxtApp()

const { data } = await useAsyncData('game', () => {
  return $directus.request($readSingleton('current_game'))
})
</script>

<template>
  <div>
    <h1>hello dashboard</h1>

    <pre>
      {{ data }}
    </pre>
  </div>
</template>
