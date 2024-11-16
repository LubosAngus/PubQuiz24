<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onLeave(el, done) {
      gsap.to(el, {
        duration: 0.6,
        delay: 0.2,
        translateY: '-12%',
        opacity: 0,
        onComplete: done,
        ease: 'power1.in',
      })
    },
  },
})

const frontendRedirectsStore = useFrontendRedirectsStore()
const assetLoaderStore = useAssetLoaderStore()

const isButtonVisible = ref(false)
onMounted(async () => {
  await assetLoaderStore.waitForAssetsToLoad()

  isButtonVisible.value = true
})

const { $noSleep } = useNuxtApp()

function startGame() {
  isButtonVisible.value = false

  $noSleep.enable()

  window.addEventListener('beforeunload', () => {
    $noSleep.disable()
  })

  enterFullscreen()

  frontendRedirectsStore.startWatchingForRedirects()
}
</script>

<template>
  <div class="q-absolute-full tabular-nums">
    <template v-for="i in 2" :key="i">
      <div
        class="q-absolute-full grid place-items-center transition-all"
        :class="i === 2 ? 'bg-black' : 'bg-white'"
        :style="{
          clipPath:
            i === 2
              ? `polygon(${assetLoaderStore.loadingProgressPercent}% 0%, 100% 0%, 100% 100%, ${assetLoaderStore.loadingProgressPercent}% 100%)`
              : '',
        }"
      >
        <div
          class="flex flex-col items-cetner text-center gap-3 font-secondary"
          :class="i === 2 ? 'text-white' : 'text-black'"
        >
          <h1 class="uppercase text-9xl font-bold tracking-wider">
            {{ assetLoaderStore.loadingProgressPercent }}%
          </h1>

          <h2 class="uppercase text-lg font-medium text-slate-500">
            {{ assetLoaderStore.loadingText }}
          </h2>

          <div
            class="mt-3 w-full transition-opacity"
            :class="
              isButtonVisible ? 'duration-1000 delay-300' : 'duration-200'
            "
            :style="{
              opacity: isButtonVisible ? '1' : '0',
            }"
          >
            <Button class="w-full font-semibold" @click="startGame"
              >Štart</Button
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
