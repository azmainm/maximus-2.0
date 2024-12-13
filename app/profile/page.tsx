//app/profile/page.tsx
"use client";
import Navbar from "../ui/Navbar";
import ProfileCard from "./components/ProfileCard";
import PostedArticles from "./components/PostedArticles";
import FavoriteArticles from "./components/FavoriteArticles";
//import Modal from '../blog/components/Modal';

const Profile = () => {



  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white font-poppins p-4">
        <ProfileCard  />
        <PostedArticles/>
        <FavoriteArticles />
      </div>
    </div>
  );
};

export default Profile;
