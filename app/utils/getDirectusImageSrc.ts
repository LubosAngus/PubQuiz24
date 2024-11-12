export type SizeKey = 2880 | 2400 | 1920 | 1440 | 960 | 480 | 240 | 120

export default function (imageId: string, sizeKey: SizeKey) {
  const baseImage = getDirectusAssetUrl(imageId)

  return `${baseImage}?key=${sizeKey}w`
}
