"use client"
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/(hooks)/useAuthContext';
import ProtectedRoute from '@/app/(components)/ProtectedRoute';


const Page = () => {
  const {user, dispatch} = useAuthContext()
  const router = useRouter()
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [salePercentage, setSalePercentage] = useState('');
  const [stars, setStars] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(()=>{
    console.log(user)
    if (!user){
      router.push("/login")
    }
    else{
      router.push('/products/new')
    }
  },[user])
  
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('salePercentage', salePercentage);
    formData.append('stars', stars);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('seller', user.id)
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch('/api/products/new', {
        method: 'POST',
        headers:{
          'Authorization': `Bearer ${user.token}`
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setTitle('');
        setPrice('');
        setCategory('');
        setSalePercentage('');
        setStars('');
        setQuantity('');
        setDescription('');
        setImages([]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <ProtectedRoute roles={['Seller']}>
    <div>
      <h1>Upload New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home_appliances">Home Appliances</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label>Sale Percentage:</label>
          <input
            type="number"
            value={salePercentage}
            onChange={(e) => setSalePercentage(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='w-full resize-none h-20 border-gray-800'
          ></textarea>
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Upload Product</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
    </ProtectedRoute>
  );
};

export default Page;
