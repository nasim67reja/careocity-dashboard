import React from "react";
import "./widget.scss";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";

const Widget = ({ type, total }) => {
  return (
    <div className="widget">
      <div className="row row-top">
        <span className="title">{type.toUpperCase()}</span>
        {type === "users" ? (
          <PersonOutlinedIcon className="icon icon-user" />
        ) : type === "orders" ? (
          <ShoppingCartOutlinedIcon className="icon icon-order" />
        ) : type === "earnings" ? (
          <MonetizationOnOutlinedIcon className="icon icon-earning" />
        ) : type === "balance" ? (
          <AccountBalanceWalletOutlinedIcon className="icon icon-balance" />
        ) : (
          ""
        )}
      </div>
      <div className="row row-bottom">
        <span className="counter">
          {/* {data.isMoney && "$"} {amount} */}
          {type === "earning" || type === "balance" ? "$" : ""} {total}
        </span>
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          20 %
        </div>
      </div>
      <Link to={`/${type}`} className="widget-link">
        see all {type}
      </Link>
    </div>
  );
};

export default Widget;
