// pages/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Search from './Search';
// import Queue from './Queue';
// import Matches from './Matches';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="search" element={<Search />} />
          {/* <Route path="queue" element={<Queue />} />
          <Route path="matches" element={<Matches />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
