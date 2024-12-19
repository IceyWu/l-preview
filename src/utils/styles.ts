export const generateClassName = (baseClass: string, modifiers: Record<string, boolean | string | undefined>) => {
  const classes = [baseClass]
  
  Object.entries(modifiers).forEach(([key, value]) => {
    if (typeof value === 'boolean' && value) {
      classes.push(`${baseClass}--${key}`)
    } else if (typeof value === 'string') {
      classes.push(`${baseClass}--${value}`)
    }
  })
  
  return classes.join(' ')
}