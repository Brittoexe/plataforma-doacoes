import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import doarIlustracao from "../assets/doar.png";
import DonationCard from "../components/DonationCard";
import roupaImg from "../assets/roupa.jpg";
import comidaImg from "../assets/comida.jpg";
import dinheiroImg from "../assets/dinheiro.jpg";


export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-center md:text-left"
          >
            <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
              Plataforma de Doações
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Cadastre, visualize e compartilhe doações com facilidade e estilo.
            </p>
            <a
              href="/nova-doacao"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              Nova Doação
            </a>
          </motion.div>

          {/* Ilustração com tamanho ajustado */}
          <motion.img
            src={doarIlustracao}
            alt="Ilustração de doações"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg md:max-w-xl object-contain drop-shadow-xl"
          />
        </div>
      </section>

      {/* Seção de exemplos */}
      <section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">
    Exemplos de Doações
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <DonationCard
      titulo="Doação de Roupas"
      descricao="Ajude famílias com roupas em bom estado."
      imagem={roupaImg}
    />
    <DonationCard
      titulo="Doação de Alimentos"
      descricao="Contribua com alimentos para quem precisa."
      imagem={comidaImg}
    />
    <DonationCard
      titulo="Doação Financeira"
      descricao="Apoie projetos sociais com sua contribuição."
      imagem={dinheiroImg}
    />
  </div>
</section>

      {/* Depoimentos */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-10">
            O que dizem sobre nós
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="bg-blue-50 p-6 rounded-xl shadow">
              <p className="text-gray-700 italic">
                “A plataforma facilitou muito o processo de doação. Tudo ficou mais rápido e transparente.”
              </p>
              <footer className="mt-4 text-blue-600 font-semibold">— Ana, voluntária</footer>
            </blockquote>
            <blockquote className="bg-blue-50 p-6 rounded-xl shadow">
              <p className="text-gray-700 italic">
                “Agora consigo acompanhar todas as doações e engajar mais pessoas na causa.”
              </p>
              <footer className="mt-4 text-blue-600 font-semibold">— Lucas, organizador</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="quem-somos" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Quem Somos</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
            Somos uma equipe apaixonada por transformar solidariedade em ação. Criamos esta plataforma para facilitar o processo de doação e conectar pessoas que querem ajudar com quem precisa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-blue-50 p-6 rounded-xl shadow text-left">
                <div className="w-full h-40 bg-blue-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Integrante {i}</h3>
                <p className="text-gray-600">Breve descrição sobre o papel e motivação do integrante {i}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Painel do Doador */}
      <section id="painel" className="py-20 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Painel do Doador</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
            Acompanhe suas doações, veja o impacto gerado e mantenha-se conectado com as causas que você apoia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow text-left">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Histórico de Doações</h3>
              <p className="text-gray-600">Visualize todas as doações feitas, com datas, valores e destinatários.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-left">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Impacto Gerado</h3>
              <p className="text-gray-600">Veja como sua contribuição ajudou projetos reais e pessoas em situação de vulnerabilidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action final */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Pronta para transformar vidas?
        </h2>
        <p className="text-gray-700 mb-6">
          Comece agora mesmo cadastrando sua primeira doação.
        </p>
        <a
          href="/nova-doacao"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105"
        >
          Nova Doação
        </a>
      </section>

      {/* Rodapé */}
      <footer className="bg-white py-10 text-center text-sm text-gray-500">
        <div className="opacity-80">
          © {new Date().getFullYear()} Plataforma de Doações • Criado com propósito e carinho
        </div>
      </footer>
    </div>
  );
}
