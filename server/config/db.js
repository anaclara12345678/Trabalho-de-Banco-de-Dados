const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '12345',
    database: 'alocacao_db'
});

module.exports = db;