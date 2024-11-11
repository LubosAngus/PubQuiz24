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
