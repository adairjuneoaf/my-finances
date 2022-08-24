// Imports React
import React from 'react'

// Typings[TypeScript]
import { Option } from './types'

const OptionSelectComponent: React.FC<Option> = ({ id, title, status }) => {
  return (
    <option id={id} value={id} disabled={status === '0'} style={{ backgroundColor: '#353646' }}>
      {title}
    </option>
  )
}

export default OptionSelectComponent
