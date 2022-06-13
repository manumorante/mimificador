export const noCopy = () => {
  const isSupported = Boolean(
    navigator.clipboard && navigator.clipboard.writeText
  )
  return isSupported
}
