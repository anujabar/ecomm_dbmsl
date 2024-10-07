"use client"
import React, { useEffect } from 'react'
import { useAuthContext } from './(hooks)/useAuthContext'
import { redirect } from 'next/navigation'
import { FaShoppingCart, FaUserCircle, FaStar } from 'react-icons/fa'; // Example icons
import Link from 'next/link';

const Home = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      redirect("/signup");
    }
  }, [user]);


  return (
    <div className="home-container">
      {/* Banner Section */}
      <div className="banner h-64 bg-purple-200 flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Our Platform!</h1>
      </div>

      {/* Icon Section */}
      <div className="icon-section flex justify-center gap-8 my-8 items-center">
        {/* Cart Icon */}
        <div className="flex flex-col items-center justify-center">
          <FaShoppingCart size={50} className="text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Shop Now</h3>
          <Link href='/products/all' className="text-gray-600">Explore our products</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
