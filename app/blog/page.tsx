// app/blog/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import { articles, Article } from "../data/articles";
import Modal from "./components/Modal";
import Navbar from "../ui/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";


const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent navigation
      toast.error("You need to be logged in to create a post!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <Navbar />

      {/* Search and Plus Button */}
      <div className="flex flex-wrap items-center gap-4 px-6 py-4 max-w-4xl mx-auto">
  {/* Search Bar */}
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search articles..."
    className="flex-grow p-2 rounded-md bg-gray-900 border border-gray-300 text-white w-full sm:w-auto"
  />
  
  {/* Plus Button */}
  <Link href="/create" className="ml-auto">
    <button onClick={handleCreateClick} className="p-2 rounded-full border border-gray-300 text-white hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200 flex items-center justify-center w-12 h-12">
      <FiPlus />
    </button>
  </Link>
</div>


      {/* Article Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4 max-w-6xl mx-auto">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="relative p-4 rounded-md border border-gray-300 bg-gray-900 shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
          >
            {/* Title Container */}
      <h3 className="text-xl font-bold mb-2 pr-10">{/* Added padding-right */}
        {article.title}
      </h3>
            <button
              onClick={() => openModal(article)}
              className="absolute top-2 right-2 bg-black text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
            >
              <FiArrowUpRight />
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedArticle && (
        <Modal
          title={selectedArticle.title}
          tldr={selectedArticle.tldr}
          onClose={() => setShowModal(false)}
          articleId={selectedArticle.id}
        />
      )}
    </div>
  );
};

export default BlogPage;
