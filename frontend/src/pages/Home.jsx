import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Dashboard</h3>
            <p className="text-gray-600">Select a menu item from the sidebar to get started.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Projects</span>
                <span className="text-[#00a4a6] font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Tasks</span>
                <span className="text-[#00a4a6] font-semibold">5</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-[#00a4a6]">notifications</span>
                <span className="text-gray-600">New project assigned</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="material-icons text-[#00a4a6]">update</span>
                <span className="text-gray-600">Task status updated</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
