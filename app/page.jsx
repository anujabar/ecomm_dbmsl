"use client"
import React, { useEffect } from 'react'
import { useAuthContext } from './(hooks)/useAuthContext'
import { redirect } from 'next/navigation'
import { FaShoppingCart, FaUserCircle, FaStar } from 'react-icons/fa'; // Example icons

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
      <div className="icon-section grid grid-cols-3 gap-8 my-8">
        {/* Cart Icon */}
        <div className="flex flex-col items-center">
          <FaShoppingCart size={50} className="text-blue-600" />
          <h3 className="mt-4 text-lg font-semibold">Shop Now</h3>
          <button className="text-gray-600">Explore our products</button>
        </div>

        {/* User Icon */}
        <div className="flex flex-col items-center">
          <FaUserCircle size={50} className="text-green-600" />
          <h3 className="mt-4 text-lg font-semibold">Profile</h3>
          <p className="text-gray-600">Manage your account</p>
        </div>

        {/* Star Icon */}
        <div className="flex flex-col items-center">
          <FaStar size={50} className="text-yellow-600" />
          <h3 className="mt-4 text-lg font-semibold">Top Rated</h3>
          <p className="text-gray-600">See our best sellers</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
