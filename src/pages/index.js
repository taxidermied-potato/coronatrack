import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Dashboard from "../components/dash/dashboard"
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

const IndexPage = () => {
  const [show, setShow] = useState(true)

  return (
    <Layout>
      <div className="homeContainer">
        <SEO title="Home" />

        <div className={show ? "containerSmall collapseIn" : "containerSmall collapseOut"}>
          <h2 className="highlight">Home</h2>
          <h3>To fellow quaranteers from across the globe, </h3>
          <p>Welcome to my customizable coronavirus (COVID-19) dashboard. I'm of the opinion that not many things should be indelible, so every modular component is collapsible, movable, and reproducible. </p>
        </div>
  
        {show ?
          <FaChevronUp className="pop" onClick={() => setShow(false)} />
          :
          <FaChevronDown className="pop" style={{ zIndex: "5" }} onClick={() => setShow(true)} />
        }
        <Dashboard />
      </div>
    </Layout>
  )

}

export default IndexPage
