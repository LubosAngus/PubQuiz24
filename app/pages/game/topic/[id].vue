<script setup lang="ts">
import type { TransitionProps } from 'vue'
import useDynamicFontSize from '~/composable/useDynamicFontSize'
import useTopicTransitions from '~/composable/useTopicTransitions'

definePageMeta({
  middleware(to, from) {
    const topicTransitions = useTopicTransitions()

    to.meta.pageTransition = {
      css: false,
      mode: 'out-in',
      onEnter: topicTransitions.onEnter,
      onLeave: topicTransitions.onLeave,
    }

    if (!from.name) {
      return
    }

    const pageTransitionMap: {
      [key: string]: TransitionProps
    } = {
      'game-topic-id': {
        mode: 'in-out',
      },
      'index': {
        mode: 'in-out',
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
const topic = gameDataStore.getTopicById(route.params.id as string)!

const totalContentItems = 10
function getContentClipPath(index: number, total: number) {
  const startX = (100 / total) * index
  const endX = (100 / total) * (index + 1) + 0.4 / total

  return `polygon(${startX}% 0%, ${endX}% 0%, ${endX}% 100%, ${startX}% 100%)`
}

const fontSize = useDynamicFontSize(topic.name!)
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
          <div class="q-absolute-full bg-slate-950" />

          <div
            class="q-absolute-full opacity-60 bg-[linear-gradient(45deg,_#ff6e00,_#918c2b,_#34828f,_#015fe1)]"
          />

          <DirectusImage
            v-if="topic?.background_image"
            :size-key="2880"
            :image-id="topic?.background_image"
            class="q-absolute-full opacity-40 mix-blend-multiply object-cover"
          />

          <div
            class="q-absolute-full mix-blend-soft-light opacity-15 bg-[url('~/assets/img/noise.png')]"
          />
        </div>

        <h1
          class="js-text font-bold z-10 text-surface-0 text-center q-absolute-full grid place-items-center will-change-[transform,opacity]"
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
