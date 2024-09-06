"use client"
import React, { useEffect } from 'react'
import { useAuthContext } from './(hooks)/useAuthContext'
import { redirect } from 'next/navigation'

const Home = () => {
  const {user}=useAuthContext()
  useEffect(()=>{
    if(!user){
        redirect("/signup")
    }
  },[user])
  return (
    <div>
      Home
    </div>
  )
}

export default Home

