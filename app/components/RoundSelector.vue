<script setup lang="ts">
const gameDataStore = useGameDataStore()
const currentGameStore = useCurrentGameStore()

function getHeaderNameForRound(round) {
  const ret = []

  for (const topic of round.topics) {
    ret.push(topic.name)
  }

  return `#${round.index + 1} - ${ret.join(' - ')}`
}

function isRoundSelected(round) {
  if (!currentGameStore.data?.topic) {
    return false
  }

  return round.topics.some((topic) => {
    return topic.id === currentGameStore.data?.topic?.id
  })
}

watchEffect(() => {
  console.log(currentGameStore.data)
})
</script>

<template>
  <div v-if="!gameDataStore.data">
    <Skeleton height="2.44rem" width="10rem" />
  </div>

  <div v-else>
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
      <div
        v-for="round in gameDataStore.rounds"
        :key="round.index"
        :header="getHeaderNameForRound(round)"
        class="relative rounded p-4 hover:bg-sky-950 hover:border-sky-800 transition border"
        :class="{
          'bg-surface-900 border-surface-700': !isRoundSelected(round),
          'bg-sky-950 border-sky-800': isRoundSelected(round),
        }"
      >
        <button class="absolute top-0 left-0 w-full h-full z-50" />

        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="topic in round.topics"
            :key="topic.id"
            class="relative rounded overflow-hidden"
          >
            <div
              class="w-full h-full p-2 pl-3 bg-gray-950/75 aspect-video object-cover z-10 relative"
            >
              {{ topic.name }}
            </div>

            <DirectusImage
              v-if="topic.background_image"
              :image-id="topic.background_image"
              sizes="(min-width: 1536px) 13vw, (min-width: 1024px) 19vw, 31vw"
              class="absolute w-full h-full top-0 left-0 z-0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
