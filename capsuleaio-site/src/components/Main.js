import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'components/logo.svg'

const Main = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="my-5">Please be patient...</h1>
      <Link to="/dashboard" className="btn btn-outline-primary">Dashboard</Link>
    </header>
  </div>
)

export default Main
