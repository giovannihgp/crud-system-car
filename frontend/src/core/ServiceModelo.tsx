import { useEffect, useState } from "react";
import type { Modelo } from "../types/modelo";
import type { Marca } from "../types/marca";
import { getModelos, addModelo, deleteModelo, updateModelo } from "../api/modelos";
import { getMarcas } from "../api/marcas";

export default function ServiceModelo() {

    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [nome, setNome] = useState("");
    const [numeroPortas, setNumeroPortas] = useState<number | null>(null);
    const [airBag, setAirBag] = useState<boolean | null>(null);
    const [abs, setAbs] = useState<boolean | null>(null);
    const [marca_id, setMarcaId] = useState<number | null>(null);
    const [imagem, setImagem] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [loadingInicial, setLoadingInicial] = useState(true);
    
    const [editNome, setEditNome] = useState("");
    const [editMarcaId, setEditMarcaId] = useState<number | null>(null);
    const [editPortas, setEditPortas] = useState<number | null>(null);
    const [editAirBag, setEditAirBag] = useState<boolean | null>(null);
    const [editAbs, setEditAbs] = useState<boolean | null>(null);
    const [editImagem, setEditImagem] = useState("");
    
    const [paginaAtual, setPaginaAtual] = useState(1);
    const porPagina = 7;
    const totalPagina = Math.ceil(modelos.length / porPagina);
    const modelosPagina = modelos.slice(
      (paginaAtual - 1) * porPagina,
      paginaAtual * porPagina
    );
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [m, mo] = await Promise.all([getMarcas(), getModelos()]);
          setMarcas(m);
          setModelos(mo);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingInicial(false);
        }
      };
      fetchData();
    }, []);
    
      const handleAdd = async () => {
          if (carregando) return;
          if (!nome.trim() || !marca_id || !numeroPortas || airBag === null || abs === null || !imagem?.trim()) {
              setErro("Todas as opções são obritórias.");
              setTimeout(() => setErro(""), 4000);
              return;
          }
          try {
              setCarregando(true);
              const novo = await addModelo(
                  nome,
                  Number(numeroPortas), 
                  airBag, 
                  abs, 
                  Number(marca_id),
                  imagem
              );
              setModelos([...modelos, novo]);
              setNome("");
              setNumeroPortas(null);
              setAirBag(null);
              setAbs(null);
              setMarcaId(0);
              setImagem("");
    
              setSucesso("Modelo criado com sucesso!");
              setTimeout(() => setSucesso(""), 4000);
          } catch (err) {
              console.error(err);
              setErro("Erro ao adicionar modelo.");
              setTimeout(() => setErro(""), 4000);
          } finally {
              setCarregando(false);
          }
      };
    
    const handleDelete = async (id: number) => {
      try {
        await deleteModelo(id);
        setModelos(modelos.filter((m) => m.id !== id));
      } catch (err) {
        console.error(err);
        alert("Erro ao deletar modelo");
      }
    };
    
    const handleEditClick = (m: Modelo) => {
      setEditandoId(m.id);
      setEditNome(m.nome);
      setEditMarcaId(m.marca_id);
      setEditPortas(m.numero_portas);
      setEditAirBag(m.air_bag);
      setEditAbs(m.abs);
      setEditImagem(m.imagem);
    };
    
    const handleCancelarEdit = () => {
      setEditandoId(null);
    };
    
    const handleSalvarEdit = async (id: number) => {
      if (!editNome.trim() || !editMarcaId || !editPortas || editAirBag === null || editAbs === null || !editImagem.trim() ) return;
      try {
          const atualizar = await updateModelo(
              id,
              editNome,
              Number(editPortas),
              editAirBag,
              editAbs,
              Number(editMarcaId),
              editImagem
          );
          setModelos(modelos.map((m) => (m.id === id ? atualizar : m)));
          setEditandoId(null);
      } catch (err) {
          console.error(err);
          alert("Erro ao atualizar modelo");
      }
    };
    
    const getMarcaNome = (modelo: Modelo) => {
      const marca = marcas.find((m) => m.id === modelo.marca_id);
      return marca ? marca.nome : "desconhecido";
    };
    
    const mudarPagina = (novaPagina: number) => {
      if (novaPagina >= 1 && novaPagina <= totalPagina) {
          setPaginaAtual(novaPagina);
      }
    };
}