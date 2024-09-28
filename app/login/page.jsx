"use client"
import React,{useEffect, useState} from 'react'
import { useLogin } from '../(hooks)/useLogin.js'
import { redirect } from 'next/navigation'
import { useAuthContext } from '../(hooks)/useAuthContext.js'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {login,error,isLoading}=useLogin()
    const {user}=useAuthContext()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        await login(email,password)
    }
    useEffect(()=>{
        if(user){
            redirect("/")
        }
    },[user])
  return (
    <form className='login' onSubmit={handleSubmit}>
        <label>Email</label>
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <label>Password</label>
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button disabled={isLoading}>Log in</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
