"use client"; // Ensure this component is client-side rendered
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/app/(hooks)/useAuthContext'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import ProductCard from '@/app/(components)/ProductCard';
import MyProductCard from '@/app/(components)/MyProductCard';
import ProtectedRoute from '@/app/(components)/ProtectedRoute';

const MyProducts = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (user){
        fetchUserProducts()
    }
  }, [user, router]);

  const fetchUserProducts = async () => {
    try {
      const response = await fetch(`/api/products/${user.id}`,{
        headers:{
          "Authorization": `Bearer ${user.token}`
        }
      }); 
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log(data)
      setProducts(data.products);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute roles={['Seller']}>
      {loading? <p>Loading...</p>
      :
      <div>
     
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {products.length === 0 ? (
        <p>You have no products listed.</p>
      ) : (
        <div className="container  px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, ind) => {
            
            return <MyProductCard product={product} key={ind}/>
          })}
        </div>
      </div>
    
      )}
    </div>
      }
   
    </ProtectedRoute>
  );
};

export default MyProducts;
