<script setup lang="ts">
import type { TransitionProps } from 'vue'
import topicTransitions from '~/utils/transitions/topicTransitions'

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

const currentGameStore = useCurrentGameStore()

const fontSizeBase = ref(400)
const fontSize = ref(
  getRandomNumber(fontSizeBase.value - 50, fontSizeBase.value + 50),
)
const rotate = ref(getRandomNumber(-5, 5))
const translateX = ref(getRandomNumber(-5, 5))
const translateY = ref(getRandomNumber(-5, 5))
const countdownValue = ref(60)
const countdownInterval = ref<NodeJS.Timeout>()
onMounted(() => {
  countdownInterval.value = setInterval(() => {
    if (countdownValue.value === 1) {
      setTimeout(() => {
        currentGameStore.updateCurrentGame('state_select', {
          state: 'break',
        })
      }, 700)
    }

    if (countdownValue.value <= 0) {
      clearInterval(countdownInterval.value)

      return
    }

    rotate.value = getRandomNumber(-5, 5)
    translateX.value = getRandomNumber(-5, 5)
    translateY.value = getRandomNumber(-5, 5)
    fontSize.value = getRandomNumber(
      fontSizeBase.value - 50,
      fontSizeBase.value + 50,
    )

    if (countdownValue.value <= 10) {
      fontSizeBase.value += 30
    }

    if (countdownValue.value <= 3) {
      fontSizeBase.value += 60
    }

    countdownValue.value--
  }, 1000)
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }
})
</script>

<template>
  <div>
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
            src="~/assets/img/bg_countdown.png"
            alt=""
            class="q-absolute-full opacity-95 mix-blend-multiply object-cover"
          />

          <div
            class="q-absolute-full mix-blend-soft-light opacity-15 bg-[url('~/assets/img/noise.png')]"
          />
        </div>

        <h1
          class="js-text font-bold font-secondary z-10 text-surface-0 text-center q-absolute-full grid place-items-center will-change-[transform,opacity]"
        >
          <div
            :style="{
              willChange: 'font-size,transform',
              fontSize: `${fontSize}px`,
              lineHeight: 0.1,
              transform: `rotate(${rotate}deg) translate(${translateX}%, ${translateY}%)`,
            }"
          >
            {{ countdownValue }}
          </div>
        </h1>
      </div>
    </template>
  </div>
</template>
