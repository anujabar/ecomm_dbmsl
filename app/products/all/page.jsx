"use client"
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useAuthContext } from '@/app/(hooks)/useAuthContext';
import ProductCard from '@/app/(components)/ProductCard';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const {user}=useAuthContext()
  const handleCart=async (id)=>{
    try{
      const response=await fetch('/api/cart',{
        method:"POST",
        body:JSON.stringify({userId:user.id,productId:id}),
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${user.token}`
        }
      })
      if(!response.ok){
        throw new Error("Failed to add item to cart, try again!")
      }
      const result=await response.json()
      alert("Item added to cart!")
    }
    catch(error){
      setErrorMessage(error.message)
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all'); 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProducts();
  }, []);

 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, ind) => {
          return <ProductCard product={product} key={ind}/>
        })}
      </div>
    </div>
  );
};

export default ProductList;