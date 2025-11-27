const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

// Conexão com o banco
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Servir o frontend (build)
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

/*Rota inicial
app.get('/', (req, res) => {
  res.send('API da Plataforma de Doações funcionando!');
});*/


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

// --- LOGIN ---
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const sql = 'SELECT id, nome, email, tipo FROM usuarios WHERE email = ? AND senha = ? LIMIT 1';
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = results[0];
    res.json({
      message: 'Login realizado com sucesso',
      usuario
    });
  });
});

// DELETE usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso' });
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
    res.json({ message: 'Doação registrado com sucesso', id: result.insertId });
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

// DELETE doação
app.delete('/doacoes/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM doacoes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar doação:', err);
      return res.status(500).json({ error: 'Erro ao deletar doação' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Doação não encontrada' });
    }

    res.json({ message: 'Doação deletada com sucesso' });
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

// DELETE solicitação
app.delete('/solicitacoes/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM solicitacoes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar solicitação:', err);
      return res.status(500).json({ error: 'Erro ao deletar solicitação' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    res.json({ message: 'Solicitação deletada com sucesso' });
  });
});



// ---SOLICITAÇÕES (beneficiário) ---
app.get('/minhas-solicitacoes', (req, res) => {
  const { beneficiario_id } = req.query;

  if (!beneficiario_id) {
    return res.status(400).json({ error: 'beneficiario_id é obrigatório' });
  }

  const sql = `
    SELECT 
      s.id,
      s.doacao_id,
      s.status,
      s.criado_em,
      d.titulo,
      d.descricao,
      d.categoria
    FROM solicitacoes s
    JOIN doacoes d ON s.doacao_id = d.id
    WHERE s.beneficiario_id = ?
    ORDER BY s.criado_em DESC
  `;

  db.query(sql, [beneficiario_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar minhas solicitações:', err);
      return res.status(500).json({ error: 'Erro ao buscar minhas solicitações' });
    }
    res.json(results);
  });
});


// --- SOLICITAÇÕES RECEBIDAS (doador) ---
app.get('/solicitacoes-recebidas', (req, res) => {
  const { doador_id } = req.query;

  if (!doador_id) {
    return res.status(400).json({ error: 'doador_id é obrigatório' });
  }

  const sql = `
    SELECT 
      s.id,
      s.doacao_id,
      s.status,
      s.criado_em,
      d.titulo,
      d.descricao,
      d.categoria,
      u.nome AS beneficiario_nome,
      u.email AS beneficiario_email
    FROM solicitacoes s
    JOIN doacoes d ON s.doacao_id = d.id
    JOIN usuarios u ON s.beneficiario_id = u.id
    WHERE d.usuario_id = ?
    ORDER BY s.criado_em DESC
  `;

  db.query(sql, [doador_id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar solicitações recebidas:', err);
      return res.status(500).json({ error: 'Erro ao buscar solicitações recebidas' });
    }
    res.json(results);
  });
});



// --- ATUALIZAR STATUS DA SOLICITAÇÃO (aceitar/recusar) ---
app.put('/solicitacoes/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const statusPermitidos = ['pendente', 'aceita', 'recusada'];
  if (!status || !statusPermitidos.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  const sql = 'UPDATE solicitacoes SET status = ? WHERE id = ?';

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar status da solicitação:', err);
      return res.status(500).json({ error: 'Erro ao atualizar status da solicitação' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    res.json({ message: 'Status atualizado com sucesso' });
  });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});



// --- INICIAR SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
