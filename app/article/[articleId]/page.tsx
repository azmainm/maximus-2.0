"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../ui/Navbar";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext

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
  const { userId } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId || Array.isArray(articleId)) return;
      const id = articleId.split("-")[0];

      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle(docSnap.data() as Article);

          // Check if the article is already favorited by the user
          if (userId) {
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setIsFavorited(userData.favorite_articles?.includes(id));
            }
          }
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [articleId, userId]);

  const toggleFavorite = async () => {
    if (!userId || !articleId || Array.isArray(articleId)) return;
    const id = articleId.split("-")[0];
    const userDocRef = doc(db, "users", userId);

    try {
      if (isFavorited) {
        // Remove article ID from favorite_articles
        await updateDoc(userDocRef, {
          favorite_articles: arrayRemove(id),
        });
        setIsFavorited(false);
      } else {
        // Add article ID to favorite_articles
        await updateDoc(userDocRef, {
          favorite_articles: arrayUnion(id),
        });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error updating favorite articles:", error);
    }
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
