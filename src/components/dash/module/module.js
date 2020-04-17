import React, { useState, useLayoutEffect } from 'react'
import { FaDotCircle } from 'react-icons/fa';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { useDispatch } from "react-redux";

import Table from './table'

const { NovelCovid } = require('novelcovid');
const covid = new NovelCovid();

function Module({ id, type, subType, country, moduleLocation }) {
  const [minimized, setMinimized] = useState(true)
  const [stats, setStats] = useState([])
  const [data, setData] = useState([])

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let fetchData = async () => {
      let data = null
      let data2 = null

      if (type === 'stat') {
        let tData = []

        if (country[0] === 'All') {
          data = await covid.all()
          const res = await fetch('https://corona.lmao.ninja/v2/all?yesterday')
          data2 = await res.json()
        }
        else {
          const res2 = await fetch('https://corona.lmao.ninja/v2/countries/' + country[0])
          data = await res2.json()
          const res3 = await fetch('https://corona.lmao.ninja/v2/countries/' + country[0] + '?yesterday')
          data2 = await res3.json()
        }

        if (subType === 'deaths' || subType === "cases") {
          tData = [
            {
              desc: subType,
              num: data[subType],
              delta: (data['today' + capString(subType)] / (data[subType] - data['today' + capString(subType)])) * 100
            },
            {
              desc: (subType + ' today'),
              num: data['today' + capString(subType)],
              delta: ((data['today' + capString(subType)] - data2['today' + capString(subType)]) / data2['today' + capString(subType)]) * 100
            }
          ]
        }
        else if (subType === 'tests') {
          tData = [
            {
              desc: subType,
              num: data[subType],
              delta: ((data[subType] - data2[subType]) / data[subType]) * 100
            },
            {
              desc: subType + " per million",
              num: data["testsPerOneMillion"]
            }
          ]
        }
        else if (subType === 'breakdown') {
          tData = [
            {
              desc: 'critical',
              num: data.critical,
              delta: ((data.critical - data2.critical) / data2.critical) * 100
            },
            {
              desc: 'recovered',
              num: data.recovered,
              delta: ((data.recovered - data2.recovered) / data2.recovered) * 100
            }
          ]
        }

        setStats(tData)
      }
      else if (type === 'table') {
        data = await covid.countries()
        if (!(country.includes('All'))) {
          data = data.filter(el => country.includes(el.country))
        }
        if (subType) {
          data = subType(data)
        }
        setData(data)
      }

      setMinimized(false)
    }

    fetchData()
  }, [country, subType, type])

  function renderTitle() {
    if (type === "stat") {
      return capString(subType) + " " + (country[0] ? "| " + country[0] : "")
    }
    else if (type === "table") {
      return "Table"
    }
  }

  function capString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function renderBody() {
    if (type === "stat") {
      return stats.map((stat, index) => renderStat(stat, index))
    }
    else if (type === "table") {
      return <Table tableData={data} />
    }
  }

  function renderStat(stat, index) {
    return (
      <span className="stat" key={stat.desc + index}>
        <p className="statHeader"> {stat.num.toLocaleString()} <span className="under">{stat.desc} </span> </p>
        {stat.delta ?
          <div className="delta">
            {stat.delta > 0 ?
              <>
                <AiOutlineArrowUp />
                <p> {Math.floor(stat.delta)}<span className="under">{(stat.delta - Math.floor(stat.delta)).toFixed(2).substr(1) + "%"} </span> </p>
              </>
              :
              <>
                <AiOutlineArrowDown />
                <p> {Math.ceil(stat.delta)}<span className="under">{(Math.ceil(stat.delta) - stat.delta).toFixed(2).substr(1) + "%"} </span> </p>
              </>
            }
          </div>
          :
          null
        }
      </span>
    )
  }

  return (
    <div className="card">
      <div className="cardHeader">
        <div className="title">
          <p> {renderTitle()} </p>
        </div>
        <div className="actions">
          {moduleLocation === 'MAIN' ? null : <FaDotCircle className="pop min" onClick={() => setMinimized(!minimized)} />}    
          {/* <FaDotCircle className="pop min" onClick={() => setMinimized(!minimized)} />       */}
          <FaDotCircle className="pop close" onClick={() => dispatch({ type: `REMOVE_MODULE`, item: id, location: moduleLocation })} />
        </div>
      </div>
      <div className={!minimized ? "cardBody moduleCollapseIn" : "cardBody moduleCollapseOut"} style={type === 'table' ? { maxHeight: '20rem' } : null}>
        {renderBody()}
      </div>
    </div>
  )
}

export default Module
