// Imports React
import React, { Fragment, lazy, Suspense } from 'react'

// Components Imports
const PopoverActions = lazy(() => import('../PopoverActions'))

// Chakra Imports
import {
  Badge,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Th,
  Tooltip,
  Tr,
} from '@chakra-ui/react'

// Another Imports
import { FiMoreVertical } from 'react-icons/fi'

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
          <Popover isLazy trigger='hover'>
            <Tooltip hasArrow label='Ações' shouldWrapChildren marginTop='3'>
              <PopoverTrigger>
                <Button backgroundColor='transparent' _hover={{ backgroundColor: 'gray.900' }}>
                  <FiMoreVertical fontSize='24' color='white' />
                </Button>
              </PopoverTrigger>
            </Tooltip>
            <PopoverContent backgroundColor='gray.800' width='fit-content' borderColor='gray.700'>
              <PopoverArrow backgroundColor='gray.800' />
              <PopoverBody>
                <Suspense key={id}>
                  <PopoverActions id={id} status={status} />
                </Suspense>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Th>
      </Tr>
    </Fragment>
  )
}

export default TableBody
