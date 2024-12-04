import React from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { History } from './components/History';
import { AboutModal } from './components/AboutModal';
import { ProblemSolver } from './components/ProblemSolver';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        onLoginClick={() => setIsAuthModalOpen(true)}
        onHistoryClick={() => setIsHistoryOpen(true)}
        onAboutClick={() => setIsAboutOpen(true)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <History
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onLoginClick={() => {
          setIsHistoryOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
      <ProblemSolver />
    </div>
  );
}

export default App;