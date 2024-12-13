// profile/components/FvoriteArticles.tsx

"use client";
import { FiArrowUpRight } from 'react-icons/fi';

interface Article {
  id: number;
  title: string;
}

interface FavoritedArticlesProps {
  articles: Article[];
  openModal: (article: Article) => void;
}

const FavoritedArticles: React.FC<FavoritedArticlesProps> = ({ articles, openModal }) => {
  return (
    <div>
      <h1 className="font-poppins font-semibold text-lg mb-4 mt-10">Favorite Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative p-4 rounded-md border border-gray-300 bg-gray-900 shadow-md hover:shadow-cyan-300 hover:scale-105 transition ease-in-out duration-300"
            style={{ height: '120px' }}
          >
            <h3 className="text-xl font-bold mb-2 pr-10">{article.title}</h3>
            <button
              onClick={() => openModal(article)}
              className="absolute top-2 right-2 bg-gray-900 text-white border border-gray-300 rounded-full p-2 hover:bg-cyan-300 hover:text-black transition ease-in-out duration-200"
            >
              <FiArrowUpRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritedArticles;
