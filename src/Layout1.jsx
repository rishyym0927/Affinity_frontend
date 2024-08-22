// components/Layout1.js
import React from 'react';
import Sidebar from './components/Sidebar';

const Layout1 = ({ children }) => {
  return (
    <div className="flex h-screen flex-row">
      {/* Sidebar */}
      <div className='flex-0 w-full md:w-80 lg:w-96'>
      <Sidebar />
      </div>
    

      {/* Content area */}
      <div className="flex-1 w-1/6 p-20 bg-neutral-900 h-screen ">
        {children}
      </div>
    </div>
  );
};

export default Layout1;
