import type { Marca } from "../types/marca";

export const getMarcas = async (): Promise<Marca[]> => {
  const response = await fetch("/api/marca");
  if (!response.ok) throw new Error("Erro ao buscar marcas");
  return response.json();
};

export const addMarca = async (nome: string): Promise<Marca> => {
  const response = await fetch("/api/marca", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });
  if (!response.ok) throw new Error("Erro ao adicionar marca");
  return response.json();
};

export const deleteMarca = async (id: number): Promise<void> => {
  const response = await fetch(`/api/marca/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao deletar marca");
};

export const updateMarca = async (id: number, nome: string): Promise<Marca> => {
  const response = await fetch(`/api/marca/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });
  if (!response.ok) throw new Error("Erro ao atualizar marca");
  return response.json();
};
