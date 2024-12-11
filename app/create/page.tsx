// app/create/page.tsx
"use client";
import { useState } from "react";
import CreatePost from './components/CreatePost';
import Navbar from "../ui/Navbar";

const CreatePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); 
    window.location.href = "/"; }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <CreatePost />
    </div>
  );
};

export default CreatePage;