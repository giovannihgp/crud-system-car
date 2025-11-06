import { getModelos, addModelo, deleteModelo, updateModelo } from "../api/modelos";
import type { Modelo } from "../types/modelo";

export const modeloService = {
  async listar(): Promise<Modelo[]> {
    return await getModelos();
  },

  async adicionar(dados: Omit<Modelo, "id" | "marca">): Promise<Modelo> {
    const { nome, numero_portas, air_bag, abs, marca_id, imagem } = dados;
    return await addModelo(nome, numero_portas, air_bag, abs, marca_id, imagem);
  },

  async remover(id: number): Promise<void> {
    return await deleteModelo(id);
  },

  async atualizar(id: number, dados: Omit<Modelo, "id" | "marca">): Promise<Modelo> {
    const { nome, numero_portas, air_bag, abs, marca_id, imagem } = dados;
    return await updateModelo(id, nome, numero_portas, air_bag, abs, marca_id, imagem);
  },
};