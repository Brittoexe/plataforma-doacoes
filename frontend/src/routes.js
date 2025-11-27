import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Doacoes from "./pages/Doacoes";
import NovaDoacao from "./pages/NovaDoacao";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/nova-doacao" element={<NovaDoacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
