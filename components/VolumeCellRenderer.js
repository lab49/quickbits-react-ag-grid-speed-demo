import React from 'react'
import { Flash } from '@lab49/react-value-flash'

import { CHANGE_COLOR } from '../lib/colors'
import { formatDecimal } from '../lib/formatters'

const VolumeCellRenderer = props => {
  const { value } = props
  return (
    <Flash
      value={value / 1000000}
      formatterFn={formatDecimal(3)}
      upColor={CHANGE_COLOR}
      timeout={75}
      transitionLength={35}
    />
  )
}

export default VolumeCellRenderer
