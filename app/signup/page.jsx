"use client"
import React,{useState,useEffect} from 'react'
import { useSignup } from '../(hooks)/useSignup.js'
import { redirect } from 'next/navigation'
import { useAuthContext } from '../(hooks)/useAuthContext.js'

const Signup = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [role,setRole]=useState("Buyer")
    const [address,setAddress]=useState("")
    const {signup,error,isLoading}=useSignup() 
    const {user}=useAuthContext()
    const handleSubmit=async (e)=>{
        e.preventDefault()
        await signup(email,password,role,address)
    }
    useEffect(()=>{
        if(user){
            redirect("/")
        }
    },[user])
  return (
    <form className='signup' onSubmit={handleSubmit}>
        <label>Email</label>
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <label>Password</label>
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <label>Role</label>
        <select onChange={(e)=>{setRole(e.target.value)}}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
        </select>
       
        <label>Address</label>
        <textarea className='address-area' onChange={(e)=>{setAddress(e.target.value)}}></textarea>
        
        <button disabled={isLoading}>Sign up</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )}
export default Signup