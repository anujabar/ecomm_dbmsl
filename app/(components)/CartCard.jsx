import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { MdDelete } from "react-icons/md";

const CartCard = ({item}) => {
    const [quan,setQuan]=useState(item.quantity)
    const handleDelete=async ()=>{
        try{
            await fetch(`/api/cart/${item.id}`,{
                method:"DELETE"
            })
            window.location.reload()
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
                    "Content-Type":"application/json"
                }
            })
        }
    }
    return (
        <div key={item.id} className="border rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <div className='flex justify-between'>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <MdDelete size={20} onClick={handleDelete}/>
          </div>
          <div className='flex justify-between'>
            <p className="text-lg font-bold">₹ {item.price}</p>
            <div className='flex flex-col'>
                <label>Quantity</label>
                <input type='number' value={quan} className='w-12 h-2' onChange={(e)=>{changeQuan(e,item.available)}}/>
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
