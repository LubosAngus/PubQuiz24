export default function (
  text: string,
  maxWidthPercentage?: number,
  maxHeightPercentage?: number,
) {
  const fontSize = ref(100)

  function calculateFontSize() {
    fontSize.value = calculateFontSizeToFit(text, {
      targetWidth: window.innerWidth,
      targetHeight: window.innerHeight,
      maxWidthPercentage,
      maxHeightPercentage,
    })
  }

  onBeforeMount(() => {
    window.addEventListener('resize', calculateFontSize)

    calculateFontSize()
  })

  onMounted(() => {
    calculateFontSize()
  })

  onUnmounted(() => {
    window.removeEventListener('load', calculateFontSize)
  })

  return fontSize
}
