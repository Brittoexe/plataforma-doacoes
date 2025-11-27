import React, { useEffect, useState } from "react";

function Doacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario"));
    } catch {
      return null;
    }
  })();

  // Função para solicitar uma doação (beneficiário)
  const solicitar = async (idDoacao) => {
    if (!usuario || usuario.tipo !== "beneficiario") {
      alert("Somente beneficiários podem solicitar doações.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doacao_id: idDoacao,
          beneficiario_id: usuario.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao solicitar a doação.");
        return;
      }

      alert("Solicitação enviada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // Função para deletar uma doação (doador dono da doação)
  const deletarDoacao = async (idDoacao) => {
    if (!usuario || usuario.tipo !== "doador") {
      alert("Somente doadores podem deletar suas doações.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta doação?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:5000/doacoes/${idDoacao}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Erro ao deletar a doação.");
        return;
      }

      // Remove a doação da lista no estado
      setDoacoes((listaAnterior) =>
        listaAnterior.filter((d) => d.id !== idDoacao)
      );

      alert("Doação deletada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  useEffect(() => {
    const carregarDoacoes = async () => {
      setCarregando(true);
      setErro("");

      try {
        const res = await fetch("http://localhost:5000/doacoes");
        const data = await res.json();

        if (!res.ok) {
          setErro(data.error || "Erro ao carregar doações");
          return;
        }

        setDoacoes(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao conectar com o servidor");
      } finally {
        setCarregando(false);
      }
    };

    carregarDoacoes();
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Doações disponíveis
          </h2>
          <p className="text-sm text-gray-500">
            Aqui os{" "}
            <span className="font-semibold">beneficiários</span> podem
            visualizar as doações cadastradas na plataforma.{" "}
            {usuario && usuario.tipo === "doador" && (
              <span className="font-semibold">
                Como doador, você também pode excluir as doações que cadastrou.
              </span>
            )}
          </p>

          {usuario && usuario.tipo === "beneficiario" && (
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-green-700">
                Você está logado como beneficiário.
              </span>
            </div>
          )}

          {usuario && usuario.tipo === "doador" && (
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-blue-700">
                Você está logado como doador. Você pode excluir suas doações.
              </span>
            </div>
          )}
        </div>

        {/* Mensagens de estado */}
        {carregando && (
          <p className="text-sm text-gray-500">Carregando doações...</p>
        )}

        {erro && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {erro}
          </div>
        )}

        {!carregando && !erro && doacoes.length === 0 && (
          <p className="text-sm text-gray-500">
            Ainda não há doações cadastradas.
          </p>
        )}

        {/* Lista de doações */}
        <div className="grid gap-4 md:grid-cols-2">
          {doacoes.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {d.titulo}
                  </h3>

                  {d.categoria && (
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {d.categoria}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {d.descricao}
                </p>
              </div>

              {/* Área de botões */}
              <div className="mt-4 flex justify-end gap-2">
                {/* Botão Solicitar (beneficiário) */}
                {usuario && usuario.tipo === "beneficiario" && (
                  <button
                    type="button"
                    onClick={() => solicitar(d.id)}
                    className="text-sm px-3 py-1.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                  >
                    Tenho interesse
                  </button>
                )}

                {/* Botão Excluir (doador dono da doação) */}
                {usuario &&
                  usuario.tipo === "doador" &&
                  d.usuario_id === usuario.id && (
                    <button
                      type="button"
                      onClick={() => deletarDoacao(d.id)}
                      className="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Excluir doação
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doacoes;
