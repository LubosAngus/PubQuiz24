export default function (): void {
  if (document.fullscreenElement) {
    return
  }

  document.documentElement.requestFullscreen()
}
