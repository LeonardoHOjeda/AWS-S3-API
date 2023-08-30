import { ref, watchEffect } from 'vue'

export function useMediaQuery(minWidth: number, callback: (matches: boolean) => void): () => void {
  const matches = ref(window.innerWidth >= minWidth)

  const handleResize = (): void => {
    matches.value = window.innerWidth >= minWidth
  }

  watchEffect(() => {
    callback(matches.value)
  })

  window.addEventListener('resize', handleResize)

  // Cleanup the event listener when the component is unmounted
  const cleanup = (): void => {
    window.removeEventListener('resize', handleResize)
  }

  return cleanup
}
