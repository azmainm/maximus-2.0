//app/profile/page.tsx

"use client";
import { useEffect } from 'react';
import Navbar from "../ui/Navbar";
import ProfileCard from "./components/ProfileCard";
import PostedArticles from "./components/PostedArticles";
//import Modal from '../blog/components/Modal';

const Profile = () => {
  //const [showModal, setShowModal] = useState<boolean>(false);
  // const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  // const [userInfo, setUserInfo] = useState<any | null>(null);
  // const [totalArticles, setTotalArticles] = useState<number>(0);
  // const [userArticles, setUserArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      // Replace with logic to fetch user and articles data
    };
    fetchUserData();
  }, []);

  // const openModal = (article: any) => {
  //   setSelectedArticle(article);
  //   setShowModal(true);
  // };

  // const handleDeleteArticle = (articleId: number) => {
  //   console.log(`Article with ID ${articleId} deleted.`);
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white font-poppins p-4">
        {/* {userInfo && ( */}
          <ProfileCard  />
        {/* )} */}
        <PostedArticles/>
        {/* Commenting out FavoriteArticles */}
        {/* <FavoriteArticles
          articles={favoriteArticles}
          openModal={openModal}
        /> */}
        {/* {showModal && selectedArticle && (
          <Modal
            title={selectedArticle.title}
            tldr={selectedArticle.tldr}
            onClose={() => setShowModal(false)}
            articleId={selectedArticle.id}
          />
        )} */}
      </div>
    </div>
  );
};

export default Profile;
