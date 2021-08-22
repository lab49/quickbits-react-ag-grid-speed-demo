import React from 'react'
import { useDispatch } from 'react-redux'

import { randBool, randRange } from '../lib/rand'

import russell from '../russell3k.json'

const NUM_ROWS = 5000

const highVolume = 150000000
const lowVolume = 150000

const makeFakeRecordData = ({ sym, last }, i) => {
  const isUpToday = randBool()
  const pctChange = randRange(1, 13) // relative to last

  const diffFromClose = (pctChange / 100) * last
  const diffFromOpen = 0.9 * diffFromClose

  const close = isUpToday ? last - diffFromClose : last + diffFromClose
  const open = isUpToday ? last - diffFromOpen : last + diffFromOpen

  return {
    sym,
    close,
    open,
    last,
    vol:
      Math.round(
        (((highVolume - lowVolume) * (NUM_ROWS - i - 1)) / NUM_ROWS +
          lowVolume) /
          1000
      ) * 1000,
  }
}

const makeRowData = () => {
  const numRowsMissing = NUM_ROWS - russell.length

  const duplicateRecords = [...russell]
  duplicateRecords.splice(numRowsMissing)

  const fakeBShares = duplicateRecords.map(record => {
    const { sym } = record
    return { ...record, sym: `${sym}-B` }
  })

  const index5k = [...russell, ...fakeBShares]

  return index5k.map(makeFakeRecordData)
}

const DataLoader = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({ type: 'SET_ROWDATA', payload: makeRowData() })
  }, [])

  return null
}

export default DataLoader
