import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import signup from "../assets/images/signup.png";
import Navbar from "../components/Navbar/Navbar";
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa'; // Import icons from react-icons

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform validation or API calls to submit the form
    console.log('Form Submitted:', { email, password });

    // Redirect to another page after successful login
    navigate('/');  // Navigate to dashboard or home page after successful login
  };

  return (
    <>
      <Navbar /> 
    <div className="min-h-screen flex">
      {/* Left side (Image) */}
      <div className="w-full md:w-1/2 bg-blue-500 flex justify-center items-center">
        <img
          src={signup} // Image source
          alt="Login"
          className="w-full h-full object-cover" // Ensure it covers the whole container
        />
      </div>

      {/* Right side (Form with Blue Background) */}
      <div className="w-full md:w-1/2 bg-blue-500 flex flex-col justify-center items-center p-6">
        <h2 className="text-center text-lg font-semibold text-white mb-4">
          Login
        </h2>

        {/* Continue with Google Button */}
        <button className="w-[400px] flex items-center justify-center py-2 px-4 bg-white text-blue-500 font-semibold rounded-2xl shadow-md hover:bg-blue-100 transition duration-200 mb-6">
          <FaGoogle className="mr-2 text-yellow-500" /> Continue with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="mt-1 block w-full pl-10 pr-3 py-2 bg-white text-blue-500 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="mt-1 block w-full pl-10 pr-3 py-2 bg-white text-blue-500 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-blue-500"
            />
          </div>

         
<div className="text-left">
  <button
    onClick={(e) => {
      e.preventDefault(); // Prevent the form submission
      navigate('/ResetPassword'); // Navigate to reset password page
    }}
    className="text-blue-300 hover:underline text-sm"
  >
    Forgot your password?
  </button>
</div>


          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-[400px] py-2 px-4 bg-white text-blue-500 font-semibold rounded-2xl shadow-md hover:bg-yellow-500 transition duration-200 mt-6"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-white hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
