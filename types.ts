export interface OcMaterial {
  id: string;
  title: string;
  description: string;
  category: 'Texture' | 'Reference' | 'Brush' | 'Background';
  imageUrl: string;
  downloadUrl: string; // In a real app, this would be a file path
  author: string;
  downloads: number;
  dateAdded: number;
}

export type ViewMode = 'gallery' | 'admin';
