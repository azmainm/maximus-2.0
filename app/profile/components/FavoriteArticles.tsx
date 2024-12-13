// profile/components/FavoriteArticles.tsx

"use client";

import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { collection, query, where, getDocs, doc, getDoc  } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../blog/components/Modal";

interface Article {
  id: string;
  title: string;
  tldr: string; 
}

const FavoritedArticles = () => {
  const { userId } = useAuth(); 
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Fetch user's favorite articles from Firestore
  useEffect(() => {
    if (!userId) return;
  
    const fetchFavoriteArticles = async () => {
      try {
        const usersRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(usersRef);
        const favoriteArticleIds = userSnapshot.data()?.favorite_articles || [];
  
        if (favoriteArticleIds.length === 0) {
          setArticles([]);
          setLoading(false);
          return;
        }
  
        // Handle Firestore "in" query limit (10 items max)
        const chunkedIds = [];
        for (let i = 0; i < favoriteArticleIds.length; i += 10) {
          chunkedIds.push(favoriteArticleIds.slice(i, i + 10));
        }
  
        const fetchedArticles: Article[] = [];
        for (const ids of chunkedIds) {
          const articlesQuery = query(
            collection(db, "posts"),
            where("__name__", "in", ids)
          );
          const articlesSnapshot = await getDocs(articlesQuery);
          fetchedArticles.push(
            ...articlesSnapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              tldr: doc.data().tldr,
            }))
          );
        }
  
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching favorite articles:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavoriteArticles();
  }, [userId]);
  

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className="font-poppins font-semibold text-lg mb-4 mt-10 text-center">Favorite Articles</h1>
      {loading ? (
        <p>Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles favorited.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {articles.map((article) => (
            <div
              key={article.id}
              className="relative p-4 rounded-md border border-gray-300 bg-gray-900 shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
              style={{ width: "300px", height: "120px" }}
            >
              <h3 className="text-xl font-bold mb-2 pr-8">{article.title}</h3>
              <button
                onClick={() => openModal(article)}
                className="absolute top-2 right-2 bg-gray-900 text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
              >
                <FiArrowUpRight />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Viewing Article */}
      {showModal && selectedArticle && (
        <Modal
          title={selectedArticle.title}
          tldr={selectedArticle.tldr || "No summary available"}
          onClose={() => setShowModal(false)}
          articleId={selectedArticle.id}
        />
      )}
    </div>
  );
};

export default FavoritedArticles;

