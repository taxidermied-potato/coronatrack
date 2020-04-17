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
      <a className="pop cButton filled" href="https://github.com/taxidermied-potato/coronatrack" target="_blank" rel="noopener noreferrer"> <FaGithub /> Github </a>
      <img src={Help} className="heroImg" alt="lifebuoy"/>
      <a className="pop cButton" href="https://github.com/taxidermied-potato/coronatrack" target="_blank" rel="noopener noreferrer"> <FaCoffee /> Ko-fi </a>
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
