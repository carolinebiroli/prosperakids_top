
import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../App';
import { UploadIcon } from './icons/Icons';

interface BlogPostEditorModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSave: (post: BlogPost) => void;
}

export const BlogPostEditorModal: React.FC<BlogPostEditorModalProps> = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [text1, setText1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [text2, setText2] = useState('');
  const [error, setError] = useState('');

  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImageUrl1(post.imageUrl1);
      setText1(post.text1);
      setImageUrl2(post.imageUrl2);
      setText2(post.text2);
    } else {
      // Reset form for new post
      setTitle('');
      setImageUrl1('');
      setText1('');
      setImageUrl2('');
      setText2('');
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !text1.trim() || !text2.trim() || !imageUrl1.trim() || !imageUrl2.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const postToSave: BlogPost = {
      id: post ? post.id : Date.now().toString(),
      title,
      imageUrl1,
      text1,
      imageUrl2,
      text2,
      createdAt: post ? post.createdAt : new Date().toISOString(),
    };
    onSave(postToSave);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Create a fake URL for the uploaded file (blob URL)
        const fakeUrl = URL.createObjectURL(file);
        setUrl(fakeUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-4 flex flex-col" style={{ maxHeight: '90vh' }}>
        <h3 className="font-display text-2xl font-bold text-prospera-purple mb-6 flex-shrink-0">{post ? 'Editar Artigo' : 'Criar Novo Artigo'}</h3>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          
          {/* Scrollable Area */}
          <div className="flex-grow overflow-y-auto pr-2">
            {/* Inputs de Arquivo Ocultos */}
            <input 
                type="file" 
                ref={fileInput1Ref} 
                onChange={(e) => handleFileChange(e, setImageUrl1)} 
                className="hidden" 
                accept="image/*"
            />
            <input 
                type="file" 
                ref={fileInput2Ref} 
                onChange={(e) => handleFileChange(e, setImageUrl2)} 
                className="hidden" 
                accept="image/*"
            />

            <div className="space-y-4">
                <div>
                <label htmlFor="post-title" className="block text-sm font-bold text-gray-600 mb-1">Título do Artigo</label>
                <input 
                    id="post-title"
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                    placeholder="Um título chamativo para o seu artigo" 
                />
                </div>
                
                {/* Seção 1 */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-prospera-purple mb-3">Seção 1</h4>
                    <div className="mb-3">
                        <label htmlFor="post-image1" className="block text-sm font-bold text-gray-600 mb-1">Imagem Principal</label>
                        <div className="flex gap-2">
                            <input 
                                id="post-image1"
                                type="url" 
                                value={imageUrl1} 
                                onChange={(e) => setImageUrl1(e.target.value)} 
                                className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                                placeholder="Cole a URL ou faça upload ->" 
                            />
                            <button 
                                type="button"
                                onClick={() => fileInput1Ref.current?.click()}
                                className="bg-prospera-blue text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 px-4"
                                title="Fazer Upload de Imagem"
                            >
                                <UploadIcon className="w-5 h-5" />
                                <span className="text-sm font-bold hidden sm:inline">Upload</span>
                            </button>
                        </div>
                        {imageUrl1 && (
                            <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                                <img src={imageUrl1} alt="Preview 1" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="post-text1" className="block text-sm font-bold text-gray-600 mb-1">Texto Principal</label>
                        <textarea 
                            id="post-text1"
                            value={text1} 
                            onChange={(e) => setText1(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                            placeholder="Comece a escrever o artigo aqui..."
                            rows={6}
                        ></textarea>
                    </div>
                </div>

                {/* Seção 2 */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-prospera-purple mb-3">Seção 2</h4>
                    <div className="mb-3">
                        <label htmlFor="post-image2" className="block text-sm font-bold text-gray-600 mb-1">Imagem Secundária</label>
                        <div className="flex gap-2">
                            <input 
                                id="post-image2"
                                type="url" 
                                value={imageUrl2} 
                                onChange={(e) => setImageUrl2(e.target.value)} 
                                className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                                placeholder="Cole a URL ou faça upload ->" 
                            />
                            <button 
                                type="button"
                                onClick={() => fileInput2Ref.current?.click()}
                                className="bg-prospera-blue text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 px-4"
                                title="Fazer Upload de Imagem"
                            >
                                <UploadIcon className="w-5 h-5" />
                                <span className="text-sm font-bold hidden sm:inline">Upload</span>
                            </button>
                        </div>
                        {imageUrl2 && (
                            <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                                <img src={imageUrl2} alt="Preview 2" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="post-text2" className="block text-sm font-bold text-gray-600 mb-1">Texto Secundário</label>
                        <textarea 
                            id="post-text2"
                            value={text2} 
                            onChange={(e) => setText2(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                            placeholder="Continue o seu artigo..."
                            rows={6}
                        ></textarea>
                    </div>
                </div>
            </div>
            
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
          
          {/* Fixed Footer */}
          <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-prospera-green text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors">
              Salvar Artigo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
