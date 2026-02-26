
import React, { useState, useEffect, useRef } from 'react';
import { Story, StoryCategory } from '../App';
import { UploadIcon } from './icons/Icons';

interface StoryEditorModalProps {
  story: Story | null;
  onClose: () => void;
  onSave: (story: Story) => void;
  initialCategory?: StoryCategory;
}

export const StoryEditorModal: React.FC<StoryEditorModalProps> = ({ story, onClose, onSave, initialCategory = '4-7' }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<StoryCategory>(initialCategory);

  // Referências para os inputs de arquivo ocultos
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setContent(story.content);
      setAudioUrl(story.audioUrl || '');
      setImageUrl(story.imageUrl || '');
      setCategory(story.category);
    } else {
      setTitle('');
      setContent('');
      setAudioUrl('');
      setImageUrl('');
      setCategory(initialCategory);
    }
  }, [story, initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor, preencha o título e o conteúdo da história.');
      return;
    }

    const storyToSave: Story = {
      id: story ? story.id : Date.now().toString(),
      title,
      content,
      createdAt: story ? story.createdAt : new Date().toISOString(),
      audioUrl: audioUrl.trim(),
      imageUrl: imageUrl.trim(),
      category,
      likes: story ? story.likes : 0,
    };
    onSave(storyToSave);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const file = e.target.files?.[0];
    if (file) {
        // Usar FileReader para converter em Base64 e persistir o arquivo real
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setUrl(base64String);
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 flex flex-col" style={{ maxHeight: '90vh' }}>
        <h3 className="font-display text-2xl font-bold text-prospera-purple mb-6 flex-shrink-0">{story ? 'Editar História' : 'Criar Nova História'}</h3>
        
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col min-h-0">
          
          {/* Área Rolável (Inputs) */}
          <div className="flex-grow overflow-y-auto pr-2">
            {/* Inputs de Arquivo Ocultos */}
            <input 
              type="file" 
              ref={imageInputRef} 
              onChange={(e) => handleFileChange(e, setImageUrl)} 
              className="hidden" 
              accept="image/*"
            />
            <input 
              type="file" 
              ref={audioInputRef} 
              onChange={(e) => handleFileChange(e, setAudioUrl)} 
              className="hidden" 
              accept="audio/*"
            />

            <div className="mb-4">
              <label htmlFor="story-category" className="block text-sm font-bold text-gray-600 mb-1">Categoria (Faixa Etária)</label>
              <select
                id="story-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as StoryCategory)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink bg-white"
              >
                <option value="gestante">Em gestação</option>
                <option value="0-3">Curioso (0 a 3 Anos)</option>
                <option value="4-7">Explorador (4 a 7 Anos)</option>
                <option value="8-12">Aventureiro (8 a 12 Anos)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="story-title" className="block text-sm font-bold text-gray-600 mb-1">Título</label>
              <input 
                id="story-title"
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                placeholder="Ex: O Leão que aprendeu a compartilhar" 
                required 
              />
            </div>
            
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Campo de Imagem */}
              <div>
                <label htmlFor="story-image" className="block text-sm font-bold text-gray-600 mb-1">URL da Imagem (Opcional)</label>
                <div className="flex gap-2">
                  <input 
                    id="story-image"
                    type="text" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                    className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink min-w-0"
                    placeholder="Link ou Upload ->" 
                  />
                  <button 
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="bg-prospera-blue text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center flex-shrink-0"
                    title="Fazer Upload de Imagem"
                  >
                    <UploadIcon className="w-5 h-5" />
                  </button>
                </div>
                {imageUrl && (
                    <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                        <img src={imageUrl} alt="Preview da História" className="w-full h-full object-cover" />
                    </div>
                )}
              </div>

              {/* Campo de Áudio */}
              <div>
                <label htmlFor="story-audio" className="block text-sm font-bold text-gray-600 mb-1">URL do Áudio (Opcional)</label>
                <div className="flex gap-2">
                  <input 
                    id="story-audio"
                    type="text" 
                    value={audioUrl} 
                    onChange={(e) => setAudioUrl(e.target.value)} 
                    className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink min-w-0"
                    placeholder="Link ou Upload ->" 
                  />
                  <button 
                    type="button"
                    onClick={() => audioInputRef.current?.click()}
                    className="bg-prospera-pink text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center flex-shrink-0"
                    title="Fazer Upload de Áudio"
                  >
                    <UploadIcon className="w-5 h-5" />
                  </button>
                </div>
                {audioUrl && (
                    <div className="mt-2">
                        <audio controls src={audioUrl} className="w-full h-8">
                          Seu navegador não suporta áudio.
                        </audio>
                    </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="story-content" className="block text-sm font-bold text-gray-600 mb-1">Conteúdo da História</label>
              <textarea 
                id="story-content"
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink"
                placeholder="Era uma vez..."
                rows={10} 
                required
              ></textarea>
            </div>
          </div>

          {/* Área Fixa (Botões) */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="bg-prospera-green text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors">
              Salvar História
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
