import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArticleBySlug } from '@/services/articles';
import type { Article } from '@/types/article';

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setProgress(scrolled);
      const el = document.getElementById('readingProgress');
      if (el) el.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <main className="container mx-auto px-margin-desktop py-8 text-center">Loading article...</main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-on-background">
        <main className="container mx-auto px-margin-desktop py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p>The article you're looking for doesn't exist or has been removed.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background">
      {/* Reading progress bar */}
      <div className="progress-container fixed top-0 left-0 w-full z-50">
        <div id="readingProgress" className="progress-bar bg-primary" style={{ width: `${progress}%`, height: '4px' }} />
      </div>

      {/* Hero */}
      <header className="pt-32 pb-16 px-margin-desktop">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 mb-12">
            <span className="font-label-caps text-label-caps text-primary bg-primary/5 px-3 py-1 self-start">INTELLIGENCE REPORT</span>
            <h1 className="font-headline-xl text-headline-xl lg:text-[64px] leading-tight max-w-4xl">{article.title}</h1>
            <div className="flex items-center gap-4 font-mono-metadata text-mono-metadata text-secondary">
              <span>BY {article.author}</span>
              <span className="w-1 h-1 bg-outline rounded-full"></span>
              <span>{article.publishedAt?.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="w-full aspect-[21/9] bg-primary-container relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-80" style={{ backgroundImage: `url(${article.coverImage || '/placeholder.jpg'})` }} />
            <div className="absolute bottom-0 left-0 p-6 bg-primary text-on-primary font-mono-metadata text-mono-metadata">LABORATORY 01: SYCAMORE PROCESSOR ARRAY, SANTA BARBARA</div>
          </div>
        </div>
      </header>

      {/* Main content grid */}
      <main className="px-margin-desktop py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-40 flex flex-col gap-8 items-center border-r border-outline-variant pr-8">
            <button className="material-symbols-outlined text-secondary hover:text-primary">share</button>
            <button className="material-symbols-outlined text-secondary hover:text-primary">bookmark</button>
            <button className="material-symbols-outlined text-secondary hover:text-primary">chat_bubble</button>
          </div>
        </aside>

        <article className="lg:col-span-7 flex flex-col gap-8">
          <div className="font-body-lg text-body-lg">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <div className="editorial-rule mt-16 pt-8 flex justify-between items-center">
            <div className="flex gap-4">
              <span className="font-label-caps text-label-caps bg-secondary-container px-2 py-1">{article.category}</span>
              {article.tags?.slice(0,3).map((t) => (
                <span key={t} className="font-label-caps text-label-caps bg-secondary-container px-2 py-1">{t}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="material-symbols-outlined text-primary">thumb_up</button>
              <button className="material-symbols-outlined text-primary">mode_comment</button>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 flex flex-col gap-12">
          <div className="border-2 border-primary p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-label-caps text-label-caps text-primary border-b border-primary pb-4 mb-6">KEY TAKEAWAYS</h3>
            <ul className="flex flex-col gap-6">
              <li className="flex gap-4 items-start"><span className="font-display-lg text-headline-lg leading-none">01</span><p className="font-body-md">Takeaway 1 — a short summary pulled from the article or metadata.</p></li>
              <li className="flex gap-4 items-start"><span className="font-display-lg text-headline-lg leading-none">02</span><p className="font-body-md">Takeaway 2 — highlight an important implication.</p></li>
              <li className="flex gap-4 items-start"><span className="font-display-lg text-headline-lg leading-none">03</span><p className="font-body-md">Takeaway 3 — recommended next steps or reading.</p></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-label-caps text-label-caps text-primary">RELATED INTELLIGENCE</h3>
            <div className="flex flex-col gap-8">
              {/* TODO: pull related items by tag or category */}
            </div>
          </div>

          <div className="bg-primary text-on-primary p-8">
            <h3 className="font-headline-lg text-headline-lg mb-4">Radically clear intelligence.</h3>
            <p className="font-body-md text-body-md mb-6 opacity-80">Join 45,000 global leaders receiving our weekly briefing on the geopolitical era.</p>
            <div className="flex flex-col gap-4">
              <input className="bg-transparent border border-on-primary/30 p-3 font-body-md text-on-primary focus:border-on-primary outline-none placeholder:text-on-primary/50" placeholder="Email address" type="email" />
              <button className="bg-on-primary text-primary font-label-caps text-label-caps py-4 font-bold hover:bg-transparent hover:text-on-primary border border-on-primary transition-all">SUBSCRIBE</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
