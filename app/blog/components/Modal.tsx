//app/blog/components/Modal.tsx
"use client";

import { useRouter } from "next/navigation";

interface ModalProps {
  title: string;
  tldr: string;
  onClose: () => void;
  articleId: string;
}

const Modal = ({ title, tldr, onClose, articleId }: ModalProps) => {
  const router = useRouter();

  const handleReadArticle = () => {
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); // Generate slug
    router.push(`/article/${articleId}-${slug}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-11/12 md:w-1/2 lg:w-1/3 p-6 bg-black border border-cyan-300 rounded-lg shadow-lg text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-cyan-300 transition ease-in-out duration-200"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{tldr}</p>
        <button
          onClick={handleReadArticle}
          className="px-6 py-2 bg-black border border-cyan-300 rounded-lg hover:bg-cyan-800 transition ease-in-out duration-200"
        >
          Read Article
        </button>
      </div>
    </div>
  );
};

export default Modal;
