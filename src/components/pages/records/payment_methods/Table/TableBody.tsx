// Imports React
import React, { Fragment } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Components Imports
const PopoverSubMenu = dynamic(() => import('./PopoverSubMenu'))

// Chakra Imports
import { Badge, Th, Tr } from '@chakra-ui/react'

// Typings[TypeScript]
import { PaymentMethodType } from '../../../../../@types/PaymentMethodType'
interface TableBodyProps extends PaymentMethodType {
  index: number
}

const TableBody: React.FC<TableBodyProps> = ({ index, id, status, title }) => {
  return (
    <Fragment>
      <Tr>
        <Th fontSize='16px' color='gray.100'>
          {index}
        </Th>
        <Th fontSize='16px' color='gray.100'>
          {status === '1' && (
            <Badge variant='solid' colorScheme='green' padding='1'>
              ATIVO
            </Badge>
          )}
          {status === '0' && (
            <Badge variant='solid' colorScheme='red' padding='1'>
              INATIVO
            </Badge>
          )}
        </Th>
        <Th fontSize='16px' color='gray.100' textTransform='initial'>
          {title}
        </Th>
        <Th fontSize='16px' color='gray.100'>
          <PopoverSubMenu paymentMethodID={id} status={status} />
        </Th>
      </Tr>
    </Fragment>
  )
}

export default TableBody
