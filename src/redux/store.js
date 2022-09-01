import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizza from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizza,
  },
});

console.log(store);
