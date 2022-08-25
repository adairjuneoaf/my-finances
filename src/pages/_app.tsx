// Imports Next
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

// React-Query Imports
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Chakra UI Imports
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/inter'
import '@fontsource/roboto'

// Another Imports
import { theme } from '../styles/theme'

const isDevelopment = process.env.NODE_ENV === 'development'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        {isDevelopment && <ReactQueryDevtools />}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
