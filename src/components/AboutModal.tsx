import React from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      {/* Contenedor del modal */}
      <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-sm md:max-w-2xl max-h-screen overflow-y-auto relative">
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido */}
        <h2 className="text-2xl font-bold mb-4 md:mb-6 text-center">Acerca de LinProg Solver</h2>

        <div className="prose prose-blue max-w-none text-sm md:text-base">
          <p className="mb-4">
            LinProg Solver es una aplicación desarrollada por un grupo de la materia de investigación operativa 😃.
          </p>

          <h3 className="text-lg font-semibold mb-2">Características Principales:</h3>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li>Resuelve ejercicios de maximización y minimización</li>
            <li>Acepta variables y restricciones</li>
            <li>Da un resultado detallado y conciso</li>
            <li>Puedes guardar tus ejercicios resueltos y revisarlos después</li>
            <li>Obtienes resultados como función objetivo y más...</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Participantes:</h3>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Enrique Rafael Fernandez Chiri</li>
            <li>Estefani Camacho</li>
            <li>Carlitos Burgoa</li>
            <li>Luz</li>
            <li>Maritza Zarate Paco</li>
            <li>Lizbeth Pilco</li>
          </ol>
          <br />
          <p>
            Si estás buscando un software para realizar tus ejercicios y también poder guardarlos y mostrarlos después, esta es la página indicada: "LinProg Solver".
          </p>
        </div>
      </div>
    </div>
  );
};