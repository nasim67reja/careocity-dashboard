import React, { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import axios from "axios";
import { useDispatch } from "react-redux";
import { productsActions } from "./store/allProducts";
import { userActions } from "./store/Users";
import { orderActions } from "./store/Orders";
import DataTable from "./components/datatable/DataTable";
import ProductDataTab from "./components/datatable/ProductDataTab";
import UserInfo from "./components/info/UserInfo";
import ProductInfo from "./components/info/ProductInfo";

axios.defaults.withCredentials = true; //it's for getting and storing cookies in browser for future request

// export const URL = "https://cryptic-anchorage-43168.herokuapp.com";
export const URL = "http://127.0.0.1:8000";
// export const URL = "https://e-commerceapi.up.railway.app";

const App = () => {
  const dispatch = useDispatch();

  const getDoc = useCallback(
    async (endpoint, action) => {
      try {
        const { data } = await axios.get(`${URL}/api/v1/${endpoint}`);
        dispatch(action(data.data.data));
      } catch (error) {
        if (endpoint === "users/me") dispatch(userActions.storeUser(undefined));

        console.log(`error: `, error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getDoc("users", userActions.storeUsers);
    getDoc("users/me", userActions.storeUser);
    getDoc("products", productsActions.storeProducts);
    getDoc("orders", orderActions.storeOrders);
  }, [getDoc]);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<List dataTable={<DataTable />} />} />
            <Route
              path=":userId"
              element={<Single userProp={<UserInfo />} />}
            />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
          <Route path="products">
            <Route index element={<List dataTable={<ProductDataTab />} />} />
            <Route
              path=":productId"
              element={<Single userProp={<ProductInfo />} />}
            />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
