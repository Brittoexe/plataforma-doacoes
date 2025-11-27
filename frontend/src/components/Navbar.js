export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo à esquerda */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 bg-blue-600 rotate-45 rounded-sm"></div>
          <span className="text-xl font-bold text-blue-700">Doações</span>
        </div>

        {/* Links + botão à direita */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="#quem-somos" className="hover:text-blue-600 transition-colors">
            Quem Somos
          </a>
          <a href="#painel" className="hover:text-blue-600 transition-colors">
            Painel do Doador
          </a>
          <a
            href="/nova-doacao"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
          >
            Nova Doação
          </a>
        </div>
      </div>
    </nav>
  );
}
