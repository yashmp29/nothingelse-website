import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getArticleBySlug } from '@/services/articles';
import { Article } from '@/types/article';

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (typeof slug === 'string') {
        try {
          const data = await getArticleBySlug(slug);
          setArticle(data);
        } catch (error) {
          console.error('Error fetching article:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <p>Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p>The article you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.back()}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg font-medium"
          >
            Go Back
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
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
          
          {article.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <div className="relative w-full h-48 md:h-72 lg:h-96"> {/* Responsive heights */}
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
