import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 md:p-8 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Acerca de LinProg Solver</h2>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg mb-4">
            LinProg Solver is una aplicacion desarrollada por un grupo de la materia de investigacion operativa 😃.
          </p>

          <h3 className="text-xl font-semibold mb-3">Caracteristicas Principales:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Resuelve ejercicios de maximizimizacion y minimizacion</li>
            <li>Acepta variables y restricciones</li>
            <li>Da un resultado detallado y conciso</li>
            <li>Puedes guardar tus ejercicios resueltos y revisarlos despues</li>
            <li>Obtienes resultados como funcion objetivo y mas....</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Participantes:</h3>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Enrique Rafael Fernandez Chiri</li>
            <li>Estefani Camacho</li>
            <li>Carlitos Burgoa</li>
            <li>Luz</li>
            <li>Maritza Zarate Paco</li>
            <li>...</li>
          </ol>

          <p className="text-lg">
            Si estas buscando un software para realizar tus ejercicios y tambien poder guardarlos y mostrarlos despues, esta es la pagina indica "LinProg Solver"
          </p>
        </div>
      </div>
    </div>
  );
};