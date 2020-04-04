import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import Header from "./header"
import "../styles/layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [inProp, setInProp] = useState(false)

  useEffect(() => {
    setInProp(true)
  }, [])

  const darkMode = useSelector(state => state.darkMode);

  return (
    <div className={darkMode ? "body dark" : "body light"}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <CSSTransition
        in={inProp}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="content">
          <main>{children}</main>
        </div>
      </CSSTransition>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
