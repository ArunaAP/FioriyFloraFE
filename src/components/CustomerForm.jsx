// src/pages/CustomerForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerForm = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: ''
  });

  useEffect(() => {
    if (customerId) {
      const fetchCustomer = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
          setCustomer(response.data);
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      };
      fetchCustomer();
    }
  }, [customerId]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (customerId) {
        await axios.put(`http://localhost:5000/api/customers/${customerId}`, customer);
      } else {
        await axios.post('http://localhost:5000/api/customers', customer);
      }
      navigate('/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{customerId ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={customer.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {customerId ? 'Update Customer' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
