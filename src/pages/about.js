import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import GatsbyLogo from "../images/gatsby.svg"
import ReactLogo from "../images/react.svg"
import WMLogo from "../images/wmeters.svg"
import Avatar from "../images/avatar.png"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="containerLarge">
      <h2 className="highlight">About</h2>
      <h3>Boring stuff as follows,</h3>
      <p>
        No worries — humanity will persist. But in the mean time, I thought it
        prudent to make this. Sure, there's other stuff out there, but this is a bit more my style.
      </p>
      <div className="aboutContainer">
        <div className="card pop">
          <div className="cardHeader">
            <img src={GatsbyLogo} alt="gatsby logo" />
            <h1> + </h1>
            <img src={ReactLogo} alt="react logo" />
          </div>
          <div className="cardBody">
            <h2> Tech Stack </h2>
            <p> <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>, <a href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer"> Redux</a>, and static generation w/ <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</a>. </p>
          </div>
        </div>
        <div className="card pop">
          <div className="cardHeader">
            <img src={WMLogo} alt="worldometers logo" />
          </div>
          <div className="cardBody">
            <h2> <a href="https://github.com/NovelCOVID/API" target="_blank" rel="noopener noreferrer">API</a> Source </h2>
            <p> <a href="https://www.worldometers.info/coronavirus/" target="_blank" rel="noopener noreferrer">Worldometers</a> </p>
          </div>
        </div>
      </div>
      <p>
        On that topic, hello. I am a second year CS undergrad at the University of Maryland.
        Since school is more or less cancelled, I eat, sleep, and occasionally make things.
        If you're ever so inclined to contact me, I can be reached at <a href="mailto:ayin12@terpmail.umd.edu">ayin12@terpmail.umd.edu</a>.
        I'm graduating next year, so hit me up with job offers and internships.
      </p>
      <a href="https://altyin.com" target="_blank" rel="noopener noreferrer">
        <img src={Avatar} className="pop" style={{ width: '200px', margin: '.5rem' }} alt="avatar" />
      </a>
    </div>
    <div className="containerLarge">
      <h2 className="highlight">An Owner's Manual</h2>
      <p>
        Coming soon<sup>tm</sup>.
      </p>
    </div>
  </Layout>
)

export default AboutPage