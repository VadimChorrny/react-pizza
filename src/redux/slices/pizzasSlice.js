import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6308922f46372013f580b035.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Pizzas is empty :(');
    }

    return thunkAPI.fulfillWithValue(data);
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const pizzaSelector = (state) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
