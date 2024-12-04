import React from 'react';
import { LogIn, LogOut, History, Calculator, Info } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface NavbarProps {
  onLoginClick: () => void;
  onHistoryClick: () => void;
  onAboutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onHistoryClick, onAboutClick }) => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Calculator className="w-8 h-8" />
          <span className="text-xl font-bold">LinProg Solver</span>
        </div>
        
        <div className="flex items-center space-x-4 flex-wrap justify-center">
          <button
            onClick={onAboutClick}
            className="flex items-center space-x-2 hover:text-blue-200 px-3 py-1"
          >
            <Info className="w-5 h-5" />
            <span className="hidden sm:inline">Acerca</span>
          </button>

          <button
            onClick={onHistoryClick}
            className="flex items-center space-x-2 hover:text-blue-200 px-3 py-1"
          >
            <History className="w-5 h-5" />
            <span className="hidden sm:inline">Historial</span>
          </button>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline truncate max-w-[200px]">{user.email}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 hover:text-blue-200 px-3 py-1"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center space-x-2 hover:text-blue-200 px-3 py-1"
            >
              <LogIn className="w-5 h-5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};