// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { SkeletonComponent } from '../../../../common/Skeleton'

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
          <SkeletonComponent isLoading>_</SkeletonComponent>
        </Th>
        <Th width='20%'>
          <SkeletonComponent isLoading>_</SkeletonComponent>
        </Th>
        <Th width='60%'>
          <SkeletonComponent isLoading>_</SkeletonComponent>
        </Th>
        <Th width='10%'>
          <SkeletonComponent isLoading>_</SkeletonComponent>
        </Th>
      </Tr>
    </Fragment>
  )
}

export default SkeletonBody
