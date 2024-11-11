export default function (assetId: string) {
  const { $DIRECTUS_URL } = useNuxtApp()

  return `${$DIRECTUS_URL}/assets/${assetId}`
}
