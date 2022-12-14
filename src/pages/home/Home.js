import React from "react";
import { useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import { UpdateDate } from "../../components/Other/Reuse";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {
  const users = useSelector((state) => state.Users.users);
  const Orders = useSelector((state) => state.Orders.orders);

  const orderDateUpdate = UpdateDate(Orders);

  const Earnings =
    Orders &&
    Math.round(Orders.map((el) => el.price).reduce((acc, cur) => acc + cur));

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" total={users?.length} />
          <Widget type="orders" total={Orders?.length} />
          <Widget type="earnings" total={Earnings} />
          <Widget type="balance" total={Earnings} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table userOrder={orderDateUpdate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
