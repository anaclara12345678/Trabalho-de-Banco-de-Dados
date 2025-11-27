const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'Paulabessa21.',
    database: 'banco de dados'
});

module.exports = db;