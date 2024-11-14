// src/store/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    totalAmount: 0,
    courierCharge: 0
  },
  reducers: {
    addOrderItem: (state, action) => {
      const { flowerId, quantity, price } = action.payload;
      state.orderItems.push({ flowerId, quantity, price });
      state.totalAmount += quantity * price + state.courierCharge;
    },
    setCourierCharge: (state, action) => {
      state.courierCharge = action.payload;
      // Recalculate the total amount
      state.totalAmount = state.orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        state.courierCharge
      );
    },
    resetOrder: (state) => {
      state.orderItems = [];
      state.totalAmount = 0;
      state.courierCharge = 0;
    }
  }
});

export const { addOrderItem, setCourierCharge, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
