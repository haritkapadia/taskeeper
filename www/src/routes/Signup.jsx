import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const handleChange = (setFunc) => (event) => setFunc(event.target.value)

const Signup = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={async (event) => {
        event.preventDefault()
        await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, password })
        })
        history.push('/login')
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
          <input type='submit' value='Sign up!' />
        </div>
      </form>
    </>
  )
}

export default Signup
