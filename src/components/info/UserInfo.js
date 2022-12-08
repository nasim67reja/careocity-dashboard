import ReactDOM from "react-dom";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { URL } from "../../App";
import Loader from "../Other/Loader";
import "./userInfo.scss";
import Backdrop from "../Other/Backdrop";
import { overlayActions } from "../../store/Ovarlay";

const UserInfo = () => {
  const [user, setUser] = useState();
  const params = useParams();
  const curUserOrder = useSelector((state) => state.Orders.orders)?.filter(
    (el) => el.user._id === params.userId
  );

  const getUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`${URL}/api/v1/users/${params.userId}`);
      setUser(data.data.data);
    } catch (error) {
      console.log(`error: `, error);
    }
  }, [params.userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const dispatch = useDispatch();
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      <div className="left">
        <div
          className="editButton"
          onClick={() => {
            dispatch(overlayActions.backdropVisible(true));
          }}
        >
          Edit
        </div>
        <h1 className="title">Information</h1>

        {!user && <Loader />}
        {user && (
          <div className="item">
            <img
              crossOrigin="anonymous"
              src={`${URL}/img/users/${user.photo}`}
              alt="userphoto"
              className="itemImg"
            />
            <div className="details">
              <h1 className="itemTitle">{user.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Email:</span>
                <span className="itemValue">{user.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Role:</span>
                <span className="itemValue">{user.role}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Status:</span>
                <span className="itemValue">
                  {`${user.active ? "Active" : "Deactive"}`}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Total Reviews:</span>
                <span className="itemValue"> {user.reviews.length}</span>
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
