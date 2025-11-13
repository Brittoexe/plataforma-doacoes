const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API da Plataforma de Doações funcionando!');
});

app.post('/usuarios', (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, email, senha, tipo], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
        res.json({ message: 'Usuário cadastrado com sucesso', id: result.insertId });
    });
});

app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar usuários' });
        res.json(results);
    });
});

app.post('/doacoes', (req, res) => {
    const { titulo, descricao, categoria, usuario_id } = req.body;
    const sql = 'INSERT INTO doacoes (titulo, descricao, categoria, usuario_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, descricao, categoria, usuario_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao cadastrar doação' });
        res.json({ message: 'Doação registrada com sucesso', id: result.insertId });
    });
});

app.get('/doacoes', (req, res) => {
    db.query('SELECT * FROM doacoes', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar doações' });
        res.json(results);
    });
});

app.post('/solicitacoes', (req, res) => {
    const { doacao_id, beneficiario_id } = req.body;
    const sql = 'INSERT INTO solicitacoes (doacao_id, beneficiario_id) VALUES (?, ?)';
    db.query(sql, [doacao_id, beneficiario_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Erro ao criar solicitação' });
        res.json({ message: 'Solicitação enviada com sucesso', id: result.insertId });
    });
});

app.get('/solicitacoes', (req, res) => {
    db.query('SELECT * FROM solicitacoes', (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar solicitações' });
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
