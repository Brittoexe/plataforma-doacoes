// src/pages/Doacoes.js
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      const res = await api.get("/doacoes");
      setDoacoes(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar doações.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function solicitar(doacaoId) {
    try {
      // Temporário: beneficiário fixo (precisa existir na tabela usuarios)
      const beneficiarioId = 2;

      await api.post("/solicitacoes", {
        doacao_id: doacaoId,
        beneficiario_id: beneficiarioId,
      });

      alert("Solicitação enviada!");
    } catch (err) {
      console.error(err);
      alert("Erro ao solicitar doação.");
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Doações Recebidas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doacoes.map((d) => (
          <div key={d.id} className="border p-4 rounded-lg shadow bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{d.titulo}</h2>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  d.status === "disponivel"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {d.status}
              </span>
            </div>

            <p className="text-gray-700 mb-2">{d.descricao}</p>
            <p className="text-sm text-blue-600 mb-2">Categoria: {d.categoria}</p>

            <p className="text-xs text-gray-500 mb-4">
              Criado em:{" "}
              {d.criado_em ? new Date(d.criado_em).toLocaleString() : "—"}
            </p>

            {d.status === "disponivel" ? (
              <button
                onClick={() => solicitar(d.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Solicitar
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" disabled>
                Indisponível
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
