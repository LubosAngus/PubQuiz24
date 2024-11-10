<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onEnter(el, done) {
      gsap.from(el, {
        delay: 0.25,
        duration: 0.75,
        translateY: -100,
        opacity: 0,
        onComplete: done,
        ease: 'power2.inOut',
      })
    },
  },
})
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-full grid place-items-center">
    <h1 class="text-xl font-bold">gameplay</h1>
  </div>
</template>
