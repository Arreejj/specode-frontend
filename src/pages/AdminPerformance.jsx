import React from 'react';
import { Link } from 'react-router-dom'; 
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; 
import Navbar from "../components/Navbar/Navbar";
import AdminSidebar from "../components/Navbar/adminsidebar";

const AdminPerformance = () => {
  
  const performanceData = {
    uptime: "99.9%",
    responseTime: "200ms",
    activeUsers: 1200,
    systemHealth: 95,
  };

  const kpiData = [
    { name: 'Active Users', value: 1200 },
    { name: 'Reports Completed', value: 800 },
    { name: 'System Health', value: 95 },
  ];

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen flex">
       {/* Sidebar */}
       <AdminSidebar /> 

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Dashboard Header */}
        <header className="text-2xl font-semibold text-blue-500 mb-6">
          Admin Dashboard
        </header>

        {/* Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg">System Uptime</h3>
            <p className="text-xl">{performanceData.uptime}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg">Response Time</h3>
            <p className="text-xl">{performanceData.responseTime}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg">Active Users</h3>
            <p className="text-xl">{performanceData.activeUsers}</p>
          </div>
        </div>

        {/* KPI Section with Pie Chart */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h3 className="font-semibold text-lg mb-4">KPI Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={kpiData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {kpiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'System Health' ? '#82ca9d' : '#8884d8'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      
      </div>
    </div>
    </>
  );
};

export default AdminPerformance;
