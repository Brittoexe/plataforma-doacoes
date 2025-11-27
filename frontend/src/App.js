import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AuthPage from "./AuthPage";
import Home from "./pages/Home";
import Doacoes from "./pages/Doacoes";
import NovaDoacao from "./pages/NovaDoacao";
import MinhasDoacoes from "./pages/MinhasDoacoes";

function RequireAuth({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default function App() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-700">
          Plataforma de Doações
        </h1>

        <nav className="flex items-center gap-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Início
          </Link>

          <Link to="/doacoes" className="text-blue-600 hover:underline">
            Ver Doações
          </Link>

          <Link to="/minhas-doacoes" className="text-blue-600 hover:underline">
            Minhas Doações
          </Link>

          <Link
            to="/nova-doacao"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            Nova Doação
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("usuario");
              window.location.href = "/auth";
            }}
            className="text-red-500 hover:underline"
          >
            Sair
          </button>
        </nav>
      </header>

      <main className="min-h-screen bg-gray-50">
        <Routes>
          {/* Tela de login/cadastro */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Home logada */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />

          <Route
            path="/doacoes"
            element={
              <RequireAuth>
                <Doacoes />
              </RequireAuth>
            }
          />

          <Route
            path="/nova-doacao"
            element={
              <RequireAuth>
                <NovaDoacao />
              </RequireAuth>
            }
          />

          <Route
            path="/minhas-doacoes"
            element={
              <RequireAuth>
                <MinhasDoacoes />
              </RequireAuth>
            }
          />

          {/* Se digitar rota errada → login */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </main>
    </>
  );
}
