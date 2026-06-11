import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticlesByCategory } from '@/services/articles';
import { Article } from '@/types/article';

export default function CategoryPage() {
  const router = useRouter();
  const { name } = router.query;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCategory, setDisplayCategory] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      if (typeof name === 'string') {
        try {
          // Convert URL parameter to display format
          const categoryDisplay = name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          setDisplayCategory(categoryDisplay);
          
          const data = await getArticlesByCategory(name);
          setArticles(data);
        } catch (error) {
          console.error('Error fetching articles:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (name) {
      fetchArticles();
    }
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <p>Loading articles...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{displayCategory}</h1>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found in this category.</p>
            <p className="text-gray-500 mt-2">
              Check if the category name matches exactly in Firestore.
            </p>
            <button 
              onClick={() => router.push('/')}
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg font-medium"
            >
              Browse All Articles
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
