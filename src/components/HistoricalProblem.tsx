import React from 'react';
import { SolverResult } from '../types/solver';

interface HistoricalProblemProps {
  problem: {
    tipoProblema: string;
    funcionObjetivo: string;
    restricciones: string;
    valorSolucion: number;
    variablesSolucion: string;
    restriccionesDetalles: string;
    rangosCoeficientes: string;
    rangosLadoDerecho: string;
    resueltoEl: string;
  };
}

export const HistoricalProblem: React.FC<HistoricalProblemProps> = ({ problem }) => {
  const funcionObjetivo = React.useMemo(() => JSON.parse(problem.funcionObjetivo), [problem.funcionObjetivo]);
  const restricciones = React.useMemo(() => JSON.parse(problem.restricciones), [problem.restricciones]);
  const variablesSolucion = React.useMemo(() => JSON.parse(problem.variablesSolucion), [problem.variablesSolucion]);
  const restriccionesDetalles = React.useMemo(() => JSON.parse(problem.restriccionesDetalles), [problem.restriccionesDetalles]);
  const rangosCoeficientes = React.useMemo(() => 
    problem.rangosCoeficientes ? JSON.parse(problem.rangosCoeficientes) : [], 
    [problem.rangosCoeficientes]
  );
  const rangosLadoDerecho = React.useMemo(() => 
    problem.rangosLadoDerecho ? JSON.parse(problem.rangosLadoDerecho) : [], 
    [problem.rangosLadoDerecho]
  );

  return (
    <div className="space-y-8">
      {/* Problem Configuration */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Configuracion del problema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Tipo</p>
            <p className="font-medium">{problem.tipoProblema}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Variables</p>
            <p className="font-medium">{funcionObjetivo.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Restricciones</p>
            <p className="font-medium">{restricciones.length}</p>
          </div>
        </div>
      </div>

      {/* Objective Function */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Funcion Objetivo</h3>
        <div className="flex flex-wrap gap-4">
          {funcionObjetivo.map((coef: number, i: number) => (
            <div key={i} className="flex items-center">
              <span className="font-medium">{coef}</span>
              <span className="ml-1">X{i + 1}</span>
              {i < funcionObjetivo.length - 1 && <span className="ml-2">+</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Restricciones</h3>
        <div className="space-y-2">
          {restricciones.map((restriccion: any, i: number) => (
            <div key={i} className="flex items-center flex-wrap gap-2">
              {restriccion.coeficientes.map((coef: number, j: number) => (
                <React.Fragment key={j}>
                  <span className="font-medium">{coef}</span>
                  <span>X{j + 1}</span>
                  {j < restriccion.coeficientes.length - 1 && <span>+</span>}
                </React.Fragment>
              ))}
              <span className="mx-2">{restriccion.relacion}</span>
              <span className="font-medium">{restriccion.valorDerecho}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Resultados</h3>
        <div className="space-y-6">
          {/* Optimal Value */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Valor Optimo</p>
            <p className="text-2xl font-bold text-blue-600">{problem.valorSolucion}</p>
          </div>

          {/* Variables Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variables</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reduced Cost</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {variablesSolucion.map((variable: any) => (
                  <tr key={variable.nombre}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{variable.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{variable.valor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{variable.costoReducido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Constraints Results */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Restricciones</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slack</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shadow Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restriccionesDetalles.map((restriccion: any) => (
                  <tr key={restriccion.numero}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{restriccion.numero}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restriccion.holgura}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restriccion.precioSombra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Coefficient Ranges */}
          {rangosCoeficientes.length > 0 && (
            <div className="overflow-x-auto">
              <h4 className="text-lg font-semibold mb-2">Coefficient Ranges</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variable</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lower Bound</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upper Bound</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rangosCoeficientes.map((rango: any) => (
                    <tr key={rango.variable}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{rango.variable}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rango.limiteInferior}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rango.valorActual}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rango.limiteSuperior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Right-Hand Side Ranges */}
          {rangosLadoDerecho.length > 0 && (
            <div className="overflow-x-auto">
              <h4 className="text-lg font-semibold mb-2">Right-Hand Side Ranges</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Constraint</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lower Bound</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upper Bound</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rangosLadoDerecho.map((rango: any) => (
                    <tr key={rango.restriccion}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{rango.restriccion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rango.limiteInferior}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rango.valorActual}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rango.limiteSuperior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Solved Date */}
      <div className="text-right text-sm text-gray-500">
        Resuelto el: {new Date(problem.resueltoEl).toLocaleString()}
      </div>
    </div>
  );
};