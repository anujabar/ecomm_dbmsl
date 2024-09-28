"use client";
import { useState, useEffect, useRef } from "react";

const EditModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    salePercentage: '',
    quantity: '',
    description: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const modalRef = useRef(null);

  // Populate form data when product is passed
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        category: product.category || '',
        salePercentage: product.salePercentage || '',
        quantity: product.quantity || '',
        description: product.description || '',
      });
    }
  }, [product]);

  // Handle closing modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    if (!formData.title || !formData.price) {
      setErrorMessage('Title and Price are required fields');
      return;
    }
    
    const updatedProduct = { ...product, ...formData };
    try {
      await onSave(updatedProduct);  // Trigger the save action
      setSuccessMessage('Product updated successfully');
      onClose();
    } catch (error) {
      setErrorMessage('Error updating product');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>

      {/* Modal content */}
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto relative z-10">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        {/* Form fields */}
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Sale Percentage</label>
          <input
            type="number"
            name="salePercentage"
            value={formData.salePercentage}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
