import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-6">Entre em Contato</h1>
        
        <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
          Adoramos ouvir nossa comunidade! Se você tiver alguma dúvida, sugestão ou simplesmente quiser compartilhar uma experiência, não hesite em nos contatar.
        </p>

        <div className="bg-prospera-green/20 p-8 rounded-2xl shadow-md inline-block">
            <h2 className="font-display text-2xl font-bold text-prospera-purple mb-2">Nosso E-mail</h2>
            <a 
                href="mailto:contato@prosperakids.com.br" 
                className="text-xl font-bold text-prospera-purple hover:text-prospera-pink transition-colors duration-300 underline"
            >
                contato@prosperakids.com.br
            </a>
            <p className="text-gray-600 mt-4">
                Responderemos sua mensagem o mais rápido possível!
            </p>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
