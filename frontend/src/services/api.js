import MinhasSolicitacoes from "./pages/MinhasSolicitacoes";
import SolicitacoesRecebidas from "./pages/SolicitacoesRecebidas";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export default api;
