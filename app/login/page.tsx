// app/login/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-gray-900 border border-cyan-300 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-medium mb-4 text-center">Login</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-cyan-600 hover:text-gray-100 transition duration-200"
        >
          Log In
        </button>

        <div className="mt-4 text-center">
          <p>
            Do not have an account?{" "}
            <Link href="/signup" className="text-cyan-500 hover:text-cyan-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
