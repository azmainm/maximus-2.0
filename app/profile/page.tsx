// app/profile/page.tsx
"use client";
import { useState } from 'react';
import { FiArrowUpRight, FiTrash2 } from 'react-icons/fi';
import { articles, Article } from '../data/articles';
import Modal from '../blog/components/Modal';
import Navbar from "../ui/Navbar";

const Profile = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

  const userInfo = {
    full_name: 'John Doe',
    email: 'johndoe@example.com',
    age: 28,
    sex: 'Male',
    height: '5ft 9in',
    weight: '160 lbs',
    total_articles: 2,
  };

  const userArticles: Article[] = [articles[0], articles[1]];
  const favoriteArticles: Article[] = [articles[2], articles[0], articles[1]];

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleDeleteArticle = (articleId: number) => {
    setArticleToDelete(articleId);
    setShowConfirmationModal(true);
  };

  const confirmDeletion = () => {
    if (articleToDelete !== null) {
      console.log(`Article with ID ${articleToDelete} deleted.`);
      setShowConfirmationModal(false);
      setShowDeletionModal(true);
    }
  };

  const cancelDeletion = () => {
    setShowConfirmationModal(false);
    setArticleToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <Navbar isLoggedIn={true} handleLogout={() => console.log("Logout")} />

      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white font-poppins p-4">
        {/* Top Card with User Information */}
        <div className="w-full max-w-4xl p-6 mb-6 bg-gray-900 border border-gray-300 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gray-300">{userInfo.full_name}</span>
          </h1>
          <p className="text-md mb-2">
            <span className="text-cyan-100">Email: </span>
            {userInfo.email}
          </p>
          <p className="text-md mb-2">
            <span className="text-cyan-100">Age: </span>
            {userInfo.age}
          </p>
          <p className="text-md mb-2">
            <span className="text-cyan-100">Sex: </span>
            {userInfo.sex}
          </p>
          <p className="text-md mb-2">
            <span className="text-cyan-100">Height: </span>
            {userInfo.height}
          </p>
          <p className="text-md mb-2">
            <span className="text-cyan-100">Weight: </span>
            {userInfo.weight}
          </p>
          <p className="text-md font-bold">
            <span className="text-cyan-100">Total Posted Articles: </span>
            {userInfo.total_articles}
          </p>
        </div>

        {/* Cards with User's Posted Articles */}
        <h1 className="font-poppins font-semibold text-lg mb-4">Posted Articles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {userArticles.map((article) => (
            <div
              key={article.id}
              className="relative p-4 rounded-md border border-gray-300 bg-gray-900 shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
              style={{ height: '120px' }}  // Fixed height to ensure buttons don't overlap
            >
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <button
                onClick={() => openModal(article)}
                className="absolute top-2 right-2 bg-gray-900 text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
              >
                <FiArrowUpRight />
              </button>
              <button
                onClick={() => handleDeleteArticle(article.id)}
                className="absolute bottom-2 right-2 bg-gray-900 text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Cards with User's Favorite Articles */}
        <h1 className="font-poppins font-semibold text-lg mb-4 mt-10">Favorite Articles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {favoriteArticles.map((article) => (
            <div
              key={article.id}
              className="relative p-4 rounded-md border border-gray-300 bg-gray-900 shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
              style={{ height: '120', width:'280' }} 
            >
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <button
                onClick={() => openModal(article)}
                className="absolute top-2 right-2 bg-gray-900 text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
              >
                <FiArrowUpRight />
              </button>
            </div>
          ))}
        </div>

        {/* Article Details Modal */}
        {showModal && selectedArticle && (
          <Modal
            title={selectedArticle.title}
            tldr={selectedArticle.tldr}
            onClose={() => setShowModal(false)}
            articleId={selectedArticle.id}
          />
        )}

        {/* Deletion Success Modal */}
        {showDeletionModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 bg-black border border-gray-300 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Article Deleted</h2>
              <p className="mb-6">The article has been deleted successfully.</p>
              <button
                onClick={() => setShowDeletionModal(false)}
                className="px-6 py-2 bg-black border border-gray-300 rounded-lg hover:bg-cyan-800 transition ease-in-out duration-200"
              >
                Okay
              </button>
            </div>
          </div>
        )}

        {/* Deletion Confirmation Modal */}
{showConfirmationModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div className="relative w-80 p-6 bg-black border border-gray-300 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
      <p className="mb-6">Do you really want to delete this article? This process cannot be undone.</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={confirmDeletion}
          className="px-6 py-2 bg-red-600 border border-gray-300 rounded-lg hover:bg-red-700 transition ease-in-out duration-200"
        >
          Yes
        </button>
        <button
          onClick={cancelDeletion}
          className="px-6 py-2 bg-gray-700 border border-gray-300 rounded-lg hover:bg-gray-600 transition ease-in-out duration-200"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Profile;
