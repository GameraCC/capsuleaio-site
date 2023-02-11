import React, { useState, useRef, useEffect } from 'react'
import loader from 'components/loader.svg'
import { getUser, getUserCount, getConnectedUserCount } from './Api'
import { Button } from 'react-bootstrap'
import Ws from './ws'

const Admin = () => {
  const [state, setState] = useState({}),
    [user, setUser] = useState(undefined)
  const refState = useRef(state),
    refUser = useRef(user)

  let ws

  /**
   * If you try to reference state in useEffect, you will only
   * be able to see state as it was when useEffect was initially
   * read. The useEffect below will keep refState.current == state,
   * so you can reference refState or refUser in useEffect to see the current
   * state.
   */
  useEffect(() => {
    refState.current = state
    refUser.current = user
  }, [state, user])

  /**
   * Load the user once when the page is opened
   * Redirect if not admin or if error in get
   */
  useEffect(() => {
    const redirect = () => setTimeout(() => (window.location.href = '/login'), 0)

    getUser()
      .then(user => {
        if (!user.admin) redirect()
        
        setUser({
          ...user,
        })
        ws = new Ws()
      })
      .catch(() => redirect())
  }, [])

  /**
   * Function Examples
   * These are activated functions for testing
   *
   * TODO:
   * The page will then connect to v3 websocket which will update the page with
   * events when things like user count or connected users changes.
   */

  const GetUserCountBtn = () => (
    <Button
      className="w-50"
      variant="outline-primary"
      type="button"
      onClick={() => {
        const resetTimer = () =>
          setTimeout(() => setState({ ...state, userCount: 'User Count' }), 5000)

        getUserCount()
          .then(userCount => {
            resetTimer()
            setState({ ...state, userCount })
          })
          .catch(() => {
            resetTimer()
            setState({ ...state, userCount: 'Error' })
          })
      }}>
      {state.userCount ? state.userCount : 'User Count'}
    </Button>
  )

  /**
   * Content placeholder
   * This can be used like this, or require other modules
   * and pass parameters, or whatever
   */
  const content = (
    <>
      <p className="fade-in">Welcome, {user.email}.</p>
      Control Examples:
      <GetUserCountBtn />
    </>
  )

  /**
   * Return the page to the client
   */
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            /**
             * Styles can be written as inline objects like below:
             */
            style={{ height: '8em' }}
          />
        </Link>
        <h3>ADMIN DASH</h3>
        <div className="mt-3">{user ? content : <img src={loader} alt="loading..." />}</div>
      </header>
    </div>
  )
}

export default Admin
