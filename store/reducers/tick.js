import { randBool, randRange, roll } from '../../lib/rand'

const updateRow = row => {
  const { last, vol } = row

  const delta = Math.floor(randRange(1, Math.ceil(0.006 * last * 100))) / 100

  return {
    ...row,
    last: randBool() ? last + delta : last - delta,
    vol: vol + 1000,
  }
}

const maybeUpdateRow = percentChanging => row =>
  roll(100) < percentChanging ? updateRow(row) : row

const doUpdate = (dispatch, rowData, percentChanging) => {
  if (!rowData) return

  dispatch({
    type: 'SET_ROWDATA',
    payload: rowData.map(maybeUpdateRow(percentChanging)),
  })
}

const tick = (dispatch, getState) => {
  const startTime = Date.now()

  const {
    rowData,
    updateConfig: { percentChanging },
    tickDuration,
    ticking,
  } = getState()

  if (!ticking) return

  doUpdate(dispatch, rowData, percentChanging)

  const tickWorkDuration = Date.now() - startTime

  const timeout =
    tickWorkDuration > tickDuration ? 0 : tickDuration - tickWorkDuration

  dispatch({ type: 'SET_TICKWORKDURATION', payload: tickWorkDuration })
  setTimeout(() => dispatch(tick), timeout)
}

export default tick
