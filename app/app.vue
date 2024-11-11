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

@import 'normalize.css' layer(normalize-reset);
@import '@fortawesome/fontawesome-svg-core/styles.css';

body {
  font-family: 'Tomorrow', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;

  background-color: var(--p-surface-0);
  color: var(--p-surface-950);

  .font-alternative {
    font-family: 'Stick No Bills', serif;
  }
}
</style>
