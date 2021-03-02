const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: '',
    password: '123456',
    database: 'jbh_sportblog'
})

pool.on('connection', () => console.log('Mysql connection'));

module.exports = { pool };