import { OcMaterial } from '../types';

const STORAGE_KEY = 'oc_materials_db';

const INITIAL_DATA: OcMaterial[] = [
  {
    id: '1',
    title: '复古皮革纹理',
    description: '高分辨率的磨损皮革纹理，非常适合角色的皮带和靴子设计。包含无缝平铺图案。',
    category: 'Texture',
    imageUrl: 'https://picsum.photos/id/102/400/300',
    downloadUrl: '#',
    author: '设计大师',
    downloads: 124,
    dateAdded: Date.now() - 100000,
  },
  {
    id: '2',
    title: '赛博朋克城市背景',
    description: '适合未来主义 OC 展示的霓虹灯街道背景。4K 分辨率，包含多个光照图层。',
    category: 'Background',
    imageUrl: 'https://picsum.photos/id/122/400/300',
    downloadUrl: '#',
    author: '霓虹梦境',
    downloads: 89,
    dateAdded: Date.now() - 200000,
  },
  {
    id: '3',
    title: '水彩笔刷包',
    description: '一套 12 个真实的水彩笔刷，用于柔和的阴影和有机纹理绘制。',
    category: 'Brush',
    imageUrl: 'https://picsum.photos/id/106/400/300',
    downloadUrl: '#',
    author: '艺术之魂',
    downloads: 342,
    dateAdded: Date.now() - 50000,
  },
];

export const getMaterials = (): OcMaterial[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  return JSON.parse(data);
};

export const addMaterial = (material: OcMaterial): OcMaterial[] => {
  const current = getMaterials();
  const updated = [material, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteMaterial = (id: string): OcMaterial[] => {
  const current = getMaterials();
  const updated = current.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const incrementDownload = (id: string): OcMaterial[] => {
  const current = getMaterials();
  const updated = current.map(m => {
    if (m.id === id) {
      return { ...m, downloads: m.downloads + 1 };
    }
    return m;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};