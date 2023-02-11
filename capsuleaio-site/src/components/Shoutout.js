import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'components/logo.svg'

const Shoutout = ({ msg }) => (
  <div className="App">
    <header className="App-header">
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" style={{ height: '8em' }} />
      </Link>
      <h3 className="fade-in" style={{ marginBottom: 0, marginTop: '2em' }}>{msg}</h3>
    </header>
  </div>
)

export default Shoutout
