"use client"
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
const ProductDetails = ({params}) => {
    const {id}=params
    const [product,setProduct]=useState(null)
    const [yellow,setYellow]=useState()
    const [white,setWhite]=useState()
    const [images,setImages]=useState(null)
    useEffect(()=>{
        const getProduct=async()=>{
            try{
                const response=await fetch(`/api/products/product/${id}`)
                const result=await response.json()
                console.log(result)
                setImages(result.product.images)
                setYellow(result.product.stars)
                setWhite(5-result.product.stars)
                console.log(white,yellow)
                setProduct(result.product)
            }
            catch(error){
                console.log(error.message)
            }
        }
        getProduct()
    },[id,white,yellow])
  return (
    <div>
      {product && <div>
            <div className="h-50 w-full bg-black flex items-center justify-center">
                    <Carousel showThumbs={false} showStatus={false}>
                    {images && images.map((url, index) => (
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
            <div className="p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-lg font-bold">₹ {product.price}</p>
                <p className="text-lg">{product.description}</p>
                <p className="text-lg">Category: {product.category}</p>
                <br/>
                <div className='flex'>
                {Array.from({ length: yellow }).map((_, index) => {
                    console.log("IN")
                    return <FaStar key={index} color='yellow' size={30}/>
                })}
                {Array.from({ length: white }).map((_, index) => {
                    return <CiStar key={index} size={30}/>
                })}
                </div>
              </div>
        </div>}
    </div>
  )
}
export default ProductDetails