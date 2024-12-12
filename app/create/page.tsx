// app/create/page.tsx
"use client";
import CreatePost from './components/CreatePost';
import Navbar from "../ui/Navbar";

const CreatePage = () => {
  return (
    <div>
      <Navbar />
      <CreatePost />
    </div>
  );
};

export default CreatePage;