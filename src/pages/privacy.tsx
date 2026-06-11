import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg mb-6">
            Your privacy is very important to us at <strong>NOTHINGelse</strong>. 
            This Privacy Policy explains what information we collect, how we use it, 
            and the choices you have regarding your data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect the following types of information when you interact with our services:
          </p>
          <ul className="list-disc ml-6">
            <li><strong>Personal Information:</strong> Your name, email address, and any details you provide through our contact form.</li>
            <li><strong>Usage Information:</strong> Basic analytics data (such as browser type or time spent on pages) to improve user experience.</li>
            <li><strong>Cookies (if used):</strong> Small files stored on your device that help us remember your preferences. You may disable cookies through your browser settings.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used strictly for:
          </p>
          <ul className="list-disc ml-6">
            <li>Responding to your inquiries and support requests.</li>
            <li>Improving our website and services.</li>
            <li>Ensuring site security and preventing misuse.</li>
          </ul>
          <p className="mt-2">
            We <strong>do not sell, rent, or share</strong> your information with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill the purposes described above. 
            Once your inquiry or request is resolved, your data is securely deleted unless required by law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your information 
            from unauthorized access, loss, or misuse. While no system can guarantee 100% security, 
            we are committed to safeguarding your data to the best of our ability.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc ml-6">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request corrections to inaccurate or outdated information.</li>
            <li>Request deletion of your personal information.</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us directly.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices 
            or for legal and regulatory reasons. Any updates will be posted on this page with a revised 
            "Last Updated" date.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests related to this Privacy Policy, please reach out to us at:{' '}
            <a href="mailto:nothingelsequeries@gmail.com" className="text-blue-600 hover:underline">
              nothingelsequeries@gmail.com
            </a>.
          </p>

          <p className="text-sm text-gray-600 mt-6">
            <em>Last Updated: August 2025</em>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

