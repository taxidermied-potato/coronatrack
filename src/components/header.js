import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "../images/logo.svg"
import { Switch } from 'antd';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import "../styles/ants.scss"

const Header = ({ siteTitle }) => {
  const darkMode = useSelector(state => state.darkMode);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="nav">
        <Link
          className="logo"
          to="/"
        >
          <img className="logo" src={Logo} alt="logo" />
          <h1>
            {siteTitle}
          </h1>
        </Link>
        <span>
          v1.0
      </span>
        <span className="mlAuto" />
        <Link to="/">
          <h2> Dashboard </h2>
        </Link>
        <Link to="/about">
          <h2> About </h2>
        </Link>
        <Link to="/contribute">
          <h2> Contribute </h2>
        </Link>
        <div style={{ marginLeft: '1rem' }}>
          <Switch defaultChecked={darkMode ? true : false} checkedChildren={<FaMoon />} unCheckedChildren={<FaSun />} onChange={() => dispatch({ type: `SWAP_THEME`})} />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
  theme: false,
}

export default Header
