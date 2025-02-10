import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/images/signup.png";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); // ✅ Show loading state

    console.log("🔍 Sending login request...");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📩 Response received:", data);

      if (!response.ok) {
        console.warn(`⚠️ Login Failed: ${data.message}`);
        setErrorMessage(data.message || "Login failed. Please try again.");
        setLoading(false); // ✅ Hide loading state
        return;
      }

      console.log(`✅ Login Successful: ${data.user.username}`);
      console.log("🔑 Token:", data.token);

      // ✅ Store user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect based on user role
      navigate(data.redirectTo || "/");

    } catch (error) {
      console.error("❌ Network Error:", error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false); // ✅ Hide loading state
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 bg-blue-500 flex justify-center items-center">
        <img src={signup} alt="Login" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 bg-blue-500 flex flex-col justify-center items-center p-6">
        <h2 className="text-center text-lg font-semibold text-white mb-4">Login</h2>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 bg-white p-2 rounded-md">{errorMessage}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="mt-1 block w-full pl-10 pr-3 py-2 bg-white text-blue-500 border border-gray-300 rounded-2xl"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="mt-1 block w-full pl-10 pr-3 py-2 bg-white text-blue-500 border border-gray-300 rounded-2xl"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-blue-500 font-semibold rounded-2xl"
            disabled={loading} // ✅ Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Redirect Button */}
          <button
            type="button"
            className="w-full py-2 px-4 bg-gray-200 text-blue-500 font-semibold rounded-2xl"
            onClick={() => navigate("/signup")} // ✅ Redirect to signup page
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
