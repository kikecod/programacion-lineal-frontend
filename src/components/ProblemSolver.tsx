import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { Problem, SolverResult } from '../types/solver';
import { solveProblem, saveProblem } from '../services/solver';
import { useAuthStore } from '../store/authStore';
import { ResultsTable } from './ResultsTable';

const configSchema = z.object({
  numVariables: z.number().min(1).max(20),
  numRestricciones: z.number().min(1).max(30),
  tipo: z.enum(['maximizar', 'minimizar']),
});

export const ProblemSolver: React.FC<{ selectedProblem?: any }> = ({ selectedProblem }) => {
  const [step, setStep] = React.useState(1);
  const [config, setConfig] = React.useState<Problem['config'] | null>(null);
  const [result, setResult] = React.useState<SolverResult | null>(null);
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (selectedProblem) {
      try {
        const funcionObjetivo = JSON.parse(selectedProblem.funcionObjetivo);
        const restricciones = JSON.parse(selectedProblem.restricciones);
        const variablesSolucion = JSON.parse(selectedProblem.variablesSolucion);
        const restriccionesDetalles = JSON.parse(selectedProblem.restriccionesDetalles);
        const rangosCoeficientes = selectedProblem.rangosCoeficientes ? JSON.parse(selectedProblem.rangosCoeficientes) : [];
        const rangosLadoDerecho = selectedProblem.rangosLadoDerecho ? JSON.parse(selectedProblem.rangosLadoDerecho) : [];

        setConfig({
          numVariables: funcionObjetivo.length,
          numRestricciones: restricciones.length,
          tipo: selectedProblem.tipoProblema,
        });

        setResult({
          valorFuncionObjetivo: selectedProblem.valorSolucion,
          variables: variablesSolucion,
          restricciones: restriccionesDetalles,
          rangosCoeficientes,
          rangosLadoDerecho,
        });

        setStep(3);
      } catch (error) {
        console.error('Error parsing problem data:', error);
      }
    }
  }, [selectedProblem]);

  const configForm = useForm({
    resolver: zodResolver(configSchema),
    defaultValues: {
      numVariables: 2,
      numRestricciones: 2,
      tipo: 'maximizar' as const,
    },
  });

  const problemForm = useForm({
    defaultValues: {
      funcionObjetivo: [] as number[],
      restricciones: [] as Array<{
        coeficientes: number[];
        relacion: string;
        valorDerecho: number;
      }>,
    },
  });

  const handleConfigSubmit = (data: any) => {
    setConfig({
      numVariables: Number(data.numVariables),
      numRestricciones: Number(data.numRestricciones),
      tipo: data.tipo,
    });
    setStep(2);
  };

  const handleProblemSubmit = async (data: any) => {
    try {
      const funcionObjetivo = Array.from(
        { length: config!.numVariables },
        (_, i) => Number(data[`objetivo${i}`] || 0)
      );

      const restricciones = Array.from(
        { length: config!.numRestricciones },
        (_, i) => ({
          coeficientes: Array.from(
            { length: config!.numVariables },
            (_, j) => Number(data[`restriccion${i}_${j}`] || 0)
          ),
          relacion: data[`relacion${i}`] || '<=',
          valorDerecho: Number(data[`valorDerecho${i}`] || 0),
        })
      );

      const problem: Problem = {
        config: config!,
        datos: {
          funcionObjetivo,
          restricciones,
        },
      };

      const result = await solveProblem(problem);
      setResult(result);
      setStep(3);
    } catch (error) {
      console.error('Error solving problem:', error);
    }
  };

  const handleSave = async () => {
    if (!config || !result) return;
  
    try {
      // Reconstruir los valores del formulario
      const formValues = problemForm.getValues();
  
      const funcionObjetivo = Array.from(
        { length: config.numVariables },
        (_, i) => Number(formValues[`objetivo${i}`] || 0)
      );
  
      const restricciones = Array.from(
        { length: config.numRestricciones },
        (_, i) => ({
          coeficientes: Array.from(
            { length: config.numVariables },
            (_, j) => Number(formValues[`restriccion${i}_${j}`] || 0)
          ),
          relacion: formValues[`relacion${i}`] || '<=',
          valorDerecho: Number(formValues[`valorDerecho${i}`] || 0),
        })
      );
  
      const problem: Problem = {
        config,
        datos: {
          funcionObjetivo,
          restricciones,
        },
      };
  
      // Guardar el problema y el resultado
      await saveProblem(problem, result);
  
      console.log('Problem saved successfully');
    } catch (error) {
      console.error('Error saving problem:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {step === 1 && (
        <form onSubmit={configForm.handleSubmit(handleConfigSubmit)} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Configuracion del Problema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numero de Variables
              </label>
              <input
                type="number"
                {...configForm.register('numVariables', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {configForm.formState.errors.numVariables && (
                <p className="mt-1 text-sm text-red-600">
                  {configForm.formState.errors.numVariables.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numero de Restricciones
              </label>
              <input
                type="number"
                {...configForm.register('numRestricciones', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {configForm.formState.errors.numRestricciones && (
                <p className="mt-1 text-sm text-red-600">
                  {configForm.formState.errors.numRestricciones.message as string}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Optimizacion
              </label>
              <select
                {...configForm.register('tipo')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="maximizar">Maximizar</option>
                <option value="minimizar">Minimizar</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Siguiente
          </button>
        </form>
      )}

      {step === 2 && config && (
        <form onSubmit={problemForm.handleSubmit(handleProblemSubmit)} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Definicion del Problema</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Funcion Objetivo</h3>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: config.numVariables }).map((_, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700">
                    X{i + 1}
                  </label>
                  <input
                    type="number"
                    step="any"
                    {...problemForm.register(`objetivo${i}`)}
                    className="mt-1 block w-20 md:w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Restricciones</h3>
            <div className="space-y-4 overflow-x-auto">
              {Array.from({ length: config.numRestricciones }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2 md:space-x-4 min-w-max">
                  {Array.from({ length: config.numVariables }).map((_, j) => (
                    <div key={j}>
                      <input
                        type="number"
                        step="any"
                        {...problemForm.register(`restriccion${i}_${j}`)}
                        className="block w-16 md:w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}

                  <select
                    {...problemForm.register(`relacion${i}`)}
                    className="block w-16 md:w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="<=">≤</option>
                    <option value=">=">≥</option>
                    <option value="=">=</option>
                  </select>

                  <input
                    type="number"
                    step="any"
                    {...problemForm.register(`valorDerecho${i}`)}
                    className="block w-16 md:w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Atras
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Resolver
            </button>
          </div>
        </form>
      )}

      {step === 3 && result && (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Resultados</h2>
            {user && !selectedProblem && (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Save className="w-5 h-5" />
                <span>Guardar</span>
              </button>
            )}
          </div>

          <ResultsTable result={result} />

          <button
            onClick={() => {
              setStep(1);
              setResult(null);
              setConfig(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Nuevo Problema
          </button>
        </div>
      )}
    </div>
  );
};