"use client"
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../(hooks)/useAuthContext'
import { Carousel } from 'react-responsive-carousel'
import CartCard from '../(components)/CartCard'

const Cart = () => {
    const {user}=useAuthContext()
    const [errorMess,setErrorMess]=useState(null)
    const [cartItems,setCartItems]=useState([])
    useEffect(()=>{
        const getCartItems=async ()=>{
            try{
                const response=await fetch(`/api/cart/${user.id}`)
                if(!response.ok){
                    throw new Error("Could not fetch cart items!")
                }
                const result=await response.json()
                setCartItems(result.prodDet)
            }
            catch(error){
                console.log(error.message)
                setErrorMess(error.message)
            }
        }
        if(user){
            getCartItems()
        }

    },[user])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cartItems.length!==0 && cartItems.map((item)=>{
        return <CartCard key={item.id} item={item}/>
      })}
    </div>
  )
}

export default Cart
