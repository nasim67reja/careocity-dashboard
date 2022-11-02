import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login";
import List from "./pages/list/List.js";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
