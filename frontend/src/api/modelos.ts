import type { Modelo } from "../types/modelo";
import { apiFetch } from "./client";

export const getModelos = async (): Promise<Modelo[]> => {
  return apiFetch<Modelo[]>("/modelo", { method: "GET" });
};

export const addModelo = async (
  nome: string,
  numero_portas: number,
  air_bag: boolean,
  abs: boolean,
  marca_id: number,
  imagem?: string
): Promise<Modelo> => {
  return apiFetch("/modelo", {
    method: "POST",
    body: JSON.stringify({ 
      nome, 
      numero_portas,
      air_bag,
      abs,
      marca_id ,
      imagem
    }),
  });
};

export const deleteModelo = async (id: number): Promise<void> => {
  await apiFetch(`/modelo/${id}`, { method: "DELETE" });
};

export const updateModelo = async (
    id: number, 
    nome: string, 
    numero_portas: number,
    air_bag: boolean,
    abs: boolean,
    marca_id: number,
    imagem?: string
  ): Promise<Modelo> => {
  return apiFetch<Modelo>(`/modelo/${id}`, {
    method: "PUT",
    body: JSON.stringify({ 
      nome, 
      numero_portas,
      air_bag,
      abs,
      marca_id,
      imagem
    }),
  });
};
