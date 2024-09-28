import { useRouter } from 'next/navigation';
import React from 'react'
import { Carousel } from 'react-responsive-carousel';

export default function MyProductCard({product}) {
    console.log(product)
    const images = product.images.split(',');
    const router = useRouter()

    const handleEdit = () => {
        router.push(`/products/edit/${product.id}`);
      };
    
      const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
          try {
            const response = await fetch(`/api/products/${product.id}`, {
              method: 'DELETE',
            });
    
            if (!response.ok) {
              throw new Error('Failed to delete the product');
            }
    
            router.refresh(); 
          } catch (error) {
            console.error('Error deleting product:', error);
          }
        }
      };

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
          {/* <Carousel showThumbs={false} showStatus={false}>
            {images.map((url, index) => (
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
        <div className="flex justify-between">
        <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Delete
        </button>
      </div>
      </div>
);
}
