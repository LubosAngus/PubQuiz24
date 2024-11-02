<script setup lang="ts">
import AdminLayoutMenu from '~/components/AdminLayoutMenu.vue'
</script>

<template>
  <div class="l-admin">
    <div class="l-admin__menu">
      <AdminLayoutMenu />
    </div>

    <div class="l-admin__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.l-admin {
  & {
    padding: 2rem;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
  }
  &__menu {
  }
  &__content {
  }
}
</style>
