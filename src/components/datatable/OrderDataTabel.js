import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { URL } from "../../App";
import { truncateString } from "../Other/Reuse";
import "./datatable.scss";

const OrderDataTabel = ({ statusProp }) => {
  const Orders = useSelector((state) => state.Orders.orders);

  const newOrders = Orders?.filter((el) => el.status === statusProp).map(
    (el, i) => {
      return { ...el, id: i + 1 };
    }
  );

  const userColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "product",
      headerName: "Product",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              crossOrigin="anonymous"
              src={`${URL}/Products/${params.row.product.categories}/${params.row.product.images[0]}`}
              alt="avatar"
            />
            {truncateString(params.row.product.name, 25)}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
    },
    {
      field: "user",
      headerName: "Customer",
      width: 170,
      renderCell: (params) => {
        return <div>{params.row.user.name}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
  ];

  const UpdateOrder = async (id, status) => {
    try {
      await axios.patch(`${URL}/api/v1/orders/${id}`, {
        status: status,
      });
      //   dispatch(orderActions.remove)
      window.location.reload();
    } catch (error) {
      console.log(`error: `, error);
    }
  };

  const approveHandler = (e) => {
    const status = e.target.className.split(" ")[1];
    // console.log(e.target.className.split(" ")[1]);
    UpdateOrder(e.target.id, status);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              // className="viewButton"
              id={params.row._id}
              onClick={approveHandler}
              className={`viewButton ${
                params.row.status === "pending" ? "approved" : "completed"
              }`}
              // className={`${params.row.status === "pending" ? "Approved" : "Completed"`}
              // }
            >
              {/* Approved */}
              {params.row.status === "pending" ? "Approved" : "Completed"}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable" style={{ minHeight: "90vh" }}>
      {newOrders && newOrders.length > 0 ? (
        <>
          <h2 className="heading">
            {`${statusProp.split("")[0].toUpperCase()}${statusProp
              .split("")
              .slice(1)
              .join("")}`}{" "}
            Orders
          </h2>
          <DataGrid
            className="datagrid"
            rows={newOrders}
            columns={userColumns.concat(actionColumn)}
            //   columns={userColumns}
            pageSize={13}
            rowsPerPageOptions={[13]}
            checkboxSelection
          />
        </>
      ) : (
        <div className="pending-orders">
          All orders {statusProp === "approved" && "delivery"} have been{" "}
          {statusProp === "pending" ? "pending" : "completed"}. 🎉
        </div>
      )}
    </div>
  );
};

export default OrderDataTabel;
