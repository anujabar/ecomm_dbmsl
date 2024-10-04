"use client"
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../(hooks)/useAuthContext'
import { Carousel } from 'react-responsive-carousel'
import CartCard from '../(components)/CartCard'
import Checkout from '../(components)/Checkout'

const Cart = () => {
    const {user}=useAuthContext()
    const [errorMess,setErrorMess]=useState(null)
    const [cartItems,setCartItems]=useState([])
    const [checkout,setCheckout]=useState(false)
    useEffect(()=>{
        const getCartItems=async ()=>{
            try{
                const response=await fetch(`/api/cart/${user.id}`,{
                  headers:{
                    'Authorization' : `Bearer ${user.token}`
                  }
                })
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!checkout && cartItems.length!==0 && cartItems.map((item)=>{
          return <CartCard key={item.id} item={item}/>
        })}
      </div>
      {!checkout && <div className='chk-btn-cont'><button className='chk-btn' onClick={()=>{setCheckout(true)}}>Checkout</button></div>}
      {checkout && <Checkout items={cartItems}/>}
      {checkout && <div className='chk-btn-cont'><button className='chk-btn' onClick={()=>{setCheckout(false)}}>Back</button></div>}
    </div>
  )
}

export default Cart
