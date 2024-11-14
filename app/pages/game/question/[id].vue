<script setup lang="ts">
import type { TransitionProps } from 'vue'
import questionTransitions from '~/utils/transitions/questionTransitions'

definePageMeta({
  middleware(to, from) {
    to.meta.pageTransition = {
      css: false,
      mode: 'out-in',
      onEnter: questionTransitions.onEnter,
      onLeave: questionTransitions.onLeave,
    }

    if (!from.name) {
      return
    }

    const pageTransitionMap: {
      [key: string]: TransitionProps
    } = {
      'game-question-id': {
        mode: 'in-out',
        onEnter: (el, done) => {
          questionTransitions.onEnter(el, done, 0.2)
        },
      },
      'game-topic-id': {
        mode: 'in-out',
        onEnter: (el, done) => {
          questionTransitions.onEnter(el, done, 0.35)
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

const question = computed(() => {
  return gameDataStore.getQuestionById(route.params.id as string)!
})

const showAnswer = ref(false)
const gameActionsStore = useGameActionsStore()
watch(
  () => gameActionsStore.data.action_pressed,
  async (actionPressed) => {
    if (actionPressed === null) return

    if (actionPressed === 'show_anser') {
      showAnswer.value = !showAnswer.value
    }
  },
)

/**
 * Currently is not possbile to have image and audio on same question.
 * Any combination of those two.
 */
const hasImage = computed(() => {
  return question.value.question_image || question.value.answer_image
})
</script>

<template>
  <div class="q-absolute-full text-center p-20">
    <div class="flex flex-col gap-4 h-full w-full justify-center">
      <div
        v-if="question?.question_audio || question?.answer_audio"
        class="relative mb-10 w-full h-[25dvh]"
      >
        <GameQuestionAudio :question="question" />
      </div>

      <div class="grid" :class="hasImage && 'h-full'">
        <transition
          @enter="questionTransitions.answerRevealOnEnter"
          @leave="questionTransitions.answerRevealOnLeave"
        >
          <GameQuestionInterface
            v-if="!showAnswer"
            class="col-span-full row-span-full will-change-[transform,clip-path]"
            :question="question"
          />

          <GameQuestionInterface
            v-else
            class="col-span-full row-span-full will-change-[transform,clip-path]"
            :question="question"
            :is-answer="true"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
small {
  font-size: 60%;
}
</style>
