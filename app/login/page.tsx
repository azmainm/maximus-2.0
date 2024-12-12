// app/login/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are mandatory. Please fill out your email and password.");
      return;
    }
    try {
      // Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        toast.error("User not registered!");
        return;
      }

      // Log the user information (optional)
      console.log("User logged in:", user);

      toast.success("Login successful!");
      router.push("/blog"); // Redirect the user to the blog page
    } catch (error) {
      // Handle errors and display toast messages
      if (error instanceof Error) {
        console.error("Error during login:", error.message);
        toast.error(`Incorrect credentials. Please try again.`);
      } else {
        console.error("Unknown error during login:", error);
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
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
