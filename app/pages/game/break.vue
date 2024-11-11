<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onEnter(el, done) {
      gsap.from(el, {
        duration: 0.5,
        translateY: -50,
        opacity: 0,
        onComplete: done,
        ease: 'power2.inOut',
      })
    },
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

const route = useRoute()
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-full grid place-items-center">
    <h1 class="text-xl font-bold">{{ route.name }}</h1>
  </div>
</template>
