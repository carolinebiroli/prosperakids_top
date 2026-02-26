
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { User, Story, BlogPost, StoryCategory, ExtraContent, ExtraContentType, Lead } from '../App';
import { PencilIcon, SearchIcon, TrashIcon, HeartIcon, CheckCircleIcon, ClockIcon, XCircleIcon, BookOpenIcon, NewspaperIcon, MenuIcon, XIcon, HomeIcon, UserCircleIcon, UsersIcon, ChevronDownIcon, MusicNoteIcon, UploadIcon, DownloadIcon, SparklesIcon, SeedlingIcon, BrainIcon, PlayIcon, PauseIcon, GiftIcon, WhatsAppIcon } from './icons/Icons';
import { StoryEditorModal } from './StoryEditorModal';
import { BlogPostEditorModal } from './BlogPostEditorModal';
import { ExtraContentEditorModal } from './ExtraContentEditorModal';

interface AdminDashboardProps {
  user: User;
  clients: User[];
  onClientsUpdate: (updatedClients: User[]) => void;
  stories: Story[];
  onStoriesUpdate: React.Dispatch<React.SetStateAction<Story[]>>;
  blogPosts: BlogPost[];
  onBlogPostsUpdate: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  extras: ExtraContent[];
  onExtrasUpdate: React.Dispatch<React.SetStateAction<ExtraContent[]>>;
  onPasswordUpdate: (email: string, newPassword: string) => void;
  leads: Lead[];
}

const EditClientModal: React.FC<{ client: User; onClose: () => void; onSave: (client: User) => void; }> = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    whatsapp: client.whatsapp || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedClient: User = {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        role: client.role,
        subscriptionStatus: client.subscriptionStatus,
        password: client.password,
        subscriptionDate: client.subscriptionDate,
        favorites: client.favorites,
        categories: client.categories,
        receiveNews: client.receiveNews
    };
    onSave(updatedClient);
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4">
            <h3 className="font-display text-2xl font-bold text-prospera-purple mb-6">Editar Cliente</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Nome Completo</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">WhatsApp</label>
                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-prospera-pink" placeholder="11987654321" />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                  <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">
                      Cancelar
                  </button>
                  <button type="submit" className="bg-prospera-green text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors">
                      Salvar Alterações
                  </button>
              </div>
            </form>
        </div>
      </div>
  );
};

const MetricCard: React.FC<{ icon: React.ReactNode; title: string; value: number | string; bgColor: string }> = ({ icon, title, value, bgColor }) => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transition-transform duration-300 hover:scale-105 h-full">
        <div className={`${bgColor} rounded-full p-3 flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-3xl font-bold font-display text-gray-800">{value}</p>
          <p className="text-sm font-semibold text-gray-500">{title}</p>
        </div>
      </div>
    );
};

const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
    totalItems
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (perPage: number) => void;
    totalItems: number;
}) => (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
            <span className="font-semibold">Linhas por página:</span>
            <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-prospera-purple cursor-pointer"
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <span className="text-gray-500">Total: <strong>{totalItems}</strong> itens</span>
        </div>
        <div className="flex items-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Anterior
            </button>
            <span className="font-medium px-2">
                Página {currentPage} de {totalPages || 1}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Próximo
            </button>
        </div>
    </div>
);


const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, clients, onClientsUpdate, stories, onStoriesUpdate, blogPosts, onBlogPostsUpdate, extras, onExtrasUpdate, onPasswordUpdate, leads }) => {
  type AdminTab = 'overview' | 'clients' | 'content' | 'blog' | 'extras' | 'whatsapp' | 'leads' | 'account';
  type ClientFilter = 'all' | 'pago' | 'pendente' | 'cancelado' | 'recent';
  type SortOrder = 'asc' | 'desc';
  
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [activeStoryCategory, setActiveStoryCategory] = useState<StoryCategory>('gestante');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<ClientFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Pagination States
  const [clientsPage, setClientsPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(10);

  const [storiesPage, setStoriesPage] = useState(1);
  const [storiesPerPage, setStoriesPerPage] = useState(10);

  const [blogPage, setBlogPage] = useState(1);
  const [blogPerPage, setBlogPerPage] = useState(10);

  const [extrasPage, setExtrasPage] = useState(1);
  const [extrasPerPage, setExtrasPerPage] = useState(10);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<User | null>(null);
  const [clientToDelete, setClientToDelete] = useState<User | null>(null);
  
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);
  
  const [expandedBlogPostId, setExpandedBlogPostId] = useState<string | null>(null);
  const [isBlogPostModalOpen, setIsBlogPostModalOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [blogPostToDelete, setBlogPostToDelete] = useState<BlogPost | null>(null);
  
  const [isExtrasModalOpen, setIsExtrasModalOpen] = useState(false);
  const [editingExtra, setEditingExtra] = useState<ExtraContent | null>(null);
  const [extraToDelete, setExtraToDelete] = useState<ExtraContent | null>(null);

  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [statusChangeTarget, setStatusChangeTarget] = useState<{ email: string; name: string; newStatus: 'pago' | 'pendente' } | null>(null);

  // File Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const blogImageInputRef = useRef<HTMLInputElement>(null);
  
  const [storyIdToUpload, setStoryIdToUpload] = useState<string | null>(null);
  const [storyIdToImageUpload, setStoryIdToImageUpload] = useState<string | null>(null);
  
  // Audio Player State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Blog Image Upload State
  const [blogUploadTarget, setBlogUploadTarget] = useState<{ id: string; slot: 1 | 2 } | null>(null);

  // State for admin password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  
  // WhatsApp Tab State
  const [whatsappMessage, setWhatsappMessage] = useState('');

  const clientList = useMemo(() => clients.filter(c => c.role === 'client'), [clients]);

  const totalClients = clientList.length;
  const activeClients = useMemo(() => clientList.filter(c => c.subscriptionStatus === 'pago').length, [clientList]);
  const pendingClients = useMemo(() => clientList.filter(c => c.subscriptionStatus === 'pendente').length, [clientList]);
  const canceledClients = useMemo(() => clientList.filter(c => c.subscriptionStatus === 'cancelado').length, [clientList]);

  const recentSubscribers = useMemo(() => {
    // Definindo o limite de 48 horas atrás
    const timeLimit = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    return clientList
        .filter(c => c.subscriptionDate && new Date(c.subscriptionDate) > timeLimit)
        .sort((a, b) => new Date(b.subscriptionDate!).getTime() - new Date(a.subscriptionDate!).getTime());
  }, [clientList]);

  const allFilteredClients = useMemo(() => {
    let tempClients = [...clientList];
    if (searchTerm.trim() !== '') {
      const lowercasedTerm = searchTerm.toLowerCase();
      tempClients = tempClients.filter(client =>
        client.name.toLowerCase().includes(lowercasedTerm) ||
        client.email.toLowerCase().includes(lowercasedTerm)
      );
    }

    if (filter === 'recent') {
      const timeLimit = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours
      tempClients = tempClients.filter(c => c.subscriptionDate && new Date(c.subscriptionDate) > timeLimit);
    } else if (filter !== 'all') {
      tempClients = tempClients.filter(client => client.subscriptionStatus === filter);
    }
    
    // Sorting
    tempClients.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    
    return tempClients;
  }, [clientList, filter, searchTerm, sortOrder]);
  
  const sortedStories = useMemo(() => {
    return stories
        .filter(s => s.category === activeStoryCategory)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [stories, activeStoryCategory]);

  const sortedBlogPosts = useMemo(() => [...blogPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [blogPosts]);

  const sortedExtras = useMemo(() => [...extras].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [extras]);
  
  const newsSubscribers = useMemo(() => {
      return clientList.filter(c => c.receiveNews && c.whatsapp);
  }, [clientList]);

  const sortedLeads = useMemo(() => {
      return [...leads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [leads]);

  // Reset pagination when filters change
  useEffect(() => { setClientsPage(1); }, [filter, searchTerm, sortOrder]);
  useEffect(() => { setStoriesPage(1); }, [activeStoryCategory]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
        audioPlayerRef.current?.pause();
    };
  }, []);

  // Clients Pagination Logic
  const totalClientsPages = Math.ceil(allFilteredClients.length / clientsPerPage);
  const paginatedClients = useMemo(() => {
    const startIndex = (clientsPage - 1) * clientsPerPage;
    return allFilteredClients.slice(startIndex, startIndex + clientsPerPage);
  }, [allFilteredClients, clientsPage, clientsPerPage]);

  // Stories Pagination Logic
  const totalStoriesPages = Math.ceil(sortedStories.length / storiesPerPage);
  const paginatedStories = useMemo(() => {
    const startIndex = (storiesPage - 1) * storiesPerPage;
    return sortedStories.slice(startIndex, startIndex + storiesPerPage);
  }, [sortedStories, storiesPage, storiesPerPage]);

  // Blog Pagination Logic
  const totalBlogPages = Math.ceil(sortedBlogPosts.length / blogPerPage);
  const paginatedBlogPosts = useMemo(() => {
    const startIndex = (blogPage - 1) * blogPerPage;
    return sortedBlogPosts.slice(startIndex, startIndex + blogPerPage);
  }, [sortedBlogPosts, blogPage, blogPerPage]);
  
  // Extras Pagination Logic
  const totalExtrasPages = Math.ceil(sortedExtras.length / extrasPerPage);
  const paginatedExtras = useMemo(() => {
      const startIndex = (extrasPage - 1) * extrasPerPage;
      return sortedExtras.slice(startIndex, startIndex + extrasPerPage);
  }, [sortedExtras, extrasPage, extrasPerPage]);


  const requestStatusChange = (client: User) => {
    const newStatus = client.subscriptionStatus === 'pago' ? 'pendente' : 'pago';
    setStatusChangeTarget({ email: client.email, name: client.name, newStatus });
    setShowStatusConfirmModal(true);
  };

  const confirmStatusChange = () => {
    if (!statusChangeTarget) return;
    onClientsUpdate(clients.map(c => c.email === statusChangeTarget.email ? { ...c, subscriptionStatus: statusChangeTarget.newStatus } : c));
    setShowStatusConfirmModal(false);
    setStatusChangeTarget(null);
  };
  
  const handleRequestDeleteClient = (client: User) => {
    setClientToDelete(client);
  };

  const handleConfirmDeleteClient = () => {
    if (!clientToDelete) return;
    onClientsUpdate(clients.filter(c => c.email !== clientToDelete.email));
    setClientToDelete(null);
  };

  const handleOpenEditModal = (client: User) => { setEditingClient(client); setIsEditModalOpen(true); };
  const handleClientUpdate = (updatedClient: User) => {
    onClientsUpdate(clients.map(c => c.email === editingClient?.email ? updatedClient : c));
    setIsEditModalOpen(false); setEditingClient(null);
  };
  
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null); setPasswordSuccess(null);
    if (currentPassword !== user.password) { setPasswordError('A senha atual está incorreta.'); return; }
    if (newPassword.length < 6) { setPasswordError('A nova senha deve ter pelo menos 6 caracteres.'); return; }
    if (newPassword !== confirmNewPassword) { setPasswordError('As novas senhas não coincidem.'); return; }
    onPasswordUpdate(user.email, newPassword);
    setPasswordSuccess('Senha alterada com sucesso!');
    setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');
    setTimeout(() => setPasswordSuccess(null), 3000);
  };

  const handleOpenStoryModal = (story: Story | null = null) => { setEditingStory(story); setIsStoryModalOpen(true); };
  const handleSaveStory = (storyToSave: Story) => {
    onStoriesUpdate(prev => editingStory ? prev.map(s => s.id === storyToSave.id ? storyToSave : s) : [...prev, storyToSave]);
    setIsStoryModalOpen(false); setEditingStory(null);
  };
  const handleRequestDeleteStory = (story: Story) => { setStoryToDelete(story); };
  const handleConfirmDeleteStory = () => {
    if (!storyToDelete) return;
    onStoriesUpdate(prev => prev.filter(s => s.id !== storyToDelete.id));
    setStoryToDelete(null);
  };

  const handleToggleStory = (storyId: string) => {
    setExpandedStoryId(prevId => (prevId === storyId ? null : storyId));
  };

  const handleToggleBlogPost = (postId: string) => {
    setExpandedBlogPostId(prevId => (prevId === postId ? null : postId));
  };
  
  const handleUploadClick = (storyId: string) => {
    setStoryIdToUpload(storyId);
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset input
        fileInputRef.current.click();
    }
  };

  const handleImageUploadClick = (storyId: string) => {
    setStoryIdToImageUpload(storyId);
    if (imageInputRef.current) {
        imageInputRef.current.value = ''; // Reset input
        imageInputRef.current.click();
    }
  };
  
  const handleBlogUploadClick = (postId: string, slot: 1 | 2) => {
    setBlogUploadTarget({ id: postId, slot });
    if (blogImageInputRef.current) {
        blogImageInputRef.current.value = ''; // Reset input
        blogImageInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const currentStoryId = storyIdToUpload;
    
    if (file && currentStoryId) {
        // Usar FileReader para converter em Base64 e persistir o áudio real
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Audio = reader.result as string;
            
            onStoriesUpdate(prev => prev.map(s => 
                s.id === currentStoryId ? { ...s, audioUrl: base64Audio } : s
            ));
            
            alert(`Arquivo de áudio "${file.name}" carregado com sucesso!`);
        };
        reader.readAsDataURL(file);
    }
    setStoryIdToUpload(null);
  };

  const handleImageUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const currentStoryId = storyIdToImageUpload;

    if (file && currentStoryId) {
        // Usar FileReader para converter em Base64 e persistir a imagem real
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result as string;
            
            onStoriesUpdate(prev => prev.map(s => 
                s.id === currentStoryId ? { ...s, imageUrl: base64Image } : s
            ));
            
            alert(`Imagem "${file.name}" carregada com sucesso!`);
        };
        reader.readAsDataURL(file);
    }
    setStoryIdToImageUpload(null);
  };
  
  const handleBlogImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && blogUploadTarget) {
        const fakeUrl = URL.createObjectURL(file);
        
        onBlogPostsUpdate(prev => prev.map(p => {
            if (p.id === blogUploadTarget.id) {
                return {
                    ...p,
                    [blogUploadTarget.slot === 1 ? 'imageUrl1' : 'imageUrl2']: fakeUrl
                };
            }
            return p;
        }));
        
        alert(`Imagem ${blogUploadTarget.slot} carregada com sucesso! (Simulação: URL local gerada)`);
    }
    setBlogUploadTarget(null);
  };
  
  const toggleAudio = (id: string, url: string) => {
    if (playingAudioId === id) {
        // Pause/Stop
        audioPlayerRef.current?.pause();
        setPlayingAudioId(null);
    } else {
        // Play
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
        }
        audioPlayerRef.current = new Audio(url);
        audioPlayerRef.current.onended = () => setPlayingAudioId(null);
        audioPlayerRef.current.play().catch(e => console.error("Error playing audio:", e));
        setPlayingAudioId(id);
    }
  };

  const handleOpenBlogPostModal = (post: BlogPost | null = null) => { setEditingBlogPost(post); setIsBlogPostModalOpen(true); };
  const handleSaveBlogPost = (postToSave: BlogPost) => {
    onBlogPostsUpdate(prev => editingBlogPost ? prev.map(p => p.id === postToSave.id ? postToSave : p) : [postToSave, ...prev]);
    setIsBlogPostModalOpen(false); setEditingBlogPost(null);
  };
  const handleRequestDeleteBlogPost = (post: BlogPost) => { setBlogPostToDelete(post); };
  const handleConfirmDeleteBlogPost = () => {
    if (!blogPostToDelete) return;
    onBlogPostsUpdate(prev => prev.filter(p => p.id !== blogPostToDelete.id));
    setBlogPostToDelete(null);
  };

  // Extras Handling
  const handleOpenExtrasModal = (extra: ExtraContent | null = null) => { setEditingExtra(extra); setIsExtrasModalOpen(true); };
  const handleSaveExtra = (extraToSave: ExtraContent) => {
      onExtrasUpdate(prev => editingExtra ? prev.map(e => e.id === extraToSave.id ? extraToSave : e) : [extraToSave, ...prev]);
      setIsExtrasModalOpen(false); setEditingExtra(null);
  };
  const handleRequestDeleteExtra = (extra: ExtraContent) => { setExtraToDelete(extra); };
  const handleConfirmDeleteExtra = () => {
      if (!extraToDelete) return;
      onExtrasUpdate(prev => prev.filter(e => e.id !== extraToDelete.id));
      setExtraToDelete(null);
  };
  
  const handleSendWhatsappNews = () => {
      if (!whatsappMessage.trim()) return;
      alert(`Mensagem enviada com sucesso para ${newsSubscribers.length} usuários!`);
      setWhatsappMessage('');
  };


  const handleMetricCardClick = (newFilter: ClientFilter) => {
    setActiveTab('clients');
    setFilter(newFilter);
  };

  const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Visão Geral', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'clients', label: 'Clientes', icon: <UsersIcon /> },
    { id: 'content', label: 'Histórias', icon: <BookOpenIcon className="w-6 h-6" /> },
    { id: 'extras', label: 'Conteúdo Extra', icon: <GiftIcon className="w-6 h-6" /> },
    { id: 'blog', label: 'Blog', icon: <NewspaperIcon className="w-6 h-6" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <WhatsAppIcon className="w-6 h-6" /> },
    { id: 'leads', label: 'Leads', icon: <SeedlingIcon className="w-6 h-6" /> },
    { id: 'account', label: 'Conta', icon: <UserCircleIcon className="w-6 h-6" /> },
  ];

  const renderStatusCell = (client: User) => {
    if (client.subscriptionStatus === 'cancelado') {
      if (client.subscriptionDate) {
        const endDate = new Date(new Date(client.subscriptionDate).setDate(new Date(client.subscriptionDate).getDate() + 30));
        if (endDate > new Date()) {
          return <span className="font-semibold text-sm text-red-600 bg-red-100 py-1 px-3 rounded-full whitespace-nowrap">Ativa até {endDate.toLocaleDateString('pt-BR')}</span>;
        }
        return <span className="font-semibold text-sm text-gray-600 bg-gray-200 py-1 px-3 rounded-full whitespace-nowrap">Expirada</span>;
      }
      return <span className="font-semibold text-sm text-gray-600 bg-gray-200 py-1 px-3 rounded-full whitespace-nowrap">Cancelada</span>;
    }
    return (
      <label htmlFor={`status-toggle-${client.email}`} className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id={`status-toggle-${client.email}`} checked={client.subscriptionStatus === 'pago'} onChange={() => requestStatusChange(client)} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-prospera-green"></div>
      </label>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="font-display text-2xl font-bold leading-none">
                <span className="text-white">Prospera</span>
                <span>
                <span className="text-prospera-green">K</span>
                <span className="text-prospera-pink">i</span>
                <span className="text-prospera-blue">d</span>
                <span className="text-prospera-orange">s</span>
                </span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/70 hover:text-white">
                <XIcon className="w-6 h-6" />
            </button>
        </div>
        <nav className="flex-grow py-4">
            {TABS.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
            >
                {React.cloneElement(tab.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                <span className="font-bold">{tab.label}</span>
            </button>
            ))}
        </nav>
    </div>
  );

  return (
    <div className="bg-gray-50 flex flex-grow min-h-screen">
      {/* Hidden File Inputs for Audio/Image Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="audio/*"
      />
      <input 
        type="file" 
        ref={imageInputRef} 
        onChange={handleImageUploadFileChange} 
        className="hidden" 
        accept="image/*"
      />
      <input 
        type="file" 
        ref={blogImageInputRef} 
        onChange={handleBlogImageFileChange} 
        className="hidden" 
        accept="image/*"
      />

      {/* Sidebar for Mobile */}
      <aside className={`fixed inset-y-0 left-0 bg-prospera-purple w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <SidebarContent />
      </aside>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-prospera-purple flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
                <MenuIcon className="w-6 h-6" />
            </button>
            <span className="font-bold text-lg text-prospera-purple">{TABS.find(t => t.id === activeTab)?.label}</span>
        </header>

        <main className="flex-grow p-6 md:p-10">
            <div className="animate-fade-in">
                {activeTab === 'overview' && (
                    <>
                    <h1 className="font-display text-4xl font-bold text-prospera-purple mb-6">Visão Geral do Negócio</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <button onClick={() => handleMetricCardClick('all')} className="text-left w-full h-full">
                          <MetricCard icon={<UsersIcon className="w-10 h-10 text-white" />} title="Total de Clientes" value={totalClients} bgColor="bg-prospera-blue" />
                        </button>
                        <button onClick={() => handleMetricCardClick('pago')} className="text-left w-full h-full">
                          <MetricCard icon={<CheckCircleIcon className="w-10 h-10 text-white" />} title="Assinantes Ativos" value={activeClients} bgColor="bg-prospera-green" />
                        </button>
                        <button onClick={() => handleMetricCardClick('pendente')} className="text-left w-full h-full">
                          <MetricCard icon={<ClockIcon className="w-10 h-10 text-white" />} title="Pagamentos Pendentes" value={pendingClients} bgColor="bg-prospera-orange" />
                        </button>
                        <button onClick={() => handleMetricCardClick('cancelado')} className="text-left w-full h-full">
                          <MetricCard icon={<XCircleIcon className="w-10 h-10 text-white" />} title="Assinaturas Canceladas" value={canceledClients} bgColor="bg-red-500" />
                        </button>
                    </div>

                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
                       <h2 className="font-display text-2xl font-bold text-prospera-purple mb-6">
                           Assinaturas Recentes (48h) <span className="ml-2 bg-prospera-purple text-white text-sm py-1 px-3 rounded-full">{recentSubscribers.length}</span>
                       </h2>
                       <div className="overflow-x-auto">
                         <table className="w-full text-left">
                           <thead>
                             <tr className="border-b border-gray-100">
                               <th className="pb-3 pl-2 text-sm font-bold text-gray-500">Cliente</th>
                               <th className="pb-3 text-sm font-bold text-gray-500">Data</th>
                               <th className="pb-3 text-sm font-bold text-gray-500 text-center">Status</th>
                               <th className="pb-3 text-sm font-bold text-gray-500 text-right pr-2">Valor</th>
                             </tr>
                           </thead>
                           <tbody>
                             {recentSubscribers.map(sub => (
                                <tr key={sub.email} className="border-b border-gray-50 hover:bg-gray-50 last:border-0">
                                   <td className="py-3 pl-2">
                                     <div className="font-bold text-gray-800">{sub.name}</div>
                                     <div className="text-xs text-gray-500">{sub.email}</div>
                                   </td>
                                   <td className="py-3 text-sm text-gray-600">
                                     {new Date(sub.subscriptionDate!).toLocaleDateString('pt-BR')}
                                   </td>
                                   <td className="py-3 text-center">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                       sub.subscriptionStatus === 'pago' ? 'bg-green-100 text-green-700' :
                                       sub.subscriptionStatus === 'pendente' ? 'bg-orange-100 text-orange-700' :
                                       'bg-red-100 text-red-700'
                                     }`}>
                                       {sub.subscriptionStatus === 'pago' ? 'Ativo' : 
                                        sub.subscriptionStatus === 'pendente' ? 'Pendente' : 'Cancelado'}
                                     </span>
                                   </td>
                                   <td className="py-3 text-right pr-2 text-sm text-gray-600">
                                     R$ 19,90
                                   </td>
                                </tr>
                             ))}
                           </tbody>
                         </table>
                         {recentSubscribers.length === 0 && <p className="text-center text-gray-500 py-4">Nenhuma assinatura nas últimas 48 horas.</p>}
                       </div>
                    </div>
                    </>
                )}
                
                {activeTab === 'clients' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="font-display text-3xl font-bold text-prospera-purple flex items-center">
                                <UsersIcon className="w-8 h-8 mr-2 text-prospera-purple" />
                                Gestão de Clientes
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Buscar por nome ou email..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-prospera-purple text-sm"
                                    />
                                    <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                </div>
                                <select 
                                    value={filter} 
                                    onChange={(e) => setFilter(e.target.value as ClientFilter)} 
                                    className="border rounded-full px-4 py-2 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-prospera-purple cursor-pointer"
                                >
                                    <option value="all">Todos os Status</option>
                                    <option value="pago">Ativos (Pago)</option>
                                    <option value="pendente">Pendentes</option>
                                    <option value="cancelado">Cancelados</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-bold rounded-l-lg w-16 text-center">#</th>
                                        <th className="p-4 font-bold cursor-pointer hover:bg-gray-100" onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
                                            Nome {sortOrder === 'asc' ? '↑' : '↓'}
                                        </th>
                                        <th className="p-4 font-bold">Email / WhatsApp</th>
                                        <th className="p-4 font-bold text-center">Assinatura</th>
                                        <th className="p-4 font-bold text-center rounded-r-lg">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm">
                                    {paginatedClients.map((client, index) => (
                                        <tr key={client.email} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                                            <td className="p-4 text-center font-bold text-gray-400">
                                                {(clientsPage - 1) * clientsPerPage + index + 1}
                                            </td>
                                            <td className="p-4 font-bold">{client.name}</td>
                                            <td className="p-4">
                                                <div>{client.email}</div>
                                                <div className="text-xs text-gray-500 mt-1">{client.whatsapp || '-'}</div>
                                            </td>
                                            <td className="p-4 text-center">
                                                {renderStatusCell(client)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <button onClick={() => handleOpenEditModal(client)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-full transition-colors" title="Editar">
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleRequestDeleteClient(client)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-full transition-colors" title="Excluir">
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedClients.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                                                Nenhum cliente encontrado com os filtros atuais.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls 
                            currentPage={clientsPage} 
                            totalPages={totalClientsPages} 
                            onPageChange={setClientsPage} 
                            itemsPerPage={clientsPerPage} 
                            onItemsPerPageChange={setClientsPerPage}
                            totalItems={allFilteredClients.length}
                        />
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="font-display text-3xl font-bold text-prospera-purple flex items-center">
                                <BookOpenIcon className="w-8 h-8 mr-2" />
                                Gerenciar Histórias
                            </h2>
                            <div className="flex items-center space-x-4">
                                <select 
                                    value={activeStoryCategory} 
                                    onChange={(e) => setActiveStoryCategory(e.target.value as StoryCategory)}
                                    className="border rounded-full px-4 py-2 bg-white text-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-prospera-pink cursor-pointer"
                                >
                                    <option value="gestante">Em gestação</option>
                                    <option value="0-3">Curioso (0-3 anos)</option>
                                    <option value="4-7">Explorador (4-7 anos)</option>
                                    <option value="8-12">Aventureiro (8-12 anos)</option>
                                </select>
                                <button onClick={() => handleOpenStoryModal()} className="bg-prospera-green text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 shadow-md">
                                    + Nova História
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {paginatedStories.map(story => (
                                <div key={story.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-grow cursor-pointer" onClick={() => handleToggleStory(story.id)}>
                                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                                {story.title}
                                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedStoryId === story.id ? 'rotate-180' : ''}`} />
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{story.content}</p>
                                        </div>
                                        <div className="flex space-x-2 flex-shrink-0 ml-4">
                                            {story.audioUrl && (
                                                <button 
                                                    onClick={() => toggleAudio(story.id, story.audioUrl!)}
                                                    className="text-prospera-purple hover:text-prospera-pink p-1 hover:bg-purple-50 rounded transition-colors"
                                                    title={playingAudioId === story.id ? "Pausar" : "Ouvir"}
                                                >
                                                    {playingAudioId === story.id ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                                                </button>
                                            )}
                                            <button onClick={() => handleOpenStoryModal(story)} className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded" title="Editar">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleRequestDeleteStory(story)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" title="Excluir">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Expanded Content */}
                                    {expandedStoryId === story.id && (
                                        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1 space-y-4">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-400 uppercase">Texto Completo</span>
                                                        <p className="text-gray-700 whitespace-pre-wrap mt-1">{story.content}</p>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-64 space-y-4 flex-shrink-0">
                                                     {/* Audio Section */}
                                                     <div className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1"><MusicNoteIcon className="w-3 h-3"/> Áudio</span>
                                                            <button onClick={() => handleUploadClick(story.id)} className="text-xs text-prospera-blue font-bold hover:underline flex items-center gap-1">
                                                                <UploadIcon className="w-3 h-3" /> Upload
                                                            </button>
                                                        </div>
                                                        {story.audioUrl ? (
                                                            <button 
                                                                onClick={() => toggleAudio(story.id, story.audioUrl!)}
                                                                className="w-full bg-prospera-purple text-white py-2 rounded-md text-sm font-bold flex items-center justify-center hover:bg-opacity-90"
                                                            >
                                                                {playingAudioId === story.id ? <><PauseIcon className="w-4 h-4 mr-2"/> Pausar</> : <><PlayIcon className="w-4 h-4 mr-2"/> Ouvir</>}
                                                            </button>
                                                        ) : (
                                                            <div className="text-center py-2 text-sm text-gray-400 border border-dashed border-gray-300 rounded-md">Sem áudio</div>
                                                        )}
                                                     </div>

                                                     {/* Image Section */}
                                                     <div className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">Capa</span>
                                                            <button onClick={() => handleImageUploadClick(story.id)} className="text-xs text-prospera-blue font-bold hover:underline flex items-center gap-1">
                                                                <UploadIcon className="w-3 h-3" /> Upload
                                                            </button>
                                                        </div>
                                                        {story.imageUrl ? (
                                                            <img src={story.imageUrl} alt="Capa" className="w-full h-32 object-cover rounded-md" />
                                                        ) : (
                                                            <div className="text-center py-8 text-sm text-gray-400 border border-dashed border-gray-300 rounded-md">Sem imagem</div>
                                                        )}
                                                     </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {paginatedStories.length === 0 && <p className="text-center text-gray-500 py-8 italic">Nenhuma história encontrada nesta categoria.</p>}
                        </div>
                        <PaginationControls 
                            currentPage={storiesPage} 
                            totalPages={totalStoriesPages} 
                            onPageChange={setStoriesPage} 
                            itemsPerPage={storiesPerPage} 
                            onItemsPerPageChange={setStoriesPerPage}
                            totalItems={sortedStories.length}
                        />
                    </div>
                )}
                
                {activeTab === 'extras' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="font-display text-3xl font-bold text-prospera-purple flex items-center">
                                <GiftIcon className="w-8 h-8 mr-2" />
                                Conteúdo Extra
                            </h2>
                            <button onClick={() => handleOpenExtrasModal()} className="bg-prospera-orange text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 shadow-md">
                                + Novo Conteúdo
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {paginatedExtras.map(extra => (
                                <div key={extra.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white flex flex-col sm:flex-row gap-4">
                                     <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        {extra.imageUrl ? <img src={extra.imageUrl} alt={extra.title} className="w-full h-full object-cover" /> : <GiftIcon className="w-8 h-8 text-gray-300" />}
                                     </div>
                                     <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] uppercase font-bold text-white bg-gray-500 px-2 py-0.5 rounded-md">{extra.type}</span>
                                                    <span className="text-[10px] uppercase font-bold text-prospera-purple bg-prospera-purple/10 px-2 py-0.5 rounded-md">{extra.category === 'gestante' ? 'Em gestação' : extra.category}</span>
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-800">{extra.title}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{extra.description}</p>
                                            </div>
                                            <div className="flex space-x-2 flex-shrink-0">
                                                <button onClick={() => handleOpenExtrasModal(extra)} className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded" title="Editar">
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleRequestDeleteExtra(extra)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" title="Excluir">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-xs text-gray-400">
                                            Recurso: <a href={extra.resourceUrl} className="text-blue-500 hover:underline truncate inline-block max-w-xs align-bottom" target="_blank" rel="noreferrer">{extra.resourceUrl || 'Não definido'}</a>
                                        </div>
                                     </div>
                                </div>
                            ))}
                            {paginatedExtras.length === 0 && <p className="text-center text-gray-500 py-8 italic">Nenhum conteúdo extra cadastrado.</p>}
                        </div>
                        <PaginationControls 
                            currentPage={extrasPage} 
                            totalPages={totalExtrasPages} 
                            onPageChange={setExtrasPage} 
                            itemsPerPage={extrasPerPage} 
                            onItemsPerPageChange={setExtrasPerPage}
                            totalItems={sortedExtras.length}
                        />
                    </div>
                )}

                {activeTab === 'blog' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="font-display text-3xl font-bold text-prospera-purple flex items-center">
                                <NewspaperIcon className="w-8 h-8 mr-2" />
                                Gerenciar Blog
                            </h2>
                            <button onClick={() => handleOpenBlogPostModal()} className="bg-prospera-pink text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105 shadow-md">
                                + Novo Artigo
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {paginatedBlogPosts.map(post => (
                                <div key={post.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-grow cursor-pointer" onClick={() => handleToggleBlogPost(post.id)}>
                                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                                {post.title}
                                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${expandedBlogPostId === post.id ? 'rotate-180' : ''}`} />
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1">{new Date(post.createdAt).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                        <div className="flex space-x-2 flex-shrink-0 ml-4">
                                            <button onClick={() => handleOpenBlogPostModal(post)} className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded" title="Editar">
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleRequestDeleteBlogPost(post)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded" title="Excluir">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {expandedBlogPostId === post.id && (
                                         <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <div className="relative group">
                                                    <img src={post.imageUrl1} alt="Imagem 1" className="w-full h-40 object-cover rounded-lg" />
                                                    <button onClick={() => handleBlogUploadClick(post.id, 1)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity rounded-lg">
                                                        Alterar Imagem 1
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-wrap">{post.text1}</p>
                                            </div>
                                            <div className="space-y-2">
                                                 <div className="relative group">
                                                    <img src={post.imageUrl2} alt="Imagem 2" className="w-full h-40 object-cover rounded-lg" />
                                                    <button onClick={() => handleBlogUploadClick(post.id, 2)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity rounded-lg">
                                                        Alterar Imagem 2
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-wrap">{post.text2}</p>
                                            </div>
                                         </div>
                                    )}
                                </div>
                            ))}
                            {paginatedBlogPosts.length === 0 && <p className="text-center text-gray-500 py-8 italic">Nenhum artigo publicado.</p>}
                        </div>
                        <PaginationControls 
                            currentPage={blogPage} 
                            totalPages={totalBlogPages} 
                            onPageChange={setBlogPage} 
                            itemsPerPage={blogPerPage} 
                            onItemsPerPageChange={setBlogPerPage}
                            totalItems={sortedBlogPosts.length}
                        />
                    </div>
                )}
                
                {activeTab === 'whatsapp' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <h2 className="font-display text-3xl font-bold text-prospera-purple flex items-center mb-6">
                            <WhatsAppIcon className="w-8 h-8 mr-2 text-green-500" />
                            Enviar Novidades
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Mensagem</label>
                                    <textarea
                                        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 h-48"
                                        placeholder="Digite a novidade aqui..."
                                        value={whatsappMessage}
                                        onChange={(e) => setWhatsappMessage(e.target.value)}
                                    ></textarea>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            {newsSubscribers.length} destinatários selecionados
                                        </span>
                                        <button 
                                            onClick={handleSendWhatsappNews}
                                            disabled={newsSubscribers.length === 0 || !whatsappMessage.trim()}
                                            className="bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            <span className="mr-2">Enviar Agora</span>
                                            <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent"></div>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-4 italic">
                                    Nota: O envio em massa real requer integração com a API Business do WhatsApp. Esta é uma simulação administrativa.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-700 mb-4">Lista de Transmissão ({newsSubscribers.length})</h3>
                                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden max-h-[400px] overflow-y-auto">
                                    {newsSubscribers.length > 0 ? (
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-100 text-gray-600 text-xs uppercase sticky top-0">
                                                <tr>
                                                    <th className="p-3 font-bold">Nome</th>
                                                    <th className="p-3 font-bold">WhatsApp</th>
                                                    <th className="p-3 font-bold text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {newsSubscribers.map(sub => (
                                                    <tr key={sub.email} className="border-b border-gray-100 hover:bg-white">
                                                        <td className="p-3 font-medium text-gray-800">{sub.name}</td>
                                                        <td className="p-3 text-gray-600">{sub.whatsapp}</td>
                                                        <td className="p-3 text-center">
                                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
                                                                Inscrito
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="p-8 text-center text-gray-500">
                                            Nenhum usuário optou por receber novidades.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'leads' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <h2 className="font-display text-3xl font-bold text-prospera-purple flex items-center">
                                <SeedlingIcon className="w-8 h-8 mr-2 text-prospera-green" />
                                Leads Capturados
                            </h2>
                            <span className="bg-prospera-green/10 text-prospera-green font-bold py-1 px-3 rounded-full text-sm">
                                Total: {sortedLeads.length}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                        <th className="p-4 font-bold rounded-l-lg">Nome</th>
                                        <th className="p-4 font-bold">E-mail</th>
                                        <th className="p-4 font-bold">WhatsApp</th>
                                        <th className="p-4 font-bold text-right rounded-r-lg">Data</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 text-sm">
                                    {sortedLeads.length > 0 ? (
                                        sortedLeads.map((lead, index) => (
                                            <tr key={`${lead.email}-${index}`} className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                                                <td className="p-4 font-bold">{lead.name}</td>
                                                <td className="p-4 text-gray-600">{lead.email}</td>
                                                <td className="p-4 text-gray-600">{lead.whatsapp}</td>
                                                <td className="p-4 text-right text-gray-500">
                                                    {new Date(lead.date).toLocaleDateString('pt-BR')} <span className="text-xs">{new Date(lead.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                                                Nenhum lead capturado ainda.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                {activeTab === 'account' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto">
                        <h2 className="font-display text-3xl font-bold text-prospera-purple mb-8 flex items-center">
                            <UserCircleIcon className="w-8 h-8 mr-2" />
                            Minha Conta
                        </h2>
                        <form onSubmit={handlePasswordChangeSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-1">Senha Atual</label>
                                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-1">Nova Senha</label>
                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-600 mb-1">Confirmar Nova Senha</label>
                                <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple" required />
                            </div>
                            {passwordError && <p className="text-red-500 text-sm font-bold text-center">{passwordError}</p>}
                            {passwordSuccess && <p className="text-green-600 text-sm font-bold text-center">{passwordSuccess}</p>}
                            <button type="submit" className="w-full bg-prospera-purple text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-colors shadow-md">
                                Alterar Senha
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </main>
      </div>

      {/* Modals */}
      {isEditModalOpen && editingClient && (
        <EditClientModal client={editingClient} onClose={() => setIsEditModalOpen(false)} onSave={handleClientUpdate} />
      )}
      
      {showStatusConfirmModal && statusChangeTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
              <h3 className="font-display text-2xl font-bold text-prospera-purple mb-4">Confirmar Alteração</h3>
              <p className="text-gray-600 mb-8">
                  Deseja alterar o status de <strong>{statusChangeTarget.name}</strong> para <strong className="uppercase">{statusChangeTarget.newStatus}</strong>?
              </p>
              <div className="flex justify-center space-x-4">
                  <button onClick={() => setShowStatusConfirmModal(false)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors">Cancelar</button>
                  <button onClick={confirmStatusChange} className="bg-prospera-green text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors">Confirmar</button>
              </div>
          </div>
        </div>
      )}
      
      {clientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
                <h3 className="font-display text-2xl font-bold text-red-600 mb-4">Excluir Cliente?</h3>
                <p className="text-gray-600 mb-8">
                    Tem certeza que deseja excluir <strong>{clientToDelete.name}</strong>? Esta ação não pode ser desfeita.
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setClientToDelete(null)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300">Cancelar</button>
                    <button onClick={handleConfirmDeleteClient} className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600">Excluir</button>
                </div>
            </div>
        </div>
      )}
      
      {isStoryModalOpen && (
          <StoryEditorModal 
            story={editingStory} 
            onClose={() => setIsStoryModalOpen(false)} 
            onSave={handleSaveStory}
            initialCategory={activeStoryCategory}
          />
      )}

      {storyToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
                <h3 className="font-display text-2xl font-bold text-red-600 mb-4">Excluir História?</h3>
                <p className="text-gray-600 mb-8">
                    Tem certeza que deseja excluir "<strong>{storyToDelete.title}</strong>"?
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setStoryToDelete(null)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300">Cancelar</button>
                    <button onClick={handleConfirmDeleteStory} className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600">Excluir</button>
                </div>
            </div>
        </div>
      )}
      
      {isBlogPostModalOpen && (
          <BlogPostEditorModal
            post={editingBlogPost}
            onClose={() => setIsBlogPostModalOpen(false)}
            onSave={handleSaveBlogPost}
          />
      )}
      
      {blogPostToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
                <h3 className="font-display text-2xl font-bold text-red-600 mb-4">Excluir Artigo?</h3>
                <p className="text-gray-600 mb-8">
                    Tem certeza que deseja excluir "<strong>{blogPostToDelete.title}</strong>"?
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setBlogPostToDelete(null)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300">Cancelar</button>
                    <button onClick={handleConfirmDeleteBlogPost} className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600">Excluir</button>
                </div>
            </div>
        </div>
      )}
      
      {isExtrasModalOpen && (
          <ExtraContentEditorModal
              extra={editingExtra}
              onClose={() => setIsExtrasModalOpen(false)}
              onSave={handleSaveExtra}
          />
      )}
      
      {extraToDelete && (
           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
                <h3 className="font-display text-2xl font-bold text-red-600 mb-4">Excluir Conteúdo?</h3>
                <p className="text-gray-600 mb-8">
                    Tem certeza que deseja excluir "<strong>{extraToDelete.title}</strong>"?
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setExtraToDelete(null)} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300">Cancelar</button>
                    <button onClick={handleConfirmDeleteExtra} className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600">Excluir</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
