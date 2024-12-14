// app/create/components/CreatePost.tsx
"use client";
import React, { useState} from "react";
import { useRouter } from "next/navigation";
//import { motion } from "framer-motion";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const CreatePost = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [tldr, setTldr] = useState("");
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const router = useRouter();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const updatedContent = value.replace(/\r?\n/g, "\n");
    setContent(updatedContent);
  };

  const handlePost = async () => {
    if (!currentUser) {
      toast.error("You need to be logged in to post an article.");
      return;
    }

    setIsPosting(true);

    try {
      const { uid, displayName } = currentUser;
      const articleData = {
        title,
        tldr,
        content,
        userId: uid,
        userName: displayName || "Anonymous",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add article to Firestore
      await addDoc(collection(db, "posts"), articleData);

      setShowSuccessModal(true);
      //toast.success("Article posted successfully!");
    } catch (error) {
      console.error("Error posting article:", error);
      toast.error("Failed to post the article. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white font-poppins">
        <div className="max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg shadow-cyan-600 w-full md:w-auto">
          <h1 className="text-4xl font-bold mt-8 mb-6 text-cyan-100 text-center">
            Post your Article
          </h1>
          <label className="text-md mb-2">What do you call the article?</label>
          <input
            type="text"
            placeholder="Title"
            className="mb-4 p-3 w-full rounded-md text-gray-100 bg-gray-900 border border-gray-600 mt-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-md mb-2">
            Describe your article in 2-3 sentences
          </label>
          <input
            type="text"
            placeholder="TLDR"
            className="mb-4 p-3 w-full rounded-md text-gray-100 bg-gray-900 border border-gray-600 mt-2"
            value={tldr}
            onChange={(e) => setTldr(e.target.value)}
          />
          <label className="text-md mb-2">Now, write your heart out</label>
          <textarea
            placeholder="Content"
            className="mb-6 p-3 w-full h-40 rounded-md text-gray-100 bg-gray-900 border border-gray-600 mt-2"
            value={content}
            onChange={handleContentChange}
          />
          <button
            onClick={handlePost}
            className="px-6 py-3 mt-4 bg-gray-900 border border-white rounded-lg hover:bg-cyan-800 hover:scale-105 transition ease-in duration-200"
            //animate={isPosting ? { scale: 1.2, rotate: 360 } : {}}
            //transition={{ duration: 0.5, ease: "easeInOut" }}
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
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
