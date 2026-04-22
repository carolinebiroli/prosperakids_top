
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MembersArea from './components/MembersArea';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import LandingPage from './components/LandingPage';

export type Page = 'home' | 'members' | 'about' | 'contact' | 'terms' | 'privacy' | 'blog' | 'blogPost' | 'landing';

export type User = {
  name: string;
  email: string;
  role: 'client' | 'admin';
  subscriptionStatus: 'pago' | 'pendente' | 'cancelado';
  whatsapp?: string;
  password?: string;
  subscriptionDate?: string;
  categories?: StoryCategory[];
  favorites?: string[];
  receiveNews?: boolean;
};

export type Lead = {
  name: string;
  email: string;
  whatsapp: string;
  date: string;
};

export type StoryCategory = 'gestante' | '0-3' | '4-7' | '8-12';

export type Story = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  audioUrl?: string;
  imageUrl?: string;
  category: StoryCategory;
  likes: number;
};

export type BlogPost = {
  id: string;
  title: string;
  imageUrl1: string;
  text1: string;
  imageUrl2: string;
  text2: string;
  createdAt: string;
  theme?: string;
};

export type ExtraContentType = 'atividade' | 'audio' | 'ebook';

export type ExtraContent = {
    id: string;
    title: string;
    description: string;
    type: ExtraContentType;
    category: StoryCategory | 'all';
    imageUrl: string;
    resourceUrl: string;
    createdAt: string;
};


const initialUsers: User[] = [
  {
    email: 'admin@email.com',
    password: '123456',
    name: 'Carol Prospera',
    role: 'admin',
    subscriptionStatus: 'pago',
  },
  { name: 'Ana Silva', email: 'cliente@email.com', password: '123456', role: 'client', subscriptionStatus: 'pago', whatsapp: '11999999999', subscriptionDate: new Date().toISOString(), favorites: [], categories: ['0-3'], receiveNews: true },
  { name: 'Bruno Costa', email: 'bruno@email.com', role: 'client', subscriptionStatus: 'pago', whatsapp: '11987654321', subscriptionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), favorites: [], categories: ['4-7'] },
  { name: 'Carla Dias', email: 'carla@email.com', role: 'client', subscriptionStatus: 'pago', whatsapp: '21912345678', subscriptionDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), favorites: [] },
  { name: 'Daniel Souza', email: 'daniel@email.com', role: 'client', subscriptionStatus: 'pendente', whatsapp: '', favorites: [] },
  { name: 'Eduarda Lima', email: 'eduarda@email.com', role: 'client', subscriptionStatus: 'pago', whatsapp: '31999998888', subscriptionDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), favorites: [] },
  { name: 'Fernando Alves', email: 'fernando@email.com', role: 'client', subscriptionStatus: 'pago', whatsapp: '41988776655', subscriptionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), favorites: [] },
  { name: 'Gabriela Ramos', email: 'gabriela@email.com', role: 'client', subscriptionStatus: 'pendente', whatsapp: '', favorites: [] },
  { name: 'Heitor Martins', email: 'heitor@email.com', role: 'client', subscriptionStatus: 'pago', whatsapp: '51977665544', subscriptionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), favorites: [] },
  { name: 'Isabela Rocha', email: 'isabela@email.com', role: 'client', subscriptionStatus: 'cancelado', whatsapp: '61988887777', subscriptionDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), favorites: [] }
];

const initialStories: Story[] = [
    {
        id: '1',
        title: 'O Coelho Corajoso e a Estrela Cadente',
        content: 'Era uma vez um coelhinho chamado Pipo que tinha muito medo do escuro. Toda noite, ele se escondia debaixo das cobertas. Uma noite, sua mãe coelha mostrou-lhe uma estrela cadente pela janela e disse: "As estrelas brilham mais forte na escuridão, Pipo. Elas não têm medo." Pipo percebeu que a escuridão era apenas um palco para as luzes mais bonitas brilharem. Daquele dia em diante, ele aprendeu a admirar o céu noturno, encontrando coragem na beleza das estrelas.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        audioUrl: '',
        imageUrl: '',
        category: '4-7',
        likes: 124
    },
    {
        id: '2',
        title: 'A Formiguinha Generosa',
        content: 'Nina, a formiguinha, encontrou a maior folha que já tinha visto. Era o suficiente para alimentá-la por uma semana! No caminho para casa, encontrou uma família de joaninhas com fome. Sem hesitar, Nina dividiu sua grande folha com eles. Mais tarde, uma chuva forte começou, e a família de joaninhas abrigou Nina sob um cogumelo, mantendo-a seca e segura. Nina aprendeu que a generosidade sempre volta para nós de maneiras inesperadas.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        audioUrl: '',
        imageUrl: '',
        category: '0-3',
        likes: 89
    },
    {
        id: '3',
        title: 'Canção de Ninar para o Bebê na Barriga',
        content: 'Feche os olhos, mamãe. Respire fundo. Coloque a mão na barriga. Sinta o calor. Converse baixinho: "Oi, meu amor. Aqui fora o sol brilha, os pássaros cantam e o papai e a mamãe te esperam com todo o amor do mundo."',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        audioUrl: '',
        imageUrl: '',
        category: 'gestante',
        likes: 256
    }
];

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'A Importância de Ler para Crianças na Primeira Infância',
    imageUrl1: 'https://images.unsplash.com/photo-1519340241574-2cec6a12a163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    text1: 'Ler para as crianças desde cedo é um dos maiores presentes que podemos oferecer. Não se trata apenas de ensinar palavras, mas de construir pontes de afeto e abrir janelas para mundos de imaginação. Quando um pai ou uma mãe senta com seu filho e abre um livro, eles estão criando um ritual de conexão, um momento sagrado longe das telas e da correria do dia a dia. Esse ato de amor fortalece os laços familiares e cria memórias que durarão para sempre. As histórias ajudam as crianças a entenderem o mundo ao seu redor, a nomear emoções e a desenvolver empatia ao se colocarem no lugar dos personagens.',
    imageUrl2: 'https://images.unsplash.com/photo-1503919545889-a906acb6a5b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    text2: 'Além do desenvolvimento emocional, a leitura na primeira infância é crucial para o desenvolvimento cognitivo. A exposição a um vocabulário rico e a diferentes estruturas de frases acelera a aquisição da linguagem e prepara o terreno para a alfabetização. Crianças que ouvem histórias regularmente tendem a ter melhor desempenho escolar, maior capacidade de concentração e um pensamento crítico mais apurado. Portanto, cada história contada é uma semente de conhecimento e criatividade plantada em solo fértil, que florescerá em um futuro de infinitas possibilidades.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    theme: 'Educação Emocional e Comportamental'
  }
];

const initialExtras: ExtraContent[] = [
    {
        id: '1',
        title: 'Livro de Colorir: A Turma do Pipo',
        description: 'Um caderno com 10 desenhos exclusivos dos personagens para imprimir e colorir.',
        type: 'atividade',
        category: '0-3',
        imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
        resourceUrl: '#',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Guia: Lidando com a Birra',
        description: 'Um ebook prático para pais com estratégias de disciplina positiva.',
        type: 'ebook',
        category: '0-3',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
        resourceUrl: '#',
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Sons da Natureza para Dormir',
        description: 'Áudio relaxante de chuva e floresta para ajudar no sono do bebê.',
        type: 'audio',
        category: 'gestante',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        resourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Link de exemplo
        createdAt: new Date().toISOString()
    },
    {
        id: '4',
        title: 'Caça ao Tesouro em Casa',
        description: 'Um kit completo para organizar uma caça ao tesouro divertida na sala de casa.',
        type: 'atividade',
        category: '4-7',
        imageUrl: 'https://images.unsplash.com/photo-1558053426-5b62a69622d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        resourceUrl: '#',
        createdAt: new Date().toISOString()
    },
     {
        id: '5',
        title: 'Podcast: O Desafio da Honestidade',
        description: 'Uma história em áudio sobre dizer a verdade, ideal para ouvir no carro.',
        type: 'audio',
        category: '8-12',
        imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac618?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        resourceUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        createdAt: new Date().toISOString()
    }
];


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as Page;
    const validPages: Page[] = ['home', 'members', 'about', 'contact', 'terms', 'privacy', 'blog', 'blogPost', 'landing'];
    return validPages.includes(pageParam) ? pageParam : 'home';
  });
  
  const [initialMemberAreaView, setInitialMemberAreaView] = useState<'login' | 'signup'>('login');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  
  const [currentBlogPostId, setCurrentBlogPostId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem('prospera-kids-users');
      return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    } catch (error) {
      console.error("Failed to parse users from localStorage", error);
      return initialUsers;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const savedLeads = localStorage.getItem('prospera-kids-leads');
      return savedLeads ? JSON.parse(savedLeads) : [];
    } catch (error) {
      console.error("Failed to parse leads from localStorage", error);
      return [];
    }
  });

  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const savedStories = localStorage.getItem('prospera-kids-stories');
      if (savedStories) {
          const parsedStories = JSON.parse(savedStories);
          return parsedStories.map((s: any) => ({
              ...s,
              category: s.category || '4-7',
              likes: s.likes || 0
          }));
      }
      return initialStories;
    } catch (error) {
      console.error("Failed to parse stories from localStorage", error);
      return initialStories;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const savedPosts = localStorage.getItem('prospera-kids-blogposts');
      return savedPosts ? JSON.parse(savedPosts) : initialBlogPosts;
    } catch (error) {
      console.error("Failed to parse blog posts from localStorage", error);
      return initialBlogPosts;
    }
  });

  const [extras, setExtras] = useState<ExtraContent[]>(() => {
    try {
        const savedExtras = localStorage.getItem('prospera-kids-extras');
        return savedExtras ? JSON.parse(savedExtras) : initialExtras;
    } catch (error) {
        console.error("Failed to parse extras from localStorage", error);
        return initialExtras;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('prospera-kids-users', JSON.stringify(users));
    } catch (error) {
      console.error("Failed to save users to localStorage", error);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('prospera-kids-leads', JSON.stringify(leads));
    } catch (error) {
      console.error("Failed to save leads to localStorage", error);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('prospera-kids-stories', JSON.stringify(stories));
    } catch (error) {
      console.error("Failed to save stories to localStorage", error);
    }
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem('prospera-kids-blogposts', JSON.stringify(blogPosts));
    } catch (error) {
      console.error("Failed to save blog posts to localStorage", error);
    }
  }, [blogPosts]);

  useEffect(() => {
    try {
        localStorage.setItem('prospera-kids-extras', JSON.stringify(extras));
    } catch (error) {
        console.error("Failed to save extras to localStorage", error);
    }
  }, [extras]);


  const navigateTo = (page: Page) => {
    if (page === 'members') {
      setInitialMemberAreaView('login');
    }
    if (page !== 'blogPost') {
        setCurrentBlogPostId(null);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
    
    if (page === 'home' || page === 'landing') {
        window.history.pushState({}, '', page === 'landing' ? '?page=landing' : '/');
    }
  };

  const navigateToPost = (postId: string) => {
    setCurrentBlogPostId(postId);
    setCurrentPage('blogPost');
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: User) => {
    setLoggedInUser(user);
    setCurrentPage('home'); 
  };

  const handleSignup = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    setLoggedInUser(newUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigateTo('members');
  };
  
  const navigateToSignup = () => {
    setInitialMemberAreaView('signup');
    setCurrentPage('members');
    window.scrollTo(0, 0);
  };

  const handleCancelSubscription = () => {
    if (loggedInUser) {
      const updatedUser = { ...loggedInUser, subscriptionStatus: 'cancelado' as const };
      setLoggedInUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.email === loggedInUser.email ? updatedUser : u));
    }
  };

  const handleProfileUpdate = (updatedData: Partial<User>) => {
    if (loggedInUser) {
      const updatedUser = { ...loggedInUser, ...updatedData };
      setLoggedInUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.email === loggedInUser.email ? updatedUser : u));
    }
  };

  const handlePaymentSuccess = () => {
    if (loggedInUser) {
      const updatedUser = { 
        ...loggedInUser, 
        subscriptionStatus: 'pago' as const,
        subscriptionDate: new Date().toISOString()
      };
      setLoggedInUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.email === loggedInUser.email ? updatedUser : u));
    }
  };

  const handlePasswordUpdate = (email: string, newPassword: string) => {
    const updateUserWithNewPassword = (user: User) => ({ ...user, password: newPassword });
    
    setUsers(prevUsers =>
      prevUsers.map(u => (u.email === email ? updateUserWithNewPassword(u) : u))
    );

    if (loggedInUser && loggedInUser.email === email) {
      setLoggedInUser(prevUser => updateUserWithNewPassword(prevUser!));
    }
  };

  const handleToggleFavorite = (storyId: string) => {
    if (!loggedInUser) return;

    const currentFavorites = loggedInUser.favorites || [];
    const isFavorited = currentFavorites.includes(storyId);
    let newFavorites;

    // Update User Favorites
    if (isFavorited) {
        newFavorites = currentFavorites.filter(id => id !== storyId);
    } else {
        newFavorites = [...currentFavorites, storyId];
    }

    const updatedUser = { ...loggedInUser, favorites: newFavorites };
    setLoggedInUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.email === loggedInUser.email ? updatedUser : u));

    // Update Story Likes Count
    setStories(prevStories => prevStories.map(story => {
        if (story.id === storyId) {
            return {
                ...story,
                likes: isFavorited ? Math.max(0, story.likes - 1) : story.likes + 1
            };
        }
        return story;
    }));
  };

  const handleSaveLead = (lead: Lead) => {
      setLeads(prev => [...prev, lead]);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        if (loggedInUser) {
          switch (loggedInUser.role) {
            case 'client':
              return <ClientDashboard 
                        user={loggedInUser} 
                        stories={stories} 
                        extras={extras}
                        blogPosts={blogPosts}
                        onPaymentSuccess={handlePaymentSuccess} 
                        onProfileUpdate={handleProfileUpdate}
                        onCancelSubscription={handleCancelSubscription} 
                        onPasswordUpdate={handlePasswordUpdate}
                        onToggleFavorite={handleToggleFavorite}
                     />;
            case 'admin':
              return <AdminDashboard 
                        user={loggedInUser} 
                        clients={users} onClientsUpdate={setUsers} 
                        stories={stories} onStoriesUpdate={setStories} 
                        blogPosts={blogPosts} onBlogPostsUpdate={setBlogPosts}
                        extras={extras} onExtrasUpdate={setExtras}
                        onPasswordUpdate={handlePasswordUpdate}
                        leads={leads}
                     />;
            default:
              handleLogout(); // Should not happen
              return null;
          }
        }
        return <HomePage onNavigateToMembers={navigateToSignup} />;
      case 'members':
        // If user is already logged in, redirect them to the home/dashboard
        if (loggedInUser) {
            return <HomePage onNavigateToMembers={navigateToSignup} />;
        }
        return <MembersArea onLogin={handleLogin} onSignup={handleSignup} users={users} initialView={initialMemberAreaView} onPasswordReset={handlePasswordUpdate} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'blog':
        return <BlogPage posts={blogPosts} onNavigateToPost={navigateToPost} />;
      case 'blogPost':
        const post = blogPosts.find(p => p.id === currentBlogPostId);
        if (post) {
          return <BlogPostPage post={post} onNavigateToMembers={navigateToSignup} />;
        }
        return <BlogPage posts={blogPosts} onNavigateToPost={navigateToPost} />;
      case 'landing':
        return <LandingPage onSaveLead={handleSaveLead} />;
      default:
        return <HomePage onNavigateToMembers={navigateToSignup} />;
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {currentPage !== 'landing' && (
        <Header onNavigate={navigateTo} loggedInUser={loggedInUser} onLogout={handleLogout} />
      )}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {currentPage !== 'landing' && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
