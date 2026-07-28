import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadPdfFile, createReportDoc } from '@/services/reports';
import { useRouter } from 'next/router';

export default function NewReportPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSlug(title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'));
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!currentUser) return setError('You must be signed in as admin');
    if (!file) return setError('Please select a PDF file');

    setLoading(true);
    try {
      const { url, path } = await uploadPdfFile(file, slug || Date.now().toString(), (p) => setUploadProgress(p));

      const docId = await createReportDoc({
        title,
        slug,
        description,
        tags: tags ? tags.split(',').map((t) => t.trim()) : [],
        pdfUrl: url,
        pdfPath: path,
        coverImageUrl,
        published: true,
        publishedAt: new Date(),
      });

      router.push('/admin');
    } catch (err) {
      console.error(err);
      setError('Failed to upload report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Report (PDF)</h1>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-3 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded" rows={4} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-3 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover Image URL (optional)</label>
            <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} className="w-full p-3 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PDF File *</label>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            {uploadProgress > 0 && <div className="mt-2 text-sm">Upload: {Math.round(uploadProgress)}%</div>}
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={loading} className="bg-black text-white px-6 py-3 rounded">
              {loading ? 'Uploading...' : 'Upload Report'}
            </button>
            <button type="button" onClick={() => router.push('/admin')} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
