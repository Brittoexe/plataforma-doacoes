import { motion } from "framer-motion";

export default function DonationCard({ titulo, descricao, imagem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
    >
      <motion.img
        src={imagem}
        alt={titulo}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{titulo}</h3>
      <p className="text-gray-600 mb-4">{descricao}</p>
      <motion.a
        href="/nova-doacao"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
      >
        Doar Agora
      </motion.a>
    </motion.div>
  );
}
