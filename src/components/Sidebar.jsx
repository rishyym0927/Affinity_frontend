// components/Sidebar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import profile_svg from "../assets/profile_svg.svg";

const Sidebar = () => {
    const {user} = useContext(AuthContext);
  return (
    <div className="w-96 h-full bg-neutral-900 text-white flex flex-col fixed top-0 left-0">
      <div className="p-6 flex flex-row items-center bg-red-800 m-5 rounded-lg gap-4 cursor-pointer">
        <img
          src= {user?.image || profile_svg }
          alt="Profile"
          className="w-16 h-16 rounded-full  border border-1 bg-white "
        />
        <h3 className="text-3xl font-semibold">{user?.username || "John Doe"}</h3>
      </div>
      <nav className="flex-1 p-6">
        <ul>
          <li className="mb-4">
            <Link to="/search" className="text-lg hover:text-gray-400">
              Search
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/queue" className="text-lg hover:text-gray-400">
              Queue
            </Link>
          </li>
          <li>
            <Link to="/matches" className="text-lg hover:text-gray-400">
              Matches
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
