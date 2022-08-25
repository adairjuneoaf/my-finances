// Imports React
import { Fragment, ReactNode } from 'react'

// Imports Chakra
import { Flex } from '@chakra-ui/react'

// Components Imports
import { Header, SideBarNavigation } from '../components/common'

type DefaultLayoutProps = {
  children?: ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <Flex width={'calc(100vw - 1px)'} height='auto' flexDirection='column'>
        <Header />

        <Flex
          gap='12'
          width='100%'
          marginTop='10'
          marginBottom='6'
          marginX='auto'
          maxWidth={1480}
          paddingX='6'
        >
          <Flex>
            <SideBarNavigation />
          </Flex>

          <Flex flexDirection='column' width='100%' flex='1'>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  )
}

export default DefaultLayout
