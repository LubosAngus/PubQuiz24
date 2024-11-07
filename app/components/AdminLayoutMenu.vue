<script setup lang="ts">
const items = ref([
  {
    label: 'Ahoj',
    route: '/admin',
  },
  {
    label: 'Kolo',
    route: '/admin/round',
  },
])
</script>

<template>
  <Menu :model="items">
    <template #item="{ item, props }">
      <RouterLink
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
        active-class="is-active"
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
  </Menu>
</template>
