export function mimify(text: string) {
  let t = text || ''
  // Convierte a minúsculas
  t = t.toLowerCase()

  // Convierte todos los caracteres acentuados a sus equivalentes sin acento
  t = t.replace(/[áàäâ]/g, 'a')
  t = t.replace(/[éèëê]/g, 'e')
  t = t.replace(/[íìïî]/g, 'i')
  t = t.replace(/[óòöô]/g, 'o')
  t = t.replace(/[úùüû]/g, 'u')

  t = t.replace(/qu/g, 'k')
  t = t.replace(/ca|co|cu/g, 'ki')
  t = t.replace(/[aeou]/g, 'i')
  t = t.replace(/ii/g, 'ui')

  return t
}
