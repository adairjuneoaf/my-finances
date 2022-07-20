// Imports React
import React, { useContext } from 'react'

// Chakra Imports
import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// Contexts Imports
import { ContextDrawer } from '../../../contexts/contextDrawer'

// API Services
import { patchStatusUniqueCreditorDebtor } from '../../../services/api'

// Another Imports
import { FiEdit, FiEye, FiMoreVertical, FiPower } from 'react-icons/fi'

// Typings[TypeScript]
import { IPopoverSubMenu } from './types'

const PopoverSubMenuComponent: React.FC<IPopoverSubMenu> = ({ creditorDebtorID, status }) => {
  const { handleDrawerEditCreditorDebtor } = useContext(ContextDrawer)

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(patchStatusUniqueCreditorDebtor, {
    onSuccess: () => {
      queryClient.refetchQueries(['creditors_debtors'])
    },
  })

  const handleCreditorDebtorStatus = async (status: string) => {
    await mutateAsync(
      {
        id: creditorDebtorID,
        status,
      },
      {
        onSuccess: () => {
          console.info('Sucesso na mudança de status do Credor/Devedor. ✅')
        },
        onError: () => {
          console.warn('Error na mudança de status do Credor/Devedor! ❌')
        },
      },
    )
  }

  return (
    <Popover trigger='hover'>
      <Tooltip hasArrow label='Ações' shouldWrapChildren marginTop='3'>
        <PopoverTrigger>
          <Button backgroundColor='transparent' _hover={{ backgroundColor: 'gray.900' }}>
            <FiMoreVertical fontSize='24' color='white' />
          </Button>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent backgroundColor='gray.800' width='fit-content' borderColor='gray.700'>
        <PopoverBody>
          <HStack>
            <Tooltip hasArrow label='Detalhes'>
              <IconButton
                aria-label='more-details-creditorDebtor'
                icon={<FiEye fontSize='24' color='white' />}
                backgroundColor='blue.500'
                colorScheme='blue'
                disabled={isLoading}
              />
            </Tooltip>
            <Tooltip hasArrow label='Editar'>
              <IconButton
                aria-label='edit-creditorDebtor'
                icon={<FiEdit fontSize='24' color='white' />}
                backgroundColor='green.500'
                colorScheme='green'
                disabled={isLoading}
                onClick={() => {
                  handleDrawerEditCreditorDebtor(creditorDebtorID)
                }}
              />
            </Tooltip>
            {status === '1' ? (
              <Tooltip hasArrow label='Inativar'>
                <IconButton
                  aria-label='inactive-creditorDebtor'
                  icon={<FiPower fontSize='24' color='white' />}
                  backgroundColor='red.500'
                  colorScheme='red'
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={() => {
                    handleCreditorDebtorStatus('0')
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip hasArrow label='Ativar'>
                <IconButton
                  aria-label='active-creditorDebtor'
                  icon={<FiPower fontSize='24' color='white' />}
                  backgroundColor='green.500'
                  colorScheme='green'
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={() => {
                    handleCreditorDebtorStatus('1')
                  }}
                />
              </Tooltip>
            )}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverSubMenuComponent
