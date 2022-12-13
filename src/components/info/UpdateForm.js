import axios from "axios";
import React from "react";
import { useState } from "react";
import "./updateform.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { URL } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { overlayActions } from "../../store/Ovarlay";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePic = () => {
  const curUser = useSelector((state) => state.Users.curUser);
  const params = useParams();

  const [userPhoto, setUserPhoto] = useState({
    photo: "",
  });

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("photo", userPhoto.photo);
    try {
      await axios.patch(`${URL}/api/v1/users/${params.userId}`, formData);
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

const UserName = ({ name }) => {
  const [inputIsVisible, setInputIsVisible] = useState(false);
  const curUser = useSelector((state) => state.Users.curUser);
  const [enteredValue, setEnteredValue] = useState("");
  const [result, setResult] = useState("");
  const params = useParams();

  const updateValue = async () => {
    try {
      if (name === "Name")
        await axios.patch(`${URL}/api/v1/users/${params.userId}`, {
          name: enteredValue,
        });
      else if (name === "Email")
        await axios.patch(`${URL}/api/v1/users/${params.userId}`, {
          email: enteredValue,
        });
      setResult("Successfully Update ✔");
      setTimeout(() => {
        setResult("");
      }, 4000);
    } catch (error) {
      console.log(`error: `, error);
      setResult("Something wrong 😢");
      setTimeout(() => {
        setResult("");
      }, 4000);
    }
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    updateValue();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      {!inputIsVisible && (
        <div className="name-input flex-center">
          <label>{name} :</label>
          <span>{name === "Name" ? curUser?.name : curUser?.email}</span>
          <button onClick={() => setInputIsVisible(true)}>Edit</button>
        </div>
      )}
      {inputIsVisible && (
        <div className="input-box">
          <input
            type="text"
            placeholder={name === "Name" ? curUser?.name : curUser?.email}
            onChange={(e) => setEnteredValue(e.target.value)}
            value={enteredValue}
          />
          <button type="submit" className="submit">
            Update
          </button>
          {result && (
            <div
              style={{ color: "green", fontSize: "1.2rem", marginTop: "5px" }}
            >
              {result}
            </div>
          )}
        </div>
      )}
    </form>
  );
};

const UserRole = ({ name, first, second }) => {
  const [checkedValue, setCheckedValue] = useState();
  const [result, setResult] = useState("");

  const params = useParams();

  const changeHandler = (e) => {
    setCheckedValue(e.target.value);
  };

  const updateValue = async () => {
    try {
      if (name === "Role")
        await axios.patch(`${URL}/api/v1/users/${params.userId}`, {
          role: checkedValue,
        });
      else if (name === "Status")
        await axios.patch(`${URL}/api/v1/users/${params.userId}`, {
          active: `${checkedValue === "Active" ? true : false}`,
        });
      setResult("Successfully Update ✔");
      setTimeout(() => {
        setResult("");
      }, 4000);
    } catch (error) {
      console.log(`error: `, error);
      setResult("Something wrong 😢");
      setTimeout(() => {
        setResult("");
      }, 4000);
    }
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    updateValue();
  };
  return (
    <form onSubmit={formSubmissionHandler}>
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
        {result && (
          <div style={{ color: "green", fontSize: "1rem", marginTop: "5px" }}>
            {result}
          </div>
        )}
      </div>
    </form>
  );
};

const UpdateForm = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const updateFormIsVisible = useSelector(
    (state) => state.Ovarlay.updateFormIsVisible
  );

  const DeleteUser = async () => {
    try {
      await axios.delete(`${URL}/api/v1/users/${params.userId}`);

      setResult("Delete user Successfully ✔");
      setTimeout(() => {
        setResult("");
        navigate("/users");
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.log(`error: `, error);
      setResult("Something wrong 😢");
      setTimeout(() => {
        setResult("");
      }, 4000);
    }
  };

  const userDeleteHandler = () => {
    DeleteUser();
  };
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
            <UserName name="Name" />
            <UserName name="Email" />
            <UserRole name="Role" first="user" second="admin" />
            <UserRole name="Status" first="Active" second="Deactive" />
            <button className="submit" onClick={userDeleteHandler}>
              Delete User Permanently
            </button>
            {result && (
              <div style={{ position: "absolute", bottom: "15%" }}>
                {result}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateForm;
