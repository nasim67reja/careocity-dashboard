import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { URL } from "../../App";
import { truncateString } from "../Other/Reuse";

const List = ({ userOrder }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrder &&
            userOrder.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="tableCell">
                  {truncateString(order._id, 10)}
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img
                      src={`${URL}/Products/${order.product.categories}/${order.product.images[0]}`}
                      alt="Product_image"
                      crossOrigin="anonymous"
                      className="image"
                    />
                    {truncateString(order.product.name, 20)}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{order.user.name}</TableCell>
                <TableCell className="tableCell">{order.date}</TableCell>
                <TableCell className="tableCell">{order.price}</TableCell>
                <TableCell className="tableCell">Online</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
