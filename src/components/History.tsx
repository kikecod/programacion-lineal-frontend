import React from 'react';
import { X, LogIn } from 'lucide-react';
import { getHistory } from '../services/solver';
import { useAuthStore } from '../store/authStore';

interface HistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onProblemSelect: (problem: any) => void;
}

export const History: React.FC<HistoryProps> = ({ isOpen, onClose, onLoginClick, onProblemSelect }) => {
  const [history, setHistory] = React.useState<any[]>([]);
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (isOpen && user) {
      getHistory().then((data) => setHistory(data.history));
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg p-6 overflow-y-auto z-40">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Historial</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-4">
          <p className="text-gray-600 text-center">
            Porfavor inicie sesion para ver su historial de ejercicios
          </p>
          <button
            onClick={() => {
              onClose();
              onLoginClick();
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg p-6 overflow-y-auto z-40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Historial</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            onClick={() => {
              onProblemSelect(item);
              onClose();
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">
                {item.tipoProblema.charAt(0).toUpperCase() + item.tipoProblema.slice(1)}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(item.resueltoEl).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Optimal Value: {item.valorSolucion}</p>
              <p>Variables: {JSON.parse(item.funcionObjetivo).length}</p>
              <p>Constraints: {JSON.parse(item.restricciones).length}</p>
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No tiene ejercicios resueltos guardados
          </p>
        )}
      </div>
    </div>
  );
};