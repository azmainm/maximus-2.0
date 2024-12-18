// app/create/page.tsx
"use client";
import CreatePost from './components/CreatePost';
import Navbar from "../ui/Navbar";
import useAuthCheck from "../hooks/useAuthCheck";

const CreatePage = () => {
  useAuthCheck();

  return (
    <div>
      <Navbar />
      <CreatePost />
    </div>
  );
};

export default CreatePage;
