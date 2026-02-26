
import React from 'react';
import { Page, User } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  loggedInUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, loggedInUser, onLogout }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="cursor-pointer"
          onClick={() => onNavigate('home')}
          aria-label="Voltar para a página inicial"
        >
          <div className="font-display text-3xl font-bold leading-none">
            <span className="text-prospera-purple">Prospera</span>
            <span>
              <span className="text-prospera-green">K</span>
              <span className="text-prospera-pink">i</span>
              <span className="text-prospera-blue">d</span>
              <span className="text-prospera-orange">s</span>
            </span>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('landing')}
            className="text-gray-500 hover:text-prospera-purple font-bold transition-colors"
          >
            Comunidade no WhatsApp
          </button>
          {loggedInUser ? (
            <>
              <span className="text-gray-700 font-bold hidden sm:inline">Olá, {loggedInUser.name.split(' ')[0]}!</span>
              <button
                onClick={onLogout}
                className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors duration-300"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('members')}
              className="bg-prospera-purple text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
