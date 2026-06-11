import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAuth } from '@/contexts/UserAuthContext';

export default function Header() {
  const { isAdmin } = useAuth(); // Get admin status
  const { user: regularUser, userData, logOut } = useUserAuth();

  return (
    <header className="bg-black text-white py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold tracking-tight">NOTHINGelse</Link>
          <p className="text-xs text-gray-400 mt-1">Exploring Everything Beyond</p>
        </div>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {['Politics', 'Technology', 'Culture', 'Science'].map((category) => (
            <Link 
              key={category} 
              href={`/category/${category.toLowerCase()}`}
              className="hover:text-gray-300 transition-colors duration-200 font-medium"
            >
              {category}
            </Link>
          ))}
          
          <Link 
            href="/contact"
            className="hover:text-gray-300 transition-colors duration-200 font-medium"
          >
            Contact Us
          </Link>
          
          {/* User menu */}
          {regularUser ? (
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  {userData?.displayName?.charAt(0) || regularUser.email?.charAt(0)}
                </div>
                <span className="max-w-xs truncate">
                  {userData?.displayName || regularUser.email}
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/saved" className="block px-4 py-2 hover:bg-gray-100">
                  Saved Articles
                </Link>
                <button 
                  onClick={logOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              href="/user-auth"
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Sign In
            </Link>
          )}
          
          {/* Admin link (only show if admin user) */}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Admin Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
