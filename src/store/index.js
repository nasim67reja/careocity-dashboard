import { configureStore } from "@reduxjs/toolkit";
import allProductsReducer from "./allProducts";
import usersReducer from "./Users";
import orderReducer from "./Orders";
import ovarlayReducer from "./Ovarlay";

const store = configureStore({
  reducer: {
    Users: usersReducer,
    Orders: orderReducer,
    allProducts: allProductsReducer,
    Ovarlay: ovarlayReducer,
  },
});

export default store;
