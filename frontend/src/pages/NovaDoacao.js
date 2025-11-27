// src/pages/NovaDoacao.js
import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NovaDoacao() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    categoria: "",
    descricao: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação simples
    if (!form.titulo || !form.categoria) {
      alert("Preencha título e categoria.");
      return;
    }

    try {
      await api.post("/doacoes", {
        ...form,
        // Temporário: id do usuário doador já criado no seu banco
        usuario_id: 1,
      });

      alert("Doação cadastrada com sucesso!");
      navigate("/doacoes");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar.");
    }
  }

  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Nova Doação
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Título</label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Categoria</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="alimentos">Alimentos</option>
              <option value="roupas">Roupas</option>
              <option value="livros">Livros</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-3 rounded-lg"
          >
            Cadastrar Doação
          </button>
        </form>
      </div>
    </div>
  );
}
