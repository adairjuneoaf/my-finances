// Imports React
import { createContext } from 'react'

// Types[TypeScript]
import { ContextProviderProps, TransactionsPageContextProps } from '../../types'

const TransactionsPageContext = createContext({} as TransactionsPageContextProps)

export const TransactionsPageContextProvider = ({ children }: ContextProviderProps) => {

  return (
    <TransactionsPageContext.Provider value={{ value: false }}>{children}</TransactionsPageContext.Provider>
  )
}