import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario"));
  } catch {
    usuario = null;
  }

  const logout = () => {
    localStorage.removeItem("usuario");
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 bg-blue-600 rotate-45 rounded-sm"></div>
          <span className="text-xl font-bold text-blue-700">Doações</span>
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">

          {/* Link Quem Somos (ancora dentro da home) */}
          <a href="#quem-somos" className="hover:text-blue-600 transition-colors">
            Quem Somos
          </a>

          {/* Link Painel */}
          <a href="#painel" className="hover:text-blue-600 transition-colors">
            Painel do Doador
          </a>

          {/* Link para DOAÇÕES */}
          <Link
            to="/doacoes"
            className="hover:text-blue-600 transition-colors"
          >
            Ver Doações
          </Link>

          {/* Se for DOADOR, aparece botão Nova Doação */}
          {usuario?.tipo === "doador" && (
            <Link
              to="/nova-doacao"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
            >
              Nova Doação
            </Link>
          )}

          {/* Se for BENEFICIÁRIO → aparecer botão Minhas Solicitações */}
          {usuario?.tipo === "beneficiario" && (
            <Link
              to="/minhas-solicitacoes"
              className="hover:text-blue-600 transition-colors"
            >
              Minhas Solicitações
            </Link>
          )}

          {/* Se for DOADOR → aparecxer botão Solicitações Recebidas */}
          {usuario?.tipo === "doador" && (
            <Link
              to="/solicitacoes-recebidas"
              className="hover:text-blue-600 transition-colors"
            >
              Solicitações Recebidas
            </Link>
          )}

          {/* Botão Sair */}
          {usuario && (
            <button
              onClick={logout}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
