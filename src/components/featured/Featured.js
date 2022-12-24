import React from "react";
import "./featured.scss";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useSelector } from "react-redux";

const Featured = () => {
  const Orders = useSelector((state) => state.Orders.orders);

  const getOrder = (time) => {
    const Order = Orders?.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const dateNow = (Date.now() - orderDate.getTime()) / 86400000;
      return dateNow < time;
    });
    return Order;
  };

  const todayOrder = getOrder(1);
  const lastWeek = getOrder(7);
  const lastMonth = getOrder(30);

  const totalSell = (orderTime) => {
    const sell =
      orderTime && orderTime.length > 0
        ? orderTime.map((el) => el.price).reduce((acc, cur) => acc + cur)
        : 0;
    return sell;
  };
  const totalSellToday = totalSell(todayOrder);
  const totalSellOfLastWeek = totalSell(lastWeek) / 1000;
  const totalSellOfLastMonth = totalSell(lastMonth) / 1000;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${Math.round(totalSellToday)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">
                ${totalSellOfLastWeek.toFixed(2)}k
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">
                ${totalSellOfLastMonth.toFixed(2)}k
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
