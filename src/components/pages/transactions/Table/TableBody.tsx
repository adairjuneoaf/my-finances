// Imports React
import React, { Fragment } from 'react'

// Components Imports
import PopoverActions from '../PopoverActions'

// Chakra Imports
import { Badge, Button, Popover, PopoverTrigger, Th, Tooltip, Tr } from '@chakra-ui/react'

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
          {type === '1' && (
            <Badge variant='solid' colorScheme='green' padding='1'>
              ENTRADA
            </Badge>
          )}
          {type === '0' && (
            <Badge variant='solid' colorScheme='red' padding='1'>
              SAÍDA
            </Badge>
          )}
        </Th>
        <Th fontSize='16px' color='gray.100'>
          {status === '1' && (
            <Badge variant='solid' colorScheme='green' padding='1'>
              CONCLUÍDO
            </Badge>
          )}
          {status === '0' && (
            <Badge variant='solid' colorScheme='yellow' padding='1'>
              EM ABERTO
            </Badge>
          )}
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
            <PopoverActions id={id} />
          </Popover>
        </Th>
      </Tr>
    </Fragment>
  )
}

export default TableBody
