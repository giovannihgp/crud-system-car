import { apiFetch } from "./client";
import type { Marca } from "../types/marca";

export const getMarcas = async (): Promise<Marca[]> => {
  return apiFetch<Marca[]>("/marca", { method: "GET" });
};

export const addMarca = async (nome: string): Promise<Marca> => {
  return apiFetch<Marca>("/marca", {
    method: "POST",
    body: JSON.stringify({ nome }),
  });
};

export const deleteMarca = async (id: number): Promise<void> => {
  await apiFetch(`/marca/${id}`, { method: "DELETE" });
};

export const updateMarca = async (id: number, nome: string): Promise<Marca> => {
  return apiFetch<Marca>(`/marca/${id}`, {
    method: "PUT",
    body: JSON.stringify({ nome }),
  });
};
