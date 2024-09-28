"use client"
import React, { useEffect } from 'react'
import { useLogout } from '../(hooks)/useLogout'
import { useAuthContext } from '../(hooks)/useAuthContext'
import { useRouter } from 'next/navigation'

const Logout = () => {
    const {logout}=useLogout()
    const {user}=useAuthContext()
    const router = useRouter();
    const goBack = () => {
      if (router.asPath !== '/') {
        router.back();
      } else {
        router.push('/');
      }
    };
    const handleClick=()=>{
        logout()
    }
    useEffect(()=>{
        if(!user){
            router.push("/")
        }
    },[user,router])
  return (
    <div>
      <div className='logout-confirm'>
        <h2>Are you sure you want to logout?</h2>
        <div className='choice-btns'>
            <button onClick={goBack}>No, go back.</button>
            <button onClick={handleClick}>Logout.</button>
        </div>
      </div>
    </div>
  )
}

export default Logout
