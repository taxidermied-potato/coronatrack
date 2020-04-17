import React, { Component } from 'react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './dashmain.scss'

import Module from './module/module'
import GridLayout from 'react-grid-layout'

class DashMain extends Component {
  render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 4, minW: 2 },
      { i: 'b', x: 2, y: 0, w: 2, h: 4, minW: 2 },
      { i: 'c', x: 0, y: 2, w: 4, h: 8, minW: 4 }
    ];

    return (
      <GridLayout className="layout" layout={layout} cols={10} rowHeight={20} width={1200} useCSSTransforms={false}>
        <div key="a">
          <Module id='a' type='stat' subType='breakdown' country={['USA']} key='a' moduleLocation="MAIN" />
        </div>
        <div key="b">
          <Module id='b' type='stat' subType='tests' country={['USA']} key='b' moduleLocation="MAIN" />
        </div>
        <div key="c">
          <Module id='c' type='table' country={['USA', 'Italy', 'China', 'Spain']} key='c' moduleLocation="MAIN" />
        </div>
      </GridLayout>
    )
  }
}

export default DashMain