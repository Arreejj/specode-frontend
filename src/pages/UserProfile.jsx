import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation (optional)
import avatar from "../assets/images/profileavatar.png";
import Navbar from "../components/Navbar/Navbar";

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Reem Omar',
    email: 'Reemomar@example.com',
    profilePicture: avatar,
  });

  const [reports, setReports] = useState([
    { id: 1, date: '2025-01-10', title: 'Report 1', status: 'Implemented' },
    { id: 2, date: '2025-01-15', title: 'Report 2', status: 'Partially Implemented' },
    { id: 3, date: '2025-01-20', title: 'Report 3', status: 'Unimplemented' },
  ]);

  // Toggle edit mode
  const toggleEdit = () => {
    setEditing(!editing);
  };

  // Update user details (you can connect this to an API)
  const updateProfile = (e) => {
    e.preventDefault();
    // Update the user profile (e.g., using an API)
    setEditing(false);
  };

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Header */}
      <header className="bg-blue-500 text-white text-left text-xl font-semibold py-4 px-6 rounded-lg shadow-md mb-6">
        User Profile
      </header>

      {/* Profile Information */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <button
            onClick={toggleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
          <Link
            to="/change-password"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Change Password
          </Link>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={updateProfile}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-4 justify-end mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="bg-gray-300 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reports Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-4">Reports History</h3>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left bg-blue-500 text-white px-4 py-2">Date</th>
              <th className="text-left bg-blue-500 text-white px-4 py-2">Title</th>
              <th className="text-left bg-blue-500 text-white px-4 py-2">Status</th>
              <th className="text-left bg-blue-500 text-white px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="border border-gray-300 px-4 py-2">{report.date}</td>
                <td className="border border-gray-300 px-4 py-2">{report.title}</td>
                <td className="border border-gray-300 px-4 py-2">{report.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/ReportDetail`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
    </>
  );
};

export default UserProfile;
