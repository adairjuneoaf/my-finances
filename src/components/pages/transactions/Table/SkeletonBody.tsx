// Imports React
import React, { Fragment } from 'react'

// Components Imports
import { SkeletonText } from '../../../common'

// Chakra Imports
import { Th, Tr } from '@chakra-ui/react'

// Typings[TypeScript]
type SkeletonBodyProps = {
  isLoading: boolean
  skeletonLines?: number
}

const SkeletonBody: React.FC<SkeletonBodyProps> = ({ isLoading }) => {
  return (
    <Fragment>
      <Tr>
        <Th width='5%'>
          <SkeletonText isLoading={isLoading}>#</SkeletonText>
        </Th>
        <Th width='10%'>
          <SkeletonText isLoading={isLoading} noOfLines={2}>
            _
          </SkeletonText>
        </Th>
        <Th>
          <SkeletonText isLoading={isLoading}>_</SkeletonText>
        </Th>
        <Th width='15%' isNumeric>
          <SkeletonText isLoading={isLoading}>_</SkeletonText>
        </Th>
        <Th width='5%'>
          <SkeletonText isLoading={isLoading}>_</SkeletonText>
        </Th>
      </Tr>
    </Fragment>
  )
}

export default SkeletonBody
