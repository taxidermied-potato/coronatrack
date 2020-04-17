import React, { useState } from 'react'
import {
  TacoTable, DataType
} from 'react-taco-table'
import './table.scss'

function Table({ tableData }) {
  const [columns, setColumns] = useState([
    {
      id: 'country',
      type: DataType.String,
      header: 'Location',
    },
    {
      id: 'cases',
      type: DataType.Number,
      header: 'Cases',
      renderer(dat) {
        return dat.toLocaleString()
      }
    },
    {
      id: 'deaths',
      type: DataType.Number,
      header: 'Deaths',
      renderer(dat) {
        return dat.toLocaleString()
      }
    },
  ])

  function addDailies() {
    const dailyCases = {
      id: 'todayCases',
      type: DataType.Number,
      header: 'Today',
      renderer(dat) {
        return dat.toLocaleString()
      }
    }

    const dailyDeaths = {
      id: 'todayDeaths',
      type: DataType.Number,
      header: 'Today',
      renderer(dat) {
        return dat.toLocaleString()
      }
    }

    setColumns(columns.splice(3, 0, dailyDeaths))
    console.log(columns)
  }

  return (
    <div>
      {/* <button className="pop" onClick={() => addDailies()}>
        Toggle daily values
      </button> */}
      <TacoTable
        columns={columns}
        data={tableData}
        striped
        sortable
      />
    </div>
  )
}

export default Table