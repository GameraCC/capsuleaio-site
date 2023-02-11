import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import loader from 'components/loader.svg'
import 'components/App.css'

const Main = lazy(() => import('components/Main'))
const Redirect = lazy(() => import('components/Redirect'))
const NotFound = lazy(() => import('components/NotFound'))
const Shoutout = lazy(() => import('components/Shoutout'))
const EightBall = lazy(() => import('components/8Ball'))
const Dash = lazy(() => import('components/Dash'))
const Admin = lazy(() => import('components/Admin'))

const App = () => (
  <Router>
    <Suspense
      fallback={
        <div className="App">
          <header className="App-header">
            <img src={loader} alt="loading..." />
          </header>
        </div>
      }>
      <Switch>
        <Route exact path="/dash(|board)">
          <Dash />
        </Route>
        <Route exact path="/login">
          <Redirect to="https://discord.com/oauth2/authorize?client_id=760617790213587022&redirect_uri=https%3A%2F%2Fapi.capsuleaio.com%2Fv1%2Flogin&response_type=code&scope=identify%20email%20guilds%20guilds.join" />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/connor">
          <Shoutout msg="Privilege?" />
        </Route>
        <Route exact path="/shrill">
          <Shoutout msg="GET BACK TO WORK" />
        </Route>
        <Route exact path="/polo">
          <Shoutout msg="Where are the 4k followers?" />
        </Route>
        <Route exact path="/8ball">
          <EightBall />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  </Router>
)

export default App
