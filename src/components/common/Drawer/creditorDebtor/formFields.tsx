// React Imports
import { Fragment, useContext, useEffect } from 'react'

// Chakra Imports
import {
  Radio,
  HStack,
  VStack,
  Button,
  FormLabel,
  DrawerBody,
  RadioGroup,
  FormControl,
  DrawerFooter,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'

// Component Imports
import { SkeletonComponent } from '../../Skeleton'
import { InputComponent } from '../../Form/Input'
import { InputTextAreaComponent } from '../../Form/InputTextArea'

// Context Imports
import { ContextDrawer } from '../../../../contexts/contextDrawer'

// ReactQuery Imports
import { useMutation, useQueryClient } from 'react-query'

// ReactHookForms Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// Validation Imports
import { formValidations } from './formValidations'

// API Services
import {
  getUniqueCreditorDebtor,
  postUniqueCreditorDebtor,
  putUniqueCreditorDebtor,
} from '../../../../services/api'

// Another Imports
import { v4 as uuid } from 'uuid'
import { FiEdit, FiSave, FiX } from 'react-icons/fi'

// Typings[TypeScript]
import { CreditorDebtorType } from '../../../../@types/CreditorDebtorType'

export const GetFormFieldsCreditorDebtor = () => {
  const { handleSubmit, register, formState, reset, control, setValue } =
    useForm<CreditorDebtorType>({
      resolver: yupResolver(formValidations),
      mode: 'onBlur',
      defaultValues: {
        title: '',
        status: '',
        anotherInformation: '',
      },
    })

  const {
    isEditing,
    disclosure,
    drawerType,
    creditorDebtorID,
    isLoadingDataForEdit,
    handleIsLoadingDataForEdit,
    handleResetCreditorDebtorID,
  } = useContext(ContextDrawer)

  const toast = useToast({
    position: 'top',
    duration: 1000 * 3, // 3 Seconds
    title: 'Credores/Devedores',
  })

  const { onClose } = disclosure

  const { errors, isSubmitting } = formState

  const queryClient = useQueryClient()

  const { mutateAsync: mutateAsyncNewCreditorDebtor } = useMutation(postUniqueCreditorDebtor, {
    onSuccess: () => {
      queryClient.refetchQueries(['creditors_debtors'])
    },
  })

  const { mutateAsync: mutateAsyncEditCreditorDebtor } = useMutation(putUniqueCreditorDebtor, {
    onSuccess: () => {
      queryClient.refetchQueries(['creditors_debtors'])
    },
  })

  const submitNewCreditorDebtor: SubmitHandler<
    Omit<CreditorDebtorType, 'id' | 'createdAt'>
  > = async (data) => {
    await mutateAsyncNewCreditorDebtor(
      {
        id: uuid(),
        createdAt: new Date().getTime(),
        ...data,
      },
      {
        onSuccess: () => {
          toast({ description: 'Credor/Devedor criado com sucesso!', status: 'success' })
          reset()
        },
        onError: () => {
          toast({ description: 'Erro na criação do Credor/Devedor.', status: 'error' })
        },
      },
    )
  }

  const submitEditCreditorDebtor: SubmitHandler<CreditorDebtorType> = async (data) => {
    await mutateAsyncEditCreditorDebtor(
      {
        id: data.id,
        data,
      },
      {
        onSuccess: () => {
          toast({ description: 'Credor/Devedor editado com sucesso!', status: 'success' })
          onClose()
          reset()
        },
        onError: () => {
          toast({ description: 'Erro na edição do Credor/Devedor.', status: 'error' })
        },
      },
    )
  }

  const cancelSubmitCreditorDebtor = () => {
    onClose()
    reset()

    if (isEditing) {
      handleResetCreditorDebtorID()
    }
  }

  useEffect(() => {
    if (creditorDebtorID !== null && drawerType === 'edit-creditor-debtor') {
      getUniqueCreditorDebtor(creditorDebtorID)
        .then((response) => {
          Object.entries(response).forEach(([name, value]) =>
            setValue(name as keyof CreditorDebtorType, value),
          )
        })
        .catch((error) => {
          onClose()
          console.log('Error', error)
        })
        .finally(() => {
          handleIsLoadingDataForEdit()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <Fragment>
      <DrawerBody
        as='form'
        width='100%'
        height='auto'
        gap='3'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#353646',
          },
        }}
      >
        <VStack spacing='3'>
          <InputComponent
            id='title'
            type='text'
            label='Nome do Credor/Devedor'
            isRequired
            isLoadingValue={isLoadingDataForEdit}
            {...register('title')}
            errorInput={errors.title}
          />
        </VStack>

        <HStack alignItems='flex-start'>
          <VStack alignItems='flex-start' flex='1'>
            <FormControl isInvalid={!!errors.status} isRequired>
              <FormLabel htmlFor='status' fontSize='lg' padding='0' marginY='2' fontWeight='medium'>
                Status do Credor/Devedor
              </FormLabel>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <SkeletonComponent isLoading={isLoadingDataForEdit}>
                    <RadioGroup {...field}>
                      <HStack spacing='3'>
                        <Radio value='0' colorScheme='red'>
                          Inativo
                        </Radio>
                        <Radio value='1' colorScheme='green'>
                          Ativo
                        </Radio>
                      </HStack>
                    </RadioGroup>
                  </SkeletonComponent>
                )}
              />
              {errors.status && <FormErrorMessage>{errors?.status.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </HStack>

        <VStack alignItems='flex-start' spacing='3'>
          <InputTextAreaComponent
            id='anotherInformation'
            label='Outras informações'
            isLoadingValue={isLoadingDataForEdit}
            placeholder='Outras informações relevantes sobre o Credor/Devedor...'
            {...register('anotherInformation')}
            errorInput={errors.anotherInformation}
          />
        </VStack>
      </DrawerBody>
      <DrawerFooter borderTop='2px' borderColor='gray.700'>
        <HStack>
          <Button
            type='button'
            leftIcon={<FiX fontSize='18' />}
            colorScheme='red'
            onClick={cancelSubmitCreditorDebtor}
            disabled={isSubmitting || isLoadingDataForEdit}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            colorScheme='green'
            isLoading={isSubmitting}
            leftIcon={
              drawerType === 'new-creditor-debtor' ? (
                <FiSave fontSize='18' />
              ) : (
                <FiEdit fontSize='18' />
              )
            }
            onClick={
              drawerType === 'new-creditor-debtor'
                ? handleSubmit(submitNewCreditorDebtor)
                : handleSubmit(submitEditCreditorDebtor)
            }
            disabled={isSubmitting || isLoadingDataForEdit}
          >
            Salvar
          </Button>
        </HStack>
      </DrawerFooter>
    </Fragment>
  )
}
