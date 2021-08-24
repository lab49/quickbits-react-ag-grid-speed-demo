import { useDispatch, useSelector } from 'react-redux'

const Controls = () => {
  const dispatch = useDispatch()

  const rowData = useSelector(store => store.rowData)
  const percentChanging = useSelector(
    store => store.updateConfig.percentChanging
  )
  const tickDuration = useSelector(store => store.tickDuration)
  const tickWorkDuration = useSelector(store => store.tickWorkDuration)

  const onPercentChangingChange = ev => {
    dispatch({ type: 'SET_PERCENTCHANGING', payload: ev.target.value })
  }

  return (
    <div className="bg-green-50 w-full h-32 p-2 flex items-start">
      <div className="w-1/2 flex flex-col items-start">
        <div className="mb-4">{rowData?.length ?? 0} records loaded.</div>
        <input
          type="range"
          id="volume"
          name="volume"
          min="1"
          max="100"
          value={percentChanging}
          onChange={onPercentChangingChange}
        />
        <label className="pl-1" htmlFor="volume">
          {percentChanging}% of records updating per tick
        </label>
      </div>
      <div className="w-1/2 flex flex-col items-end">
        <div>tick @{tickDuration}ms</div>
        <div>tick work @{tickWorkDuration}ms</div>
      </div>
    </div>
  )
}

export default Controls
