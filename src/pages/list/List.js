import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DataTable from "../../components/datatable/DataTable";

const List = ({ dataTable }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* {dataTable} */}
      </div>
    </div>
  );
};

export default List;
