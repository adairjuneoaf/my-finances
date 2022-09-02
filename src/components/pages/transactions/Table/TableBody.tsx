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
  VStack,
} from '@chakra-ui/react'

// Utils Imports
import { formatValueToMoney } from '../../../../utils/formatValueToMoney'

// Another Imports
import { FiMoreVertical } from 'react-icons/fi'

// Typings[TypeScript]
import { TransactionDataType } from '../../../../@types/TransactionDataType'

interface TableBodyProps extends TransactionDataType {
  index: number
}

const TableBody: React.FC<TableBodyProps> = ({
  index,
  id,
  type,
  status,
  title,
  valueTransaction,
}) => {
  return (
    <Fragment>
      <Tr>
        <Th fontSize='16px' color='gray.100'>
          {index}
        </Th>
        <Th fontSize='16px' color='gray.100'>
          <VStack alignItems={'flex-start'} spacing='0.5'>
            {status === '1' && (
              <Badge variant='solid' colorScheme='green' padding='3px' fontSize='10px'>
                CONCLUÍDO
              </Badge>
            )}
            {status === '0' && (
              <Badge variant='solid' colorScheme='yellow' padding='3px' fontSize='10px'>
                EM ABERTO
              </Badge>
            )}
            {type === '1' && (
              <Badge variant='solid' colorScheme='green' padding='3px' fontSize='10px'>
                ENTRADA
              </Badge>
            )}
            {type === '0' && (
              <Badge variant='solid' colorScheme='red' padding='3px' fontSize='10px'>
                SAÍDA
              </Badge>
            )}
          </VStack>
        </Th>
        <Th fontSize='16px' color='gray.100' textTransform='initial'>
          {title}
        </Th>
        <Th isNumeric fontSize='16px' color='gray.100'>
          {formatValueToMoney(valueTransaction)}
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
                  <PopoverActions id={id} />
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
