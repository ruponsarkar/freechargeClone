import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(i => i._id === item._id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },

    updateQty: (state, action) => {
      const { _id, qty } = action.payload;
      const item = state.items.find(i => i._id === _id);
      if (item) item.qty = qty;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
