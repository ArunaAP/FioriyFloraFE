import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderItem, setCourierCharge, resetOrder } from '../store/orderSlice';

const AddOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [quantities, setQuantities] = useState({}); // Track each flower’s quantity
  const courierCharge = useSelector((state) => state.order.courierCharge);
  const totalAmount = useSelector((state) => state.order.totalAmount);
  const orderItems = useSelector((state) => state.order.orderItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
    fetchFlowers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('http://localhost:5000/api/customers');
    setCustomers(response.data);
  };

  const fetchFlowers = async () => {
    const response = await axios.get('http://localhost:5000/api/flowers');
    setFlowers(response.data);
  };

  const handleQuantityChange = (flowerId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [flowerId]: quantity,
    }));
  };

  const handleAddOrderItem = (flower) => {
    const quantity = quantities[flower._id] || 0;
    if (quantity > 0) {
      dispatch(addOrderItem({ flowerId: flower._id, quantity, price: flower.sellingPrice }));
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [flower._id]: 0, // Reset quantity to 0 for this flower after adding
      }));
    }
  };

  const handleCourierChargeChange = (charge) => {
    dispatch(setCourierCharge(Number(charge)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        customerId,
        orderItems,
        courierCharge,
        totalAmount,
      });
      dispatch(resetOrder()); // Reset order in Redux after successful submission
      navigate('/orders');
    } catch (error) {
      console.error("Error adding order", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Select Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Add Flowers</label>
          {flowers.map((flower) => (
            <div key={flower._id} className="flex items-center space-x-2 mb-2">
              <span>{flower.name} - RS. {flower.sellingPrice}</span>
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={quantities[flower._id] || ''}
                onChange={(e) => handleQuantityChange(flower._id, Number(e.target.value))}
                className="border p-2 rounded w-1/4"
              />
              <button
                type="button"
                onClick={() => handleAddOrderItem(flower)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Add Item
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-2">Courier Charge</label>
          <input
            type="number"
            value={courierCharge}
            onChange={(e) => handleCourierChargeChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
