<script setup lang="ts">
const currentGameStore = useCurrentGameStore()
const visible = defineModel<boolean>()
const { $directus, $readItems } = useNuxtApp()
const { data, execute, status } = await useAsyncData(
  'quizes',
  () => {
    return $directus.request(
      $readItems('quizes', {
        fields: ['id', 'name'],
      }),
    )
  },
  {
    immediate: false,
  },
)

async function selectQuiz() {
  if (currentGameStore.data?.quiz === selectedQuizId.value) {
    return closeDialog()
  }

  await currentGameStore.updateCurrentGame('select_quiz', {
    quiz: selectedQuizId.value,
    topic: null,
    question: null,
    round_index: null,
    state: 'logo',
  })

  closeDialog()
}

function closeDialog() {
  visible.value = false
}

const selectedQuizId = ref()
watch(visible, (newValue) => {
  if (!newValue) return

  selectedQuizId.value = currentGameStore.data?.quiz

  execute()
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Vyber kvíz"
    :style="{
      width: '25rem',
      maxWidth: '80vw',
    }"
    :draggable="false"
    :closable="false"
    :close-on-escape="!currentGameStore.isUpdating.has('select_quiz')"
  >
    <div class="mb-6">
      <Skeleton v-if="status === 'pending'" height="2.44rem" />

      <Select
        v-else
        v-model="selectedQuizId"
        :options="data"
        option-value="id"
        option-label="name"
        placeholder="Select a Country"
        class="w-full"
        :disabled="currentGameStore.isUpdating.has('select_quiz')"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Zrušiť"
        severity="secondary"
        variant="outlined"
        :disabled="currentGameStore.isUpdating.has('select_quiz')"
        size="small"
        @click="closeDialog"
      ></Button>

      <Button
        type="button"
        label="Uložiť"
        :loading="currentGameStore.isUpdating.has('select_quiz')"
        :disabled="
          currentGameStore.isUpdating.has('select_quiz') || status === 'pending'
        "
        size="small"
        @click="selectQuiz"
      ></Button>
    </div>
  </Dialog>
</template>
