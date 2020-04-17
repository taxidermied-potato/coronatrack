import React from 'react'
import DashTop from './dashTop'
import DashSide from './dashSide'
import DashMain from './main'

import './dashboard.scss'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashTop />
      <DashSide />
      <div className="dashMain">
        <DashMain />
      </div>
    </div>
  )
}

export default Dashboard