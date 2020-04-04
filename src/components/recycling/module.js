import React, { Component } from 'react'
import PropTypes from "prop-types"
import { FaDotCircle } from 'react-icons/fa';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import Draggable from 'react-draggable';
import { connect } from "react-redux"

class Module extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minimized: false,
      focused: false
    }
  }

  renderStat(stat, index) {
    return (
      <span className="stat" key={stat.desc + index}>
        <p className="statHeader"> {stat.num.toLocaleString()} <span className="under">{stat.desc} </span> </p>
        {stat.delta ?
          <div className="delta">
            {stat.delta > 0 ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
            <p> {Math.floor(stat.delta)}<span className="under">{(stat.delta - Math.floor(stat.delta)).toFixed(2).substr(1) + "%"} </span> </p>
          </div>
          :
          null
        }
      </span>
    )
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[20, 20]}
        scale={1}
        bounds="parent"
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div role="button" tabIndex="0" className={this.state.focused ? "card atFront" : "card atBack"} onFocus={() => this.setState({ focused: true })} onBlur={() => this.setState({ focused: false })}>
          <div className="cardHeader">
            <div className="title">
              <p> {this.props.type} {this.props.country ? "| " + this.props.country : ""} </p>
            </div>
            <div className="actions">
              <FaDotCircle className="pop min" onClick={() => this.setState({ minimized: !this.state.minimized })} />
              <FaDotCircle className="pop close" onClick={() => this.props.removeModule(this.props.id)}/>
            </div>
          </div>
          <div className={!this.state.minimized ? "cardBody moduleCollapseIn" : "cardBody moduleCollapseOut"}>
            {this.props.stats ? this.props.stats.map((stat, index) => this.renderStat(stat, index)) : null}
          </div>
          <div className="handle" />
        </div>
      </Draggable>
    )
  }
}

Module.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  stats: PropTypes.array.isRequired,
  removeModule: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return { removeModule: (id) => dispatch({ type: `REMOVE_MODULE`, item: id }) }
}

export default connect(null, mapDispatchToProps)(Module)