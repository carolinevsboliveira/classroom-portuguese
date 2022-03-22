import React from 'react'
import { useAuth } from '../src/contexts'
const Login = () => {
    const {currentUser} = useAuth()
  return (
      <h1>`The current user is ${currentUser}`</h1>
  )
}

export default Login