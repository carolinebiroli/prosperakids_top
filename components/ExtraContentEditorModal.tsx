
import React, { useState, useEffect, useRef } from 'react';
import { ExtraContent, ExtraContentType, StoryCategory } from '../App';
import { UploadIcon } from './icons/Icons';

interface ExtraContentEditorModalProps {
  extra: ExtraContent | null;
  onClose: () => void;
  onSave: (extra: ExtraContent) => void;
}

export const ExtraContentEditorModal: React.FC<ExtraContentEditorModalProps> = ({ extra, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ExtraContentType>('atividade');
  const [category, setCategory] = useState<StoryCategory | 'all'>('all');
  const [imageUrl, setImageUrl] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const resourceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (extra) {
      setTitle(extra.title);
      setDescription(extra.description);
      setType(extra.type);
      setCategory(extra.category);
      setImageUrl(extra.imageUrl || '');
      setResourceUrl(extra.resourceUrl || '');
    } else {
      setTitle('');
      setDescription('');
      setType('atividade');
      setCategory('all');
      setImageUrl('');
      setResourceUrl('');
    }
  }, [extra]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Por favor, preencha o título e a descrição.');
      return;
    }

    const extraToSave: ExtraContent = {
      id: extra ? extra.id : Date.now().toString(),
      title,
      description,
      type,
      category,
      imageUrl: imageUrl.trim(),
      resourceUrl: resourceUrl.trim(),
      createdAt: extra ? extra.createdAt : new Date().toISOString(),
    };
    onSave(extraToSave);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
        const fakeUrl = URL.createObjectURL(file);
        setUrl(fakeUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 flex flex-col" style={{ maxHeight: '90vh' }}>
        <h3 className="font-display text-2xl font-bold text-prospera-purple mb-6 flex-shrink-0">
            {extra ? 'Editar Conteúdo Extra' : 'Criar Novo Conteúdo Extra'}
        </h3>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          <div className="flex-grow overflow-y-auto pr-2">
            <input 
              type="file" 
              ref={imageInputRef} 
              onChange={(e) => handleFileChange(e, setImageUrl)} 
              className="hidden" 
              accept="image/*"
            />
             <input 
              type="file" 
              ref={resourceInputRef} 
              onChange={(e) => handleFileChange(e, setResourceUrl)} 
              className="hidden" 
              // Aceita áudio, PDF, etc. dependendo do que for
              accept="audio/*,application/pdf,image/*" 
            />

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1">Tipo de Conteúdo</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ExtraContentType)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink bg-white"
                    >
                        <option value="atividade">Atividade</option>
                        <option value="audio">Áudio</option>
                        <option value="ebook">Ebook/PDF</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-600 mb-1">Categoria Alvo</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as (StoryCategory | 'all'))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink bg-white"
                    >
                        <option value="all">Todas as Fases</option>
                        <option value="gestante">Em gestação</option>
                        <option value="0-3">Curioso (0-3)</option>
                        <option value="4-7">Explorador (4-7)</option>
                        <option value="8-12">Aventureiro (8-12)</option>
                    </select>
                </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-600 mb-1">Título</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                placeholder="Ex: Desenho para colorir" 
                required 
              />
            </div>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Imagem de Capa */}
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Imagem de Capa (Opcional)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink min-w-0"
                    placeholder="URL ou Upload ->" 
                  />
                  <button 
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="bg-prospera-blue text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors flex-shrink-0"
                    title="Upload Imagem"
                  >
                    <UploadIcon className="w-5 h-5" />
                  </button>
                </div>
                {imageUrl && (
                    <div className="mt-2 h-20 w-full overflow-hidden rounded-lg border border-gray-200">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}
              </div>

              {/* Arquivo do Recurso */}
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">URL do Recurso (PDF/Áudio)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={resourceUrl} 
                    onChange={(e) => setResourceUrl(e.target.value)} 
                    className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink min-w-0"
                    placeholder="Link para download ou áudio" 
                  />
                  <button 
                    type="button"
                    onClick={() => resourceInputRef.current?.click()}
                    className="bg-prospera-green text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors flex-shrink-0"
                    title="Upload Arquivo"
                  >
                    <UploadIcon className="w-5 h-5" />
                  </button>
                </div>
                {resourceUrl && <p className="text-xs text-green-600 mt-1 truncate">Arquivo vinculado.</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-600 mb-1">Descrição</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                placeholder="Descreva o material..."
                rows={4} 
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-prospera-green text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors">
              Salvar Conteúdo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
