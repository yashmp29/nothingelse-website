export interface Report {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  pdfUrl?: string;
  pdfPath?: string;
  thumbnailUrl?: string;
  coverImageUrl?: string;
  tags?: string[];
  relatedArticleSlugs?: string[];
  published?: boolean;
  publishedAt?: Date | null;
  createdAt?: any;
}
