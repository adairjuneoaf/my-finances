// Imports React
import { useEffect, useReducer } from 'react'

// Another Hooks Imports
import { useReactQuery } from './useReactQuery'

// Utils Imports
import { formatDateForMonthYear } from '../utils/formatDate'

enum ActionTypes {
  DEFAULT = 'DEFAULT',
  SUM_INCOME_OUTCOME = 'SUM_INCOME_OUTCOME',
  COUNT_INCOME_OUTCOME = 'COUNT_INCOME_OUTCOME',
}

type IncomeOutcomeMonthYear = { monthYear: string; income: number; outcome: number }

type DataChartState = {
  sumIncomeOutcomeMonthYear: Array<IncomeOutcomeMonthYear>
  countIncomeOutcomeMonthYear: Array<IncomeOutcomeMonthYear>
}

type DataChartActions =
  | {
      type: ActionTypes.DEFAULT
    }
  | {
      type: ActionTypes.SUM_INCOME_OUTCOME
      payload: {
        sumIncomeOutcomeMonthYear: Array<IncomeOutcomeMonthYear>
      }
    }
  | {
      type: ActionTypes.COUNT_INCOME_OUTCOME
      payload: {
        countIncomeOutcomeMonthYear: Array<IncomeOutcomeMonthYear>
      }
    }

const DataChartReducer = (state: DataChartState, action: DataChartActions) => {
  switch (action.type) {
    case ActionTypes.COUNT_INCOME_OUTCOME: {
      return {
        ...state,
        countIncomeOutcomeMonthYear: action.payload.countIncomeOutcomeMonthYear,
      }
    }

    case ActionTypes.SUM_INCOME_OUTCOME: {
      return {
        ...state,
        sumIncomeOutcomeMonthYear: action.payload.sumIncomeOutcomeMonthYear,
      }
    }

    case ActionTypes.DEFAULT: {
      return state
    }

    default: {
      return state
    }
  }
}

export const useDataChart = () => {
  const [DataChartState, dispatch] = useReducer(DataChartReducer, {
    sumIncomeOutcomeMonthYear: [],
    countIncomeOutcomeMonthYear: [],
  })

  const { transactions } = useReactQuery()

  const { data } = transactions

  const { countIncomeOutcomeMonthYear, sumIncomeOutcomeMonthYear } = DataChartState

  useEffect(() => {
    const selectedDataToChart = data?.map((value) => {
      const dataFormatted = {
        monthYear: formatDateForMonthYear(value.dateDueTransaction),
        value: value.valueTransaction,
        type: value.type,
      }

      return dataFormatted
    })

    if (!selectedDataToChart) {
      return dispatch({
        type: ActionTypes.DEFAULT,
      })
    }

    const formattingSumIncomeOutcomeMonthYear = Array.from(
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

    dispatch({
      type: ActionTypes.SUM_INCOME_OUTCOME,
      payload: {
        sumIncomeOutcomeMonthYear: formattingSumIncomeOutcomeMonthYear,
      },
    })

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

    dispatch({
      type: ActionTypes.COUNT_INCOME_OUTCOME,
      payload: {
        countIncomeOutcomeMonthYear: countingIncomeOutcomeMonthYear,
      },
    })
  }, [data])

  return { countIncomeOutcomeMonthYear, sumIncomeOutcomeMonthYear }
}
