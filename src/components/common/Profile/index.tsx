// Imports React
import React from 'react'

// Imports next-auth
import { useSession } from 'next-auth/react'

// Chakra Imports
import { Avatar, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle } from '../Skeleton'

export const Profile: React.FC = () => {
  const { data, status } = useSession()

  return (
    <Wrap spacing='3' alignItems='center' display='flex' flexDirection='row' paddingX='4'>
      <WrapItem>
        {status === 'loading' ? (
          <SkeletonCircle isLoaded={!!(status === 'loading')} size='12' />
        ) : (
          <Avatar name={String(data?.user?.name)} src={String(data?.user?.image)} size='md' />
        )}
      </WrapItem>
      {status === 'loading' ? (
        <WrapItem flexDirection='column' gap='1'>
          <Skeleton isLoading={!!(status === 'loading')} width='24'>
            -
          </Skeleton>
          <Skeleton isLoading={!!(status === 'loading')} width='32'>
            -
          </Skeleton>
        </WrapItem>
      ) : (
        <WrapItem flexDirection='column' gap='1'>
          <Text as='h3' fontSize='18px' fontWeight='bold' color='gray.100'>
            {data?.user?.name}
          </Text>
          <Text as='p' fontSize='12px' fontWeight='medium' color='gray.500'>
            {data?.user?.email}
          </Text>
        </WrapItem>
      )}
    </Wrap>
  )
}
