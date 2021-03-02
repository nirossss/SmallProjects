const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: '',
    password: '123456',
    database: 'jbh_17_6'
})

module.exports = { pool };