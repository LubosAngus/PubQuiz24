<template>
  <Toast />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@layer normalize, primevue;

@import 'normalize.css' layer(normalize-reset);
@import '@fortawesome/fontawesome-svg-core/styles.css';

body {
  // font-family: 'JetBrains Mono', monospace;
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
</style>
