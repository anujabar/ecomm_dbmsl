"use client"
import React, { useEffect } from 'react'
import { useLogout } from '../(hooks)/useLogout'
import { useAuthContext } from '../(hooks)/useAuthContext'
import { redirect } from 'next/navigation'

const Logout = () => {
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const handleClick=()=>{
        logout()
    }
    useEffect(()=>{
        if(!user){
            redirect("/")
        }
    },[user])
  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}

export default Logout
