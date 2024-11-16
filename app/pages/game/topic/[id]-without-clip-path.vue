<script setup lang="ts">
import gsap from 'gsap'

definePageMeta({
  pageTransition: {
    onEnter(el, done) {
      const tl = gsap.timeline({
        onComplete: done,
      })

      const bgEls = [...el.querySelectorAll('.js-content')]

      for (let i = 0; i < bgEls.length; i++) {
        const bgEl = bgEls[i]

        tl.fromTo(
          bgEl!,
          {
            translateY: '100%',
          },
          {
            translateY: 0,

            duration: 1.5,
            ease: 'power4.out',
          },
          i > 0 ? '<0.05' : undefined,
        )

        tl.fromTo(
          bgEl!.querySelectorAll('.js-text'),
          {
            translateY: '-120%',
            translateZ: 0,
          },
          {
            translateY: 0,
            translateZ: 0,

            duration: 1.5,
            ease: 'power4.out',
          },
          '<',
        )
      }
    },
    onLeave(el, done) {
      const tl = gsap.timeline({
        onComplete: done,
      })

      const bgEls = [...el.querySelectorAll('.js-content')]

      for (let i = 0; i < bgEls.length; i++) {
        const bgEl = bgEls[i]

        tl.fromTo(
          bgEl!,
          {
            opacity: 1,
            translateY: 0,
          },
          {
            opacity: 0.9,
            translateY: '-100%',

            duration: 1.5,
            ease: 'power4.out',
          },
          i > 0 ? '<0.05' : undefined,
        )

        tl.fromTo(
          bgEl!.querySelectorAll('.js-text'),
          {
            translateY: 0,
            translateZ: 0,
          },
          {
            translateY: '120%',
            translateZ: 0,

            duration: 1.5,
            ease: 'power4.out',
          },
          '<',
        )
      }
    },
  },
})

const route = useRoute()
const gameDataStore = useGameDataStore()
const topic = gameDataStore.getTopicById(route.params.id as string)

const totalContentItems = 10
function getContentClipPath(index: number, total: number) {
  const startX = (100 / total) * index
  const endX = (100 / total) * (index + 1) + 0.4 / total

  return `polygon(${startX}% 0%, ${endX}% 0%, ${endX}% 100%, ${startX}% 100%)`
}
</script>

<template>
  <div class="js-TMP">
    <template v-for="i in totalContentItems" :key="i">
      <div
        class="q-absolute-full text-center js-content"
        :style="{
          clipPath: getContentClipPath(i - 1, totalContentItems),
        }"
      >
        <div class="c-bg q-absolute-full">
          <div class="c-bg__item c-bg__item--base" />
          <div class="c-bg__item c-bg__item--gradient" />

          <DirectusImage
            v-if="topic?.background_image"
            :size-key="2880"
            :image-id="topic?.background_image"
            class="c-bg__item c-bg__item--img"
          />

          <div class="c-bg__item c-bg__item--noise" />
        </div>

        <h1
          class="js-text will-change-[transform,opacity] text-8xl font-bold z-10 text-surface-0 text-center q-absolute-full grid place-items-center"
        >
          {{ topic?.name }}
        </h1>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.js-content,
.js-text {
  will-change: transform, opacity;
}

.c-bg {
  background-color: #000;

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &--noise {
      background-image: url(~/assets/img/noise.png);
      mix-blend-mode: soft-light;
      opacity: 0.08;
    }
    &--img {
      opacity: 0.4;
      mix-blend-mode: multiply;
      object-fit: cover;
    }
    &--gradient {
      background-image: linear-gradient(
        45deg,
        #ff6e00,
        #918c2b,
        #34828f,
        #015fe1
      );
      opacity: 0.7;
    }
    &--base {
      background-color: #000;
    }
  }
}
</style>
