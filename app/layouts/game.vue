<script setup lang="ts">
const assetLoaderStore = useAssetLoaderStore()
const frontendRedirectsStore = useFrontendRedirectsStore()

onMounted(async () => {
  await assetLoaderStore.waitForAssetsToLoad()

  frontendRedirectsStore.startWatchingForRedirects()
})
</script>

<template>
  <div class="h-[100dvh] relative overflow-hidden">
    <slot />
  </div>
</template>

<style lang="scss">
body {
  background-color: var(--p-surface-0);
  color: var(--p-surface-950);
}
</style>
