import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  allProducts: null,
  Product: null,
};

const productsSlice = createSlice({
  name: "All Product",
  initialState: initialUserState,
  reducers: {
    storeProducts(state, action) {
      state.allProducts = action.payload;
    },
    storeProduct(state, action) {
      state.Product = action.payload;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
