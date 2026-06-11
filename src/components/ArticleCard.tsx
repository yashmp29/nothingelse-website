import Link from 'next/link';
import { Article } from '../types/article';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      {article.coverImage && (
        <div className="h-48 overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {article.category}
        </span>
        <Link href={`/article/${article.slug}`} className="block mt-2">
          <h3 className="text-xl font-bold hover:text-gray-700 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="mt-3 text-gray-600 text-sm">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>{article.author}</span>
          <span className="mx-2">•</span>
          <span>
            {article.publishedAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="mx-2">•</span>
          <span>{article.views} views</span>
        </div>
      </div>
    </div>
  );
}
