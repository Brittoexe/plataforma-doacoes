import React, { useState } from "react";

function NovaDoacao() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [erro, setErro] = useState("");
    const [ok, setOk] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");
        setOk("");

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario) {
            setErro("Você precisa estar logado para cadastrar uma doação.");
            window.location.href = "/auth";
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/doacoes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    titulo,
                    descricao,
                    categoria,
                    usuario_id: usuario.id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.error || "Erro ao cadastrar doação");
                return;
            }

            setOk("Doação cadastrada com sucesso!");
            setTitulo("");
            setDescricao("");
            setCategoria("");
        } catch (err) {
            console.error(err);
            setErro("Erro ao conectar com o servidor");
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Cadastrar nova doação
                        </h2>
                        <p className="text-sm text-gray-500">
                            Preencha os dados do item que você deseja doar.
                        </p>
                    </div>
                </div>

                {erro && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                        {erro}
                    </div>
                )}
                {ok && (
                    <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                        {ok}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Título da doação
                        </label>
                        <input
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ex: Cesta básica, Roupas, Livros..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Categoria
                        </label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="alimentos">Alimentos</option>
                            <option value="roupas">Roupas</option>
                            <option value="livros">Livros</option>
                            <option value="higiene">Higiene</option>
                            <option value="outros">Outros</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            rows={4}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            placeholder="Descreva o estado do item, quantidade, tamanho, etc."
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 text-sm shadow transition"
                        >
                            Cadastrar Doação
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NovaDoacao;
