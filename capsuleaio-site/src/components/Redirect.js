import React, { useEffect } from 'react'
import loader from 'components/loader.svg'

const Redirect = ({ to: location }) => {
  useEffect(() => setTimeout(() => (window.location.href = location), 0))

  return (
    <div className="App">
      <header className="App-header">
        <img src={loader} alt="loading..." />
      </header>
    </div>
  )
}

export default Redirect
