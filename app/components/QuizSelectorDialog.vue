<script setup lang="ts">
const currentGameStore = useCurrentGameStore()
const visible = defineModel<boolean>()
const { $directus, $readItems, $updateSingleton } = useNuxtApp()
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

const isUpdating = ref(false)

async function updateQuiz() {
  if (currentGameStore.data?.quiz.id === selectedQuizId.value) {
    return closeDialog()
  }

  isUpdating.value = true

  await $directus.request(
    $updateSingleton('current_game', {
      quiz: selectedQuizId.value,
      topic: null,
      question: null,
      state: 'logo',
    }),
  )

  isUpdating.value = false

  closeDialog()
}

function closeDialog() {
  visible.value = false
}

const selectedQuizId = ref()
watch(visible, (newValue) => {
  if (!newValue) return

  selectedQuizId.value = currentGameStore.data?.quiz?.id

  execute()
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Výber kvízu"
    :style="{
      width: '25rem',
      maxWidth: '80vw',
    }"
    :draggable="false"
    :closable="false"
    :close-on-escape="!isUpdating"
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
        :disabled="isUpdating"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Zrušiť"
        severity="secondary"
        variant="outlined"
        :disabled="isUpdating"
        @click="closeDialog"
      ></Button>

      <Button
        type="button"
        label="Uložiť"
        :loading="isUpdating"
        :disabled="isUpdating || status === 'pending'"
        @click="updateQuiz"
      ></Button>
    </div>
  </Dialog>
</template>
