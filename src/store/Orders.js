import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  orders: null,
  order: null,
};

const orderSlice = createSlice({
  name: "Orders",
  initialState: initialUserState,
  reducers: {
    storeOrders(state, action) {
      state.orders = action.payload;
    },
    storeOrder(state, action) {
      state.order = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
