import React, { useEffect, useState } from "react";

export default function MinhasDoacoes() {
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

    const carregar = async () => {
        if (!usuario) return;

        setCarregando(true);
        setErro("");

        try {
            const res = await fetch("http://localhost:5000/doacoes");
            const data = await res.json();

            if (!res.ok) {
                setErro(data.error || "Erro ao carregar doações");
                return;
            }

            // Só as doações do usuário logado
            const minhas = data.filter((d) => d.usuario_id === usuario.id);
            setDoacoes(minhas);
        } catch (err) {
            console.error(err);
            setErro("Erro ao conectar com o servidor");
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const deletarDoacao = async (id) => {
        const confirmar = window.confirm("Deseja excluir esta doação?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:5000/doacoes/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Erro ao deletar doação");
                return;
            }

            // Remove do estado
            setDoacoes((lista) => lista.filter((d) => d.id !== id));
            alert("Doação deletada com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor");
        }
    };

    if (!usuario) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <p className="text-gray-600 text-sm">
                    Faça login para visualizar suas doações.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-100 px-4 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">Minhas Doações</h2>
                    <p className="text-sm text-gray-500">
                        Aqui você visualiza e gerencia os itens que cadastrou para doação.
                    </p>
                </div>

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
                        Você ainda não cadastrou nenhuma doação.
                    </p>
                )}

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

                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => deletarDoacao(d.id)}
                                    className="text-sm px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Excluir Doação
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
