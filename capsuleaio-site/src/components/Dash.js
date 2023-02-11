import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser, activateKey, unbind } from 'components/Api'
import loader from 'components/loader.svg'
import logo from 'components/logo.svg'
import { Form, Button } from 'react-bootstrap'

// const testUser = {
//   id: '338201421549666313',
//   username: 'qqeyes',
//   avatar: '58ae5bc48be9d868b4a225730c912ad5',
//   discriminator: '1010',
//   public_flags: 0,
//   flags: 0,
//   email: 'qqeyes@gmail.com',
//   verified: true,
//   locale: 'en-US',
//   mfa_enabled: true,
//   premium_type: 2,
// }

const Dash = () => {
  const [user, setUser] = useState()
  const [validated, setValidated] = useState(false)
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) loadUser()

    // console.log(user)
  }, [user])

  const loadUser = async () => {
    try {
      const result = await getUser()

      setUser(result)
    } catch (err) {
      // console.error(err)
      setTimeout(() => (window.location.href = '/login'), 0)
    }
  }

  const licenseKeyFormSubmit = async e => {
    e.preventDefault()
    e.stopPropagation()

    const f = e.currentTarget
    if (f.checkValidity() === false) {
      setValidated(true)
      return
    }

    // set loading status
    setLoading(true)

    // make api call and get back updated user object
    try{
      const result = await activateKey(key)
      setTimeout(() => setUser(result), 150)          
    } catch {
      setKey('')
    }
    setValidated(true)
    setLoading(false)  
  }

  const unbindFormSubmit = async e => {
    e.preventDefault()
    e.stopPropagation()

    // set loading status
    setLoading(true)

    // make api call and get back updated user object
    try{
      const result = await unbind(key)
      setTimeout(() => setUser(result), 150)          
    } catch {
      setKey('')
    }
    setValidated(true)
    setLoading(false)
  }

  const activateKeyForm = (
    <Form
      noValidate
      validated={validated}
      style={{ position: 'relative' }}
      onSubmit={licenseKeyFormSubmit}>
      <Form.Control
        required
        type="text"
        placeholder="License Key"
        value={key}
        onChange={e => setKey(e.target.value)}
        onKeyDown={() => setValidated(false)}
      />
      <Form.Control.Feedback
        className="fade-in"
        style={{ position: 'absolute', fontSize: '60%' }}
        type="invalid">
        Invalid license key
      </Form.Control.Feedback>

      <Button className="mt-5 w-50" variant="outline-primary" type={loading ? 'button' : 'submit'}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? <img src={loader} height="24" alt="" /> : 'Activate'}
        </div>
      </Button>
    </Form>
  )

  const keyForm = (
    <>
    <h6>Your key</h6>
    <code>{user && user.key}</code>
    <h6>is activated.</h6>
    </>
  )

  const unbindForm = (
    <>
    <Form
      noValidate
      validated={validated}
      style={{ position: 'relative' }}
      onSubmit={unbindFormSubmit}>
      <Button className="mt-2 w-50" variant="outline-primary" type={loading ? 'button' : 'submit'}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? <img src={loader} height="24" alt="" /> : 'Unbind Key'}
        </div>
      </Button>
    </Form>
    </>
    
  )

  const content = user ? (
    <>
      <p className="fade-in">Welcome, {user.email}.</p>
      { user.key ? keyForm : activateKeyForm }
      { user.bind ? unbindForm : <></>}
    </>
  ) : (
    <img src={loader} alt="loading..." />
  )

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" style={{ height: '8em' }} />
        </Link>
        <h3>DASHBOARD</h3>
        <div className="mt-3">{content}</div>
      </header>
    </div>
  )
}

export default Dash
