import NoSleep from 'nosleep.js'

export default defineNuxtPlugin(() => {
  const noSleep = new NoSleep()

  return {
    provide: {
      noSleep,
    },
  }
})
