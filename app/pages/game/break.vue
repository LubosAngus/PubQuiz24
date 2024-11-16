<script setup lang="ts">
import type { TransitionProps } from 'vue'
import gsap from 'gsap'
import topicTransitions from '~/utils/transitions/topicTransitions'
import useDynamicFontSize from '~/composable/useDynamicFontSize'

definePageMeta({
  middleware(to, from) {
    to.meta.pageTransition = {
      css: false,
      mode: 'in-out',
      onEnter: topicTransitions.onEnter,
      onLeave: topicTransitions.onLeave,
    }

    if (!from.name) {
      return
    }

    const pageTransitionMap: {
      [key: string]: TransitionProps
    } = {
      'game-question-id': {
        onEnter: (el, done) => {
          topicTransitions.onEnter(el, done, 0.2)
        },
      },
    }

    if (pageTransitionMap[from.name.toString()]) {
      to.meta.pageTransition = {
        ...to.meta.pageTransition,
        ...pageTransitionMap[from.name.toString()],
      }
    }
  },
})

const totalContentItems = 10
function getContentClipPath(index: number, total: number) {
  const startX = (100 / total) * index
  const endX = (100 / total) * (index + 1) + 0.4 / total

  return `polygon(${startX}% 0%, ${endX}% 0%, ${endX}% 100%, ${startX}% 100%)`
}

const rootEl = ref<HTMLDivElement>()

const quizText = 'Prestávka'
const fontSize = useDynamicFontSize(quizText, 0.65)

const letterAnimationInstances = ref<gsap.core.Timeline[]>([])
onMounted(async () => {
  const TRANSLATE_PERCENT = getRandomNumber(10, 35)
  const ROTATE_ANGLE = getRandomNumber(2, 8)
  const DURATION = getRandomNumber(6, 12)

  for (const contentEl of rootEl.value!.querySelectorAll('.js-content')) {
    const letterEls = [...contentEl.querySelectorAll('.js-letter')]
    for (let i = 0; i < letterEls.length; i++) {
      const letterEl = letterEls[i]

      const tl = gsap.timeline({
        repeatDelay: 0,
        repeat: -1,
        delay: -1 * ((letterEls.length - i) / 2),
      })

      tl.fromTo(
        letterEl!,
        {
          translateY: `0%`,
        },
        {
          translateY: `${TRANSLATE_PERCENT}%`,

          duration: DURATION / 2,
          ease: 'power1.out',
        },
      )
      tl.fromTo(
        letterEl!,
        {
          translateY: `${TRANSLATE_PERCENT}%`,
        },
        {
          translateY: `-${TRANSLATE_PERCENT}%`,

          duration: DURATION,
          ease: 'power1.inOut',
        },
      )
      tl.fromTo(
        letterEl!,
        {
          translateY: `-${TRANSLATE_PERCENT}%`,
        },
        {
          translateY: `0%`,

          duration: DURATION / 2,
          ease: 'power1.in',
        },
      )

      letterAnimationInstances.value.push(tl)
    }

    for (let i = 0; i < letterEls.length; i++) {
      const ROTATE_DURATION = DURATION * 2

      const letterEl = letterEls[i]

      const tl = gsap.timeline({
        repeat: -1,
        delay: -1 * ((letterEls.length - i) / 2),
      })

      tl.fromTo(
        letterEl!,
        {
          rotate: `0deg`,
        },
        {
          rotate: `-${ROTATE_ANGLE}deg`,

          duration: ROTATE_DURATION / 2,
          ease: 'power1.out',
        },
      )
      tl.fromTo(
        letterEl!,
        {
          rotate: `-${ROTATE_ANGLE}deg`,
        },
        {
          rotate: `${ROTATE_ANGLE}deg`,

          duration: ROTATE_DURATION,
          ease: 'power1.inOut',
        },
      )
      tl.fromTo(
        letterEl!,
        {
          rotate: `${ROTATE_ANGLE}deg`,
        },
        {
          rotate: `0deg`,

          duration: ROTATE_DURATION / 2,
          ease: 'power1.in',
        },
      )

      letterAnimationInstances.value.push(tl)
    }
  }
})

onUnmounted(async () => {
  await sleep(2000)

  if (!letterAnimationInstances.value.length) {
    return
  }

  for (const letterAnimationInstance of letterAnimationInstances.value) {
    letterAnimationInstance.kill()
  }
})
</script>

<template>
  <div ref="rootEl">
    <template v-for="i in totalContentItems" :key="i">
      <div
        class="q-absolute-full text-center js-content will-change-[transform,opacity]"
        :style="{
          clipPath: getContentClipPath(i - 1, totalContentItems),
        }"
      >
        <div class="q-absolute-full">
          <div class="q-absolute-full bg-slate-500" />

          <div
            class="q-absolute-full opacity-30 bg-[linear-gradient(45deg,_#ff7600,_#a5a11c,_#1da58d,_#1e74eb)]"
          />

          <img
            src="~/assets/img/bg_break.png"
            alt=""
            class="q-absolute-full opacity-95 mix-blend-multiply object-cover"
          />

          <div
            class="q-absolute-full mix-blend-soft-light opacity-15 bg-[url('~/assets/img/noise.png')]"
          />
        </div>

        <h1
          class="js-text font-bold font-secondary z-10 text-surface-0 text-center q-absolute-full grid place-items-center will-change-[transform,opacity]"
          :style="{
            fontSize: `${fontSize}px`,
            lineHeight: 1,
          }"
          v-html="wrapLetters(quizText)"
        />
      </div>
    </template>
  </div>
</template>
