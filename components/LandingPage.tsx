
import React, { useState } from 'react';
import { Lead } from '../App';
import { WhatsAppIcon, HeartIcon, SparklesIcon, SeedlingIcon } from './icons/Icons';

interface LandingPageProps {
  onSaveLead: (lead: Lead) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSaveLead }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newLead: Lead = {
      name: formData.name,
      email: '', // Campo de e-mail removido do formulário
      whatsapp: formData.whatsapp,
      date: new Date().toISOString()
    };

    onSaveLead(newLead);

    // Simulando delay de rede e redirecionamento
    setTimeout(() => {
        // Redirecionar para o grupo do WhatsApp
        window.location.href = "https://chat.whatsapp.com/HJzemJT2oekEVxegGoc3tq";
        setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-prospera-purple to-indigo-900 font-sans text-white flex flex-col">
      
      {/* Header Simplificado */}
      <header className="container mx-auto px-6 py-8 flex justify-center">
        <div className="font-display text-3xl font-bold leading-none bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            <span className="text-white">Prospera</span>
            <span>
                <span className="text-prospera-green">K</span>
                <span className="text-prospera-pink">i</span>
                <span className="text-prospera-blue">d</span>
                <span className="text-prospera-orange">s</span>
            </span>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Lado Esquerdo: Copy e Benefícios */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in">
            <div>
                <span className="bg-prospera-green/20 text-prospera-green border border-prospera-green/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block backdrop-blur-sm">
                    Comunidade Gratuita no WhatsApp
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                    Forme o <span className="text-prospera-orange">caráter</span> do seu filho com <span className="text-prospera-pink">princípios</span> que o mundo não ensina.
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Junte-se ao movimento de mães que estão formando uma nova geração com princípios elevados, inteligência emocional e propósito de vida.
                </p>
            </div>

            <div className="space-y-4 text-left">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="bg-prospera-orange/20 p-3 rounded-full shrink-0">
                         <SparklesIcon className="w-6 h-6 text-prospera-orange" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-1">Histórias com Propósito</h3>
                        <p className="text-sm text-indigo-200 leading-relaxed">Receba contos diários que ensinam virtudes como generosidade, coragem e gratidão de forma lúdica.</p>
                    </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="bg-prospera-green/20 p-3 rounded-full shrink-0">
                         <SeedlingIcon className="w-6 h-6 text-prospera-green" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-1">Mentalidade Próspera</h3>
                        <p className="text-sm text-indigo-200 leading-relaxed">Princípios práticos para plantar sementes de abundância e merecimento no coração do seu filho.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="bg-prospera-pink/20 p-3 rounded-full shrink-0">
                         <HeartIcon className="w-6 h-6 text-prospera-pink" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-1">Conexão e Vínculo</h3>
                        <p className="text-sm text-indigo-200 leading-relaxed">Ferramentas para fortalecer a relação mãe e filho através do amor e da presença consciente.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Lado Direito: Formulário de Captura */}
        <div className="lg:w-1/3 w-full max-w-md bg-white text-gray-800 rounded-3xl shadow-2xl p-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-prospera-green via-prospera-pink to-prospera-blue"></div>
            
            <div className="text-center mb-6">
                <h2 className="font-display text-2xl font-bold text-prospera-purple mb-2">
                    Faça Parte do Movimento
                </h2>
                <p className="text-gray-500 text-sm">
                    Preencha para receber o link do nosso <strong>Grupo VIP Gratuito</strong>.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Seu Nome</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple focus:border-transparent transition-all font-semibold text-gray-700 placeholder-gray-400"
                        placeholder="Digite seu nome"
                    />
                </div>
                
                <div>
                    <label htmlFor="whatsapp" className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Seu WhatsApp</label>
                    <input 
                        type="tel" 
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-prospera-purple focus:border-transparent transition-all font-semibold text-gray-700 placeholder-gray-400"
                        placeholder="(DDD) 99999-9999"
                    />
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-6"
                >
                    {isSubmitting ? (
                        'Redirecionando...'
                    ) : (
                        <>
                            <WhatsAppIcon className="w-6 h-6 text-white" />
                            Quero entrar no grupo gratuito
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-[10px] text-gray-400">
                    Ao se inscrever, você concorda em receber nossas mensagens. Respeitamos sua privacidade.
                </p>
            </div>
        </div>

      </div>

      <footer className="text-center py-6 text-white/40 text-sm">
        &copy; {new Date().getFullYear()} Prospera Kids. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;
