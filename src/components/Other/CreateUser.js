import React from "react";
import "./createuser.scss";
import skeleton from "../../assets/skeleton.png";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { overlayActions } from "../../store/Ovarlay";

const CreateUser = () => {
  const dispatch = useDispatch();
  const formIsVisible = useSelector(
    (state) => state.Ovarlay.createUserFormIsVisible
  );

  const formSubmissionHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {formIsVisible && (
        <div className="create-user">
          <div className="relative">
            <CloseIcon
              className="icon-close"
              onClick={() => {
                dispatch(overlayActions.backdropVisible(false));
                dispatch(overlayActions.createUserFormIsVisiblity(false));
              }}
            />
            <form
              className="create-user__form"
              onSubmit={formSubmissionHandler}
            >
              <div className="input-img">
                <img src={skeleton} alt="human_face" />
                <div>
                  <input id="user-img" type="file" />
                  <label className="shadow" htmlFor="user-img">
                    Upload
                  </label>
                </div>
              </div>
              <div className="input-other">
                <div className=" flex-center">
                  <div className="input-other-boxes">
                    {/* <label>Name</label> */}
                    <input type="text" placeholder="Name" />
                  </div>
                  <div className="flex-center">
                    <div>
                      <input type="radio" name="role" id="user" value="user" />
                      <label htmlFor="user" className="radio-label">
                        user
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="role"
                        id="admin"
                        value="admin"
                      />
                      <label htmlFor="user" className="radio-label">
                        admin
                      </label>
                    </div>
                  </div>
                </div>
                <div className="input-other-boxes">
                  {/* <label>Email</label> */}
                  <input type="email" placeholder="Email" />
                </div>
                <div className="flex-center">
                  <div className="input-other-boxes">
                    {/* <label>Password</label> */}
                    <input type="password" placeholder="Password" />
                  </div>
                  <div className="input-other-boxes">
                    {/* <label>Password Confirm</label> */}
                    <input type="password" placeholder="Password Confirm" />
                  </div>
                </div>

                <div
                  style={{
                    textAlign: "end",
                    width: "100%",
                  }}
                >
                  <button type="submit" className="submit">
                    Create User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUser;
