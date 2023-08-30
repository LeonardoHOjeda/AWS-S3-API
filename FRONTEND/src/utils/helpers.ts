export const formatDate = (date: Date | null | undefined | string): string => {
  if (date == null) return ''

  const fecha = new Date(date)
  const dia = fecha.getUTCDate().toString().padStart(2, '0')
  const mes = fecha.toLocaleDateString('es-MX', { month: 'long' }).toLowerCase()
  const anio = fecha.getUTCFullYear()

  return `${dia} de ${mes} de ${anio}`
}
