import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Doacoes from "./pages/Doacoes";
import NovaDoacao from "./pages/NovaDoacao";
import AuthPage from "./AuthPage";
import MinhasSolicitacoes from "./pages/MinhasSolicitacoes";
import SolicitacoesRecebidas from "./pages/SolicitacoesRecebidas";

// Função que protege rotas
function RequireAuth({ children }) {
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem("usuario"));
    } catch {
      return null;
    }
  })();

  if (!usuario) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Tela de Login / Criar Conta */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Home protegida */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {/* Todas as doações */}
        <Route
          path="/doacoes"
          element={
            <RequireAuth>
              <Doacoes />
            </RequireAuth>
          }
        />

        {/* Criar nova doação */}
        <Route
          path="/nova-doacao"
          element={
            <RequireAuth>
              <NovaDoacao />
            </RequireAuth>
          }
        />

        {/* Beneficiário → Minhas Solicitações */}
        <Route
          path="/minhas-solicitacoes"
          element={
            <RequireAuth>
              <MinhasSolicitacoes />
            </RequireAuth>
          }
        />

        {/* Doador → Solicitações Recebidas */}
        <Route
          path="/solicitacoes-recebidas"
          element={
            <RequireAuth>
              <SolicitacoesRecebidas />
            </RequireAuth>
          }
        />

        {/* Qualquer rota inexistente → Login */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
