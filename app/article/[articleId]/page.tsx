"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../ui/Navbar";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface Article {
  title: string;
  tldr: string;
  userName: string;
  content: string;
  userId: string;
}

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const { userId, isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableArticle, setEditableArticle] = useState<Partial<Article>>({});

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId || Array.isArray(articleId)) return;
      const id = articleId.split("-")[0];

      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Article;
          setArticle(data);
          setEditableArticle({ title: data.title, tldr: data.tldr, content: data.content });

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
    if (!isLoggedIn) {
      toast.error("Please log in to favorite articles.", {
        position: "bottom-right",
        autoClose: 3000,
      });return;
    }
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof Article, value: string) => {
    setEditableArticle((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    if (!articleId || Array.isArray(articleId)) return;
    const id = articleId.split("-")[0];
    const docRef = doc(db, "posts", id);

    try {
      await updateDoc(docRef, {
        title: editableArticle.title,
        tldr: editableArticle.tldr,
        content: editableArticle.content,
      });
      setArticle((prev) => ({ ...prev!, ...editableArticle }));
      setIsEditing(false);
      toast.success("Article updated successfully.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };


  if (!article) {
    return <div className="text-white text-center mt-20">Article not found</div>;
  }

  return (
    <div>
      <Head>
        <title>{article.title} - Fitness Hub</title>
        <meta name="description" content={article.tldr || "Read this amazing article on fitness."} />
        <meta name="author" content={article.userName} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.tldr} />
        <meta property="og:type" content="article" />
      </Head>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white font-poppins p-4">
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 border border-cyan-300 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            {isEditing ? (
              <input
                type="text"
                value={editableArticle.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="text-3xl font-bold mb-4 bg-gray-800 text-white p-2 rounded-md"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            )}

            <div className="flex items-center gap-4">
              {article.userId === userId && (
                <button onClick={isEditing ? saveChanges : handleEditToggle} aria-label="Edit">
                  <FontAwesomeIcon
                    icon={isEditing ? faCheck : faEdit}
                    className="text-cyan-500 transition-all duration-300 ml-2"
                  />
                </button>
              )}
              <button onClick={toggleFavorite} aria-label="Favorite">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`transition-all duration-300 ${
                    isFavorited ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="text-gray-300 mb-4">By {article.userName}</p>

          {isEditing ? (
            <textarea
              value={editableArticle.tldr || ""}
              onChange={(e) => handleInputChange("tldr", e.target.value)}
              className="text-gray-400 mb-4 bg-gray-800 text-white p-2 rounded-md w-full"
            />
          ) : (
            <p className="text-gray-400 mb-4">{article.tldr}</p>
          )}

          {isEditing ? (
            <textarea
              value={editableArticle.content || ""}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="text-md whitespace-pre-wrap bg-gray-800 text-white p-2 rounded-md w-full"
            />
          ) : (
            <p className="text-md whitespace-pre-wrap">{article.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
