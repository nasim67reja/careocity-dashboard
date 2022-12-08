import ReactDOM from "react-dom";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { URL } from "../../App";
import Loader from "../Other/Loader";
import "./userInfo.scss";
import Backdrop from "../Other/Backdrop";
import { overlayActions } from "../../store/Ovarlay";
import { userActions } from "../../store/Users";
import UpdateForm from "./UpdateForm";

const UserInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.Users.curUser);
  const curUserOrder = useSelector((state) => state.Orders.orders)?.filter(
    (el) => el.user._id === params.userId
  );

  const getUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users/${params.userId}`);
      dispatch(userActions.storeCurUser(data.data.data));
    } catch (error) {
      console.log(`error: `, error);
    }
  }, [params.userId, dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <UpdateForm />,
        document.getElementById("ovarlay-root")
      )}
      <div className="left">
        <div
          className="editButton"
          onClick={() => {
            dispatch(overlayActions.backdropVisible(true));
            dispatch(overlayActions.updateFormVisiblity(true));
          }}
        >
          Edit
        </div>
        <h1 className="title">Information</h1>

        {!curUser && <Loader />}
        {curUser && (
          <div className="item">
            <img
              crossOrigin="anonymous"
              src={`${URL}/img/users/${curUser.photo}`}
              alt="userphoto"
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{curUser.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{curUser.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Role:</span>
                <span className="itemValue">{curUser.role}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Status:</span>
                <span className="itemValue">
                  {`${curUser.active ? "Active" : "Deactive"}`}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Total Reviews:</span>
                <span className="itemValue"> {curUser.reviews.length}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Total Orders:</span>
                <span className="itemValue">
                  {curUserOrder && curUserOrder.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfo;
