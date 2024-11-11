<script setup lang="ts">
const props = defineProps<{
  imageId: string
  sizes: string
}>()

const directusImage = getDirectusImage(props.imageId)
</script>

<template>
  <img
    :src="directusImage.getSrcByKey(960)"
    alt=""
    :srcset="directusImage.srcset"
    :sizes="props.sizes"
  />
</template>
