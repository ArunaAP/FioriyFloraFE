// src/pages/FlowerTable.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FlowerTable = () => {
  const [flowers, setFlowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flowers');
        setFlowers(response.data);
      } catch (error) {
        console.error('Error fetching flowers:', error);
      }
    };
    fetchFlowers();
  }, []);

  const handleEdit = (flowerId) => {
    navigate(`/edit-flower/${flowerId}`);
  };

  const handleDelete = async (flowerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/flowers/${flowerId}`);
      setFlowers(flowers.filter((flower) => flower._id !== flowerId));
    } catch (error) {
      console.error('Error deleting flower:', error);
    }
  };

  const handleAddFlower = () => {
    navigate('/add-flower');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Flowers</h2>
        <button
          onClick={handleAddFlower}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Flower
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Buying Price</th>
            <th className="border p-2">Selling Price</th>
            <th className="border p-2">Species</th>
            <th className="border p-2">Available Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flowers.map((flower) => (
            <tr key={flower._id}>
              <td className="border p-2">{flower.name}</td>
              <td className="border p-2">{flower.buyingPrice}</td>
              <td className="border p-2">{flower.sellingPrice}</td>
              <td className="border p-2">{flower.species}</td>
              <td className="border p-2">{flower.availableStock}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(flower._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(flower._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlowerTable;
