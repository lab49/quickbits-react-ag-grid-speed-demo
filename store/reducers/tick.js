import { randBool, randRange, roll } from '../../lib/rand'

const updateRow = (rowData, offset) => {
  const row = rowData[offset]

  const delta =
    Math.floor(randRange(1, Math.ceil(0.006 * row.last * 100))) / 100

  const nextLast = randBool() ? row.last + delta : row.last - delta
  const nextVol = row.vol + 1000

  rowData[offset] = { ...row, last: nextLast, vol: nextVol }
}

const doUpdate = (dispatch, rowData, updateConfig) => {
  const { running, percentChanging } = updateConfig

  if (!running || !rowData) return

  for (let i = 0; i < rowData.length; i++) {
    if (roll(100) < percentChanging) {
      updateRow(rowData, i)
    }
  }

  dispatch({ type: 'SET_ROWDATA', payload: [...rowData] })
}

const tick = (dispatch, getState) => {
  const startTime = Date.now()

  const { rowData, updateConfig, tickDuration } = getState()

  doUpdate(dispatch, rowData, updateConfig)

  const tickWorkDuration = Date.now() - startTime

  const timeout =
    tickWorkDuration > tickDuration ? 0 : tickDuration - tickWorkDuration

  dispatch({ type: 'SET_TICKWORKDURATION', payload: tickWorkDuration })
  setTimeout(() => dispatch(tick), timeout)
}

export default tick
