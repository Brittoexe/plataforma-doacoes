import React, { useEffect, useState } from "react";

export default function SolicitacoesRecebidas() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario"));
    } catch {
      return null;
    }
  })();

  const carregar = async () => {
    if (!usuario) return;
    setCarregando(true);
    setErro("");

    try {
      const res = await fetch(
        `http://localhost:5000/solicitacoes-recebidas?doador_id=${usuario.id}`
      );
      const data = await res.json();

      if (!res.ok) {
        setErro(data.error || "Erro ao carregar solicitações recebidas");
        return;
      }

      setSolicitacoes(data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao conectar com o servidor");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, [usuario]);

  const atualizarStatus = async (idSolicitacao, status) => {
    try {
      const res = await fetch(
        `http://localhost:5000/solicitacoes/${idSolicitacao}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao atualizar status");
        return;
      }

      alert("Status atualizado com sucesso!");
      carregar();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor");
    }
  };

  const corStatus = (status) => {
    switch (status) {
      case "aceita":
        return "bg-green-100 text-green-700 border-green-300";
      case "recusada":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  if (!usuario || usuario.tipo !== "doador") {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          Apenas doadores podem visualizar solicitações recebidas.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Solicitações Recebidas
        </h2>
        <p className="text-sm text-gray-500">
          Veja quem demonstrou interesse nas suas doações.
        </p>

        {carregando && (
          <p className="text-sm text-gray-500">Carregando solicitações...</p>
        )}

        {erro && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {erro}
          </div>
        )}

        {!carregando && !erro && solicitacoes.length === 0 && (
          <p className="text-sm text-gray-500">
            Ainda não há solicitações para suas doações.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {solicitacoes.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-gray-800 line-clamp-1">
                  {s.titulo}
                </h3>
                <span
                  className={
                    "text-xs px-2 py-1 rounded-full border " +
                    corStatus(s.status)
                  }
                >
                  {s.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3">
                {s.descricao}
              </p>

              <p className="text-xs text-gray-500">
                Beneficiário:{" "}
                <span className="font-medium">{s.beneficiario_nome}</span>{" "}
                ({s.beneficiario_email})
              </p>

              {s.status === "pendente" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => atualizarStatus(s.id, "aceita")}
                    className="flex-1 text-sm px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => atualizarStatus(s.id, "recusada")}
                    className="flex-1 text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Recusar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
