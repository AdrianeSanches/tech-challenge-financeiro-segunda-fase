import { useState, useEffect } from 'react'

export function useClientFormattedDate(dateString: string | null | undefined) {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    if (dateString) {
      const date = new Date(dateString + 'T00:00:00')
      const finalDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      setFormattedDate(finalDate)
    }
  }, [dateString])
  return formattedDate
}

export function useClientFormattedMonth(dateString: string | null | undefined) {
  const [formattedMonth, setFormattedMonth] = useState('')
  useEffect(() => {
    if (dateString) {
      const date = new Date(dateString + 'T12:00:00')
      const finalMonth = date.toLocaleDateString('pt-BR', { month: 'long' })
      setFormattedMonth(finalMonth)
    }
  }, [dateString])
  return formattedMonth
}

