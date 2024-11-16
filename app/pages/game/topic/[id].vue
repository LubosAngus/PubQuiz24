<script setup lang="ts">
import type { TransitionProps } from 'vue'
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

const route = useRoute()
const gameDataStore = useGameDataStore()
const topic = computed(() => {
  return gameDataStore.getTopicById(route.params.id as string)!
})

const totalContentItems = 10
function getContentClipPath(index: number, total: number) {
  const startX = (100 / total) * index
  const endX = (100 / total) * (index + 1) + 0.4 / total

  return `polygon(${startX}% 0%, ${endX}% 0%, ${endX}% 100%, ${startX}% 100%)`
}

const fontSize = useDynamicFontSize(topic.value.name!)
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
          <div class="q-absolute-full bg-slate-700" />

          <div
            class="q-absolute-full opacity-80 bg-[linear-gradient(45deg,_#ff7600,_#a5a11c,_#1da58d,_#1e74eb)]"
          />

          <DirectusImage
            v-if="topic?.background_image"
            :size-key="2880"
            :image-id="topic?.background_image"
            class="q-absolute-full opacity-70 mix-blend-multiply object-cover"
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
        >
          {{ topic?.name }}
        </h1>
      </div>
    </template>
  </div>
</template>
