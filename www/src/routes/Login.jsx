import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Heading, Subtitle, Wrapper, Button } from './styles'

const handleChange = (setFunc) => (event) => setFunc(event.target.value)

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  return (
    <Wrapper>
      <Heading>Log in</Heading>
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
          <Subtitle>
            Username: { ' ' }
            <input type='text' value={name} onChange={handleChange(setName)} />
          </Subtitle>
        </div>
        <div>
          <Subtitle>
            Password: { ' ' }
            <input type='password' value={password} onChange={handleChange(setPassword)} />
          </Subtitle>
        </div>
        <div>
          <Button type='submit' value='Log in' />
        </div>
      </form>
    </Wrapper>
  )
}

export default Login
