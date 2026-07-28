import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserAuthProvider } from '@/contexts/UserAuthContext.tsx';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserAuthProvider>
    </AuthProvider>
  );
}
