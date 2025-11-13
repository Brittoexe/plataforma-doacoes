const express = require('express');
const app = express();
const port = 3000;

const db = require('./db');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor da plataforma de doações está funcionando!');
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ error: 'Erro no servidor' });
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
