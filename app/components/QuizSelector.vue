<script setup lang="ts">
import type { QuizesEntity } from '~~/types/directus'

const op = ref()
const { $directus, $readItems, $readSingleton, $updateSingleton } = useNuxtApp()

const { data: currentGame } = await useAsyncData('current_game', () => {
  return $directus.request(
    $readSingleton('current_game', {
      fields: [{ quiz: ['name'] }],
    }),
  )
})

const togglePopover = (event: Event) => {
  op.value.toggle(event)
}

const selectQuiz = (quiz: Partial<QuizesEntity>) => {
  op.value.hide()
}
</script>

<template>
  <div>
    <pre>{{ currentGame }}</pre>

    <Button
      type="button"
      :label="currentGame?.quiz?.name || 'Vyber kvíz'"
      class="min-w-48"
      @click="togglePopover"
    />

    <Popover ref="op">
      <div class="flex flex-col gap-4">
        <div>
          <span class="font-medium block mb-2">Quizes</span>

          <ul class="list-none p-0 m-0 flex flex-col">
            <li
              v-for="quiz in quizes"
              :key="quiz.id"
              class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
              @click="selectQuiz(quiz)"
            >
              {{ quiz.name }}
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  </div>
</template>
