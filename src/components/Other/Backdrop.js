import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { overlayActions } from "../../store/Ovarlay";

const Backdrop = () => {
  const dispatch = useDispatch();
  const backdropIsVisible = useSelector(
    (state) => state.Ovarlay.backdropVisible
  );

  return (
    <>
      {backdropIsVisible && (
        <div
          className="backdrop"
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            cursor: "pointer",
            zIndex: "10",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
          onClick={() => {
            dispatch(overlayActions.backdropVisible(false));
          }}
        ></div>
      )}
    </>
  );
};

export default Backdrop;
