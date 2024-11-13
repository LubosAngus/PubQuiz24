<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onLeave(el, done) {
      gsap.to(el, {
        duration: 1,
        scale: 0.8,
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
  <div class="q-absolute-full">
    <div class="q-absolute-full grid place-items-center">
      <div
        class="flex flex-col items-cetner text-center gap-3 font-secondary text-black"
      >
        <h1 class="uppercase text-9xl font-bold tracking-wider">
          {{ assetLoaderStore.loadingProgressPercent }}%
        </h1>

        <h2 class="uppercase text-lg font-medium text-slate-500">
          {{ assetLoaderStore.loadingText }}
        </h2>
      </div>
    </div>

    <div
      class="q-absolute-full grid place-items-center text-slate-50 bg-black transition-all"
      :style="{
        clipPath: `polygon(${assetLoaderStore.loadingProgressPercent}% 0%, 100% 0%, 100% 100%, ${assetLoaderStore.loadingProgressPercent}% 100%)`,
      }"
    >
      <div class="flex flex-col items-cetner text-center gap-3 font-secondary">
        <h1 class="uppercase text-9xl font-bold tracking-wider">
          {{ assetLoaderStore.loadingProgressPercent }}%
        </h1>

        <h2 class="uppercase text-lg font-medium text-slate-500">
          {{ assetLoaderStore.loadingText }}
        </h2>
      </div>
    </div>

    <!-- TODO: pridaj tu tlacidlo po nacitani na hranie (to zabezpeci ze budem moct javascriptom interagovat so strankou) zaroven https://github.com/richtr/NoSleep.js -->
  </div>
</template>
