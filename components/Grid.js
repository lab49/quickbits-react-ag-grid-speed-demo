import React from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { useSelector } from 'react-redux'

import { formatPrice } from '../lib/formatters'

import Controller from './Controller'
import DataLoader from './DataLoader'
import ChangeCellRenderer from './ChangeCellRenderer'
import PriceCellRenderer from './PriceCellRenderer'
import VolumeCellRenderer from './VolumeCellRenderer'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-dark.css'

const formatPriceValue = ({ value }) => formatPrice(value)

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
        frameworkComponents={{
          changeCellRenderer: ChangeCellRenderer,
          priceCellRenderer: PriceCellRenderer,
          volumeCellRenderer: VolumeCellRenderer,
        }}
      >
        <AgGridColumn field="sym" headerName="Symbol" checkboxSelection />
        <AgGridColumn
          field="close"
          type="numericColumn"
          valueFormatter={formatPriceValue}
        />
        <AgGridColumn
          field="open"
          type="numericColumn"
          valueFormatter={formatPriceValue}
        />
        <AgGridColumn
          field="last"
          type="numericColumn"
          cellRenderer="priceCellRenderer"
        />
        <AgGridColumn
          field="last"
          headerName="Change (%)"
          type="numericColumn"
          cellRenderer="changeCellRenderer"
        />
        <AgGridColumn
          field="vol"
          headerName="Vol (M)"
          type="numericColumn"
          cellRenderer="volumeCellRenderer"
        />
      </AgGridReact>
    </div>
  )
}

export default Grid
