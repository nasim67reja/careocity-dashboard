import React from "react";

const Sidebar = () => {
  return (
    <div className="min-h-screen flex-[1] border-[0.5px] border-[rgb(230,227,227)] bg-white">
      <div className="flex h-12 items-center justify-center">
        <span className="text-lg font-bold text-[#6439ff]">Nasimadmin</span>
      </div>
      <hr className="h-0 border-[0.5px] border-[rgb(230,227,227)]" />
      <div className="pl-3">
        <ul>
          <li>
            <span>Dashboard</span>
          </li>
          <li>
            <span>Dashboard</span>
            <li>
              <span>Dashboard</span>
            </li>
          </li>
          <li>
            <span>Dashboard</span>
          </li>
        </ul>
      </div>
      <div>color options</div>
    </div>
  );
};

export default Sidebar;
