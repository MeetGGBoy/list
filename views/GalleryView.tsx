import React, { useState, useMemo } from 'react';
import { OcMaterial } from '../types';
import { Card, Button, Input, Badge } from '../components/SkeuomorphicUI';

interface GalleryViewProps {
  materials: OcMaterial[];
  onDownload: (id: string) => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ materials, onDownload }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(materials.map(m => m.category)))];

  const filtered = useMemo(() => {
    return materials.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                            m.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || m.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [materials, search, filter]);

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="relative flex-1 w-full sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input 
                type="text" 
                placeholder="搜索素材..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
            />
        </div>
        <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
            {categories.map(c => <option key={c} value={c}>{c === 'All' ? '全部分类' : c}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(item => (
          <Card key={item.id} className="flex flex-col overflow-hidden hover:shadow-lg dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-w-16 aspect-h-10 bg-gray-200 dark:bg-gray-800 relative overflow-hidden h-48 group">
                 <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <Button variant="primary" onClick={() => onDownload(item.id)} className="w-full text-xs py-2 shadow-xl backdrop-blur-sm">
                        立即下载
                    </Button>
                 </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <Badge>{item.category}</Badge>
                    <span className="text-xs text-gray-400">{new Date(item.dateAdded).toLocaleDateString()}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                    {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                     <span className="text-xs text-gray-400">By {item.author}</span>
                     {/* Download button removed here as it's now an overlay or we keep a secondary action */}
                     <span className="text-xs font-medium text-blue-500 cursor-pointer hover:underline" onClick={() => onDownload(item.id)}>详情</span>
                </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
          <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">未找到素材</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">请尝试调整搜索关键词或分类。</p>
          </div>
      )}
    </div>
  );
};

export default GalleryView;