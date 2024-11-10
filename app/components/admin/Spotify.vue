<script setup lang="ts">
const spotifySdkStore = useSpotifySdkStore()
const dialogOpen = ref(false)

function toggleDialog() {
  dialogOpen.value = !dialogOpen.value
}
</script>

<template>
  <div class="c-spotify">
    <template v-if="!spotifySdkStore.sdk">
      <Button
        class="w-full"
        type="button"
        label="Autorizuj Spotify"
        size="small"
        @click.prevent="spotifySdkStore.initialize()"
      />
    </template>

    <template v-else-if="!spotifySdkStore.isInitialized">
      <Skeleton height="2.63rem" />
    </template>

    <template v-else>
      <div class="grid grid-cols-6 gap-1 mb-3">
        <Button
          type="button"
          class="aspect-square"
          @click="spotifySdkStore.togglePlayback()"
        >
          <font-awesome-icon
            :icon="[
              'fas',
              spotifySdkStore.isPlaying ? 'circle-pause' : 'circle-play',
            ]"
          />
        </Button>

        <Button
          type="button"
          class="aspect-square"
          variant="outlined"
          @click="spotifySdkStore.prevSong()"
        >
          <font-awesome-icon :icon="['fas', 'backward-step']" />
        </Button>

        <Button
          type="button"
          class="aspect-square"
          variant="outlined"
          @click="spotifySdkStore.nextSong()"
        >
          <font-awesome-icon :icon="['fas', 'forward-step']" />
        </Button>

        <Button
          type="button"
          class="aspect-square col-start-6"
          severity="secondary"
          variant="outlined"
          @click="toggleDialog()"
        >
          <font-awesome-icon :icon="['fas', 'house-laptop']" />
        </Button>
      </div>

      <div class="flex gap-3 items-center">
        <div class="w-5 text-left font-semibold text-xs text-slate-600">
          {{ spotifySdkStore.volume }}
        </div>

        <Slider
          v-model="spotifySdkStore.volume"
          variant="outlined"
          class="flex-1"
          @change="spotifySdkStore.changeVolume()"
          @slideend="spotifySdkStore.changeVolume()"
        />
      </div>

      <Dialog
        v-model:visible="dialogOpen"
        modal
        header="Vyber zariadenie"
        :style="{
          width: '25rem',
          maxWidth: '80vw',
        }"
      >
        <Select
          v-model="spotifySdkStore.selectedDeviceId"
          :options="spotifySdkStore.devices"
          option-value="id"
          option-label="name"
          class="w-full"
          @change="
            () => {
              spotifySdkStore.deviceChanged()
              toggleDialog()
            }
          "
        />
      </Dialog>
    </template>
  </div>
</template>

<style lang="scss">
.c-spotify {
  --p-primary-color: #1ed760;
  --p-button-primary-background: #1ed760;
  --p-button-primary-border-color: #1ed760;
  --p-button-outlined-primary-color: #1ed760;
  --p-button-outlined-primary-border-color: #1ed760;
  --p-slider-range-background: #1ed760;
  --p-slider-handle-focus-ring-color: #1ed760;
  --p-button-primary-focus-ring-color: #1ed760;
  --p-slider-border-radius: 10rem;
}
</style>
