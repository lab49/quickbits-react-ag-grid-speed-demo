import React from 'react'
import { Flash } from '@lab49/react-value-flash'

import { DOWN_COLOR, UP_COLOR } from '../lib/colors'
import { formatPrice } from '../lib/formatters'

const PriceCellRenderer = props => {
  const { value } = props
  return (
    <Flash
      value={value}
      formatterFn={formatPrice}
      downColor={DOWN_COLOR}
      upColor={UP_COLOR}
      timeout={75}
      transitionLength={35}
    />
  )
}

export default PriceCellRenderer
