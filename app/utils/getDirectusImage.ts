/**
 * TODO:
 *
 * This can be optimized. For every image there is, should be custom
 * a configuration, that would determine src, srcset, and sizes.
 *
 * This would allow me not preload all the images, but only those, that are
 * actually going to be shown on website.
 */

const sizesToGenerate = [2880, 2400, 1920, 1440, 960, 480, 240, 120] as const

type SizeKey = (typeof sizesToGenerate)[number]

export default function (imageId: string) {
  const baseImage = getDirectusAssetUrl(imageId)

  function getSrcByKey(key: SizeKey) {
    return `${baseImage}?key=${key}w`
  }

  const srcsetRaw = sizesToGenerate.map((size) => {
    return {
      size,
      src: getSrcByKey(size),
    }
  })

  const srcset = srcsetRaw
    .map((item) => {
      return `${item.src} ${item.size}w`
    })
    .join(', ')

  return {
    getSrcByKey,
    srcsetRaw,
    srcset,
  }
}
