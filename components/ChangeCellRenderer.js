import React from 'react'
import { Flash } from '@lab49/react-value-flash'

import { DOWN_COLOR, UP_COLOR } from '../lib/colors'
import { formatDecimal } from '../lib/formatters'

const calculateChange = (last, close) =>
  last == null || close == null ? undefined : ((last - close) / close) * 100

const ChangeCellRenderer = ({ data, value }) => {
  const { last, close } = data ?? {}

  return (
    <Flash
      value={calculateChange(last, close)}
      formatterFn={formatDecimal(1)}
      downColor={DOWN_COLOR}
      upColor={UP_COLOR}
      timeout={75}
      transitionLength={35}
    />
  )
}

export default ChangeCellRenderer
