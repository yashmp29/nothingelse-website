import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import Newsletter from '@/components/Newsletter';
import { getFeaturedArticle, getRecentArticles } from '@/services/articles';
import { Article } from '@/types/article';

export default function Home() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await getFeaturedArticle();
        const recent = await getRecentArticles(6);
        setFeaturedArticle(featured);
        setRecentArticles(recent);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <p>Loading content...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}
        
        <section className="mt-16">
	  <h2 className="text-3xl font-bold mb-8 border-b border-gray-300 pb-2">Latest Stories</h2>
	  
	  {recentArticles.length > 0 ? (
	    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
	      {recentArticles.map(article => (
	        <ArticleCard key={article.id} article={article} />
	      ))}
	    </div>):(
		    <div className="text-center py-12">
		      <p className="text-xl">No articles found</p>
		      <p className="text-gray-600 mt-2">
		        Check your Firestore connection and document structure
		      </p>
		    </div>
		  )}
	</section>
        
        <section className="mt-16">
          <Newsletter />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
