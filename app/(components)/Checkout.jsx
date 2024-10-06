"use client"
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../(hooks)/useAuthContext'
import Payment from './Payment'

const Checkout = ({ items }) => {
  const { user } = useAuthContext()
  const [total, setTotal] = useState(0)
  const [isPayment, setIsPayment] = useState(false)
  const [loading, setLoading] = useState(false) 
  useEffect(() => {
    let t = 0
    items.forEach((i) => {
      t += ((i.price - (i.price * i.salePercentage/100)) * i.quantity)
    })
    setTotal(t)
  }, [items])


  return (
    <>
      <h2>Your address</h2>
      <p>{user.address}</p>
      <br/>
      {isPayment ? (
        <Payment total={total} items={items}  />
      ) : (
        <>
          <div className="flex justify-center items-center min-h-[60vh] bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
              <h1 className="text-2xl font-semibold mb-6 text-center">Your Order</h1>
              <div className="space-y-4">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="checkout_item flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div>
                      <h3 className="text-lg font-medium">{i.title}</h3>
                      <p className="text-gray-600">Quantity: {i.quantity}</p>
                    </div>
                    <p className="text-lg font-semibold">₹ {i.price-(i.salePercentage/100*i.price)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <h2 className="text-xl font-semibold text-right">Total: ₹ {total}</h2>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="chk-btn bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300"
              onClick={() => setIsPayment(true)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Checkout
