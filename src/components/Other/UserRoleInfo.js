import { Alert } from "@mui/material";
import React from "react";
import { useState } from "react";
import "./userroleinfo.scss";

const UserRoleInfo = () => {
  const [alertIsShown, setAlertIsShown] = useState(true);
  return (
    <>
      {alertIsShown && (
        <div className="userrole">
          <Alert
            variant="filled"
            severity="warning"
            className="warning flex-center"
            onClose={() => setAlertIsShown(false)}
          >
            Please log in as admin for better experience
          </Alert>
        </div>
      )}
    </>
  );
};

export default UserRoleInfo;
