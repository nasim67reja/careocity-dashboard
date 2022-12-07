import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../App";
import "./userInfo.scss";

const UserInfo = () => {
  const [user, setUser] = useState();
  const params = useParams();

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

  return (
    <div className="left">
      <div className="editButton">Edit</div>
      <h1 className="title">Information</h1>
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
              <span className="itemKey">Country:</span>
              <span className="itemValue">USA</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
