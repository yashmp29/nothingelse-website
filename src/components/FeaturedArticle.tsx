import Link from 'next/link';
import { Article } from '../types/article';

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <div className="relative bg-black text-white rounded-xl overflow-hidden">
      {article.coverImage && (
        <div className="h-[500px]">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      )}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-gray-300 bg-black bg-opacity-50 px-3 py-1 rounded-full inline-block">
              {article.category}
            </span>
            <Link href={`/article/${article.slug}`} className="block mt-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 hover:text-gray-300 transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-xl text-gray-200 mb-6">{article.excerpt}</p>
            <div className="flex items-center text-gray-300">
              <span>By {article.author}</span>
              <span className="mx-2">•</span>
              <span>
                {article.publishedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="mx-2">•</span>
              <span>{article.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
