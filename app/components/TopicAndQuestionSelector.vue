<script setup lang="ts">
const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()

function selectTopic(topic) {
  currentGameStore.updateCurrentGame('topic_select', {
    topic: topic.id,
    question: null,
  })
}

function selectQuestion(topic, question) {
  currentGameStore.updateCurrentGame('question_select', {
    topic: topic.id,
    question: question.id,
  })
}
</script>

<template>
  <div v-if="!gameDataStore.selectedRound">
    <Message severity="info">Vyber kolo</Message>
  </div>

  <div v-else class="flex flex-col gap-2">
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
            {{ `${currentGameStore?.data?.round_index + 1}.${index + 1}.` }}
          </div>

          <div class="flex flex-col font-semibold">{{ topic.name }}</div>
        </div>
      </Button>

      <div class="flex flex-col gap-2 pl-2">
        <template v-for="question in topic.questions" :key="question.id">
          <Button
            severity="contrast"
            type="button"
            class="w-fit text-left leading-5"
            :variant="
              gameDataStore.selectedQuestionId !== question.id
                ? 'outlined'
                : undefined
            "
            size="small"
            @click="selectQuestion(topic, question)"
          >
            <div class="flex flex-col items-start gap-1">
              <div
                class="font-bold"
                :class="{
                  'text-slate-500':
                    gameDataStore.selectedQuestionId !== question.id,
                  'text-slate-950':
                    gameDataStore.selectedQuestionId === question.id,
                }"
                v-html="question.question"
              />
              <div
                class="font-semibold italic text-xs"
                :class="{
                  'text-slate-600':
                    gameDataStore.selectedQuestionId !== question.id,
                  'text-slate-400':
                    gameDataStore.selectedQuestionId === question.id,
                }"
                v-html="question.answer"
              />
            </div>
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
