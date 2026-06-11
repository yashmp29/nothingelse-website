import { useUserAuth } from '@/contexts/UserAuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const { user, userData } = useUserAuth();

  if (!user) {
    return <div>Please sign in to view your profile</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Account Information</h2>
            <p><strong>Name:</strong> {userData?.displayName || 'Not set'}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member since:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'Recently'}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Preferences</h2>
            <p className="text-gray-600">Profile customization coming soon!</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
