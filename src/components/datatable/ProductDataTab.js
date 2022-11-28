import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./productDataTab.scss";
import "./datatable.scss";
import { URL } from "../../App";

export const truncateString = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const ProductDataTab = () => {
  const Products = useSelector((state) => state.allProducts.allProducts);

  const newProudcts = Products?.map((el, i) => {
    return { ...el, newId: i + 1 };
  });

  console.log(newProudcts);

  const userColumnsT = [
    {
      field: "newId",
      headerName: "ID",
      width: 70,
    },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              crossOrigin="anonymous"
              src={`${URL}/Products/${params.row.categories}/${params.row.images[0]}`}
              alt="avatar"
            />
            {truncateString(params.row.name, 25)}
          </div>
        );
      },
    },
    {
      field: "prices",
      headerName: "Price",
      width: 90,
      renderCell: (params) => {
        return <div className="price">$ {params.row.price}</div>;
      },
    },
    {
      field: "ratingsAverage",
      headerName: "Ratings",
      width: 80,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 100,
    },
  ];

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
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable" style={{ minHeight: "94vh" }}>
      {newProudcts && (
        <DataGrid
          className="datagrid"
          rows={newProudcts}
          columns={userColumnsT.concat(actionColumn)}
          pageSize={13}
          rowsPerPageOptions={[13]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default ProductDataTab;
