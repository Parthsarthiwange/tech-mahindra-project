import React from 'react';
import Sidebar from '../components/Sidebar';

const LRCP = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">LRCP Dashboard</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">Welcome to the LRCP dashboard. Your content will appear here.</p>
        </div>
      </main>
    </div>
  );
};

export default LRCP; 