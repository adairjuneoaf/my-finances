// date-fns Imports
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = (dateValue: number) => {
  const dateFormatted = new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateValue)

  return dateFormatted
}

export const formatDetailedDate = (dateValue: number | undefined) => {
  if (!dateValue) {
    return ''
  }

  const dateFormatted = format(dateValue, 'dd/MM/yyyy', {
    locale: ptBR,
  })

  return dateFormatted
}

export const formatDateForMonthYear = (dateValue: number | undefined) => {
  if (!dateValue) {
    return ''
  }

  const dateFormatted = format(dateValue, 'MM/yyyy', {
    locale: ptBR,
  })

  return dateFormatted
}

export const formatDateToNow = (dateValue: number | undefined) => {
  if (!dateValue) {
    return ''
  }

  const dateFormated = formatDistanceToNow(dateValue, {
    addSuffix: true,
    locale: ptBR,
  })

  return dateFormated
}
