import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useAuthContext } from '../(hooks)/useAuthContext';

export default function ProductCard({product}) {
    console.log(product)
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

    return (
      <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <div className='flex justify-between'>
            <p className="text-lg font-bold">₹ {product.price}</p>
            <button className='border-2 rounded-md p-2' onClick={()=>{handleCart(product.id)}}>Add to Cart</button>
          </div>
        </div>
        <div className="h-48 w-full bg-black flex items-center justify-center">
          <Carousel showThumbs={false} showStatus={false}>
            {product.images.map((url, index) => (
              <div key={index} className="h-full flex items-center justify-center">
                <img
                  src={url}
                  alt={`Product Image ${index + 1}`}
                  className="h-auto w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
);
}
