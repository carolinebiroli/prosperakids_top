
import React from 'react';
import { Page } from '../App';
import { InstagramIcon, FacebookIcon, YouTubeIcon } from './icons/Icons';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerLinks = [
    { title: 'Sobre', page: 'about' as Page },
    { title: 'Blog', page: 'blog' as Page },
    { title: 'Contato', page: 'contact' as Page },
    { title: 'Termos de Uso', page: 'terms' as Page },
    { title: 'Política de Privacidade', page: 'privacy' as Page },
  ];

  return (
    <footer className="bg-prospera-purple text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center">
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <button key={link.title} onClick={() => onNavigate(link.page)} className="hover:underline transition-colors bg-transparent border-none">
                {link.title}
              </button>
            ))}
          </nav>
          
          <div className="flex space-x-6">
            <a href="http://instagram.com/prospera.kids" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="http://facebook.com/prospera.kids" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href="http://youtube.com/prospera.kids" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
              <YouTubeIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/20 text-center">
          <p>&copy; {new Date().getFullYear()} Prospera Kids. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
