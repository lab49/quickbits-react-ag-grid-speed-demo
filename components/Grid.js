import React from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { useSelector } from 'react-redux'

import Controller from './Controller'
import DataLoader from './DataLoader'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-dark.css'

const priceFormatter = field => params =>
  params.data[field]?.toFixed(2) ?? 'N/A'

const calculateChange = ({ data: { last, close } }) => {
  const diff = last - close
  return ((diff / close) * 100).toFixed(1)
}

const formatVol = ({ data: { vol } }) => `${(vol / 1000000).toFixed(3)}`

const Grid = () => {
  const gridApiRef = React.useRef()

  React.useEffect(() => {
    gridApiRef.current?.sizeColumnsToFit()
  }, [gridApiRef.current])

  const onGridSizeChanged = () => {
    gridApiRef.current?.sizeColumnsToFit()
  }

  const rowData = useSelector(store => store.rowData)

  return (
    <div className="ag-theme-dark bg-purple-50 w-full flex-1">
      <DataLoader />
      <Controller />
      <AgGridReact
        rowData={rowData}
        getRowNodeId={data => data.sym}
        immutableData
        suppressHorizontalScroll
        onGridSizeChanged={onGridSizeChanged}
        onGridReady={params => {
          gridApiRef.current = params.api
        }}
      >
        <AgGridColumn field="sym" headerName="Symbol" checkboxSelection />
        <AgGridColumn
          field="close"
          type="numericColumn"
          valueFormatter={priceFormatter('close')}
        />
        <AgGridColumn
          field="open"
          type="numericColumn"
          valueFormatter={priceFormatter('open')}
        />
        <AgGridColumn
          field="last"
          type="numericColumn"
          valueFormatter={priceFormatter('last')}
        />
        <AgGridColumn
          field="change"
          headerName="Change (%)"
          type="numericColumn"
          valueFormatter={calculateChange}
        />
        <AgGridColumn
          field="vol"
          headerName="Vol (M)"
          type="numericColumn"
          valueFormatter={formatVol}
        />
      </AgGridReact>
    </div>
  )
}

export default Grid
