const express = require('express');
const { pool } = require('./dbConnection');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.route('/products')
    .get((req, res) => {
        pool.query('SELECT * FROM products', (err, results, fields) => {
            if (err) throw err;

            res.json(results);
        });
    })
    .post((req, res) => {
        const { products } = req.body;

        // products = [['mi', '2020', 800, 3], ['HP-omen', '2019', 4000, 4]]

        pool.query('INSERT INTO products (name, year, price, rating) VALUES (?)', [products], (err, results, fields) => {
            if (err) throw err;

            res.json(results.insertId);
        });
    })

app.route('/products/:id')
    .get((req, res) => {
        const productsID = req.params.id;

        pool.query('SELECT * FROM products WHERE id=?', [productsID], (err, results, fields) => {
            if (err) throw err;

            res.json(results);
        });
    })
    .put((req, res) => {
        const productsID = req.params.id;
        const { product } = req.body;

        // product : {name: 'xiaumi', rating: 4}

        pool.query('UPDATE products SET ? WHERE id=?', [product, productsID], (err, results, fields) => {
            if (err) throw err;

            res.json({ success: results.changedRows > 0 });
        });
    })
    .delete((req, res) => {
        const productsID = req.params.id;

        pool.query('DELETE FROM products WHERE id=?', productsID, (err, results, fields) => {
            if (err) throw err;

            res.json({ success: results.affectedRows > 0 });
        });
    })

app.listen(port, () => console.log(`Server running on port ${port}`));