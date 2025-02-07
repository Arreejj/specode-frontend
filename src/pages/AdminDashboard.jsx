import React from 'react';
import { Link } from 'react-router-dom'; 
import avatar from "../assets/images/profileavatar.png";

const AdminDashboard = () => {
 
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    avatar: avatar, 
    role: "System Administrator"
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-8">Admin Dashboard</h2>
        <ul>
          <li><Link to="/AdminUsers" className="hover:text-blue-400">User Management</Link></li>
          <li><Link to="/AdminPerformance" className="hover:text-blue-400">System Performance</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Dashboard Header */}
        <header className="text-2xl font-semibold text-blue-500 mb-6">
          Admin Dashboard
        </header>

        {/* Admin Info Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <img
            src={admin.avatar}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
          />
          <h2 className="text-xl font-semibold">{admin.name}</h2>
          <p className="text-gray-600">{admin.email}</p>
          <p className="text-gray-500 text-sm">{admin.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
