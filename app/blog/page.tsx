// app/blog/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import { articles, Article } from "../data/articles";
import Modal from "./components/Modal";
import Navbar from "../ui/Navbar";

const BlogPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <Navbar isLoggedIn={true} handleLogout={() => console.log("Logout")} />

      {/* Search and Plus Button */}
      <div className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="flex-grow p-2 rounded-md bg-gray-900 border border-gray-300 text-white"
        />
        <Link href="/create">
          <button className="ml-4 p-2 rounded-full border border-gray-300 text-white hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200 flex items-center justify-center">
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
            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
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
