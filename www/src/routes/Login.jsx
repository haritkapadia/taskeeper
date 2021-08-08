import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const handleChange = (setFunc) => (event) => setFunc(event.target.value)

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={async (event) => {
        event.preventDefault()
        await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, password })
        })
        history.push('/logged-in')
      }}>
        <div>
          <label>
            Username
            <input type='text' value={name} onChange={handleChange(setName)} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type='password' value={password} onChange={handleChange(setPassword)} />
          </label>
        </div>
        <div>
          <input type='submit' value='Log in' />
        </div>
      </form>
    </>
  )
}

export default Login
