import type { Modelo } from "../types/modelo";

export const getModelos = async (): Promise<Modelo[]> => {
  const response = await fetch("/api/modelos");
  if (!response.ok) throw new Error("Erro ao buscar modelos");
  return response.json();
};

export const addModelo = async (
  nome: string,
  numero_portas: number,
  air_bag: boolean,
  abs: boolean,
  marca_id: number,
  imagem?: string
): Promise<Modelo> => {
  const response = await fetch("/api/modelos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      nome, 
      numero_portas,
      air_bag,
      abs,
      marca_id ,
      imagem
    }),
  });
  if (!response.ok) throw new Error("Erro ao adicionar modelo");
  return response.json();
};

export const deleteModelo = async (id: number): Promise<void> => {
  const response = await fetch(`/api/modelos/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao deletar modelo");
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
  const response = await fetch(`/api/modelos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      nome, 
      numero_portas,
      air_bag,
      abs,
      marca_id,
      imagem
    }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar modelo");
  return response.json();
};
