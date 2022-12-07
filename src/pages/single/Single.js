import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./single.scss";
import Loader from "../../components/Other/Loader";

const Single = ({ userProp }) => {
  const params = useParams();
  // console.log(params.userId);
  const orders = useSelector((state) => state.Orders.orders);

  // console.log(orders);
  const userOrder = orders?.filter((el) => el.user._id === params.userId);
  // console.log(userOrder && userOrder.length);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {userProp}
          <div className="right">
            <Chart aspect={3 / 2} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {!userOrder && <Loader />}
          {userOrder && userOrder.length > 0 && <Table userOrder={userOrder} />}
          {userOrder && userOrder.length < 1 && (
            <div className="flex-center">
              This user didn't buy any product yet 😢
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
