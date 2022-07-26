// Imports React
import React, { Fragment } from 'react'

// Chakra Imports
import { Th, Tr } from '@chakra-ui/react'

const TableHead: React.FC = () => {
  return (
    <Fragment>
      <Tr>
        <Th width='5%' fontSize='14px' color='gray.200' fontWeight='extrabold'>
          #
        </Th>
        <Th width='8%' fontSize='14px' color='gray.200' fontWeight='extrabold'>
          TIPO
        </Th>
        <Th width='8%' fontSize='14px' color='gray.200' fontWeight='extrabold'>
          STATUS
        </Th>
        <Th fontSize='14px' color='gray.200' fontWeight='extrabold'>
          TÍTULO
        </Th>
        <Th isNumeric width='8%' fontSize='14px' color='gray.200' fontWeight='extrabold'>
          VALOR
        </Th>
        <Th width='2%' fontSize='14px' color='gray.200' fontWeight='extrabold'></Th>
      </Tr>
    </Fragment>
  )
}

export default TableHead
