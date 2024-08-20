// pages/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Search from './Search';
import ProfileCard from '../components/ProfileCard';
import InfoCard from '../components/InfoCard';
// import Queue from './Queue';
// import Matches from './Matches';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex p-6">
        <Routes>
          <Route path="search" element={<Search />} />
          {/* <Route path="queue" element={<Queue />} />
          <Route path="matches" element={<Matches />} /> */}
        </Routes>
        <div className=' flex justify-center items-center h-full w-[40%]'>
            <ProfileCard/>
        </div>
        <div className='flex  items-center h-full w-[60%]'>
            <InfoCard/>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
