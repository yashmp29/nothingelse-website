import React, { useEffect, useState } from 'react';
import { getFeaturedArticle, getRecentArticles } from '@/services/articles';
import FeaturedArticle from '@/components/FeaturedArticle';
import ArticleCard from '@/components/ArticleCard';
import Newsletter from '@/components/Newsletter';
import type { Article } from '@/types/article';

export default function Home() {
  const [featured, setFeatured] = useState<Article | null>(null);
  const [recent, setRecent] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const f = await getFeaturedArticle();
      const r = await getRecentArticles(9);
      setFeatured(f);
      setRecent(r);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="max-w-full mx-auto px-margin-desktop py-12">
      {/* Hero / Lead */}
      <header className="mb-section-gap">
        <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-primary pb-8 mb-12">
          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps mb-4 block text-secondary">EDITORIAL / LATEST</span>
            <h1 className="font-display-lg text-display-lg mb-6 leading-none">Radically clear intelligence for the geopolitical era.</h1>
            <p className="font-body-lg text-body-lg max-w-xl text-secondary">Exploring the hidden stories behind the moves that shape the world—where brands, markets, and global power collide.</p>
          </div>
          <div className="mt-8 md:mt-0 text-right">
            <div className="font-mono-metadata text-mono-metadata uppercase mb-1">Issue No. 042</div>
            <div className="font-mono-metadata text-mono-metadata opacity-60">Status: UNCOMPROMISED</div>
          </div>
        </div>
      </header>

      {/* Editorial List */}
      <section className="space-y-section-gap">
        <article className="editorial-grid">
          <div className="col-span-12 md:col-span-8 group cursor-pointer">
            {featured ? (
              <>
                <div className="overflow-hidden border border-primary mb-6 aspect-[16/9]">
                  <img className="w-full h-full object-cover grayscale" src={featured.coverImage || '/placeholder.jpg'} alt={featured.title} />
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-label-caps text-label-caps px-2 py-1 bg-primary text-on-primary">{featured.category}</span>
                  <span className="font-mono-metadata text-mono-metadata">{featured.publishedAt?.toLocaleDateString()}</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl mb-4 leading-tight">{featured.title}</h2>
                <p className="font-body-lg text-body-lg text-secondary max-w-2xl line-clamp-3">{featured.excerpt}</p>
              </>
            ) : (
              <div className="p-8">No featured article</div>
            )}
          </div>

          <div className="hidden md:flex md:col-span-4 flex-col justify-end pb-12 border-l border-primary pl-8">
            <div className="font-mono-metadata text-mono-metadata mb-4">CONTRIBUTOR</div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary-container" />
              <div>
                <div className="font-label-caps text-label-caps">Editorial Team</div>
                <div className="text-xs text-secondary">NOTHINGelse</div>
              </div>
            </div>
            <button className="btn-secondary w-full">READ THE ANALYSIS</button>
          </div>
        </article>

        {/* Grid for recent articles */}
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-5">
            {recent.slice(0, 2).map((a) => (
              <div key={a.id} className="border border-primary p-1 mb-6">
                <div className="aspect-square bg-primary-container relative overflow-hidden">
                  <img className="w-full h-full object-cover grayscale" src={a.coverImage || '/placeholder.jpg'} alt={a.title} />
                </div>
                <div className="py-4">
                  <div className="font-label-caps text-[10px] text-secondary mb-2">{a.category}</div>
                  <h4 className="font-headline-lg text-body-lg font-bold">{a.title}</h4>
                  <div className="mt-4 font-mono-metadata text-mono-metadata text-secondary">{a.publishedAt?.toLocaleDateString()} • {a.excerpt ? a.excerpt.slice(0, 120) + '...' : ''}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex col-span-2 items-center justify-center">
            <div className="vertical-rule" />
          </div>

          <div className="col-span-12 md:col-span-5">
            {recent.slice(2, 5).map((a) => (
              <article key={a.id} className="flex flex-col justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                    <span className="font-label-caps text-label-caps">{a.category}</span>
                  </div>
                  <h3 className="font-headline-xl text-headline-xl mb-6">{a.title}</h3>
                  <p className="font-body-lg text-body-lg mb-8">{a.excerpt}</p>
                </div>
                <div className="relative pt-6">
                  <div className="horizontal-rule mb-6" />
                  <div className="aspect-video border border-primary overflow-hidden">
                    <img className="w-full h-full object-cover grayscale" src={a.coverImage || '/placeholder.jpg'} alt={a.title} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Featured deep dive */}
        <article className="bg-primary text-on-primary p-12 md:p-24 editorial-grid items-center">
          <div className="col-span-12 lg:col-span-6">
            <span className="font-label-caps text-label-caps text-on-primary/60 border border-on-primary/30 px-3 py-1 rounded-full inline-block mb-8">THE DEEP DIVE</span>
            <h2 className="font-display-lg text-headline-xl mb-8">Decoupling: The Final Divorce of Global Markets.</h2>
            <p className="font-body-lg text-body-lg mb-10 text-on-primary/80">A 40-page whitepaper on the systemic fracturing of the global supply chain, and why the "Just-in-Time" era is dead. Available exclusively to NothingElse Premium members.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-on-primary text-primary font-label-caps text-label-caps px-10 py-5">DOWNLOAD FULL REPORT</button>
              <button className="border border-on-primary/30 text-on-primary font-label-caps text-label-caps px-10 py-5">VIEW SUMMARY</button>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 border-t border-l border-on-primary/20" />
              <div className="border-2 border-on-primary p-2">
                <img className="w-full aspect-[4/5] object-cover grayscale brightness-125" src={recent[0]?.coverImage || '/placeholder.jpg'} alt="deep-dive" />
              </div>
              <div className="absolute -bottom-6 -right-6 font-mono-metadata text-[10px] uppercase tracking-widest bg-on-primary text-primary px-4 py-2 rotate-90 origin-right">CLASSIFIED INTELLIGENCE</div>
            </div>
          </div>
        </article>

        {/* Newsletter hook */}
        <section className="max-w-content-width mx-auto text-center border-t border-primary pt-section-gap pb-24">
          <h3 className="font-headline-xl text-headline-xl mb-6">Stay ahead of the void.</h3>
          <p className="font-body-lg text-body-lg mb-12 text-secondary">Weekly analysis delivered every Sunday morning. No fluff, no noise, just the architecture of the era.</p>
          <form className="flex flex-col md:flex-row gap-0 border-2 border-primary">
            <input className="flex-grow px-6 py-5 bg-transparent border-none focus:ring-0 font-label-caps text-label-caps" placeholder="EMAIL ADDRESS" type="email" />
            <button className="bg-primary text-on-primary font-label-caps text-label-caps px-12 py-5" type="submit">SUBSCRIBE</button>
          </form>
          <p className="font-mono-metadata text-[10px] mt-6 text-secondary/60">By subscribing, you agree to our radical transparency policy.</p>
        </section>
      </section>
    </div>
  );
}
