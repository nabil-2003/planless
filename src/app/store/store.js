// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import counterReducer from './slices/counterSlice'; // example slice
import userReducer from './userReducer';

   const store = configureStore({
    reducer: {
      user : userReducer,
    },
  });


export  default store;