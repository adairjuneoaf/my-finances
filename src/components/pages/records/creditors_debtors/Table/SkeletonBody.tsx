// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { Skeleton } from '../../../../common'

// Chakra Imports
import { Th, Tr } from '@chakra-ui/react'

// Typings[TypeScript]
type SkeletonBodyProps = {
  skeletonLines?: number
}

const SkeletonBody: React.FC<SkeletonBodyProps> = () => {
  return (
    <Fragment>
      <Tr>
        <Th width='10%'>
          <Skeleton isLoading>_</Skeleton>
        </Th>
        <Th width='20%'>
          <Skeleton isLoading>_</Skeleton>
        </Th>
        <Th width='60%'>
          <Skeleton isLoading>_</Skeleton>
        </Th>
        <Th width='10%'>
          <Skeleton isLoading>_</Skeleton>
        </Th>
      </Tr>
    </Fragment>
  )
}

export default SkeletonBody
