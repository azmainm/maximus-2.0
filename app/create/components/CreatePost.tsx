// app/create/components/CreatePost.tsx
// app/create/components/CreatePost.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../../ui/Navbar";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tldr, setTldr] = useState("");
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const handlePost = async () => {
    setIsPosting(true);

    try {
      const userId = "USER_ID"; // Replace with actual user ID from authentication
      const userName = "USER_NAME"; // Replace with actual user name from authentication

      const articleData = {
        title,
        tldr,
        content,
        userId,
        userName,
        createdAt: serverTimestamp(),
      };

      // Add article to Firestore
      await addDoc(collection(db, "articles"), articleData);

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error posting article:", error);
      alert("Failed to post article. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white font-poppins">
        <div className="max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg shadow-cyan-300 w-full md:w-auto">
          <h1 className="text-4xl font-bold mt-8 mb-6 text-cyan-300 text-center">
            Post your Article
          </h1>
          <label className="text-md mb-2">What do you call the article?</label>
          <input
            type="text"
            placeholder="Title"
            className="mb-4 p-3 w-full rounded-sm text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-md mb-2">
            Describe your article in 2-3 sentences
          </label>
          <input
            type="text"
            placeholder="TLDR"
            className="mb-4 p-3 w-full rounded-sm text-black"
            value={tldr}
            onChange={(e) => setTldr(e.target.value)}
          />
          <label className="text-md mb-2">Now, write your heart out</label>
          <textarea
            placeholder="Content"
            className="mb-6 p-3 w-full h-40 rounded-sm text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <motion.button
            onClick={handlePost}
            className="px-6 py-3 mt-4 bg-gray-900 border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200"
            animate={isPosting ? { scale: 1.2, rotate: 360 } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post"}
          </motion.button>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 bg-black border border-cyan-300 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Article Created</h2>
              <p className="mb-6">Your article has been created successfully.</p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/blog");
                }}
                className="px-6 py-2 bg-black border border-cyan-300 rounded-lg hover:bg-cyan-800 transition ease-in-out duration-200"
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
