<script setup lang="ts">
const { imageId } = defineProps<{
  imageId: string
}>()
</script>

<template>
  <DirectusImage
    :size-key="2880"
    :image-id="imageId"
    class="w-full h-full absolute object-contain will-change-[opacity, transform] js-image"
  />
</template>
