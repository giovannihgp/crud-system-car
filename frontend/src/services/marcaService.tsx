import { getMarcas, addMarca, deleteMarca, updateMarca } from "../api/marcas";
import { getModelos } from "../api/modelos";
import type { Marca } from "../types/marca";
import type { Modelo } from "../types/modelo";

export const marcaService = {
    async carregarTudo(): Promise<{ marcas: Marca[]; modelos: Modelo[] }> {
        const [marcas, modelos] = await Promise.all([getMarcas(), getModelos()]);
        return { marcas, modelos };
    },

    async adicionar(nome: string): Promise<Marca> {
        return addMarca(nome);
    },

    async atualizar(id: number, nome: string): Promise<Marca> {
        return updateMarca(id, nome);
    },

    async remover(id: number): Promise<void> {
        return deleteMarca(id);
    },
};