export const getParams = () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  return {
    intro: params.get('intro') || '',
    text: params.get('text') || '',
  }
}
