import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md text-body-md">
      {/* Top nav (converted from provided HTML) */}
      <nav className="sticky-header bg-background dark:bg-primary-container border-b border-primary dark:border-outline flex justify-between items-center w-full px-margin-desktop py-6 max-w-full mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display-lg text-headline-xl text-primary tracking-tighter">NOTHINGelse</Link>
          <div className="hidden md:flex gap-6">
            <Link href="/category/politics" className="font-label-caps text-label-caps text-primary">Politics</Link>
            <Link href="/category/technology" className="font-label-caps text-label-caps text-secondary">Technology</Link>
            <Link href="/category/culture" className="font-label-caps text-label-caps text-secondary">Culture</Link>
            <Link href="/category/science" className="font-label-caps text-label-caps text-secondary">Science</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center border-b border-primary px-2 py-1">
            <span className="material-symbols-outlined text-sm mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 font-label-caps text-[10px] w-48" placeholder="SEARCH INTELLIGENCE" type="text"/>
          </div>
          <div>
            <Link href="/user-auth" className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-2 hover:bg-on-primary hover:text-primary border border-primary transition-all duration-200">Sign In</Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer converted from provided HTML */}
      <footer className="w-full px-margin-desktop py-section-gap flex flex-col md:flex-row justify-between items-start bg-primary dark:bg-primary-container border-t-2 border-primary text-on-primary">
        <div className="mb-12 md:mb-0">
          <div className="font-display-lg text-headline-lg text-on-primary mb-4">NOTHINGelse</div>
          <p className="max-w-xs text-on-primary/60 font-body-md text-body-md mb-8">Radically clear intelligence for the geopolitical era. Designed for those who seek the architecture beneath the noise.</p>
          <div className="flex gap-4">
            <a className="text-on-primary hover:text-secondary-fixed-dim" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-on-primary hover:text-secondary-fixed-dim" href="#"><span className="material-symbols-outlined">monitoring</span></a>
            <a className="text-on-primary hover:text-secondary-fixed-dim" href="#"><span className="material-symbols-outlined">terminal</span></a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <div className="font-label-caps text-label-caps text-on-primary mb-2">SECTIONS</div>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Politics</Link>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Technology</Link>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Business</Link>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Archive</Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="font-label-caps text-label-caps text-on-primary mb-2">COMPANY</div>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">About</Link>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Contact</Link>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Editorial Guidelines</Link>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <div className="font-label-caps text-label-caps text-on-primary mb-2">LEGAL</div>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Privacy Policy</Link>
            <Link href="#" className="font-label-caps text-label-caps text-secondary-fixed-dim hover:text-on-primary">Terms of Service</Link>
            <div className="mt-8 font-mono-metadata text-[10px] text-on-primary/40 uppercase tracking-widest">© 2024 NOTHINGelse. All rights reserved. Radically clear intelligence for the geopolitical era.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
