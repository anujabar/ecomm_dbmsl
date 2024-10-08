"use client"
import React from 'react'
import Link from 'next/link'
import { useLogout } from '../(hooks)/useLogout'
import { useAuthContext } from '../(hooks)/useAuthContext'
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const {user} = useAuthContext()
  return (
    <nav>
      <h1>Ecomm</h1>
      <Link href="/">Home</Link>
      {!user && <>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      </>}
      {user && 
      <Link href="/logout">Logout</Link>
      } 
      <Link href='/cart'><FaShoppingCart size={20} className='inline mr-2' />Cart</Link>
      <Link href='/products/all'>Explore</Link>
      {user && user.role=='Seller' && <>
      <Link href='/products/new'>Add Product</Link>
      <Link href='/products/my'>My Products</Link>
      </>}
      {user && user.role=='Buyer'&&<>
        <Link href='order-history'>My Orders</Link>
      </>}
    </nav>
  )
}

export default Navbar