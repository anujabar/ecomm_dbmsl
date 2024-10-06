import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../(hooks)/useAuthContext';
import Link from 'next/link';


const CartCard = ({item, updateQuantity, removeItem}) => {
    const [quan,setQuan]=useState(item.quantity)
    const {user}= useAuthContext()

    const salePercentage = item.salePercentage || 0; 
    const previousPrice = item.price;
    const discountedPrice = previousPrice - (previousPrice * (salePercentage / 100));
    const handleDelete=async ()=>{
        try{
            await fetch(`/api/cart/${item.id}`,{
                method:"DELETE",
                headers:{
                  'Authorization': `Bearer ${user.token}`
                }
            })
            removeItem(item.id)
            // window.location.reload()
        }
        catch(error){
            console.log(error.message)
        }
    }
    const changeQuan=async (e,available)=>{
        if(e.target.value>available){
            alert(`Sorry, only ${available} left!`)
            setQuan(item.quantity)
        }
        else{
            setQuan(e.target.value)
            const res=await fetch(`api/cart/${item.id}`,{
                method:"PUT",
                body:JSON.stringify({quan:e.target.value}),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            })
            updateQuantity(item.id, e.target.value)
        }
    }
    return (
        <div key={item.id} className="border rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <div className='flex justify-between'>
            <Link href={`/productdetails/${item.productId}`}><h2 className="text-xl font-semibold">{item.title}</h2></Link>
            <MdDelete size={20} onClick={handleDelete}/>
          </div>
          <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        {salePercentage > 0 ? (
                            <>
                                <p className="text-lg font-bold line-through text-gray-500">₹ {previousPrice}</p>
                                <p className="text-lg font-bold text-red-800">₹ {discountedPrice.toFixed(2)}</p>
                                <span className="text-sm text-green-600">Save {salePercentage}%</span>
                            </>
                        ) : (
                            <p className="text-lg font-bold">₹ {previousPrice}</p>
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <label>Quantity</label>
                        <input
                            type='number'
                            value={quan}
                            className='w-12 h-8 text-center border border-gray-300 rounded-md'
                            onChange={(e) => changeQuan(e, item.available)}
                        />
                    </div>
                </div>
        </div>
        <div className="h-48 w-full bg-black flex items-center justify-center">
                {/* <Carousel showThumbs={false} showStatus={false}>
                  {item.images.map((url, index) => (
                    <div key={index} className="h-full flex items-center justify-center">
                      <img
                        src={url}
                        alt={`Product Image ${index + 1}`}
                        className="h-auto w-auto max-w-full object-contain"
                      />
                    </div>
                  ))}
                </Carousel> */}
        </div>
      </div>
  )
}

export default CartCard
