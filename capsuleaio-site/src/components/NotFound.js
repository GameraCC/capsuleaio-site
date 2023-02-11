import React from 'react'
import { Link } from 'react-router-dom'
import logo from 'components/logo.svg'

const NotFound = () => (
  <div className="App">
    <header className="App-header">
      <Link to="/">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ margin: '3em 0', height: '8em' }}
        />
      </Link>

      <h1>404 NOT FOUND</h1>
    </header>
  </div>
)

export default NotFound
