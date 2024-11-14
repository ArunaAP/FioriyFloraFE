import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { generateInvoice } from '../utils/invoiceGenerator'; 
import { generateAddressLabel } from '../utils/generateAddressLabel'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [flowers, setFlowers] = useState([]); // Store flower details
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    fetchFlowers(); // Fetch flowers to get names
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const fetchFlowers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flowers');
      setFlowers(response.data);
    } catch (error) {
      console.error("Error fetching flowers", error);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh the list
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const getFlowerName = (flowerId) => {
    const flower = flowers.find((flower) => flower._id === flowerId);
    return flower ? flower.name : "Unknown Flower";
  };

  const handleGenerateInvoice = async (orderId) => {
    const order = orders.find(o => o._id === orderId);
    if (order) {
      await generateInvoice(order);
    } else {
      console.error("Order not found for ID:", orderId);
    }
  };
  const handleGenerateLabel = async (orderId) => {
    const order = orders.find(o => o._id === orderId);
    if (order) {
      await generateAddressLabel(order);
    } else {
      console.error("Order not found for ID:", orderId);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <button
        onClick={() => navigate('/add-order')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Order
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Items</th>
            <th className="py-2 px-4 border-b">Courier Charge</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order.customerId.name}</td>
              <td className="py-2 px-4 border-b">
                {order.orderItems.map((item) => (
                  <div key={item.flowerId}>
                    {getFlowerName(item.flowerId)} - {item.quantity} x Rs. {item.price}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">Rs. {order.courierCharge}</td>
              <td className="py-2 px-4 border-b">Rs. {order.totalAmount}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button 
                  onClick={() => handleGenerateInvoice(order._id)}
                  className="ml-2 bg-blue-500 text-white rounded px-2 py-1"
                >
                  Generate Invoice
                </button>
                <button 
                  onClick={() => handleGenerateLabel(order._id)}
                  className="ml-2 bg-blue-500 text-white rounded px-2 py-1"
                >
                  Generate Label
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
