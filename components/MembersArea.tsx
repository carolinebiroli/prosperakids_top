
import React, { useState } from 'react';
import { User, StoryCategory } from '../App';

interface MembersAreaProps {
  onLogin: (user: User) => void;
  onSignup: (user: User) => void;
  users: User[];
  initialView?: 'login' | 'signup';
  onPasswordReset: (email: string, newPassword: string) => void;
}

type AuthView = 'login' | 'signup' | 'forgot' | 'reset';

const MembersArea: React.FC<MembersAreaProps> = ({ onLogin, onSignup, users, initialView = 'login', onPasswordReset }) => {
  const [view, setView] = useState<AuthView>(initialView);
  
  // Login/Signup Fields - Inicializar com dados da Ana apenas se a view inicial for login
  const [email, setEmail] = useState(initialView === 'login' ? 'cliente@email.com' : '');
  const [password, setPassword] = useState(initialView === 'login' ? '123456' : '');
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<StoryCategory[]>([]);
  
  // Password Reset Fields
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleCategory = (cat: StoryCategory) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAdminAccess = () => {
    const adminEmail = 'admin@email.com';
    const adminPass = '123456';
    
    setEmail(adminEmail);
    setPassword(adminPass);
    setError(null);
    setSuccessMessage(null);

    const adminUser = users.find(u => u.email === adminEmail);
    if (adminUser && adminUser.password === adminPass) {
        onLogin(adminUser);
    } else {
        setError('Configuração de admin inválida.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (view === 'login') {
      const user = users.find(u => u.email === email);
      if (user && user.password === password) {
        onLogin(user);
      } else {
        setError('E-mail ou senha inválidos.');
      }
    } else if (view === 'signup') {
      if (!name || !email || !password || !confirmPassword || !whatsapp) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
      if (selectedCategories.length === 0) {
        setError('Selecione ao menos uma fase para o seu pequeno.');
        return;
      }
      if (name.trim().split(' ').length < 2) {
        setError('Por favor, insira seu nome completo (nome e sobrenome).');
        return;
      }
       if (users.some(u => u.email === email)) {
        setError('Este e-mail já está cadastrado. Por favor, faça login.');
        return;
      }
      if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }

      // Basic WhatsApp validation
      const cleanedWhatsapp = whatsapp.replace(/\D/g, '');
      if (cleanedWhatsapp.length < 10 || cleanedWhatsapp.length > 11) {
          setError('Por favor, insira um número de WhatsApp válido (DDD + Número).');
          return;
      }

      const newUser: User = {
        name,
        email,
        password,
        role: 'client',
        subscriptionStatus: 'pendente',
        whatsapp: cleanedWhatsapp,
        categories: selectedCategories,
        favorites: []
      };

      onSignup(newUser);
    } else if (view === 'forgot') {
        const userExists = users.some(u => u.email === recoveryEmail);
        if (!userExists) {
            setError('E-mail não encontrado.');
            return;
        }
        setSuccessMessage(`Um link de recuperação foi enviado para ${recoveryEmail}.`);
        setTimeout(() => {
            setSuccessMessage(null);
            setView('reset');
        }, 2000);
    } else if (view === 'reset') {
        if (newPassword.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        
        onPasswordReset(recoveryEmail, newPassword);
        setSuccessMessage('Senha redefinida com sucesso! Redirecionando para o login...');
        
        setTimeout(() => {
            setEmail(recoveryEmail);
            setPassword('');
            setRecoveryEmail('');
            setNewPassword('');
            setConfirmNewPassword('');
            setView('login');
            setSuccessMessage(null);
        }, 2000);
    }
  };

  const switchView = (newView: AuthView) => {
    setView(newView);
    setError(null);
    setSuccessMessage(null);
    
    if (newView === 'signup') {
        // Limpar campos ao ir para cadastro
        setEmail('');
        setPassword('');
        setName('');
        setWhatsapp('');
        setConfirmPassword('');
        setSelectedCategories([]);
    } else if (newView === 'login') {
        // Restaurar dados da Ana para facilitar acesso
        setEmail('cliente@email.com');
        setPassword('123456');
    } else if (newView === 'forgot') {
        setRecoveryEmail(email || '');
    }
  };

  const getTitle = () => {
      switch(view) {
          case 'login': return 'Acessar sua Conta';
          case 'signup': return 'Crie sua Conta';
          case 'forgot': return 'Recuperar Senha';
          case 'reset': return 'Redefinir Senha';
      }
  };

  const categoriesUI = [
    { id: 'gestante', label: 'Em gestação' },
    { id: '0-3', label: 'Curioso (0-3 anos)' },
    { id: '4-7', label: 'Explorador (4-7 anos)' },
    { id: '8-12', label: 'Aventureiro (8-12 anos)' },
  ];

  return (
    <div className="bg-gray-50 py-12 md:py-20 flex-grow flex items-center animate-fade-in">
      <div className="container mx-auto px-6 flex justify-center">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-xl w-full border border-gray-100">
          <h2 className="font-display text-4xl font-bold text-center text-prospera-purple mb-8">
            {getTitle()}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {view === 'signup' && (
              <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-900 font-extrabold mb-2 ml-1">Nome Completo</label>
                    <input 
                    type="text" 
                    id="name"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                </div>
                
                <div>
                    <label htmlFor="whatsapp" className="block text-gray-900 font-extrabold mb-2 ml-1">WhatsApp</label>
                    <input 
                    type="tel" 
                    id="whatsapp"
                    placeholder="DDD + Número (ex: 11999999999)"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                </div>

                <div>
                    <label className="block text-gray-900 font-extrabold mb-4 ml-1">Fases do seu pequeno:</label>
                    <div className="space-y-3 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                        {categoriesUI.map(cat => (
                            <label
                                key={cat.id}
                                className="flex items-center space-x-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.id as StoryCategory)}
                                        onChange={() => toggleCategory(cat.id as StoryCategory)}
                                        className="sr-only"
                                    />
                                    <div className={`w-6 h-6 border-2 rounded-md transition-all flex items-center justify-center ${selectedCategories.includes(cat.id as StoryCategory) ? 'bg-prospera-purple border-prospera-purple' : 'bg-white border-gray-300 group-hover:border-prospera-purple'}`}>
                                        {selectedCategories.includes(cat.id as StoryCategory) && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className={`text-base font-bold transition-colors ${selectedCategories.includes(cat.id as StoryCategory) ? 'text-prospera-purple' : 'text-gray-700'}`}>
                                    {cat.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
              </div>
            )}
            
            {(view === 'login' || view === 'signup') && (
                <div className="space-y-4">
                    <div>
                    <label htmlFor="email" className="block text-gray-900 font-extrabold mb-2 ml-1">E-mail</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label htmlFor="password" className="block text-gray-900 font-extrabold">Senha</label>
                            {view === 'login' && (
                                <button type="button" onClick={() => switchView('forgot')} className="text-sm text-prospera-pink hover:underline font-bold">
                                    Esqueceu a senha?
                                </button>
                            )}
                        </div>
                        <input 
                            type="password" 
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            )}

            {view === 'signup' && (
               <div>
                <label htmlFor="confirmPassword" className="block text-gray-900 font-extrabold mb-2 ml-1">Confirmar Senha</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                />
              </div>
            )}

            {view === 'forgot' && (
                <div className="space-y-4">
                    <p className="text-gray-600 text-sm ml-1">Insira o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.</p>
                    <label htmlFor="recoveryEmail" className="block text-gray-900 font-extrabold mb-2 ml-1">E-mail Cadastrado</label>
                    <input 
                        type="email" 
                        id="recoveryEmail"
                        placeholder="seuemail@exemplo.com"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                    />
                </div>
            )}

            {view === 'reset' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-900 font-extrabold mb-2 ml-1">Nova Senha</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-900 font-extrabold mb-2 ml-1">Confirmar Nova Senha</label>
                        <input 
                            type="password" 
                            placeholder="********"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:outline-none focus:border-prospera-purple transition-colors bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            )}
            
            {error && <p className="text-red-600 text-center font-bold bg-red-50 p-3 rounded-xl animate-fade-in border border-red-100">{error}</p>}
            {successMessage && <p className="text-green-700 text-center font-bold bg-green-50 p-3 rounded-xl animate-fade-in border border-green-100">{successMessage}</p>}
            
            <button
              type="submit"
              className="w-full bg-prospera-green text-white font-bold py-5 px-8 rounded-full text-xl shadow-xl hover:bg-prospera-purple transition-all duration-300 ease-in-out transform hover:scale-[1.03]"
            >
              {view === 'login' ? 'Entrar Agora' : 
               view === 'signup' ? 'Criar Conta e Assinar' : 
               view === 'forgot' ? 'Enviar Link' : 'Redefinir Senha'}
            </button>
          </form>

          {view === 'login' && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={handleAdminAccess}
                className="w-full text-prospera-purple/70 hover:text-prospera-purple text-xs font-bold uppercase tracking-widest transition-colors py-2"
              >
                Entrar como Admin (Teste)
              </button>
            </div>
          )}

          <div className="text-center text-gray-700 mt-8 space-y-4">
            {(view === 'login' || view === 'signup') && (
                <p className="text-sm font-medium">
                    {view === 'login' ? 'Ainda não faz parte da nossa comunidade?' : 'Já tem uma conta Prospera?'}
                    <button 
                    onClick={() => switchView(view === 'login' ? 'signup' : 'login')}
                    className="font-extrabold text-prospera-pink hover:underline ml-2"
                    >
                    {view === 'login' ? 'Cadastre-se' : 'Faça login'}
                    </button>
                </p>
            )}
            {(view === 'forgot' || view === 'reset') && (
                <button 
                onClick={() => switchView('login')}
                className="text-gray-500 hover:text-prospera-purple hover:underline text-sm font-bold uppercase tracking-wide"
                >
                Voltar para o Login
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersArea;
