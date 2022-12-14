import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { URL } from "../../App";
import axios from "axios";

const DataTable = () => {
  const users = useSelector((state) => state.Users.users);
  const newUsers = users?.map((el, i) => {
    return { ...el, newId: i + 1 };
  });

  const userColumnsT = [
    {
      field: "newId",
      headerName: "ID",
      width: 70,
    },
    {
      field: "user",
      headerName: "User",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              crossOrigin="anonymous"
              src={`${URL}/img/users/${params.row.photo}`}
              alt="avatar"
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
    },
    {
      field: "active",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div
            className={`status status-${
              params.row.active ? "active" : "deactive"
            }`}
          >
            {params.row.active ? "Active" : "Deactive"}
          </div>
        );
      },
    },
  ];

  const userDeleteHandler = (e) => {
    const DeleteUser = async () => {
      try {
        await axios.delete(`${URL}/api/v1/users/${e.target.id}`);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } catch (error) {
        console.log(`error: `, error);
      }
    };
    DeleteUser();
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              id={params.row.id}
              onClick={userDeleteHandler}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {users && (
        <DataGrid
          className="datagrid"
          rows={newUsers}
          columns={userColumnsT.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default DataTable;
