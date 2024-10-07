import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import EditModal from './EditModal';
import { useAuthContext } from '../(hooks)/useAuthContext';
import Link from 'next/link';


export default function MyProductCard({ product }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {user}=useAuthContext()
   
  
    const handleEdit = () => {
      setSelectedProduct(product); // Set the product to be edited
      setIsEditModalOpen(true); // Open the modal
    };
    useEffect(() => {
      console.log("User updated:", user);
    }, [user]);
  
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          const response = await fetch(`/api/products/product/${product.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}` // Include the token in the Authorization header
          }
            
          });
  
          if (!response.ok) {
            throw new Error('Failed to delete the product');
          }
  
          window.location.reload(); // Refresh the page after deletion
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      }
    };
  
    const handleCloseModal = () => {
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    };
  
    const handleSave = async (updatedProduct) => {
      try {
        console.log(user)
        const response = await fetch(`/api/products/product/${updatedProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` // Include the token in the Authorization header
        },
          body: JSON.stringify(updatedProduct),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update the product');
        }
  
        window.location.reload(); 
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
  
    return (
      <div key={product.id} className="border rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <Link href={`/productdetails/${product.id}`}><h2 className="text-xl font-semibold">{product.title}</h2></Link>
          
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
        <div className="flex p-5 justify-between">
          <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Delete
          </button>
        </div>
  
        {/* Render the edit modal */}
        {isEditModalOpen && (
          <EditModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )}
      </div>
    );
  }