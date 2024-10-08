"use client"
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useAuthContext } from '@/app/(hooks)/useAuthContext';
import ProductCard from '@/app/(components)/ProductCard';


const ProductList = () => {
  const ratings=[5,4,3,2,1]
  const [categories,setCategories]=useState([])
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilter,setIsFilter]=useState(false)
  const [filter,setFilter]=useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const {user}=useAuthContext()
  const handleCat=(e)=>{
    const fil=[]
    products.forEach((p)=>{
      if(p.category===e.target.value){
        fil.push(p)
      }
    })
    setFilteredProducts(fil)
  }
  const handleRating=(e)=>{
    const fil=[]
    products.forEach((p)=>{
      const n=Math.round(p.stars/p.reviews)
      if(n==e.target.value){
        console.log(Math.round(p.stars/p.reviews))
        fil.push(p)
      }
    })
    console.log(e.target.value)
    console.log("FIL ",fil)
    setFilteredProducts(fil)
  }
  
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/all'); 
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        let c=[]
        data.products.forEach((p)=>{
          if(!c.includes(p.category)){
            c.push(p.category)
          }
        })
        setCategories(c)
        setProducts(data.products); 
        setFilteredProducts(data.products); 
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProducts();
  }, []);

 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div>
        <h3>Filter by</h3>
        {
          <select onClick={(e)=>{setFilter(e.target.value)}}>
            <option value="All" >All</option>
            <option value="Category">Category</option>
            <option value="Rating">Rating</option>
          </select>
        }
        {
          filter!=="" && filter=='Category' && <select onClick={handleCat}>
            {categories.map((c)=>{
              return <option key={c} value={c}>{c}</option>
            })}
          </select>
        }
        {
          filter!=="" && filter=='Rating' && <select onClick={handleRating}>
            {ratings.map((c)=>{
              return <option key={c} value={c}>{c}</option>
            })}
          </select>
        }
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(filter!=="" && filter!=="All") && filteredProducts.map((product, ind) => {
          return <ProductCard product={product} key={ind}/>
        })}
        {(filter==="" || filter==="All") && products.map((product, ind) => {
          return <ProductCard product={product} key={ind}/>
        })}
      </div>
    </div>
  );
};

export default ProductList;