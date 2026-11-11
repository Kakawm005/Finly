
import { useEffect, useState } from "react";
import { apiGet } from "../api/api";

export function useCategory(id) {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const resultado = await apiGet(`/category/${id}`);
        setDados(resultado);
      } catch (error) {
        setErro(error.message || "Erro ao carregar category");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarDados();
    }
  }, [id]);

  return { dados, erro, carregando };
}
