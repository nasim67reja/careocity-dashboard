import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  Products: null,
  Product: null,
};

const productsSlice = createSlice({
  name: "All Product",
  initialState: initialUserState,
  reducers: {
    storeProducts(state, action) {
      state.Products = action.payload;
    },
    storeProduct(state, action) {
      state.Product = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
