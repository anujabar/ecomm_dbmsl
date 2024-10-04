import React, { useEffect,useState } from 'react'
import { useAuthContext } from '../(hooks)/useAuthContext'

const Checkout = ({items}) => {
  const {user}=useAuthContext()
  const onConfirmOrder=async()=>{
    try{
      await fetch(`/api/checkout/${user.id}`,{
        method:"POST",
        body:JSON.stringify(items),
        headers:{
          "Content-Type":"application/json"
        }
      })
      await fetch(`/api/checkout/${user.id}`,{
        method:"DELETE",
      })
    }
    catch(error){
      console.log(error.message)
    }
  }
  const [total,setTotal]=useState(0)
  useEffect(()=>{
    let t=0
    items.forEach((i)=>{
      t+=i.price
    })
    setTotal(t)
  },[items])
  return (
    <>
    <div className='flex justify-center'>
      <div className='checkout_card'>
          <h1>Your Order</h1>
        <div>
          {items.map((i)=>{
              return <div key={i.id} className='checkout_item'>
                  <h3>{i.title}</h3>
                  <p>Quantity: {i.quantity}</p>
                  <p>₹ {i.price}</p>
              </div>
          })}
        </div>
        <h2>Total:₹ {total}</h2>
      </div>
    </div>
    <div className='chk-btn-cont'><button className='chk-btn'>Proceed to pay</button></div>
    </>
  )
}

export default Checkout
