import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { getRecentArticles } from '@/services/articles';
import { Article } from '@/types/article';
import Link from 'next/link';

export default function AdminDashboard() {
  const { currentUser, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin or not logged in
    if (!authLoading) {
      if (!currentUser || !isAdmin) {
        router.push('/');
      }
    }
  }, [currentUser, isAdmin, authLoading, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (currentUser && isAdmin) {
        try {
          const data = await getRecentArticles(10);
          setArticles(data);
        } catch (error) {
          console.error('Error fetching articles:', error);
        } finally {
          setArticlesLoading(false);
        }
      }
    };
    
    fetchArticles();
  }, [currentUser, isAdmin]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-black">
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 text-black">
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Access denied. Admin privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link 
            href="/admin/new" 
            className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            + New Article
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
          
          {articles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map(article => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          href={`/article/${article.slug}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{article.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {article.publishedAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{article.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 py-4 text-center">No articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
