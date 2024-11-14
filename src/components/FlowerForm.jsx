// src/pages/FlowerForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FlowerForm = () => {
  const { flowerId } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState({
    name: '',
    buyingPrice: '',
    sellingPrice: '',
    species: '',
    availableStock: ''
  });

  useEffect(() => {
    if (flowerId) {
      const fetchFlower = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/flowers/${flowerId}`);
          setFlower(response.data);
        } catch (error) {
          console.error('Error fetching flower:', error);
        }
      };
      fetchFlower();
    }
  }, [flowerId]);

  const handleChange = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (flowerId) {
        await axios.put(`http://localhost:5000/api/flowers/${flowerId}`, flower);
      } else {
        await axios.post('http://localhost:5000/api/flowers', flower);
      }
      navigate('/flowers');
    } catch (error) {
      console.error('Error saving flower:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{flowerId ? 'Edit Flower' : 'Add Flower'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={flower.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="buyingPrice"
          value={flower.buyingPrice}
          onChange={handleChange}
          placeholder="Buying Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="sellingPrice"
          value={flower.sellingPrice}
          onChange={handleChange}
          placeholder="Selling Price"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="species"
          value={flower.species}
          onChange={handleChange}
          placeholder="Species"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="availableStock"
          value={flower.availableStock}
          onChange={handleChange}
          placeholder="Available Stock"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {flowerId ? 'Update Flower' : 'Add Flower'}
        </button>
      </form>
    </div>
  );
};

export default FlowerForm;
