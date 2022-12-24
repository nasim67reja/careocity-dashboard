import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./single.scss";
import Loader from "../../components/Other/Loader";
import { UpdateDate } from "../../components/Other/Reuse";

const Single = ({ userProp, filterBy }) => {
  const params = useParams();

  const orders = useSelector((state) => state.Orders.orders);

  const userOrder = orders?.filter((el) => {
    if (params.productId) return el.product._id === params.productId;
    else if (params.userId) return el.user._id === params.userId;
    else return null;
  });
  const userOrderWithUpdateDate = UpdateDate(userOrder);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {userProp}
          <div className="right">
            <Chart
              aspect={3 / 2}
              title={
                filterBy === "user"
                  ? "User Spending ( Last 6 Months)"
                  : "Product Revenue(Last 6 Months)"
              }
              filterBy={filterBy}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {!userOrderWithUpdateDate && <Loader />}
          {userOrderWithUpdateDate && userOrderWithUpdateDate.length > 0 && (
            <Table userOrder={userOrderWithUpdateDate} />
          )}
          {userOrderWithUpdateDate && userOrderWithUpdateDate.length < 1 && (
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
