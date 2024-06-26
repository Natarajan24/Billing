import { createSlice } from '@reduxjs/toolkit';


const productData = createSlice({
  name: 'productDetails',
  initialState: [],
  reducers: {
    saveProductDetails(state, action) {
      return action.payload; 
    },
  },
});

export const { saveProductDetails } = productData.actions;
export default productData.reducer;
