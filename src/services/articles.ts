import { db } from '@/config/firebase';
import { Article } from '@/types/article';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit
} from 'firebase/firestore';

export const getFeaturedArticle = async (): Promise<Article | null> => {
  try {
    const q = query(
      collection(db, 'articles'),
      where('featured', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    const docData = snapshot.docs[0];
    const data = docData.data();
    return {
      id: docData.id,
      ...data,
      publishedAt: data.publishedAt.toDate(),
    } as Article;
  } catch (error) {
    console.error('Error fetching featured article:', error);
    return null;
  }
};

export const getRecentArticles = async (count: number = 6): Promise<Article[]> => {
  console.log("Fetching recent articles...");
  try {
    const q = query(
      collection(db, 'articles'),
      orderBy('publishedAt', 'desc'),
      limit(count)
    );
    
    const snapshot = await getDocs(q);
    console.log("Articles found:", snapshot.size);
    
    if (snapshot.empty) {
      console.log("No articles found in Firestore");
      return [];
    }

    const articles: Article[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log("Processing document:", doc.id);
      console.log("Document data:", data);
      
      // Check if publishedAt exists and is a Firestore Timestamp
      if (!data.publishedAt || !data.publishedAt.toDate) {
        console.error("Invalid publishedAt field in document:", doc.id);
        return;
      }

      articles.push({
        id: doc.id,
        title: data.title || "Untitled",
        slug: data.slug || "no-slug",
        content: data.content || "",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "",
        category: data.category || "Uncategorized",
        tags: data.tags || [],
        author: data.author || "Unknown",
        publishedAt: data.publishedAt.toDate(),
        views: data.views || 0,
        featured: data.featured || false
      });
    });
    
    console.log("Returning articles:", articles);
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const q = query(
      collection(db, 'articles'),
      where('slug', '==', slug),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    const docData = snapshot.docs[0];
    const data = docData.data();
    return {
      id: docData.id,
      ...data,
      publishedAt: data.publishedAt.toDate(),
    } as Article;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
};

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    // First get all articles
    const q = query(
      collection(db, 'articles'),
      orderBy('publishedAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    
    // Filter client-side for case-insensitive matching
    return snapshot.docs
      .filter(doc => {
        const articleCategory = doc.data().category || '';
        return articleCategory.toLowerCase() === category.toLowerCase();
      })
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt.toDate(),
        } as Article;
      });
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return [];
  }
};
