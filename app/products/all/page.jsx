import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
    <div>
      <h1>Product List</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
              <h2>{product.title}</h2>
              <img src={product.images.split(',')[0]} alt={product.title} style={{ width: '100%', height: 'auto' }} />
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Sale Percentage: {product.salePercentage}%</p>
              <p>Stars: {product.stars}</p>
              <p>Quantity: {product.quantity}</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;