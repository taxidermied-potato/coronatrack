import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"

import Logo from "../images/logo.svg"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Switch } from 'antd';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { getSearchParams } from "gatsby-query-params";
import "../styles/ants.scss"

const Header = ({ siteTitle }) => {
  const darkMode = useSelector(state => state.darkMode);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  let param = getSearchParams().theme

  useEffect(() => {
    dispatch({ type: `SET_THEME`, urlParam: param })
  }, [dispatch, param])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <div className="desktopLinks">
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
            <Switch defaultChecked={darkMode ? true : false} checkedChildren={<FaMoon />} unCheckedChildren={<FaSun />} onChange={() => dispatch({ type: `SWAP_THEME` })} />
          </div>
        </div>
        <div className="mobileLinks">
          <div style={{ marginRight: '.75rem' }}>
            <Switch defaultChecked={darkMode ? true : false} checkedChildren={<FaMoon />} unCheckedChildren={<FaSun />} onChange={() => dispatch({ type: `SWAP_THEME` })} />
          </div>
          <button className="menuButton" onClick={handleClick}>
            <FaBars />
          </button>
          <Menu
            className="navMenu"
            id="simple-menu"
            elevation={4}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}> <Link to="/"> Dashboard </Link> </MenuItem>
            <MenuItem onClick={handleClose}> <Link to="/about"> About </Link> </MenuItem>
            <MenuItem onClick={handleClose}> <Link to="/contribute"> Contribute </Link> </MenuItem>
          </Menu>
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
