import { configureStore } from '@reduxjs/toolkit';
import dataReducer from "./Action/dataSlice";
import customerReducer from './Action/customerDetails';
import productReducer from './Action/productDetails';

export default configureStore({
  reducer: {
    data: dataReducer,
    customerData:customerReducer,
    productData:productReducer,
  },
});