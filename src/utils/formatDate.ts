// date-fns Imports
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = (dateValue: string) => {
  const dateFormatted = new Intl.DateTimeFormat('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateValue))

  return dateFormatted
}

export const formatDetailedDate = (dateValue: string | undefined) => {
  if (!dateValue) {
    return ''
  }

  const dateFormatted = format(new Date(dateValue), 'dd/MM/yyyy', {
    locale: ptBR,
  })

  return dateFormatted
}

export const formatDateForMonthYear = (dateValue: string | undefined) => {
  if (!dateValue) {
    return ''
  }

  const dateFormatted = format(new Date(dateValue), 'MM/yyyy', {
    locale: ptBR,
  })

  return dateFormatted
}

export const formatDateToNow = (dateValue: string | undefined) => {
  if (!dateValue) {
    return ''
  }

  const dateFormatted = formatDistanceToNow(new Date(dateValue), {
    addSuffix: true,
    locale: ptBR,
  })

  return dateFormatted
}
