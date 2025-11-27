import React, { useState } from "react";

function AuthPage() {
    const [modo, setModo] = useState("login"); // 'login' ou 'cadastro'
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("doador");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [ok, setOk] = useState("");

    const limparMensagens = () => {
        setErro("");
        setOk("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        limparMensagens();
        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.error || "Erro ao fazer login");
                return;
            }

            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            setErro("Erro ao conectar com o servidor");
        }
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        limparMensagens();

        try {
            const res = await fetch("http://localhost:5000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha, tipo }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.error || "Erro ao cadastrar usuário");
                return;
            }

            setOk("Usuário cadastrado com sucesso! Agora faça login.");
            setModo("login");
            setSenha("");
        } catch (err) {
            console.error(err);
            setErro("Erro ao conectar com o servidor");
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-blue-700">
                        Plataforma de Doações
                    </h2>
                    <p className="text-sm text-gray-500">
                        Acesse sua conta ou crie um cadastro para continuar.
                    </p>
                </div>

                {/* Botões de alternar modo */}
                <div className="flex rounded-full bg-gray-100 p-1">
                    <button
                        type="button"
                        onClick={() => {
                            setModo("login");
                            limparMensagens();
                        }}
                        className={`flex-1 py-2 text-sm font-medium rounded-full transition
              ${modo === "login"
                                ? "bg-blue-600 text-white shadow"
                                : "text-gray-600"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setModo("cadastro");
                            limparMensagens();
                        }}
                        className={`flex-1 py-2 text-sm font-medium rounded-full transition
              ${modo === "cadastro"
                                ? "bg-blue-600 text-white shadow"
                                : "text-gray-600"
                            }`}
                    >
                        Criar Conta
                    </button>
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

                {modo === "login" ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="seuemail@exemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 text-sm shadow transition"
                        >
                            Entrar
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCadastro} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nome completo
                            </label>
                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="seuemail@exemplo.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Crie uma senha"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tipo de usuário
                            </label>
                            <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            >
                                <option value="doador">Doador</option>
                                <option value="beneficiario">Beneficiário</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 text-sm shadow transition"
                        >
                            Cadastrar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
