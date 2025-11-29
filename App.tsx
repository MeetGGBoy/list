import React, { useState, useEffect } from 'react';
import { Header, Button, ThemeToggle } from './components/SkeuomorphicUI';
import { ViewMode, OcMaterial } from './types';
import GalleryView from './views/GalleryView';
import AdminView from './views/AdminView';
import * as storageService from './services/storageService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('gallery');
  const [materials, setMaterials] = useState<OcMaterial[]>([]);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Load initial data
    setMaterials(storageService.getMaterials());
    // Set initial theme class
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-dark-bg');
      document.body.classList.remove('bg-gray-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-dark-bg');
      document.body.classList.add('bg-gray-50');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleDownload = (id: string) => {
    // Update stats internally even if we don't show them
    const updated = storageService.incrementDownload(id);
    setMaterials(updated);
    alert("正在下载素材...");
  };

  const handleDelete = (id: string) => {
    if(window.confirm("确定要删除这个素材吗？")) {
      const updated = storageService.deleteMaterial(id);
      setMaterials(updated);
    }
  };

  const handleAdd = (material: OcMaterial) => {
    const updated = storageService.addMaterial(material);
    setMaterials(updated);
    setView('gallery'); // Return to gallery after adding
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'text-dark-text' : 'text-gray-900'}`}>
      <Header>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-lg font-bold text-white">V</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              OC 素材库
            </h1>
        </div>

        <div className="flex items-center gap-4">
            <nav className="flex gap-2">
                <Button 
                    variant={view === 'gallery' ? 'neutral' : 'ghost'}
                    onClick={() => setView('gallery')}
                    className={view === 'gallery' ? 'bg-gray-100 dark:bg-white/10' : ''}
                >
                    素材广场
                </Button>
                <Button 
                    variant={view === 'admin' ? 'neutral' : 'ghost'}
                    onClick={() => setView('admin')}
                    className={view === 'admin' ? 'bg-gray-100 dark:bg-white/10' : ''}
                >
                    后台管理
                </Button>
            </nav>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10"></div>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        </div>
      </Header>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {view === 'gallery' && (
          <GalleryView materials={materials} onDownload={handleDownload} />
        )}
        {view === 'admin' && (
          <AdminView materials={materials} onDelete={handleDelete} onAdd={handleAdd} />
        )}
      </main>
      
      <footer className="mt-12 py-8 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-dark-card transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} OC 素材库 | 暗黑光影设计</p>
        </div>
      </footer>
    </div>
  );
};

export default App;