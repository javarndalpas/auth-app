import React, { useState } from 'react';

export const AddProperties = () => {
  const [formData, setFormData] = useState({
    image: '',
    price: '',
    name: '',
    owner: '',
    city: '',
    type: ''
  });

  const propertyTypes = ["Flat", "Bungalow", "Residential Land", "Commercial Land", "Shop"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="image">Product Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter property name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter owner name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter city"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1" htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Select property type</option>
            {propertyTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};
