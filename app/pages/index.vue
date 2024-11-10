<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onLeave(el, done) {
      gsap.to(el, {
        duration: 0.75,
        translateY: 100,
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
    <ProgressSpinner
      :style="{
        width: '3rem',
        height: '3rem',
      }"
      stroke-width="8"
      animation-duration=".5s"
    />
  </div>
</template>
