import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "./allProducts";
import usersReducer from "./Users";
import orderReducer from "./Orders";

const store = configureStore({
  reducer: {
    Users: usersReducer,
    Orders: orderReducer,
    allProducts: allProductsReducer,
  },
});

export default store;
