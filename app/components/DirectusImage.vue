<script setup lang="ts">
const props = defineProps<{
  imageId: string
  sizes: string
}>()

const { $DIRECTUS_URL } = useNuxtApp()

const baseImage = `${$DIRECTUS_URL}/assets/${props.imageId}`

function getImageByKey(key: number) {
  return `${baseImage}?key=${key}w`
}

const sizesToGenerate = [2880, 2400, 1920, 1440, 960, 480, 240, 120]
const srcset = computed(() => {
  const result = []

  for (const size of sizesToGenerate) {
    result.push(`${getImageByKey(size)} ${size}w`)
  }

  return result.join(', ')
})
</script>

<template>
  <img :src="getImageByKey(960)" alt="" :srcset="srcset" :sizes="props.sizes" />
</template>
