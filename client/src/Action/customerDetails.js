import { createSlice } from '@reduxjs/toolkit';

const customerData = createSlice({
  name: 'customerDetails',
  initialState: [],
  reducers: {
    saveCustomerDetails(state, action) {
      state.push(action.payload);
    },
  },
});

export const { saveCustomerDetails } = customerData.actions;
export default customerData.reducer;
