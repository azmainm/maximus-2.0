// profile/components/PostedArticles.tsx
"use client";

import { useEffect, useState } from "react";
import { FiArrowUpRight, FiTrash2 } from "react-icons/fi";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../blog/components/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { writeBatch } from "firebase/firestore";


interface Article {
  id: string;
  title: string;
  tldr: string; 
}

const PostedArticles = () => {
  const { userId } = useAuth(); 
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Fetch articles from Firestore
  useEffect(() => {
    if (!userId) return;

    const fetchArticles = async () => {
      try {
        const postsQuery = query(collection(db, "posts"), where("userId", "==", userId));
        const querySnapshot = await getDocs(postsQuery);

        const fetchedArticles: Article[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title, // Ensure "title" exists in Firestore documents
          tldr: doc.data().tldr,  // Fetch "tldr" if available
        }));

        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [userId]);

  const openModal = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const openDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  const handleDeleteArticle = async () => {
    if (!selectedArticle) return;
  
    try {
      const postId = selectedArticle.id;
  
      // Delete the article document
      await deleteDoc(doc(db, "posts", postId));
  
      // Find all users who have this article in their favorite_articles array
      const usersQuery = query(
        collection(db, "users"),
        where("favorite_articles", "array-contains", postId)
      );
      const usersSnapshot = await getDocs(usersQuery);
  
      // Create a batch to update users
      const batch = writeBatch(db);
      usersSnapshot.forEach((userDoc) => {
        const userRef = doc(db, "users", userDoc.id);
        batch.update(userRef, {
          favorite_articles: userDoc
            .data()
            .favorite_articles.filter((id: string) => id !== postId),
        });
      });
  
      // Commit the batch operation
      await batch.commit();
  
      // Update local state
      setArticles((prev) => prev.filter((article) => article.id !== postId)); // Remove the article locally
      toast.success("Your post has been deleted!");
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete the post. Please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };
  

  return (
    <div>
      <h1 className="font-poppins font-semibold text-lg mb-4 text-center">Posted Articles</h1>
      {loading ? (
        <div
        className="animate-pulse relative p-4 rounded-md border border-gray-300 bg-gray-900 shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
        style={{ width: "300px", height: "120px" }}>
        </div>
      
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
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
              <button
                onClick={() => openDeleteModal(article)}
                className="absolute bottom-2 right-2 bg-gray-900 text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
              >
                <FiTrash2 />
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-50 z-50">
          <div className="bg-gray-900 z-50 border border-gray-600 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-cyan-50 mb-3">Confirm Deletion</h2>
            <p>Are you sure you want to delete the article?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-cyan-50 text-gray-900 rounded-lg mr-4 hover:bg-cyan-400"
              >
                No
              </button>
              <button
                onClick={handleDeleteArticle}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedArticles;