// Check if `text` is a url
export const textFromUrl = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  return params.get('text') || ''
}
