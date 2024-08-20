// components/Layout1.js
import React from 'react';
import Sidebar from './components/Sidebar';

const Layout1 = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="flex-1 ml-64 ">
        {children}
      </div>
    </div>
  );
};

export default Layout1;
