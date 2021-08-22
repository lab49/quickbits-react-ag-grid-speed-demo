import { randBool, randRange, roll } from '../../lib/rand'

const updateRow = (rowData, offset) => {
  const row = rowData[offset]

  const delta =
    Math.floor(randRange(1, Math.ceil(0.006 * row.last * 100))) / 100

  const nextLast = randBool() ? row.last + delta : row.last - delta
  const nextVol = row.vol + 1000

  rowData[offset] = { ...row, last: nextLast, vol: nextVol }
}

const updateRow2 = (rowData, offset) => {
  const row = rowData[offset]

  const delta =
    Math.floor(randRange(1, Math.ceil(0.006 * row.last * 100))) / 100

  const nextLast = randBool() ? row.last + delta : row.last - delta
  const nextVol = row.vol + 1000

  rowData[offset].last = nextLast
  rowData[offset].vol = nextVol
}

const doUpdate = (dispatch, rowData, updateConfig) => {
  const { running, percentChanging } = updateConfig

  if (!running || !rowData) return

  for (let i = 0; i < rowData.length; i++) {
    if (roll(100) < percentChanging) {
      // either works mutating or replacing the row
      if (randBool()) updateRow(rowData, i)
      else updateRow2(rowData, i)
    }
  }

  dispatch({ type: 'SET_ROWDATA', payload: [...rowData] })
}

const tick = (dispatch, getState) => {
  const startTime = Date.now()

  const { rowData, updateConfig, tickDuration } = getState()

  const tickWorkDuration = Date.now() - startTime

  doUpdate(dispatch, rowData, updateConfig)

  const timeout =
    tickWorkDuration > tickDuration ? 0 : tickDuration - tickWorkDuration

  setTimeout(() => dispatch(tick), timeout)
}

export default tick
