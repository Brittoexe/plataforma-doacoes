const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '508032',
    database: 'plataforma_doacoes'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err);
        return;
    }
    console.log('Conectado ao banco de dados plataforma_doacoes!');
});

module.exports = connection;
