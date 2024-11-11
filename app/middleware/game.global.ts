export default defineNuxtRouteMiddleware((to, from) => {
  if (from.name === undefined && to.name?.toString().startsWith('game-')) {
    return navigateTo('/', {
      external: true,
    })
  }
})
