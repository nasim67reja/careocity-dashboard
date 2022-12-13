import ReactDOM from "react-dom";

import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Backdrop from "../../components/Other/Backdrop";
import CreateUser from "../../components/Other/CreateUser";
// import DataTable from "../../components/datatable/DataTable";

const List = ({ dataTable, name }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {/* {ReactDOM.createPortal(
        <CreateUser />,
        document.getElementById("ovarlay-root")
      )} */}
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          {name && (
            <header className="header">
              <h3>{name}s</h3>
              <button className="btn">Add new {name}</button>
            </header>
          )}
          {dataTable}
        </div>
      </div>
    </>
  );
};

export default List;
