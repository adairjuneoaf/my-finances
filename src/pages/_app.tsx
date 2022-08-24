// Imports Next
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

// React-Query Imports
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Chakra UI Imports
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/roboto'
import '@fontsource/inter'

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
