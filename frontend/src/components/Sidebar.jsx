import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className={`h-screen bg-white shadow-lg fixed left-0 top-0 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className={`h-full flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && <h2 className="text-2xl font-bold text-[#00a4a6]">Dashboard</h2>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="material-icons text-gray-600">
              {isCollapsed ? 'menu_open' : 'menu'}
            </span>
          </button>
        </div>
        <nav className="flex-1 py-4">
          <div className="space-y-2">
            <NavLink
              to="/grcp"
              className={({ isActive }) =>
                `group relative flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#00a4a6] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="material-icons">analytics</span>
              {!isCollapsed && <span className="ml-3">GRCP</span>}
              {isCollapsed && (
                <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-gray-800">GRCP</span>
                </div>
              )}
            </NavLink>
            <NavLink
              to="/lrcp"
              className={({ isActive }) =>
                `group relative flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#00a4a6] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span className="material-icons">assessment</span>
              {!isCollapsed && <span className="ml-3">LRCP</span>}
              {isCollapsed && (
                <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-gray-800">LRCP</span>
                </div>
              )}
            </NavLink>
            <Link
              to="/test-data-upload"
              className={`block px-4 py-2 rounded-md transition ${
                isActive('/test-data-upload')
                  ? 'bg-white text-[#00a4a6]'
                  : 'hover:bg-white/10'
              }`}
            >
              Test Data Upload
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 rounded-md transition hover:bg-white/10 text-left"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 