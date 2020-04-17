import React, { useState, useLayoutEffect } from 'react'
import { FaDotCircle } from 'react-icons/fa';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { useDispatch } from "react-redux";

import Table from './table'

const covid = require('novelcovid');

function Module({ id, mType, type, country, moduleLocation }) {
  const [minimized, setMinimized] = useState(true)
  const [stats, setStats] = useState([])

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let fetchData = async () => {
      let tData = []
      let data = null

      if (country === 'All') {
        data = await covid.getAll();
      }
      else {
        data = await covid.getCountry({ country: country });
      }

      const response2 = await fetch('https://corona.lmao.ninja/v2/historical/' + country)
      const data2 = await response2.json()

      let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date())
      let twoBefore = (d => new Date(d.setDate(d.getDate() - 2)))(new Date())

      if (type === 'deaths' || type === "cases") {
        let yesterdayData = null

        if (country === 'All') {
          yesterdayData = (data2[type][dateString(yesterday)] - data2[type][dateString(twoBefore)])
          const yesterdayAdjusted = yesterday
          yesterdayAdjusted.setHours(yesterdayAdjusted.getHours() + 2);
          let todayData = data[type] - data2[type][dateString(yesterdayAdjusted)]

          tData = [
            {
              desc: type,
              num: data[type],
              delta: (todayData / (data[type] - todayData)) * 100
            },
            {
              desc: (type + ' today'),
              num: todayData,
              delta: ((todayData - yesterdayData) / yesterdayData) * 100
            }
          ]
        }
        else {
          yesterdayData = (data2.timeline[type][dateString(yesterday)] - data2.timeline[type][dateString(twoBefore)])

          tData = [
            {
              desc: type,
              num: data[type],
              delta: (data['today' + capString(type)] / (data[type] - data['today' + capString(type)])) * 100
            },
            {
              desc: (type + ' today'),
              num: data['today' + capString(type)],
              delta: ((data['today' + capString(type)] - yesterdayData) / yesterdayData) * 100
            }
          ]
        }

      }
      else if (type === 'breakdown') {
        if (country === 'All') {
          tData = [
            {
              desc: 'active',
              num: data.active,
            },
            {
              desc: 'recovered',
              num: data.recovered,
            }
          ]
        }
        else {
          tData = [
            {
              desc: 'critical',
              num: data.critical,
            },
            {
              desc: 'recovered',
              num: data.recovered,
            }
          ]
        }
      }

      setStats(tData)
      setMinimized(false)
    }

    fetchData()
  }, [country, type])

  function dateString(date) {
    return (date.getMonth()) + 1 + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(2)
  }

  function capString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  function renderBody() {
    if (mType === "stat") {
      return stats.map((stat, index) => renderStat(stat, index))
    }
    else {
      return <Table />
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
          <p> {capString(type)} {country ? "| " + country : ""} </p>
        </div>
        <div className="actions">
          <FaDotCircle className="pop min" onClick={() => setMinimized(!minimized)} />
          <FaDotCircle className="pop close" onClick={() => dispatch({ type: `REMOVE_MODULE`, item: id, location: moduleLocation })} />
        </div>
      </div>
      <div className={!minimized ? "cardBody moduleCollapseIn" : "cardBody moduleCollapseOut"} style={mType === 'table' ? {maxHeight: '300px'} : null}>
        {renderBody()}
      </div>
    </div>
  )
}

export default Module
