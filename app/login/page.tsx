// app/login/page.tsx

"use client";

import { useState } from "react";
import Navbar from "../ui/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are mandatory. Please fill out your email and password.",{
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      // Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        toast.error("User not registered! Please sign up first.", {
          position: "bottom-right",
          autoClose: 3000,
        });
        await signOut(auth);
        return;
      }

      // Log the user information (optional)
      //console.log("User logged in:", user);

      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      router.push("/blog"); // Redirect the user to the blog page
    } catch (error) {
      // Handle errors and display toast messages
      if (error instanceof Error) {
        //console.error("Error during login:", error.message);
        toast.error(`Incorrect credentials. Please try again.`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        //console.error("Unknown error during login:", error);
        toast.error("An unknown error occurred.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // If user doesn't exist in Firestore, optionally create an entry
        toast.error("User not registered!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        await signOut(auth);
        return;
      }

      toast.success("Google sign-in successful!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      router.push("/blog");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Google sign-in failed: ${error.message}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error("An unknown error occurred during Google sign-in.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };


  return (
    <div>
      <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <ToastContainer />
      <div className="w-full max-w-sm p-6 bg-gray-900 rounded-md border border-gray-300 shadow-lg text-white">
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

        {/* Google Sign-in */}
        <div className="mt-4 text-center">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-2 bg-gray-900 text-white font-medium rounded-md border border-gray-300 hover:bg-cyan-600 transition duration-200"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Sign in with Google
        </button>
        </div>
        {/* <div className="mt-3 text-left text-xs"><span className="text-cyan-300">Note: </span>If you have signed up with Google, please sign in with Google as well.</div> */}

        <div className="mt-6 text-center">
  <p>
    Do not have an account?{" "}
    <Link href="/signup" className="text-cyan-500 hover:text-cyan-400">
      Sign Up
    </Link>
  </p>
  <p className="mt-2">
    <Link href="/forgotpassword" className="text-cyan-500 hover:text-cyan-400">
      Forgot Password?
    </Link>
  </p>
</div>

      </div>
    </div>
    </div>
  );
};

export default Login;