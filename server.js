const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Conexão com o banco
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('API da Plataforma de Doações funcionando!');
});


// --- ROTAS DE USUÁRIOS ---
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, email, senha, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
    res.json({ message: 'Usuário cadastrado com sucesso', id: result.insertId });
  });
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
    res.json(results);
  });
});


// --- ROTAS DE DOAÇÕES ---
app.post('/doacoes', (req, res) => {
  const { titulo, descricao, categoria, usuario_id } = req.body;

  if (!titulo || !categoria || !descricao || !usuario_id) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const sql = 'INSERT INTO doacoes (titulo, descricao, categoria, usuario_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [titulo, descricao, categoria, usuario_id], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar doação:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar doação' });
    }
    res.json({ message: 'Doação registrada com sucesso', id: result.insertId });
  });
});

app.get('/doacoes', (req, res) => {
  db.query('SELECT * FROM doacoes', (err, results) => {
    if (err) {
      console.error('Erro ao buscar doações:', err);
      return res.status(500).json({ error: 'Erro ao buscar doações' });
    }
    res.json(results);
  });
});


// --- ROTAS DE SOLICITAÇÕES ---
app.post('/solicitacoes', (req, res) => {
  const { doacao_id, beneficiario_id } = req.body;

  if (!doacao_id || !beneficiario_id) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  const sql = 'INSERT INTO solicitacoes (doacao_id, beneficiario_id) VALUES (?, ?)';
  db.query(sql, [doacao_id, beneficiario_id], (err, result) => {
    if (err) {
      console.error('Erro ao criar solicitação:', err);
      return res.status(500).json({ error: 'Erro ao criar solicitação' });
    }
    res.json({ message: 'Solicitação enviada com sucesso', id: result.insertId });
  });
});

app.get('/solicitacoes', (req, res) => {
  db.query('SELECT * FROM solicitacoes', (err, results) => {
    if (err) {
      console.error('Erro ao buscar solicitações:', err);
      return res.status(500).json({ error: 'Erro ao buscar solicitações' });
    }
    res.json(results);
  });
});


// --- INICIAR SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
