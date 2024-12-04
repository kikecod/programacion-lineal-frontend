import api from './api';
import { Problem, SolverResult } from '../types/solver';

export const solveProblem = async (problem: Problem) => {
  const response = await api.post<SolverResult>('/resolver', problem);
  return response.data;
};

export const saveProblem = async (problem: Problem, result: SolverResult) => {
  const response = await api.post('/guardar_ejercicio', {
    config: problem.config,
    datos: problem.datos,
    resultado: result,
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/user/history');
  return response.data;
};