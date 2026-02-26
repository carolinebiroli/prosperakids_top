
import React, { useState, useEffect, useRef } from 'react';
import { User, Story, StoryCategory, ExtraContent, ExtraContentType, BlogPost } from '../App';
import { CreditCardIcon, WhatsAppIcon, CheckCircleIcon, ClockIcon, HomeIcon, BookOpenIcon, GiftIcon, HeartIcon, UserCircleIcon, MenuIcon, XIcon, SparklesIcon, ArrowLeftIcon, PlayIcon, PauseIcon, DownloadIcon, MusicNoteIcon, NewspaperIcon, SeedlingIcon, BrainIcon, SearchIcon, LockIcon, MoonIcon, SunIcon, TextSizeIcon, PencilIcon, CheckIcon } from './icons/Icons';
import MercadoPagoModal from './PagBankModal';

interface ClientDashboardProps {
  user: User;
  stories: Story[];
  extras: ExtraContent[];
  blogPosts?: BlogPost[];
  onPaymentSuccess: () => void;
  onProfileUpdate: (data: Partial<User>) => void;
  onCancelSubscription: () => void;
  onPasswordUpdate: (email: string, newPassword: string) => void;
  onToggleFavorite: (storyId: string) => void;
}

const getCategoryLabel = (cat: string) => {
  switch(cat) {
      case 'gestante': return 'Em Gestação';
      case '0-3': return 'Curioso';
      case '4-7': return 'Explorador';
      case '8-12': return 'Aventureiro';
      default: return cat;
  }
};

interface StoryOverviewCardProps {
  story: Story;
  isLiked: boolean;
  onToggleFavorite: (id: string) => void;
  onRead: (story: Story) => void;
}

const StoryOverviewCard: React.FC<StoryOverviewCardProps> = ({ story, isLiked, onToggleFavorite, onRead }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-row h-36 transform hover:-translate-y-1 relative group w-full cursor-pointer" onClick={() => onRead(story)}>
      <div className="w-36 h-full bg-gray-100 relative flex-shrink-0">
           {story.imageUrl ? <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><BookOpenIcon className="w-8 h-8" /></div>}
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between min-w-0">
          <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-prospera-purple uppercase tracking-wider bg-prospera-purple/5 px-2 py-1 rounded-md truncate mr-2">{story.category}</span>
              <button 
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(story.id); }}
                  className="flex items-center space-x-1 group/heart flex-shrink-0"
              >
                  <HeartIcon className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'text-prospera-pink fill-prospera-pink scale-110' : 'text-gray-300 group-hover/heart:text-prospera-pink'}`} />
                  <span className="text-xs text-gray-400 font-bold">{story.likes}</span>
              </button>
          </div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight line-clamp-2 hover:text-prospera-purple transition-colors">{story.title}</h3>
          <div className="flex items-center text-xs text-gray-400 gap-2">
              <ClockIcon className="w-3 h-3" /> 5 min de leitura
          </div>
          <div className="mt-1">
               <span className="text-xs font-bold text-prospera-green hover:underline flex items-center gap-1">Ler história <ArrowLeftIcon className="w-3 h-3 rotate-180 text-prospera-green" /></span>
          </div>
      </div>
  </div>
);

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user, stories, extras, blogPosts = [], onPaymentSuccess, onProfileUpdate, onCancelSubscription, onPasswordUpdate, onToggleFavorite }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  
  // Navigation State
  type ClientTab = 'overview' | 'stories' | 'extras' | 'blog' | 'favorites' | 'profile';
  const [activeTab, setActiveTab] = useState<ClientTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Stories Filter & Reading State
  const [storyFilter, setStoryFilter] = useState<string>('all');
  const [extrasFilter, setExtrasFilter] = useState<string>('all'); // Filtro para Conteúdo Extra (Categoria)
  const [extrasTypeFilter, setExtrasTypeFilter] = useState<string>('all'); // Filtro para Tipo de Conteúdo
  const [extrasSearchTerm, setExtrasSearchTerm] = useState<string>(''); // Busca textual
  
  // Blog Filters
  const [blogSearchTerm, setBlogSearchTerm] = useState<string>('');
  const [blogThemeFilter, setBlogThemeFilter] = useState<string>('all');

  // Edit Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
      name: user.name,
      whatsapp: user.whatsapp || '',
      receiveNews: user.receiveNews !== false, // Default true if undefined
      categories: user.categories || []
  });

  const [readingStory, setReadingStory] = useState<Story | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Reading Accessibility State
  const [readingConfig, setReadingConfig] = useState({
      fontSize: 18,
      isSerif: false,
      isDark: false
  });

  const updateReadingConfig = (key: keyof typeof readingConfig, value: any) => {
      setReadingConfig(prev => ({...prev, [key]: value}));
  };

  const { name, email, subscriptionStatus, whatsapp } = user;

  // Dynamic Greeting Logic
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  const blogThemes = [
    "Formação de Caráter Infantil",
    "Espiritualidade Leve no Lar",
    "Educação Emocional e Comportamental",
    "Maternidade Consciente e Intencional",
    "Rotina, Disciplina e Organização no Lar",
    "Educação Financeira Infantil",
    "Histórias e Reflexões para Crianças",
    "Desenvolvimento por Fase (Gestação aos 12 anos)",
    "Família, Vínculo e Ambiente do Lar",
    "Mentalidade Próspera desde a Infância",
    "Hábitos que Formam Crianças Fortes",
    "Comunicação Consciente entre Pais e Filhos"
  ];

  useEffect(() => {
    if (subscriptionStatus === 'cancelado' || subscriptionStatus === 'pendente') {
      setIsCancelling(false);
    }
  }, [subscriptionStatus]);
  
  useEffect(() => {
    if (user.subscriptionStatus === 'pago' && isPaymentModalOpen) {
        setIsPaymentModalOpen(false);
    }
  }, [user.subscriptionStatus, isPaymentModalOpen]);
  
  // Sync edit form data with user prop
  useEffect(() => {
    if (!isEditingProfile) {
        setEditFormData({
            name: user.name,
            whatsapp: user.whatsapp || '',
            receiveNews: user.receiveNews !== false,
            categories: user.categories || []
        });
    }
  }, [user, isEditingProfile]);

  // Cleanup audio on unmount or tab change
  useEffect(() => {
    return () => {
        audioPlayerRef.current?.pause();
    };
  }, [activeTab, readingStory]);

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };
  
  const confirmCancellation = () => {
    setIsCancelling(true);
    setShowConfirmModal(false);
    setTimeout(() => {
      onCancelSubscription();
    }, 1500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileUpdate({
        name: editFormData.name,
        whatsapp: editFormData.whatsapp,
        receiveNews: editFormData.receiveNews,
        categories: editFormData.categories
    });
    setIsEditingProfile(false);
  };
  
  const handleEditCategoryToggle = (cat: StoryCategory) => {
      setEditFormData(prev => ({
          ...prev,
          categories: prev.categories.includes(cat) 
            ? prev.categories.filter(c => c !== cat) 
            : [...prev.categories, cat]
      }));
  };
  
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!isResetMode && currentPassword !== user.password) {
      setPasswordError('A senha atual está incorreta.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('As novas senhas não coincidem.');
      return;
    }
    
    onPasswordUpdate(user.email, newPassword);
    
    setPasswordSuccess('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => {
      setShowPasswordForm(false);
      setPasswordSuccess(null);
      setIsResetMode(false);
    }, 3000);
  };
  
  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    setIsResetMode(false);
    setPasswordError(null);
    setPasswordSuccess(null);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

  const handleForgotCurrentPassword = () => {
    setPasswordError(null);
    setPasswordSuccess(`Enviando link de recuperação para ${user.email}...`);
    setTimeout(() => {
        setIsResetMode(true);
        setPasswordSuccess('Link confirmado. Por favor, defina sua nova senha.');
    }, 1500);
  };

  const toggleAudio = (id: string, url: string) => {
    if (playingAudioId === id) {
        audioPlayerRef.current?.pause();
        setPlayingAudioId(null);
    } else {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
        }
        audioPlayerRef.current = new Audio(url);
        audioPlayerRef.current.onended = () => setPlayingAudioId(null);
        audioPlayerRef.current.play().catch(e => console.error("Error playing audio:", e));
        setPlayingAudioId(id);
    }
  };
  
  const isLiked = (storyId: string) => {
      return user.favorites?.includes(storyId) || false;
  };

  const handleCategoryClick = (cat: string) => {
      setStoryFilter(cat);
      setActiveTab('stories');
  };

  const handleReadStory = (story: Story) => {
      setActiveTab('stories');
      setReadingStory(story);
  };

  const renderSubscriptionContent = () => {
    switch (subscriptionStatus) {
      case 'pendente':
        return (
          <div className="text-center flex-grow flex flex-col justify-center items-center py-8">
            <div className="bg-prospera-orange/10 rounded-full p-4 mb-4">
              <ClockIcon className="w-12 h-12 text-prospera-orange" />
            </div>
            <p className="text-xl font-bold text-prospera-orange mb-2">Pagamento Pendente</p>
            <p className="text-gray-600 mb-6">Finalize sua assinatura para ter acesso imediato às histórias.</p>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-[#009EE3] text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-[#008acf] transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <span>Assinar com Mercado Pago</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">Você será redirecionado para um ambiente seguro.</p>
          </div>
        );
      case 'pago':
        return (
          <div className="text-center flex-grow flex flex-col justify-center items-center py-8">
            <div className="bg-prospera-green/10 rounded-full p-4 mb-4">
              <CheckCircleIcon className="w-12 h-12 text-prospera-green" />
            </div>
            <p className="text-xl font-bold text-prospera-green mb-2">Assinatura Ativa</p>
            <p className="text-gray-600 mb-6">Você tem acesso total à plataforma.</p>
            <div className="w-full bg-gray-100 text-gray-500 font-bold py-3 px-6 rounded-full text-lg flex items-center justify-center space-x-2 cursor-default">
              <CheckCircleIcon className="w-6 h-6" />
              <span>Acesso Liberado</span>
            </div>
          </div>
        );
      case 'cancelado':
        return (
            <div className="text-center flex-grow flex flex-col justify-center items-center py-8">
              <div className="bg-red-500/10 rounded-full p-4 mb-4">
                <ClockIcon className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-xl font-bold text-red-500 mb-2">Assinatura Cancelada</p>
              <p className="text-gray-600 mb-6">Sua assinatura foi cancelada. Você pode reativá-la a qualquer momento.</p>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-prospera-green text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Reativar Assinatura
              </button>
          </div>
        );
      default:
        return null;
    }
  }

  const TABS = [
    { id: 'overview', label: 'Início', icon: <HomeIcon /> },
    { id: 'stories', label: 'Histórias', icon: <BookOpenIcon /> },
    { id: 'extras', label: 'Conteúdo Extra', icon: <GiftIcon /> },
    { id: 'blog', label: 'Blog', icon: <NewspaperIcon /> },
    { id: 'favorites', label: 'Favoritos', icon: <HeartIcon /> },
    { id: 'profile', label: 'Meu Perfil', icon: <UserCircleIcon /> },
  ];

  const categoryOptions = [
      { value: 'all', label: 'Todas as Fases' },
      { value: 'gestante', label: 'Em gestação' },
      { value: '0-3', label: 'Curioso (0-3 anos)' },
      { value: '4-7', label: 'Explorador (4-7 anos)' },
      { value: '8-12', label: 'Aventureiro (8-12 anos)' }
  ];

  const typeOptions = [
      { value: 'all', label: 'Todos os Tipos' },
      { value: 'atividade', label: 'Atividades' },
      { value: 'audio', label: 'Áudios' },
      { value: 'ebook', label: 'Ebooks' },
  ];
  
  const categorySelection = [
    { id: 'gestante', label: 'Em gestação' },
    { id: '0-3', label: 'Curioso (0-3 anos)' },
    { id: '4-7', label: 'Explorador (4-7 anos)' },
    { id: '8-12', label: 'Aventureiro (8-12 anos)' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-prospera-purple">
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
        {TABS.map(tab => {
          const isLocked = subscriptionStatus !== 'pago' && (tab.id === 'stories' || tab.id === 'extras' || tab.id === 'favorites');
          
          return (
            <button 
                key={tab.id} 
                onClick={() => { 
                    if (isLocked) return;
                    setActiveTab(tab.id as ClientTab); 
                    setIsSidebarOpen(false); 
                    setReadingStory(null);
                }} 
                disabled={isLocked}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLocked ? <LockIcon className="w-5 h-5 text-white/70" /> : React.cloneElement(tab.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                <span className="font-bold">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  // Logic for displaying overview stories
  const getDisplayStories = () => {
    let relevantStories = stories;
    if (user.categories && user.categories.length > 0) {
        relevantStories = stories.filter(s => user.categories?.includes(s.category));
        if (relevantStories.length === 0) relevantStories = stories;
    }
    
    // Recent: Sort by Date Descending
    const recent = [...relevantStories]
        .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);
    
    // Liked: Sort by Likes Count Descending
    const liked = [...relevantStories]
        .sort((a,b) => b.likes - a.likes)
        .slice(0, 4);
        
    return { recent, liked };
  };

  const { recent, liked } = getDisplayStories();
  const featuredStory = recent.length > 0 ? recent[0] : null;

  // Logic for the Stories Tab Filter
  const filteredStoriesTab = stories.filter(s => storyFilter === 'all' ? true : s.category === storyFilter);
  
  // Logic for Extras Tab Filter
  const filteredExtras = extras.filter(e => {
    const matchesCategory = extrasFilter === 'all' ? true : e.category === extrasFilter;
    const matchesType = extrasTypeFilter === 'all' ? true : e.type === extrasTypeFilter;
    const matchesSearch = extrasSearchTerm === '' ? true : 
        (e.title.toLowerCase().includes(extrasSearchTerm.toLowerCase()) || 
         e.description.toLowerCase().includes(extrasSearchTerm.toLowerCase()));
    
    return matchesCategory && matchesType && matchesSearch;
  });

  // Logic for Blog Tab Filter
  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = blogSearchTerm === '' ? true :
        (post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
         post.text1.toLowerCase().includes(blogSearchTerm.toLowerCase()));
    
    const matchesTheme = blogThemeFilter === 'all' ? true : post.theme === blogThemeFilter;

    return matchesSearch && matchesTheme;
  });
  
  const getExtraTypeIcon = (type: ExtraContentType) => {
      switch(type) {
          case 'audio': return <MusicNoteIcon className="w-4 h-4 text-white" />;
          case 'ebook': return <BookOpenIcon className="w-4 h-4 text-white" />;
          case 'atividade': return <SparklesIcon className="w-4 h-4 text-white" />;
      }
  };
  
  const getExtraTypeLabel = (type: ExtraContentType) => {
      switch(type) {
          case 'audio': return 'Áudio';
          case 'ebook': return 'Ebook';
          case 'atividade': return 'Atividade';
      }
  };

  const getExtraTypeColor = (type: ExtraContentType) => {
      switch(type) {
          case 'audio': return 'bg-prospera-blue';
          case 'ebook': return 'bg-prospera-purple';
          case 'atividade': return 'bg-prospera-orange';
      }
  };

  return (
    <div className="flex flex-grow min-h-screen bg-gray-50">
      {isPaymentModalOpen && (
        <MercadoPagoModal 
          user={user}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={onPaymentSuccess}
        />
      )}

      {/* Sidebar Mobile */}
      <aside className={`fixed inset-y-0 left-0 bg-prospera-purple w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50 md:hidden`}>
        <SidebarContent />
      </aside>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 bg-prospera-purple flex-shrink-0">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-100">
            <button onClick={() => setIsSidebarOpen(true)} className="text-prospera-purple p-2 bg-gray-50 rounded-xl"><MenuIcon className="w-6 h-6" /></button>
            <span className="font-bold text-lg text-prospera-purple font-display">{TABS.find(t => t.id === activeTab)?.label}</span>
        </header>

        <main className="p-6 md:p-12 flex-grow overflow-y-auto">
          {activeTab === 'overview' && (
             <div className="animate-fade-in max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                        {greeting}, {name.split(' ')[0]}! ☀️
                        </h1>
                        <p className="text-lg text-gray-600">Que tal uma história para conectar com seu pequeno hoje?</p>
                    </div>
                </div>

                {/* Subscription Status Block */}
                {subscriptionStatus !== 'pago' && (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 mb-10">
                        <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">Status da Assinatura</h2>
                        {renderSubscriptionContent()}
                    </div>
                )}

                {subscriptionStatus === 'pago' && (
                    <>
                        {/* Quick Categories Access */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <button onClick={() => handleCategoryClick('gestante')} className="flex items-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-prospera-pink group">
                                <div className="bg-prospera-pink/10 p-1.5 rounded-full"><HeartIcon className="w-4 h-4 text-prospera-pink" /></div>
                                <span className="font-bold text-gray-700 group-hover:text-prospera-pink">Em gestação</span>
                            </button>
                            <button onClick={() => handleCategoryClick('0-3')} className="flex items-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-prospera-green group">
                                <div className="bg-prospera-green/10 p-1.5 rounded-full"><SeedlingIcon className="w-4 h-4 text-prospera-green" /></div>
                                <span className="font-bold text-gray-700 group-hover:text-prospera-green">Curioso <span className="hidden sm:inline">(0-3 anos)</span></span>
                            </button>
                            <button onClick={() => handleCategoryClick('4-7')} className="flex items-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-prospera-orange group">
                                <div className="bg-prospera-orange/10 p-1.5 rounded-full"><SparklesIcon className="w-4 h-4 text-prospera-orange" /></div>
                                <span className="font-bold text-gray-700 group-hover:text-prospera-orange">Explorador <span className="hidden sm:inline">(4-7 anos)</span></span>
                            </button>
                            <button onClick={() => handleCategoryClick('8-12')} className="flex items-center space-x-2 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-prospera-blue group">
                                <div className="bg-prospera-blue/10 p-1.5 rounded-full"><BrainIcon className="w-4 h-4 text-prospera-blue" /></div>
                                <span className="font-bold text-gray-700 group-hover:text-prospera-blue">Aventureiro <span className="hidden sm:inline">(8-12 anos)</span></span>
                            </button>
                        </div>

                        {/* Featured Hero Story */}
                        {featuredStory && (
                            <div 
                                onClick={() => { setActiveTab('stories'); setReadingStory(featuredStory); }}
                                className="bg-prospera-purple rounded-2xl shadow-lg overflow-hidden mb-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-row h-48 md:h-52 group relative"
                            >
                                {/* Left Side: Image */}
                                <div className="w-1/3 md:w-56 h-full relative flex-shrink-0 bg-prospera-purple/50">
                                     {featuredStory.imageUrl ? (
                                        <img 
                                            src={featuredStory.imageUrl} 
                                            alt={featuredStory.title} 
                                            className="w-full h-full object-cover absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                         <div className="w-full h-full flex items-center justify-center text-white/30">
                                            <BookOpenIcon className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Right Side: Content */}
                                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                                    <div className="flex items-start justify-between mb-2">
                                         <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-white/10">
                                            Destaque do Dia
                                        </span>
                                    </div>

                                    <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-2 line-clamp-1 leading-tight">
                                        {featuredStory.title}
                                    </h2>
                                    <p className="text-white/80 text-sm mb-4 line-clamp-2 leading-relaxed">
                                        {featuredStory.content}
                                    </p>

                                    <div className="mt-auto">
                                        <button className="bg-white text-prospera-purple font-bold py-2 px-4 rounded-full shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-xs">
                                            <BookOpenIcon className="w-3 h-3" /> Ler agora
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content Area */}
                            <div className="lg:col-span-2 space-y-10">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-display text-2xl font-bold text-prospera-purple flex items-center gap-2">
                                            <SparklesIcon className="w-6 h-6 text-prospera-orange" />
                                            Últimos Lançamentos
                                        </h2>
                                        <button onClick={() => setActiveTab('stories')} className="text-sm font-bold text-gray-400 hover:text-prospera-purple transition-colors">Ver todos</button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        {recent.map(story => (
                                            <StoryOverviewCard 
                                                key={story.id} 
                                                story={story} 
                                                isLiked={isLiked(story.id)}
                                                onToggleFavorite={onToggleFavorite}
                                                onRead={handleReadStory}
                                            />
                                        ))}
                                        {recent.length === 0 && <p className="text-gray-500 italic">Nenhuma história recente.</p>}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="font-display text-2xl font-bold text-prospera-purple mb-6 flex items-center gap-2">
                                        <HeartIcon className="w-6 h-6 text-prospera-pink" />
                                        Histórias mais curtidas
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        {liked.map(story => (
                                            <StoryOverviewCard 
                                                key={story.id} 
                                                story={story} 
                                                isLiked={isLiked(story.id)}
                                                onToggleFavorite={onToggleFavorite}
                                                onRead={handleReadStory}
                                            />
                                        ))}
                                        {liked.length === 0 && <p className="text-gray-500 italic">Nenhuma história disponível no momento.</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Extras Area */}
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-prospera-pink to-prospera-orange rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="font-display text-2xl font-bold mb-3">Conteúdo Extra</h3>
                                        <p className="opacity-90 mb-6 text-sm leading-relaxed">Atividades exclusivas, desenhos para colorir e guias para pais.</p>
                                        <button onClick={() => setActiveTab('extras')} className="w-full bg-white text-prospera-orange font-bold py-3 px-6 rounded-xl shadow-md hover:bg-gray-50 transition-all text-sm">
                                            Explorar Materiais
                                        </button>
                                    </div>
                                    <GiftIcon className="absolute -bottom-6 -right-6 w-40 h-40 text-white opacity-20 rotate-12" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
             </div>
          )}

          {/* Stories Tab */}
          {activeTab === 'stories' && (
              subscriptionStatus !== 'pago' ? (
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 mb-10 max-w-4xl mx-auto">
                    <h2 className="font-display text-2xl font-bold text-gray-800 mb-6 text-center">Conteúdo Exclusivo</h2>
                    {renderSubscriptionContent()}
                </div>
              ) : (
                <div className="animate-fade-in max-w-5xl mx-auto h-full">
                  {readingStory ? (
                      <div className={`rounded-[2rem] shadow-sm border p-8 md:p-12 transition-colors duration-300 ${readingConfig.isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                              <button onClick={() => setReadingStory(null)} className={`flex items-center font-bold transition-colors ${readingConfig.isDark ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-prospera-purple'}`}>
                                  <ArrowLeftIcon className="w-5 h-5 mr-2 text-current" /> Voltar para lista
                              </button>
                              
                              {/* Reading Toolbar */}
                              <div className={`flex flex-wrap items-center gap-2 p-2 rounded-full self-end md:self-auto ${readingConfig.isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
                                  {/* Font Size Controls */}
                                  <button 
                                    onClick={() => updateReadingConfig('fontSize', Math.max(14, readingConfig.fontSize - 2))}
                                    className="p-2 rounded-full hover:bg-black/10 transition-colors"
                                    title="Diminuir Fonte"
                                  >
                                    <span className="font-bold text-sm">A-</span>
                                  </button>
                                  <TextSizeIcon className={`w-5 h-5 ${readingConfig.isDark ? 'text-gray-300' : 'text-gray-500'}`} />
                                  <button 
                                    onClick={() => updateReadingConfig('fontSize', Math.min(32, readingConfig.fontSize + 2))}
                                    className="p-2 rounded-full hover:bg-black/10 transition-colors"
                                    title="Aumentar Fonte"
                                  >
                                    <span className="font-bold text-lg">A+</span>
                                  </button>
                                  
                                  <div className={`w-px h-6 mx-1 ${readingConfig.isDark ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

                                  {/* Font Family Toggle */}
                                  <button 
                                    onClick={() => updateReadingConfig('isSerif', !readingConfig.isSerif)}
                                    className="px-3 py-1 rounded-full hover:bg-black/10 transition-colors font-bold text-sm"
                                    title="Alternar Tipo de Fonte"
                                  >
                                    {readingConfig.isSerif ? 'Serif' : 'Sans'}
                                  </button>

                                  <div className={`w-px h-6 mx-1 ${readingConfig.isDark ? 'bg-slate-600' : 'bg-gray-300'}`}></div>

                                  {/* Theme Toggle */}
                                  <button 
                                    onClick={() => updateReadingConfig('isDark', !readingConfig.isDark)}
                                    className="p-2 rounded-full hover:bg-black/10 transition-colors"
                                    title={readingConfig.isDark ? "Modo Claro" : "Modo Escuro"}
                                  >
                                    {readingConfig.isDark ? <SunIcon className="w-5 h-5 text-yellow-300" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
                                  </button>
                              </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row gap-8">
                              {readingStory.imageUrl && (
                                  <div className="w-full md:w-1/3 flex-shrink-0">
                                      <img src={readingStory.imageUrl} alt={readingStory.title} className="w-full rounded-2xl shadow-lg object-cover" />
                                  </div>
                              )}
                              <div className="flex-1">
                                  <div className="flex justify-between items-start mb-4">
                                      <span className="inline-block px-3 py-1 rounded-full bg-prospera-purple/10 text-prospera-purple text-xs font-bold uppercase tracking-wider">
                                          {getCategoryLabel(readingStory.category)}
                                      </span>
                                      <button 
                                        onClick={() => onToggleFavorite(readingStory.id)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${isLiked(readingStory.id) ? 'border-prospera-pink text-prospera-pink bg-prospera-pink/5' : `border-gray-200 hover:border-prospera-pink hover:text-prospera-pink ${readingConfig.isDark ? 'text-gray-400 border-slate-600' : 'text-gray-500'}`}`}
                                      >
                                          <HeartIcon className={`w-6 h-6 ${isLiked(readingStory.id) ? 'fill-current' : ''}`} />
                                          <span className="font-bold">{isLiked(readingStory.id) ? 'Curtido' : 'Curtir'} ({readingStory.likes})</span>
                                      </button>
                                  </div>

                                  {/* Audio Bar added here */}
                                  {readingStory.audioUrl && (
                                    <div className={`mb-6 p-3 rounded-xl border ${readingConfig.isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <MusicNoteIcon className={`w-4 h-4 ${readingConfig.isDark ? 'text-prospera-pink' : 'text-prospera-purple'}`} />
                                            <span className={`text-xs font-bold uppercase tracking-widest ${readingConfig.isDark ? 'text-gray-300' : 'text-gray-500'}`}>Narração da História</span>
                                        </div>
                                        <audio 
                                            controls 
                                            className="w-full h-8 outline-none"
                                            src={readingStory.audioUrl}
                                            controlsList="nodownload"
                                        >
                                            Seu navegador não suporta o elemento de áudio.
                                        </audio>
                                    </div>
                                  )}

                                  <h1 className={`font-display text-3xl md:text-4xl font-bold mb-6 ${readingConfig.isDark ? 'text-white' : 'text-gray-800'}`}>{readingStory.title}</h1>
                                  <div 
                                    className={`prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed ${readingConfig.isDark ? 'text-gray-200' : 'text-gray-700'}`}
                                    style={{ 
                                        fontSize: `${readingConfig.fontSize}px`,
                                        fontFamily: readingConfig.isSerif ? 'Georgia, serif' : 'Nunito, sans-serif'
                                    }}
                                  >
                                      {readingStory.content}
                                  </div>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <>
                        <div className="flex flex-col mb-8 gap-4">
                             <h1 className="font-display text-3xl font-bold text-prospera-purple">
                                Histórias
                             </h1>
                             
                             <div className="w-full md:w-64">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Filtrar por Categoria</label>
                                <select 
                                    value={storyFilter} 
                                    onChange={(e) => setStoryFilter(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-prospera-purple cursor-pointer shadow-sm"
                                >
                                    {categoryOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredStoriesTab.map(story => (
                                <div key={story.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-row h-56 md:h-64">
                                    {/* Left Side: Image */}
                                    <div className="w-1/3 md:w-48 h-full relative flex-shrink-0 bg-gray-100 cursor-pointer" onClick={() => setReadingStory(story)}>
                                        {story.imageUrl ? (
                                            <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover absolute inset-0" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <BookOpenIcon className="w-10 h-10" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Right Side: Content */}
                                    <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold text-prospera-purple uppercase tracking-wider bg-prospera-purple/5 px-2 py-1 rounded-md">
                                                    {getCategoryLabel(story.category)}
                                                </span>
                                                <button 
                                                    onClick={() => onToggleFavorite(story.id)}
                                                    className="flex items-center space-x-1 group/heart"
                                                >
                                                    <HeartIcon className={`w-5 h-5 transition-all duration-300 ${isLiked(story.id) ? 'text-prospera-pink fill-prospera-pink scale-110' : 'text-gray-300 group-hover/heart:text-prospera-pink'}`} />
                                                    <span className="text-xs text-gray-400 font-bold">{story.likes}</span>
                                                </button>
                                            </div>
                                            <h3 onClick={() => setReadingStory(story)} className="font-display text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-2 line-clamp-2 cursor-pointer hover:text-prospera-purple">
                                                {story.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                                {story.content}
                                            </p>
                                        </div>
                                        
                                        <button 
                                            onClick={() => setReadingStory(story)}
                                            className="self-start mt-3 text-sm font-bold text-white bg-prospera-green py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-sm"
                                        >
                                            Ler agora
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {filteredStoriesTab.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
                                <p className="text-gray-500 text-lg">Nenhuma história encontrada para esta categoria.</p>
                            </div>
                        )}
                      </>
                  )
              </div>
              )
          )}
          
          {/* Extras Tab */}
          {activeTab === 'extras' && (
              subscriptionStatus !== 'pago' ? (
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 mb-10 max-w-4xl mx-auto">
                    <h2 className="font-display text-2xl font-bold text-gray-800 mb-6 text-center">Conteúdo Exclusivo</h2>
                    {renderSubscriptionContent()}
                </div>
              ) : (
                <div className="animate-fade-in max-w-5xl mx-auto h-full">
                    <div className="flex flex-col mb-8 gap-4">
                        <div>
                            <h1 className="font-display text-3xl font-bold text-prospera-purple">
                            Conteúdo Extra
                            </h1>
                            <p className="text-gray-600 mt-2">Materiais exclusivos para download e atividades em família.</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 w-full md:items-end">
                            {/* Search Bar - Fixed alignment by adding matching label */}
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Pesquisar</label>
                                <div className="relative">
                                    <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <input 
                                        type="text" 
                                        placeholder="Pesquisar materiais..." 
                                        value={extrasSearchTerm} 
                                        onChange={(e) => setExtrasSearchTerm(e.target.value)} 
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-prospera-purple shadow-sm" 
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="w-full md:w-56">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Categoria</label>
                                <select 
                                    value={extrasFilter} 
                                    onChange={(e) => setExtrasFilter(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-prospera-purple cursor-pointer shadow-sm"
                                >
                                    {categoryOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Type Filter */}
                            <div className="w-full md:w-48">
                                <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Tipo</label>
                                <select 
                                    value={extrasTypeFilter} 
                                    onChange={(e) => setExtrasTypeFilter(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-prospera-purple cursor-pointer shadow-sm"
                                >
                                    {typeOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredExtras.map(extra => (
                            <div key={extra.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-row h-56 md:h-64 group">
                                {/* Left Side: Image */}
                                <div className="w-1/3 md:w-48 h-full relative flex-shrink-0 bg-gray-100">
                                    {extra.imageUrl ? (
                                        <img src={extra.imageUrl} alt={extra.title} className="w-full h-full object-cover absolute inset-0" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <GiftIcon className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Right Side: Content */}
                                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-wider px-2 py-1 rounded-md ${getExtraTypeColor(extra.type)}`}>
                                                {getExtraTypeIcon(extra.type)}
                                                {getExtraTypeLabel(extra.type)}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-2 line-clamp-2">
                                            {extra.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                            {extra.description}
                                        </p>
                                    </div>
                                    
                                    <button 
                                        onClick={() => extra.type === 'audio' ? toggleAudio(extra.id, extra.resourceUrl) : alert('Download iniciado! (Simulação)')}
                                        className={`self-start mt-3 text-sm font-bold text-white py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-sm flex items-center gap-2 ${extra.type === 'audio' ? 'bg-prospera-purple' : 'bg-prospera-green'}`}
                                    >
                                        {extra.type === 'audio' ? (
                                            playingAudioId === extra.id ? <><PauseIcon className="w-4 h-4" /> Pausar</> : <><PlayIcon className="w-4 h-4" /> Ouvir Agora</>
                                        ) : (
                                            <><DownloadIcon className="w-4 h-4" /> Baixar Material</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {filteredExtras.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
                            <p className="text-gray-500 text-lg">Nenhum conteúdo extra encontrado com estes filtros.</p>
                        </div>
                    )}
                </div>
              )
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
              <div className="animate-fade-in max-w-5xl mx-auto h-full">
                  <div className="flex flex-col mb-8 gap-4">
                      <div>
                          <h1 className="font-display text-3xl font-bold text-prospera-purple">
                          Blog
                          </h1>
                          <p className="text-gray-600 mt-2">Dicas, reflexões e histórias para ajudar você.</p>
                      </div>

                      {/* Blog Filter & Search */}
                      <div className="flex flex-col md:flex-row gap-4 w-full md:items-end">
                          {/* Search Bar */}
                          <div className="flex-1 relative">
                              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <input 
                                  type="text" 
                                  placeholder="Pesquisar artigos..." 
                                  value={blogSearchTerm} 
                                  onChange={(e) => setBlogSearchTerm(e.target.value)} 
                                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-prospera-pink shadow-sm" 
                              />
                          </div>

                          {/* Theme Filter */}
                          <div className="w-full md:w-72">
                              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">Filtrar por Tema</label>
                              <select 
                                  value={blogThemeFilter} 
                                  onChange={(e) => setBlogThemeFilter(e.target.value)}
                                  className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-prospera-pink cursor-pointer shadow-sm truncate"
                              >
                                  <option value="all">Todos os Temas</option>
                                  {blogThemes.map((theme, index) => (
                                      <option key={index} value={theme}>{theme}</option>
                                  ))}
                              </select>
                          </div>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredBlogPosts.map(post => (
                          <div key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-row h-56 md:h-64">
                              {/* Left Side: Image */}
                              <div className="w-1/3 md:w-48 h-full relative flex-shrink-0 bg-gray-100">
                                  {post.imageUrl1 ? (
                                      <img src={post.imageUrl1} alt={post.title} className="w-full h-full object-cover absolute inset-0" />
                                  ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                                          <NewspaperIcon className="w-10 h-10" />
                                      </div>
                                  )}
                              </div>
                              
                              {/* Right Side: Content */}
                              <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                                  <div>
                                      <div className="flex justify-between items-start mb-2">
                                          {post.theme ? (
                                              <span className="text-[10px] font-bold text-prospera-pink uppercase tracking-wider bg-prospera-pink/10 px-2 py-1 rounded-md line-clamp-1" title={post.theme}>
                                                  {post.theme}
                                              </span>
                                          ) : (
                                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
                                                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                                              </span>
                                          )}
                                      </div>
                                      <h3 className="font-display text-xl md:text-2xl font-bold text-gray-800 leading-tight mb-2 line-clamp-2">
                                          {post.title}
                                      </h3>
                                      <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                          {post.text1}
                                      </p>
                                  </div>
                                  
                                  <a 
                                      href={`?page=blogPost&id=${post.id}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="self-start mt-3 text-sm font-bold text-white bg-prospera-pink py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-sm inline-flex items-center"
                                  >
                                      Ler mais
                                  </a>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  {filteredBlogPosts.length === 0 && (
                      <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
                          <p className="text-gray-500 text-lg">Nenhum artigo encontrado com estes filtros.</p>
                      </div>
                  )}
              </div>
          )}

          {activeTab === 'profile' && (
             <div className="animate-fade-in max-w-2xl mx-auto">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12">
                  <div className="flex justify-between items-center mb-8">
                      <h2 className="font-display text-3xl font-bold text-gray-800 flex items-center gap-3">
                          <UserCircleIcon className="w-8 h-8 text-prospera-purple" />
                          Meu Perfil
                      </h2>
                      {!isEditingProfile && (
                          <button 
                            onClick={() => setIsEditingProfile(true)}
                            className="bg-prospera-purple/10 text-prospera-purple hover:bg-prospera-purple hover:text-white transition-colors p-2 rounded-lg flex items-center gap-2 px-4"
                          >
                             <PencilIcon className="w-4 h-4" />
                             <span className="font-bold text-sm">Editar Dados</span>
                          </button>
                      )}
                  </div>
                  
                  {isEditingProfile ? (
                    <form onSubmit={handleProfileSubmit} className="space-y-6 animate-fade-in">
                        <div>
                           <label className="block text-sm font-bold text-gray-600 mb-1">Nome Completo</label>
                           <input 
                              type="text" 
                              value={editFormData.name} 
                              onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} 
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple bg-white" 
                              required
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-600 mb-1">WhatsApp</label>
                           <input 
                                type="tel" 
                                value={editFormData.whatsapp} 
                                onChange={(e) => setEditFormData({...editFormData, whatsapp: e.target.value})} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple bg-white" 
                                placeholder="DDD + Número"
                           />
                           <div className="mt-3 flex items-center">
                               <label className="flex items-center space-x-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={editFormData.receiveNews}
                                            onChange={(e) => setEditFormData({...editFormData, receiveNews: e.target.checked})}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${editFormData.receiveNews ? 'bg-prospera-green border-prospera-green' : 'bg-white border-gray-300 group-hover:border-prospera-green'}`}>
                                            {editFormData.receiveNews && (
                                                <CheckIcon className="w-3 h-3 text-white" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium">Quero receber novidades via WhatsApp</span>
                                </label>
                           </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-3">Fases de Interesse</label>
                            <div className="space-y-2">
                                {categorySelection.map(cat => (
                                    <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={editFormData.categories.includes(cat.id as StoryCategory)}
                                                onChange={() => handleEditCategoryToggle(cat.id as StoryCategory)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${editFormData.categories.includes(cat.id as StoryCategory) ? 'bg-prospera-purple border-prospera-purple' : 'bg-white border-gray-300 group-hover:border-prospera-purple'}`}>
                                                {editFormData.categories.includes(cat.id as StoryCategory) && (
                                                    <CheckIcon className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                        </div>
                                        <span className={`text-sm font-medium ${editFormData.categories.includes(cat.id as StoryCategory) ? 'text-prospera-purple font-bold' : 'text-gray-600'}`}>
                                            {cat.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="opacity-70">
                           <label className="block text-sm font-bold text-gray-500 mb-1">E-mail (Não editável)</label>
                           <input type="email" value={email} disabled className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" />
                           <p className="text-xs text-gray-400 mt-2 italic">Para alterar seu e-mail, por favor entre em contato com o suporte.</p>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                             <button 
                                type="button" 
                                onClick={() => setIsEditingProfile(false)}
                                className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                             >
                                 Cancelar
                             </button>
                             <button 
                                type="submit" 
                                className="flex-1 bg-prospera-green text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm"
                             >
                                 Salvar Alterações
                             </button>
                        </div>
                    </form>
                  ) : (
                    <div className="space-y-6 text-gray-700 animate-fade-in">
                        {/* Card de Perfil Personalizado */}
                        <div className="bg-gradient-to-r from-prospera-purple to-indigo-900 rounded-3xl p-6 mb-8 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                        <UserCircleIcon className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold">{user.name}</h3>
                                        <p className="text-white/70 text-sm">{user.email}</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div>
                                        <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Status da Conta</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${user.subscriptionStatus === 'pago' ? 'bg-prospera-green' : 'bg-prospera-orange'}`}></span>
                                            <span className="font-bold text-sm uppercase">
                                                {user.subscriptionStatus === 'pago' ? 'Ativa' : user.subscriptionStatus === 'pendente' ? 'Pendente' : 'Cancelada'}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Tipo de Plano</p>
                                        <p className="font-bold text-sm uppercase">Plano Mensal</p>
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-1">Membro desde</p>
                                        <p className="font-bold text-sm uppercase">
                                            {user.subscriptionDate ? new Date(user.subscriptionDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <SparklesIcon className="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-10 rotate-12" />
                        </div>

                        <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nome Completo</p>
                        <p className="font-bold text-lg">{name}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail</p>
                        <p className="font-bold text-lg">{email}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp</p>
                            <p className="font-bold text-lg">{whatsapp || <span className="text-red-400 text-sm font-normal italic">Não informado</span>}</p>
                            {whatsapp && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${user.receiveNews !== false ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    <span className="text-xs text-gray-500">{user.receiveNews !== false ? 'Recebendo novidades' : 'Não recebe novidades'}</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 p-4 rounded-2xl">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Fases Selecionadas</p>
                            <div className="flex flex-wrap gap-2">
                                {user.categories && user.categories.length > 0 ? (
                                    user.categories.map(cat => (
                                        <span key={cat} className="bg-white border border-gray-200 text-prospera-purple text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            {categorySelection.find(c => c.id === cat)?.label || cat}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-gray-500 italic">Nenhuma fase selecionada</span>
                                )}
                            </div>
                        </div>
                    </div>
                  )}
                    
                  {!isEditingProfile && (
                    <div className="pt-8 mt-6 border-t border-gray-100">
                      <button onClick={togglePasswordForm} className="text-prospera-pink font-bold hover:underline mb-4 block">
                        {showPasswordForm ? 'Cancelar Alteração de Senha' : 'Alterar Senha'}
                      </button>

                      {showPasswordForm && (
                        <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 animate-fade-in bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          {!isResetMode && (
                            <div>
                              <label className="block text-sm font-bold text-gray-600 mb-1">Senha Atual</label>
                              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-pink bg-white" required />
                              <button 
                                type="button" 
                                onClick={handleForgotCurrentPassword}
                                className="text-xs text-gray-500 hover:text-prospera-purple hover:underline mt-2 block"
                              >
                                Esqueci a senha atual
                              </button>
                            </div>
                          )}
                          
                          {isResetMode && (
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-700 font-medium">
                               Modo de recuperação ativado. Redefina sua senha abaixo.
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Nova Senha</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-pink bg-white" required />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-600 mb-1">Confirmar Nova Senha</label>
                            <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-pink bg-white" required />
                          </div>
                          {passwordError && <p className="text-red-500 text-sm font-bold text-center">{passwordError}</p>}
                          {passwordSuccess && <p className="text-green-600 text-sm font-bold text-center">{passwordSuccess}</p>}
                          <button type="submit" className="w-full bg-prospera-purple text-white font-bold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-colors shadow-sm">
                            Salvar Nova Senha
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {!isEditingProfile && subscriptionStatus === 'pago' && (
                      <div className="pt-4">
                        <button onClick={handleCancelClick} disabled={isCancelling} className="text-red-500 text-sm font-bold hover:underline disabled:opacity-50 disabled:cursor-wait">
                          {isCancelling ? 'Cancelando...' : 'Cancelar Assinatura'}
                        </button>
                      </div>
                  )}
                </div>
             </div>
          )}

          {/* Favorites Implementation */}
          {activeTab === 'favorites' && (
             <div className="animate-fade-in max-w-6xl mx-auto h-full">
                <div className="flex flex-col mb-8 gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-prospera-purple">
                           Meus Favoritos
                        </h1>
                        <p className="text-gray-600 mt-2">Suas histórias preferidas em um só lugar.</p>
                    </div>
                </div>

                {subscriptionStatus !== 'pago' ? (
                     <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 mb-10 max-w-4xl mx-auto">
                        <h2 className="font-display text-2xl font-bold text-gray-800 mb-6 text-center">Conteúdo Exclusivo</h2>
                        {renderSubscriptionContent()}
                    </div>
                ) : (
                    <>
                        {stories.some(story => user.favorites?.includes(story.id)) ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {stories
                                    .filter(story => user.favorites?.includes(story.id))
                                    .map(story => (
                                    <StoryOverviewCard 
                                        key={story.id} 
                                        story={story} 
                                        isLiked={true}
                                        onToggleFavorite={onToggleFavorite}
                                        onRead={handleReadStory}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
                                <div className="bg-gray-50 rounded-full p-6 inline-block mb-4">
                                     <HeartIcon className="w-12 h-12 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-500 mb-2">Nenhum favorito ainda</h3>
                                <p className="text-gray-400">Marque o coração nas histórias que você mais gosta para vê-las aqui.</p>
                                <button onClick={() => setActiveTab('stories')} className="mt-6 text-prospera-purple font-bold hover:underline">
                                    Explorar Histórias
                                </button>
                            </div>
                        )}
                    </>
                )}
             </div>
          )}

        </main>
      </div>
      
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center mx-4">
              <h3 className="font-display text-2xl font-bold text-prospera-purple mb-4">Confirmar Cancelamento</h3>
              <p className="text-gray-600 mb-8">
                  Tem certeza de que deseja cancelar sua assinatura? Você perderá o acesso ao conteúdo no final do seu ciclo de faturamento.
              </p>
              <div className="flex justify-center space-x-4">
                  <button 
                      onClick={() => setShowConfirmModal(false)}
                      disabled={isCancelling}
                      className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50"
                  >
                      Voltar
                  </button>
                  <button 
                      onClick={confirmCancellation}
                      disabled={isCancelling}
                      className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-colors duration-300 disabled:opacity-50"
                  >
                      Sim, cancelar
                  </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
