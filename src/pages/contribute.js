import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Help from "../images/help.svg"
import { FaGithub, FaCoffee } from 'react-icons/fa';

const SecondPage = () => (
  <Layout>
    <SEO title="Contribute" />
    <div className="containerSmall">
      <h2 className="highlight">Contribute</h2>
      <h3>Help us improve CoronaTrack</h3>
      <p>
        Want to help out with development?
        Found a bug or have recommendations?
        Head over to our Github repository.
        Consider donating a cup of coffee too.
      </p>
    </div>
    <div className="btnGroup">
      <button className="filled pop"> <FaGithub /> Github </button>
      <img src={Help} className="heroImg" alt="lifebuoy"/>
      <button className="pop"> <FaCoffee /> Ko-fi </button>
    </div>    
    {/* <div className="containerSmall">
      <p>
        Many thanks for your contributions!
      </p>
      <img></img>
    </div> */}    
  </Layout>
)


export default SecondPage
