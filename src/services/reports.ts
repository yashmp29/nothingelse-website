import { db, storage } from '@/config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { Report } from '@/types/report';

export async function uploadPdfFile(file: File, slug: string, onProgress?: (p: number) => void): Promise<{ path: string; url: string }> {
  const path = `reports/${slug}/${file.name}`;
  const storageRef = storage.ref(path);
  const uploadTask = storageRef.put(file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (onProgress && snapshot.totalBytes) {
          onProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          resolve({ path, url });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

export async function createReportDoc(data: Partial<Report>) {
  const col = db.collection('reports');
  const docRef = await col.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return docRef.id;
}

export async function getReports(limitCount: number = 20): Promise<Report[]> {
  const q = db.collection('reports').orderBy('publishedAt', 'desc').limit(limitCount);
  const snapshot = await q.get();
  return snapshot.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      title: d.title,
      slug: d.slug,
      description: d.description,
      pdfUrl: d.pdfUrl || '',
      pdfPath: d.pdfPath || '',
      thumbnailUrl: d.thumbnailUrl || '',
      coverImageUrl: d.coverImageUrl || '',
      tags: d.tags || [],
      relatedArticleSlugs: d.relatedArticleSlugs || [],
      published: d.published || false,
      publishedAt: d.publishedAt ? d.publishedAt.toDate() : null,
    } as Report;
  });
}

export async function getReportBySlug(slug: string): Promise<Report | null> {
  const q = db.collection('reports').where('slug', '==', slug).limit(1);
  const snapshot = await q.get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  const d = doc.data();
  return {
    id: doc.id,
    title: d.title,
    slug: d.slug,
    description: d.description,
    pdfUrl: d.pdfUrl || '',
    pdfPath: d.pdfPath || '',
    thumbnailUrl: d.thumbnailUrl || '',
    coverImageUrl: d.coverImageUrl || '',
    tags: d.tags || [],
    relatedArticleSlugs: d.relatedArticleSlugs || [],
    published: d.published || false,
    publishedAt: d.publishedAt ? d.publishedAt.toDate() : null,
  } as Report;
}
