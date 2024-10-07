"use client"
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { FaStar } from "react-icons/fa";

const ProductDetails = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [yellowStars, setYellowStars] = useState(0); // Average product rating
  const [hoveredRating, setHoveredRating] = useState(null); // To capture hover effect
  const [userRating, setUserRating] = useState(null); // To capture the user's rating
  const [submittedRating, setSubmittedRating] = useState(null); // To store user-submitted rating

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`/api/products/product/${id}`);
        const result = await response.json();
        setYellowStars(result.product.stars);
        setProduct(result.product);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, [id]);

  const handleMouseMove = (e, index) => {
    const { left, width } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const fraction = x / width;
    const hoverValue = index + fraction;
    setHoveredRating(hoverValue.toFixed(1)); // Set hover rating with one decimal place
  };

  const handleStarClick = async (rating) => {
    try {
      console.log(rating);
      const response = await fetch(`/api/products/rate/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      if (response.ok) {
        const result = await response.json();
        setYellowStars(result.newAverageRating); // Update to new average rating
        setUserRating(rating); // Set user's rating
        setSubmittedRating(rating); // Set the submitted rating
      } else {
        console.error('Failed to rate product');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <div
          key={i}
          style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={() => setHoveredRating(null)}
          onClick={() => handleStarClick(hoveredRating || userRating || yellowStars)}
        >
          <FaStar
            color={(hoveredRating || yellowStars) > i ? 'yellow' : 'gray'}
            size={30}
          />
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-6">
      {product && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image Carousel */}
          <div className="w-full md:w-1/2">
            <div className="h-50 w-full bg-black flex items-center justify-center">
              <Carousel showThumbs={false} showStatus={false}>
                {product.images &&
                  product.images.map((url, index) => (
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
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <div className='flex flex-col'>
                        {product.salePercentage > 0 ? (
                            <div>
                                <p className="text-lg font-bold line-through text-gray-500">₹ {product.price}</p>
                                <p className="text-lg font-bold text-red-800">₹ {(product.price - (product.price * product.salePercentage/100)).toFixed(2)}</p>
                                <span className="text-sm text-green-600">Save {product.salePercentage}%</span>
                            </div>
                        ) : (
                            <p className="text-lg font-bold">₹ {product.price}</p>
                        )}
                    </div>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-500">Category: {product.category}</p>

            {/* Average Rating */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Average Rating: {yellowStars}</h3>
              <div className="flex items-center space-x-2">
                {product.stars / product.reviews}
                <p className="text-gray-600">({product.reviews} Reviews)</p>
              </div>
            </div>

            {/* User Rating */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Rate this product</h3>
              <div className="flex items-center space-x-2">
                {renderStars(hoveredRating || userRating || yellowStars)}
                <p className="text-gray-600">Hovered Rating: {hoveredRating}</p>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
