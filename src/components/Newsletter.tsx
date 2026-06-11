import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className="bg-gray-100 p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-gray-600">You've been added to our newsletter.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-8 rounded-xl">
      <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
      <p className="text-gray-600 mb-6">
        Subscribe to our newsletter for exclusive content and updates
      </p>
      <form onSubmit={handleSubmit} className="flex">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" 
          className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button 
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-r-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
