// Imports React
import { useEffect, useState } from 'react'

// Another Hooks Imports
import { useReactQuery } from './useReactQuery'

// Utils Imports
import { formatDateForMonthYear } from '../utils/formatDate'

type ChartDataState = Array<{ monthYear: string; income: number; outcome: number }> | []

export const useDataChart = () => {
  const [sumIncomeOutcomeMonthYear, setSumIncomeOutcomeMonthYear] = useState<ChartDataState>([])
  const [countIncomeOutcomeMonthYear, setCountIncomeOutcomeMonthYear] = useState<ChartDataState>([])

  const { transactions } = useReactQuery()

  const { data } = transactions

  useEffect(() => {
    const selectedDataToChart = data?.map((value) => {
      const dataFormated = {
        monthYear: formatDateForMonthYear(value.dateDueTransaction),
        value: value.valueTransaction,
        type: value.type,
      }

      return dataFormated
    })

    if (!selectedDataToChart) {
      return setSumIncomeOutcomeMonthYear([])
    }

    const formattingIncomeOutcomeMonthYear = Array.from(
      selectedDataToChart
        .reduce((result, object) => {
          const key = object.monthYear

          const objectReturn = {
            monthYear: object.monthYear,
          }

          const item =
            result.get(key) ||
            Object.assign({}, objectReturn, {
              income: 0,
              outcome: 0,
            })

          if (object.type === '1') {
            item.income += object.value
          }
          if (object.type === '0') {
            item.outcome += object.value
          }

          return result.set(key, item)
        }, new Map())
        .values(),
    ) as Array<{ monthYear: string; income: number; outcome: number }>

    setSumIncomeOutcomeMonthYear(formattingIncomeOutcomeMonthYear)

    const countingIncomeOutcomeMonthYear = Array.from(
      selectedDataToChart
        .reduce((result, object) => {
          const key = object.monthYear

          const objectReturn = {
            monthYear: object.monthYear,
          }

          const item =
            result.get(key) ||
            Object.assign({}, objectReturn, {
              income: 0,
              outcome: 0,
            })

          if (object.type === '1') {
            item.income += 1
          }
          if (object.type === '0') {
            item.outcome += 1
          }

          return result.set(key, item)
        }, new Map())
        .values(),
    ) as Array<{ monthYear: string; income: number; outcome: number }>

    setCountIncomeOutcomeMonthYear(countingIncomeOutcomeMonthYear)
  }, [data])

  console.log(countIncomeOutcomeMonthYear)

  return { sumIncomeOutcomeMonthYear, countIncomeOutcomeMonthYear }
}
