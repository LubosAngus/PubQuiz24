<script setup lang="ts">
const items = ref([
  {
    label: 'Dashboard',
    icon: 'house',
    route: '/admin',
  },
])
</script>

<template>
  <div class="card flex justify-center">
    <Menu :model="items">
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <FontAwesomeIcon :icon="`fa-solid fa-${item.icon}`" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </div>
</template>
