import React from 'react';
import { LogIn, LogOut, History, Calculator, Menu, Info } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface NavbarProps {
  onLoginClick: () => void;
  onHistoryClick: () => void;
  onAboutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onHistoryClick, onAboutClick }) => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="w-8 h-8" />
            <span className="text-xl font-bold">LinProg Solver</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onAboutClick}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <Info className="w-5 h-5" />
              <span>Acerca</span>
            </button>
            
            <button
              onClick={onHistoryClick}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <History className="w-5 h-5" />
              <span>Historial</span>
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="truncate max-w-[200px]">{user.email}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 hover:text-blue-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 hover:text-blue-200"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user ? (
              <span className="mr-4 truncate max-w-[150px]">{user.email}</span>
            ) : (
              <button
                onClick={onLoginClick}
                className="mr-4 flex items-center space-x-2 hover:text-blue-200"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <button
              onClick={() => {
                onAboutClick();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-blue-800"
            >
              Acerca
            </button>
            <button
              onClick={() => {
                onHistoryClick();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-blue-800"
            >
              Historial
            </button>
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-blue-800"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};