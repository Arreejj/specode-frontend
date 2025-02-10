import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import AdminSidebar from "../components/Navbar/adminsidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/users") // FIXED API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched users:", data); // Debugging
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <AdminSidebar />
        <div className="flex-1 p-6 bg-gray-100">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="font-semibold text-lg mb-4">User Management</h3>
            
            {loading ? (
              <p>Loading users...</p> // Show loading message
            ) : users.length === 0 ? (
              <p>No users found.</p> // Show message if no users exist
            ) : (
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
