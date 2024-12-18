// app/forgotpassword/page.tsx
"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
//import { collection, getDocs, query, where } from "firebase/firestore";
import { auth} from "../../firebaseConfig"; // Ensure firebaseConfig exports both auth and db
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../ui/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Directly send password reset email
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent! Please check your email.", {
        position: "bottom-right",
        autoClose: 3000,
      });
  
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
      console.error("Error resetting password:", error.message);
      toast.error("Failed to send password reset link. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <ToastContainer />
        <div className="w-full max-w-sm p-6 bg-gray-900 rounded-md border border-gray-300 shadow-lg text-white">
          <h2 className="text-2xl font-medium mb-4 text-center">Forgot Password</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            onClick={handleResetPassword}
            className={`w-full py-2 bg-gray-200 text-gray-900 font-medium rounded-md hover:bg-cyan-600 hover:text-gray-100 transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="mt-6 text-center">
            <p>
              Remember your password?{" "}
              <Link href="/login" className="text-cyan-500 hover:text-cyan-400">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
