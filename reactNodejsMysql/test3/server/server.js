const express = require('express');
const { pool } = require('./mysql');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.route('/api/products')
    .get((req, res) => {
        pool.query(`
            SELECT p.id, p.name, p.price, p.units, p.time_updated, m.producer_name FROM JBH_29_7_test3.products AS p
            LEFT JOIN JBH_29_7_test3.producers AS m
            ON m.id = p.producer;
        `, (err, results) => {
            if (err) throw err;

            res.json({ success: true, data: results });
        });
    })

app.post('/api/products/:id/units', (req, res) => {

    const id = req.params.id;
    const { units } = req.body;

    if (isNaN(id) || isNaN(units)) {
        res.sendStatus(404)
        return
    }

    pool.query(`
        UPDATE products SET products.units = ?
        WHERE products.id = ?;
    `, [units, id], (err, results) => {
        if (err) throw err

        res.json({ success: true, msg: results.affectedRows });
    });
})

app.listen(port, () => console.log(`Server running on port ${port}`));