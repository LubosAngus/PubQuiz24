<script setup lang="ts">
import type { QuestionsEntity, TopicsEntity } from '~~/types/directus'

const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()

function selectTopic(topic: TopicsEntity) {
  currentGameStore.updateCurrentGame('topic_select', {
    topic: topic.id,
    question: null,
  })
}

function selectQuestion(topic: TopicsEntity, question: QuestionsEntity) {
  currentGameStore.updateCurrentGame('question_select', {
    topic: topic.id,
    question: question.id,
  })
}

function isQuestionSelected(question: QuestionsEntity) {
  return gameDataStore.selectedQuestionId === question.id
}
</script>

<template>
  <div v-if="!gameDataStore.selectedRound">
    <Message severity="info">Vyber kolo</Message>
  </div>

  <div v-else class="flex flex-col gap-8">
    <div
      v-for="(topic, index) in gameDataStore.selectedRound?.topics"
      :key="topic.id"
      class="flex flex-col gap-2"
    >
      <Button
        severity="contrast"
        type="button"
        class="w-fit text-left"
        :variant="
          gameDataStore.selectedTopicId !== topic.id ? 'outlined' : undefined
        "
        size="small"
        @click="selectTopic(topic)"
      >
        <div class="flex w-full gap-2 leading-5">
          <div class="font-bold italic text-slate-500">
            {{ `${gameDataStore.selectedRound.index + 1}.${index + 1}.` }}
          </div>

          <div class="flex flex-col font-semibold">{{ topic.name }}</div>
        </div>
      </Button>

      <div class="flex flex-col gap-2 pl-4">
        <template v-for="question in topic.questions" :key="question.id">
          <Button
            severity="contrast"
            type="button"
            class="w-fill text-left leading-5"
            :variant="!isQuestionSelected(question) ? 'outlined' : undefined"
            size="small"
            @click="selectQuestion(topic, question)"
          >
            <div class="w-full flex flex-col items-start gap-1">
              <div
                class="font-bold flex gap-2 leading-4"
                :class="{
                  'text-slate-500': !isQuestionSelected(question),
                  'text-slate-950': isQuestionSelected(question),
                }"
              >
                <div
                  v-if="
                    question.question_image ||
                    question.question_audio ||
                    question.question_video ||
                    question.question_video_link
                  "
                >
                  <font-awesome-icon
                    v-if="question.question_image"
                    :icon="['fas', 'image']"
                  />
                  <font-awesome-icon
                    v-if="question.question_audio"
                    :icon="['fas', 'music']"
                  />
                  <font-awesome-icon
                    v-if="question.question_video"
                    :icon="['fas', 'clapperboard']"
                  />
                  <font-awesome-icon
                    v-if="question.question_video_link"
                    :icon="['fab', 'youtube']"
                  />
                </div>

                <div v-html="question.question" />
              </div>

              <div
                class="font-semibold italic text-xs flex gap-2 leading-3"
                :class="{
                  'text-slate-600': !isQuestionSelected(question),
                  'text-slate-400': isQuestionSelected(question),
                }"
              >
                <div
                  v-if="
                    question.answer_image ||
                    question.answer_audio ||
                    question.answer_video ||
                    question.answer_video_link
                  "
                >
                  <font-awesome-icon
                    v-if="question.answer_image"
                    :icon="['fas', 'image']"
                  />
                  <font-awesome-icon
                    v-if="question.answer_audio"
                    :icon="['fas', 'music']"
                  />
                  <font-awesome-icon
                    v-if="question.answer_video"
                    :icon="['fas', 'clapperboard']"
                  />
                  <font-awesome-icon
                    v-if="question.answer_video_link"
                    :icon="['fab', 'youtube']"
                  />
                </div>

                <div v-html="question.answer" />
              </div>
            </div>
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
