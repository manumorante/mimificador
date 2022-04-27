export function mimify(stringParam) {
  let t = stringParam || ''
  t = t.toLowerCase()
  t = t.replace(/qu/g, 'k')
  t = t.replace(/ca|co|cu/g, 'ki')
  t = t.replace(/[aeou]/g, 'i')
  t = t.replace(/[áéóú]/g, 'í')
  t = t.replace(/ii/g, 'ui')
  
  return t
}