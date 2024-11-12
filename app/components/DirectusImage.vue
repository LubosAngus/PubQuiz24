<script setup lang="ts">
import type { SizeKey } from '~/utils/getDirectusImageSrc'

const props = defineProps<{
  imageId: string
  sizeKey: SizeKey
}>()

const directusImageSrc = getDirectusImageSrc(props.imageId, props.sizeKey)
</script>

<template>
  <img :src="directusImageSrc" alt="" />
</template>
