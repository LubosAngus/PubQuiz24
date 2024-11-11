<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onLeave(el, done) {
      gsap.to(el, {
        duration: 0.5,
        translateY: 50,
        opacity: 0,
        onComplete: done,
        ease: 'power2.inOut',
      })
    },
  },
})

const assetLoaderStore = useAssetLoaderStore()
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-full grid place-items-center">
    <div class="flex flex-col items-cetner text-center gap-3">
      <h1 class="uppercase text-6xl font-bold tracking-wider">
        {{ assetLoaderStore.loadingProgressPercent }}%
      </h1>

      <h2 class="uppercase text-sm font-medium text-slate-500">
        {{ assetLoaderStore.loadingText }}
      </h2>
    </div>
  </div>
</template>
