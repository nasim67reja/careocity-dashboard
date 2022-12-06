import React from "react";
import { useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  const users = useSelector((state) => state.Users.users);
  const user = useSelector((state) => state.Users.user);
  const Orders = useSelector((state) => state.Orders.orders);

  const Earnings =
    Orders &&
    Math.round(Orders.map((el) => el.price).reduce((acc, cur) => acc + cur));

  const products = useSelector((state) => state.allProducts.allProducts);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" total={users?.length} />
          <Widget type="order" total={Orders?.length} />
          <Widget type="earning" total={Earnings} />
          <Widget type="balance" total={Earnings} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
