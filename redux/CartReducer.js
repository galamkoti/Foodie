// slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    chef: null,  // track the chef whose items are in the cart
  },
  reducers: {
    addItem: (state, action) => {
      const { id, chef } = action.payload;
      if (state.chef && state.chef.id !== chef.id) {
        // If there are items from a different chef, replace the cart
        state.items = [{ ...action.payload, quantity: 1 }];
        state.chef = chef;
      } else {
        const existingItem = state.items.find(item => item.id === id && item.chef.id === chef.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        state.chef = chef;  // Set the chef for the first added item
      }
    },
    replaceCart: (state, action) => {
      state.items = [{ ...action.payload, quantity: 1 }];
      state.chef = action.payload.chef;
    },
    removeItem: (state, action) => {
      const { id, chef } = action.payload;
      state.items = state.items.filter(item => !(item.id === id && item.chef.id === chef.id));
      if (state.items.length === 0) {
        state.chef = null; // Reset chef if cart is empty
      }
    },
    incrementQuantity: (state, action) => {
      const { id, chef } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.chef.id === chef.id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id, chef } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.chef.id === chef.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter(item => !(item.id === id && item.chef.id === chef.id));
        if (state.items.length === 0) {
          state.chef = null; // Reset chef if cart is empty
        }
      }
    },
  },
});

export const { addItem, replaceCart, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
