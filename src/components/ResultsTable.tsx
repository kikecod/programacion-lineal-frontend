import React from 'react';
import { SolverResult } from '../types/solver';

interface ResultsTableProps {
  result: SolverResult;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result }) => {
  return (
    <div className="space-y-8">
      {/* Optimal Value */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Optimal Value</h3>
        <p className="text-2xl font-bold text-blue-600">
          {result.valorFuncionObjetivo}
        </p>
      </div>

      {/* Variables Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-xl font-semibold p-6 pb-4">Variables</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reduced Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.variables.map((variable) => (
                <tr key={variable.nombre}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {variable.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {variable.valor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {variable.costoReducido}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Constraints Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-xl font-semibold p-6 pb-4">Constraints</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Constraint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slack
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shadow Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.restricciones.map((restriccion) => (
                <tr key={restriccion.numero}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {restriccion.numero}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {restriccion.holgura}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {restriccion.precioSombra}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coefficient Ranges Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-xl font-semibold p-6 pb-4">Coefficient Ranges</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lower Bound
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upper Bound
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.rangosCoeficientes.map((rango) => (
                <tr key={rango.variable}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {rango.variable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rango.limiteInferior}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rango.valorActual}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rango.limiteSuperior}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right-Hand Side Ranges Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h3 className="text-xl font-semibold p-6 pb-4">Right-Hand Side Ranges</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Constraint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lower Bound
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upper Bound
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.rangosLadoDerecho.map((rango) => (
                <tr key={rango.restriccion}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {rango.restriccion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rango.limiteInferior}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rango.valorActual}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rango.limiteSuperior}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};