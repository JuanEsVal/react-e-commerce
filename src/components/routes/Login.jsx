import './styles/login.css'
import FormLogin from '../login/FormLogin'
import FormLogout from '../login/FormLogout'
import React, { useEffect, useState } from 'react'

const Login = () => {

  const [isLogged, setIsLooged] = useState()

  useEffect(() => {
    setIsLooged(localStorage.getItem('token'))
  }, [])

  return (
    <main className='login'>
      {
        isLogged ?
          <FormLogout setIsLooged={setIsLooged} isLogged={isLogged} />
        :
          <FormLogin setIsLooged={setIsLooged} />
      }
    </main>
  )
}

export default Login