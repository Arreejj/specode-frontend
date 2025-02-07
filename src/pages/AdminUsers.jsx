import React from 'react';
import { Link } from 'react-router-dom'; 


const AdminUsers = () => {
    const performanceData = {
        uptime: "99.9%",
        responseTime: "200ms",
        activeUsers: 1200,
        systemHealth: 95,
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
       
      {/* User Management Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="font-semibold text-lg mb-4">User Management</h3>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Users (this can be dynamic based on actual data) */}
              <tr>
                <td className="border border-gray-300 px-4 py-2">John Doe</td>
                <td className="border border-gray-300 px-4 py-2">john@example.com</td>
                <td className="border border-gray-300 px-4 py-2">Active</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
                <td className="border border-gray-300 px-4 py-2">jane@example.com</td>
                <td className="border border-gray-300 px-4 py-2">Inactive</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
