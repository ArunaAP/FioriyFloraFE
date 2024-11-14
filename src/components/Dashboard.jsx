import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();

  // Fetch data for dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const orderResponse = await axios.get('http://localhost:5000/api/orders'); // Replace with actual API
        setOrderCount(orderResponse.data.length);
        
        const completed = orderResponse.data.filter(order => order.status === 'Completed').length;
        setCompletedOrders(completed);
        
        const pending = orderResponse.data.filter(order => order.status === 'Pending').length;
        setPendingOrders(pending);

        // Calculate total revenue
        const total = orderResponse.data.reduce((acc, order) => acc + order.totalAmount, 0);
        setTotalRevenue(total);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Order Count Widget */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Total Orders</h3>
          <p className="text-2xl">{orderCount}</p>
        </div>

        {/* Completed Orders Widget */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Completed Orders</h3>
          <p className="text-2xl">{completedOrders}</p>
        </div>

        {/* Pending Orders Widget */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Pending Orders</h3>
          <p className="text-2xl">{pendingOrders}</p>
        </div>

        {/* Total Revenue Widget */}
        <div className="bg-gray-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Total Revenue</h3>
          <p className="text-2xl">Rs. {totalRevenue}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Add Order Button */}
        <button
          onClick={() => navigate('/add-order')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Order
        </button>

        {/* View Orders Button */}
        <button
          onClick={() => navigate('/orders')}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
