import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    saveData(state, action) {
      state.push(action.payload);
    }
  },
});

export const { saveData ,removeData} = dataSlice.actions;
export default dataSlice.reducer;
