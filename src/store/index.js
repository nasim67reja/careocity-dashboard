import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "./allProducts";
import usersReducer from "./Users";

const store = configureStore({
  reducer: {
    Users: usersReducer,
    allProducts: allProductsReducer,
  },
});

export default store;
