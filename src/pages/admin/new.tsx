import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext'; // Fixed import path
import { createArticle } from '@/services/articles';
import { Article } from '@/types/article';

export default function NewArticle() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [article, setArticle] = useState<Omit<Article, 'id' | 'publishedAt' | 'views'>>({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: '',
    tags: [],
    author: currentUser?.email?.split('@')[0] || 'Admin',
    featured: false,
    slug: '' // Will be generated from title
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createArticle(article);
      router.push('/admin');
    } catch (err) {
      setError('Failed to create article. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={article.title}
              onChange={(e) => setArticle({...article, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt *</label>
            <textarea
              value={article.excerpt}
              onChange={(e) => setArticle({...article, excerpt: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content *</label>
            <textarea
              value={article.content}
              onChange={(e) => setArticle({...article, content: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={10}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={article.category}
                onChange={(e) => setArticle({...article, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select a category</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Culture">Culture</option>
                <option value="Science">Science</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Author *</label>
              <input
                type="text"
                value={article.author}
                onChange={(e) => setArticle({...article, author: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
            <input
              type="text"
              value={article.coverImage}
              onChange={(e) => setArticle({...article, coverImage: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={article.tags.join(', ')}
              onChange={(e) => setArticle({
                ...article, 
                tags: e.target.value.split(',').map(tag => tag.trim())
              })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="tag1, tag2, tag3"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={article.featured}
              onChange={(e) => setArticle({...article, featured: e.target.checked})}
              className="mr-2 h-5 w-5"
            />
            <label className="text-sm font-medium">Featured Article</label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  );
}
