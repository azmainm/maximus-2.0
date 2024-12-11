"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { articles, Article } from "../../data/articles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../ui/Navbar";

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); 
    window.location.href = "/"; }

  useEffect(() => {
    const fetchedArticle = articles.find((a) => a.id.toString() === articleId);
    setArticle(fetchedArticle || null);
  }, [articleId]);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  if (!article) {
    return <div className="text-white text-center mt-20">Article not found</div>;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    
    <div className="min-h-screen bg-gray-900 text-white font-poppins p-4">
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 border border-cyan-300 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <button onClick={toggleFavorite} aria-label="Favorite">
            <FontAwesomeIcon
              icon={faHeart}
              className={`transition-all duration-300 ${
                isFavorited ? "text-red-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
        <p className="text-gray-400 mb-4">By {article.author}</p>
        <p className="text-md whitespace-pre-wrap">{article.content}</p>
      </div>
    </div>
    </div>
  );
};

export default ArticlePage;
