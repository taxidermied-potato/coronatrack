import React from 'react'
import DashTop from './dashTop'
import DashSide from './dashSide'

import './dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashTop />
      <DashSide />
      <div className="dashMain">        
        <div className="card">
          <div className="cardBody">
          <p>Main</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard