// Imports React
import { createContext } from 'react'

// Types[TypeScript]
import { ContextProviderProps, DashboardPageContextProps } from '../../types'

const DashboardPageContext = createContext({} as DashboardPageContextProps)

export const DashboardPageContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <DashboardPageContext.Provider value={{ value: false }}>
      {children}
    </DashboardPageContext.Provider>
  )
}
