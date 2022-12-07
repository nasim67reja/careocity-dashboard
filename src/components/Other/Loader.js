import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="flex-center"
      style={{
        gap: "0.3rem",
        fontSize: "1.2rem",
      }}
    >
      <Oval
        height={20}
        width={20}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={5}
        strokeWidthSecondary={2}
      />
      <span style={{ opacity: "0.9", color: "#343" }}>Loading...</span>
    </div>
  );
};

export default Loader;
