import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Doacoes from "./pages/Doacoes";
import NovaDoacao from "./pages/NovaDoacao";

export default function App() {
  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-700">Plataforma de Doações</h1>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-blue-600 hover:underline">Início</Link>
          <Link to="/doacoes" className="text-blue-600 hover:underline">Ver Doações</Link>
          <Link
            to="/nova-doacao"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
          >
            Nova Doação
          </Link>
        </nav>
      </header>

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />   {/* <- usa o Home.js */}
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/nova-doacao" element={<NovaDoacao />} />
        </Routes>
      </main>
    </>
  );
}
