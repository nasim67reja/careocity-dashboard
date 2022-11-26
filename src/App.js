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

axios.defaults.withCredentials = true; //it's for getting and storing cookies in browser for future request

export const URL = "https://cryptic-anchorage-43168.herokuapp.com";

const App = () => {
  const dispatch = useDispatch();
  const getProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/products`);
      dispatch(productsActions.storeProducts(data.data.data));
    } catch (error) {
      console.log(`error: `, error);
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users`);
      dispatch(userActions.storeUsers(data.data.data));
    } catch (error) {
      console.log(`error: `, error);
    }
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // const allProducts = useSelector((state) => state.allProducts.allProducts);
  // const users = useSelector((state) => state.Users.users);
  // console.log(users);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
          <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
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
