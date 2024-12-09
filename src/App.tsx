import React from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { History } from './components/History';
import { AboutModal } from './components/AboutModal';
import { ProblemSolver } from './components/ProblemSolver';
import { HistoricalProblem } from './components/HistoricalProblem';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const [selectedProblem, setSelectedProblem] = React.useState<any>(null);

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
        onProblemSelect={(problem) => {
          setSelectedProblem(problem);
          setIsHistoryOpen(false);
        }}
      />
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
      <div className="container mx-auto p-4 md:p-6">
        {selectedProblem ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Historial del Problema</h2>
              <button
                onClick={() => setSelectedProblem(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Nuevo Problema
              </button>
            </div>
            <HistoricalProblem problem={selectedProblem} />
          </div>
        ) : (
          <ProblemSolver />
        )}
      </div>
    </div>
  );
}

export default App;