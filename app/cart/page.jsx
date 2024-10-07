"use client"
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../(hooks)/useAuthContext'
import { Carousel } from 'react-responsive-carousel'
import CartCard from '../(components)/CartCard'
import Checkout from '../(components)/Checkout'
import ProtectedRoute from '../(components)/ProtectedRoute'

const Cart = () => {
    const {user}=useAuthContext()
    const [errorMess,setErrorMess]=useState(null)
    const [cartItems,setCartItems]=useState([])
    const [checkout,setCheckout]=useState(false)
    const [empty,setEmpty]=useState(false)
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
                if(result.prodDet.length===0){
                  setEmpty(true)
                }
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

    const updateCartItemQuantity = (itemId, quantity) => {
      setCartItems((prevItems) =>
          prevItems.map((item) =>
              item.id === itemId ? { ...item, quantity: quantity } : item
          )
      );
   };

    const removeCartItem = (itemId) => {
      setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };
  return (
    <ProtectedRoute roles={['buyer', 'seller']}>
    <div>
      {empty && <div className='flex justify-center items-center'>
          <h2>Wow! Such empty.</h2>
        </div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!checkout && cartItems.length!==0 && cartItems.map((item)=>{
          return <CartCard key={item.id} item={item} updateQuantity={updateCartItemQuantity}
          removeItem={removeCartItem}/>
        })}
      </div>
      {!checkout && !empty && <div className='chk-btn-cont'><button className='chk-btn' onClick={()=>{setCheckout(true)}}>Checkout</button></div>}
      {checkout && <Checkout items={cartItems}/>}
      {checkout && <div className='chk-btn-cont'><button className='chk-btn' onClick={()=>{setCheckout(false)}}>Back</button></div>}
    </div>
    </ProtectedRoute>
  )
}

export default Cart
