import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { useAuthContext } from '../(hooks)/useAuthContext';
import Link from 'next/link';

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
      <div key={product.id} className="border rounded-lg overflow-hidden  shadow-md">
        <div className="p-4">
          <Link href={`/productdetails/${product.id}`}><h2 className="text-xl font-semibold">{product.title}</h2></Link>
          <div className='flex justify-between'>
          <div className='flex flex-col'>
                        {product.salePercentage > 0 ? (
                            <>
                                <p className="text-lg font-bold line-through text-gray-500">₹ {product.price}</p>
                                <p className="text-lg font-bold text-red-800">₹ {(product.price - (product.price * product.salePercentage/100)).toFixed(2)}</p>
                                <span className="text-sm text-green-600">Save {product.salePercentage}%</span>
                            </>
                        ) : (
                            <p className="text-lg font-bold">₹ {product.price}</p>
                        )}
                    </div>
            {product.quantity>0? <button className='border-2 h-10 rounded-md p-2' onClick={()=>{handleCart(product.id)}}>Add to Cart</button> : <p className='border-2 flex items-center h-10 rounded-md p-2 text-white bg-red-600 '>SOLD OUT</p>}
          </div>
        </div>
        <div className="h-64 w-full bg-black flex items-center justify-center">
        <Carousel showThumbs={false} showStatus={false}>
          {product.images.map((url, index) => (
            <div key={index} className="h-full flex items-center justify-center">
              <img
                src={url}
                alt={`Product Image ${index + 1}`}
                className="object-contain max-h-64 max-w-64"  // Limit image height and width
              />
            </div>
          ))}
        </Carousel>
      </div>
      </div>
);
}
