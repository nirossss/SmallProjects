const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: '',
    password: '123456',
    database: 'jbh_17_6'
})

pool.query(`
        SELECT c.name FROM jbh_17_6.orders_products AS op
        LEFT JOIN jbh_17_6.orders AS o 
        ON op.order_id = o.id 
        LEFT JOIN jbh_17_6.products AS p 
        ON op.product_id = p.id 
        LEFT JOIN jbh_17_6.customers AS c 
        ON o.customer_id = c.id 
        WHERE op.product_id=(SELECT id FROM jbh_17_6.products
            WHERE price=(SELECT MAX(price) FROM jbh_17_6.products)
            );
    `, (err, res, fields) => {
    if (err) throw err;

    console.log(res);
})

pool.query(`
        SELECT price, name FROM jbh_17_6.products
        WHERE price=(SELECT MIN(price) FROM jbh_17_6.products);
    `, (err, res, fields) => {
    if (err) throw err;

    console.log(res);
})

pool.query(`
        SELECT COUNT(id) AS number_of_orders FROM jbh_17_6.orders_products;
    `, (err, res, fields) => {
    if (err) throw err;

    console.log(res);
})

pool.query(`
        SELECT c.name FROM jbh_17_6.orders AS o
        RIGHT JOIN jbh_17_6.customers AS c
        ON o.customer_id = c.id
        WHERE c.id NOT IN (SELECT customer_id FROM jbh_17_6.orders);
    `, (err, res, fields) => {
    if (err) throw err;

    console.log(res);
})