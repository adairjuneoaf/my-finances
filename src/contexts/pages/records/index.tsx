// Imports React
import { createContext } from 'react'

// Types[TypeScript]
import { ContextProviderProps, RecordsPageContextProps } from '../../types'

const RecordsPageContext = createContext({} as RecordsPageContextProps)

export const RecordsPageContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <RecordsPageContext.Provider value={{ value: false }}>{children}</RecordsPageContext.Provider>
  )
}
