// article/[articleId]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
//import { articles, Article } from "../../data/articles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../ui/Navbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

interface Article {
  title: string;
  tldr: string;
  userName: string;
  content: string;
}

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId || Array.isArray(articleId)) return; // Ensure articleId is a string
      const id = articleId.split("-")[0];
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle(docSnap.data() as Article);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

  if (!article) {
    return <div className="text-white text-center mt-20">Article not found</div>;
  }

  return (
    <div>
      <Navbar />
    
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
        <p className="text-gray-400 mb-4">By {article.userName}</p>
        <p className="text-gray-500 mb-4">{article.tldr}</p>
        <p className="text-md whitespace-pre-wrap">{article.content}</p>
      </div>
    </div>
    </div>
  );
};

export default ArticlePage;
