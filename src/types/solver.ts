export interface ProblemConfig {
  numVariables: number;
  numRestricciones: number;
  tipo: 'maximizar' | 'minimizar';
}

export interface Restriction {
  coeficientes: number[];
  relacion: '<=' | '>=' | '=';
  valorDerecho: number;
}

export interface ProblemData {
  funcionObjetivo: number[];
  restricciones: Restriction[];
}

export interface Problem {
  config: ProblemConfig;
  datos: ProblemData;
}

export interface Variable {
  nombre: string;
  valor: number;
  costoReducido: number;
}

export interface RestrictionResult {
  numero: number;
  holgura: number;
  precioSombra: number;
}

export interface Range {
  variable?: string;
  restriccion?: number;
  limiteInferior: number;
  valorActual: number;
  limiteSuperior: string | number;
}

export interface SolverResult {
  valorFuncionObjetivo: number;
  variables: Variable[];
  restricciones: RestrictionResult[];
  rangosCoeficientes: Range[];
  rangosLadoDerecho: Range[];
}