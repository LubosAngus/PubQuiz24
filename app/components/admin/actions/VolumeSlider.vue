<script setup lang="ts">
import useMediaVolumeSlider from '~/composable/useMediaVolumeSlider'

const volumeSlider = useMediaVolumeSlider()
</script>

<template>
  <div class="flex gap-3 items-center c-volume-slider">
    <div class="w-5 text-left font-semibold text-xs text-slate-600">
      {{ volumeSlider.volume }}
    </div>

    <Slider
      v-model="volumeSlider.volume.value"
      variant="outlined"
      class="flex-1"
      @change="volumeSlider.changeVolume()"
      @slideend="volumeSlider.changeVolume()"
    />
  </div>
</template>

<style lang="scss" scoped>
.c-volume-slider {
  --p-slider-range-background: var(--p-surface-400);
  --p-slider-handle-focus-ring-color: var(--p-surface-400);
  --p-slider-border-radius: 10rem;
}
</style>
