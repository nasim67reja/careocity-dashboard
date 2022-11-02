import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-[6] ">container</div>
    </div>
  );
};

export default Home;
