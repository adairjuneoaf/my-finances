// Imports React
import React from 'react'

// Chakra Imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react'

// Typings[TypeScript]
import { TransactionDataType } from '../../../@types/TransactionDataType'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  data?: TransactionDataType
}

export const ModalDetailsTransaction: React.FC<IModalProps> = ({ isOpen, onClose, data }) => {
  return (
    <Modal
      closeOnEsc
      isCentered
      blockScrollOnMount
      closeOnOverlayClick
      size='4xl'
      colorScheme='gray'
      motionPreset='slideInBottom'
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent backgroundColor='gray.800'>
        <ModalHeader paddingTop='6' paddingX='8' fontSize='22px'>
          Detalhes do lançamento
        </ModalHeader>
        <ModalCloseButton marginTop='3' marginX='2' padding='5' />
        <ModalBody paddingX='8'>{JSON.stringify(data, null, 2)}</ModalBody>
        <ModalFooter
          paddingX='8'
          fontSize='12px'
          fontStyle='italic'
          color='gray.600'
          cursor='default'
          justifyContent='flex-start'
        >
          {data?.id}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
