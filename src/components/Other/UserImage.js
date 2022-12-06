import React from "react";
import { useSelector } from "react-redux";
import { URL } from "../../App";

const UserImage = ({ imgHeight }) => {
  const loggedInUser = useSelector((state) => state.Users.user);

  return (
    <>
      {loggedInUser && (
        <img
          crossOrigin="anonymous"
          src={`${URL}/img/users/${loggedInUser.photo}`}
          alt="userPhoto"
          className="avatar"
        />
      )}
    </>
  );
};

export default UserImage;
