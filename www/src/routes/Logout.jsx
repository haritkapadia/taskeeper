import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Logout = () => {
  useEffect(() => fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, { credentials: 'include' }))
  return <Redirect to='/' />
}

export default Logout
