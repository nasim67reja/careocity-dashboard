import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "./store/allProducts";
import { userActions } from "./store/Users";
import { orderActions } from "./store/Orders";
import DataTable from "./components/datatable/DataTable";
import ProductDataTab from "./components/datatable/ProductDataTab";
import UserInfo from "./components/info/UserInfo";
import ProductInfo from "./components/info/ProductInfo";
import OrderDataTabel from "./components/datatable/OrderDataTabel";
import UserRoleInfo from "./components/Other/UserRoleInfo";
import Stats from "./pages/stats/Stats";

axios.defaults.withCredentials = true; //it's for getting and storing cookies in browser for future request

// export const URL = "http://127.0.0.1:8000";
export const URL = "https://e-commerceapi.up.railway.app";

const App = () => {
  const [userIsPresent, setUserIsPresent] = useState(true);

  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.Users.user);

  const getDoc = useCallback(
    async (endpoint, action) => {
      try {
        const { data } = await axios.get(`${URL}/api/v1/${endpoint}`);
        dispatch(action(data.data.data));
      } catch (error) {
        if (endpoint === "users/me") {
          setUserIsPresent(false);
          setTimeout(() => {
            window.location.assign(
              `https://nasim67reja.github.io/CareoCIty-ecommerce/#/login`
            );
          }, 3000);
          dispatch(userActions.storeUser(undefined));
        }

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
      {curUser?.role !== "admin" &&
        ReactDOM.createPortal(
          <UserRoleInfo />,
          document.getElementById("ovarlay-root")
        )}
      {userIsPresent ? (
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="stats" element={<Stats />} />
            <Route path="users">
              <Route
                index
                element={<List name="User" dataTable={<DataTable />} />}
              />
              <Route
                path=":userId"
                element={<Single userProp={<UserInfo />} filterBy="user" />}
              />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={<List name="Product" dataTable={<ProductDataTab />} />}
              />
              <Route
                path=":productId"
                element={
                  <Single userProp={<ProductInfo />} filterBy="product" />
                }
              />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="orders">
              <Route
                index
                element={
                  <List dataTable={<OrderDataTabel statusProp="pending" />} />
                }
              />
              <Route
                path=":orderId"
                element={<Single userProp={<ProductInfo />} />}
              />
            </Route>
            <Route path="delivery">
              <Route
                index
                element={
                  <List dataTable={<OrderDataTabel statusProp="approved" />} />
                }
              />
            </Route>
          </Route>
        </Routes>
      ) : (
        <div>Please Logged in to access this page</div>
      )}
    </>
  );
};

export default App;
