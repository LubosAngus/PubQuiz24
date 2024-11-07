<script setup lang="ts">
import AdminLayoutMenu from '~/components/AdminLayoutMenu.vue'
</script>

<template>
  <div class="flex flex-row gap-4 p-4">
    <div class="flex-1 max-w-52">
      <QuizSelector class="mb-4" />

      <AdminLayoutMenu />
    </div>

    <div class="flex-auto">
      <slot />
    </div>
  </div>
</template>
