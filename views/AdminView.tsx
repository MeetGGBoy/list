import React, { useState } from 'react';
import { OcMaterial } from '../types';
import { Button, Input, TextArea, Card } from '../components/SkeuomorphicUI';
import { generateCreativeDescription } from '../services/geminiService';

interface AdminViewProps {
  materials: OcMaterial[];
  onDelete: (id: string) => void;
  onAdd: (material: OcMaterial) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ materials, onDelete, onAdd }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Texture',
    imageUrl: 'https://picsum.photos/400/300', // Default placeholder
    author: '',
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
        setLoginError('');
    } else {
        setLoginError('用户名或密码错误');
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
        alert("请先输入标题。");
        return;
    }
    setIsGenerating(true);
    const desc = await generateCreativeDescription(formData.title, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMaterial: OcMaterial = {
        id: Date.now().toString(),
        ...formData,
        downloadUrl: '#',
        downloads: 0,
        dateAdded: Date.now()
    };
    onAdd(newMaterial);
    // Reset form
    setFormData({
        title: '',
        category: 'Texture',
        imageUrl: 'https://picsum.photos/400/300',
        author: '',
        description: ''
    });
  };

  if (!isLoggedIn) {
      return (
          <div className="flex justify-center items-center min-h-[60vh]">
              <Card className="w-full max-w-md p-8 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-xl">
                  <div className="text-center mb-8">
                      <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-2xl">🔐</div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">后台登录</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">请登录以管理素材库。</p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">用户名</label>
                          <Input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="输入用户名"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密码</label>
                          <Input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="输入密码"
                          />
                      </div>
                      {loginError && <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>}
                      <Button type="submit" variant="primary" className="w-full">
                          登录
                      </Button>
                  </form>
              </Card>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-white/10">添加新素材</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标题</label>
                    <Input 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="素材名称"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分类</label>
                    <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="Texture">Texture (纹理)</option>
                        <option value="Reference">Reference (参考)</option>
                        <option value="Brush">Brush (笔刷)</option>
                        <option value="Background">Background (背景)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">图片 URL</label>
                    <Input 
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="https://..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">作者</label>
                    <Input 
                        value={formData.author}
                        onChange={e => setFormData({...formData, author: e.target.value})}
                        placeholder="创作者名称"
                        required
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">描述</label>
                        <button 
                            type="button" 
                            onClick={handleGenerateDescription}
                            disabled={isGenerating}
                            className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 disabled:opacity-50 flex items-center gap-1"
                        >
                            {isGenerating ? '生成中...' : '✨ AI 辅助生成'}
                        </button>
                    </div>
                    <TextArea 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        placeholder="输入素材描述..."
                        required
                    />
                </div>

                <div className="pt-4">
                    <Button type="submit" variant="primary" className="w-full shadow-lg shadow-blue-500/20">
                        发布素材
                    </Button>
                </div>
            </form>
        </Card>
      </div>

      {/* Inventory List */}
      <div className="lg:col-span-2">
          <Card className="overflow-hidden">
             <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">库存管理</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{materials.length} 个项目</span>
             </div>
             
             {materials.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400">暂无数据。请添加您的第一个素材。</div>
             ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-white/5">
                            <tr>
                                <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">预览</th>
                                <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">详情</th>
                                <th className="py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                            {materials.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6 align-middle w-20">
                                        <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-white/10" />
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.category} • {item.author}</div>
                                    </td>
                                    <td className="py-4 px-6 text-right align-middle">
                                        <Button 
                                            variant="danger" 
                                            onClick={() => onDelete(item.id)}
                                            className="text-xs py-1.5 px-4 shadow-red-500/20"
                                        >
                                            删除
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             )}
          </Card>
      </div>
    </div>
  );
};

export default AdminView;