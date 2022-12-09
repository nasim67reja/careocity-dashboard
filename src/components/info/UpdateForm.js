import axios from "axios";
import React from "react";
import { useState } from "react";
import "./updateform.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { overlayActions } from "../../store/Ovarlay";

const ProfilePic = () => {
  const curUser = useSelector((state) => state.Users.curUser);

  const [userPhoto, setUserPhoto] = useState({
    photo: "",
  });

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo", userPhoto.photo);
    try {
      await axios.patch(`${URL}/api/v1/users/updateMe`, formData);
      document.location.reload();
    } catch (error) {
      console.log(`error: `, error);
      // setError(error.response.data.message);
    }
  };

  return (
    <form onSubmit={formSubmissionHandler} encType="multipart/form-data">
      <h3>Profile Picture</h3>
      {curUser && (
        <img
          crossOrigin="anonymous"
          src={`${URL}/img/users/${curUser.photo}`}
          alt="userPhoto"
          className="user-img"
        />
      )}
      <div className="input-file flex-center ">
        <label className="flex-center shadow" htmlFor="fileUp">
          Upload File: <DriveFolderUploadOutlinedIcon className="icon" />{" "}
        </label>
        <input
          type="file"
          id="fileUp"
          name="photo"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setUserPhoto({ photo: e.target.files[0] })}
        />
        <button type="submit" className="shadow">
          Update
        </button>
      </div>
    </form>
  );
};

const UserName = () => {
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const curUser = useSelector((state) => state.Users.curUser);

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {!inputIsVisible && (
        <div className="name-input flex-center">
          <label>Name :</label>
          <span>{curUser?.name}</span>
          <button onClick={() => setInputIsVisible(true)}>Edit</button>
        </div>
      )}
      {inputIsVisible && (
        <div className="input-box">
          <input type="text" placeholder={curUser?.name} />
          <button type="submit">Update</button>
        </div>
      )}
    </form>
  );
};

const UserRole = ({ name, first, second }) => {
  const [checkedValue, setCheckedValue] = useState();
  const changeHandler = (e) => {
    setCheckedValue(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(checkedValue);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="flex-center role-box">
        <div className="title">{name} :</div>
        <div className="btn-group" onChange={changeHandler}>
          <div>
            <input type="radio" name={name} id={first} value={first} />
            <label htmlFor={first}>{first}</label>
          </div>
          <div>
            <input type="radio" name={name} id={second} value={second} />
            <label htmlFor={second}>{second}</label>
          </div>
        </div>
        <button type="submit" className="update">
          Update
        </button>
      </div>
    </form>
  );
};

const UpdateForm = () => {
  const dispatch = useDispatch();
  const updateFormIsVisible = useSelector(
    (state) => state.Ovarlay.updateFormIsVisible
  );
  return (
    <>
      {updateFormIsVisible && (
        <div className="updateform flex-center">
          <CloseIcon
            className="icon-close"
            onClick={() => {
              dispatch(overlayActions.backdropVisible(false));
              dispatch(overlayActions.updateFormVisiblity(false));
            }}
          />
          <div className="left-col">
            <ProfilePic />
          </div>
          <div className="right-col">
            <UserName />
            <UserRole name="Role" first="User" second="Admin" />
            <UserRole name="Status" first="Active" second="Deactive" />
            <button>delete user</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateForm;
