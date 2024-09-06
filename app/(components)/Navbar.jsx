import React from 'react'
import Link from 'next/link'
import { useLogout } from '../(hooks)/useLogout'
import { useAuthContext } from '../(hooks)/useAuthContext'

const Navbar = () => {
  return (
    <nav>
    <h1>Ecomm</h1>
    <Link href="/">Home</Link>
    <Link href="/login">Login</Link>
    <Link href="/signup">Signup</Link>
    <Link href="/logout">Logout</Link>
  </nav>
  )
}

export default Navbar