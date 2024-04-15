import { createSlice } from '@reduxjs/toolkit';


const productData = createSlice({
  name: 'productDetails',
  initialState: [],
  reducers: {
    saveProductDetails(state, action) {
      return action.payload; // Replace the state with the new payload
    },
  },
});

export const { saveProductDetails } = productData.actions;
export default productData.reducer;
