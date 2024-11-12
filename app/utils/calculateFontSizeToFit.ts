export default function (
  text: string,
  {
    targetWidth,
    targetHeight,
    maxWidthPercentage = 0.8,
    maxHeightPercentage = 0.8,
  }: {
    targetWidth: number
    targetHeight: number
    maxWidthPercentage?: number
    maxHeightPercentage?: number
  },
): number {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  const desiredWidth = targetWidth * maxWidthPercentage
  const desiredHeight = targetHeight * maxHeightPercentage

  const fontSize = 100
  context.font = `bold ${fontSize}px Tomorrow`
  const width = context.measureText(text).width

  const scaleFactor = width / fontSize
  const calculatedFontSize = fontSize + (desiredWidth - width) / scaleFactor
  const heightLimitedFontSize = desiredHeight
  const finalFontSize = Math.min(calculatedFontSize, heightLimitedFontSize)

  return Math.round(finalFontSize * 10) / 10
}
