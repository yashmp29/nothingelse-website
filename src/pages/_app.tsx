/*import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import LandingPage from '@/components/LandingPage';
import '@/styles/globals.css';
import '@/styles/landing.module.css';

export default function App({ Component, pageProps }: AppProps) {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const landingShown = sessionStorage.getItem('landingShown');
    
    if (!landingShown) {
      sessionStorage.setItem('landingShown', 'true');
      const timer = setTimeout(() => {
        setShowLanding(false);
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setShowLanding(false);
    }
  }, []);

  return (
    <AuthProvider>
      {showLanding && <LandingPage />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}*/
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext'; // Fixed path
import { UserAuthProvider } from '@/contexts/UserAuthContext.tsx';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <Component {...pageProps} />
      </UserAuthProvider>
    </AuthProvider>
  );
}
