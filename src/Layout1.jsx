// components/Layout1.js
import React from "react";
import Sidebar from "./components/Sidebar";

const Layout1 = ({ children }) => {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <div className=" w-1/6">
        <Sidebar />
      </div>

      {/* Content area */}
      <div className="f w-5/6 p-20 bg-neutral-900 h-screen ">
        {children}
      </div>
    </div>
  );
};

export default Layout1;
