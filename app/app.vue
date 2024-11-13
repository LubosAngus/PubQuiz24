<script setup lang="ts">
const route = useRoute()
const routeName = route.name?.toString() || ''
const layoutName = ref()

if (routeName === 'index' || routeName.startsWith('game-')) {
  layoutName.value = 'game'
}
</script>

<template>
  <Toast />

  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@layer normalize, primevue;
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .q-absolute-full {
    @apply absolute top-0 left-0 h-full w-full;
  }
}

@import 'normalize.css' layer(normalize-reset);
@import '@fortawesome/fontawesome-svg-core/styles.css';

body {
  font-family: 'Alegreya', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  background-color: #000;
  color: var(--p-surface-0);

  .font-secondary {
    font-family: 'Tomorrow', sans-serif;
  }
}
</style>
