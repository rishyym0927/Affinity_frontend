// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col fixed top-0 left-0">
      <div className="p-6 flex flex-col items-center border-b border-gray-700">
        <img
          src="/path/to/profile.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h3 className="text-xl font-semibold">Your Name</h3>
      </div>
      <nav className="flex-1 p-6">
        <ul>
          <li className="mb-4">
            <Link to="search" className="text-lg hover:text-gray-400">
              Search
            </Link>
          </li>
          <li className="mb-4">
            <Link to="queue" className="text-lg hover:text-gray-400">
              Queue
            </Link>
          </li>
          <li>
            <Link to="matches" className="text-lg hover:text-gray-400">
              Matches
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
