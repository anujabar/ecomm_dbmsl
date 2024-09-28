"use client"; // Ensure this component is client-side rendered
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/app/(hooks)/useAuthContext'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

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
      const response = await fetch(`/api/products/${user.id}`); 
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Products</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {products.length === 0 ? (
        <p>You have no products listed.</p>
      ) : (
        <ul>
          {products.map((product) => {
            const images =product.images.split(',')
            return(
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Sale Percentage: {product.salePercentage}%</p>
              <p>Quantity: {product.quantity}</p>
              <p>Description: {product.description}</p>
              <Carousel showThumbs={true} showStatus={false}>
                  {images.map((url, index) => (
                    <div key={index} className="h-full flex items-center justify-center">
                      <img
                        src={url}
                        alt={`Product Image ${index + 1}`}
                        className="h-auto w-auto max-w-full object-contain"
                      />
                    </div>
                  ))}
                </Carousel>
             
            </li>
          )})}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
