import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './propertiesSlice';
import { cartReducer } from './CartSlice';

const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    cartState:cartReducer,
  },
});

export default store;
