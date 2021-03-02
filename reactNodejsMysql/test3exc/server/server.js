const express = require('express');
const { pool } = require('./mysql');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.route('/api/games')
    .get((req, res) => {
        pool.query('SELECT * FROM results', (err, results, fields) => {
            if (err) throw err;

            res.json({ success: true, data: results });
        });
    })

app.route('/api/comments/:id')
    .get((req, res) => {
        const id = req.params.id;

        if (isNaN(id)) {
            res.sendStatus(404)
            return
        }

        pool.query(`
            SELECT * FROM jbh_sportblog.comments
            WHERE game = ?
            `, [id], (err, results, fields) => {
            if (err) throw err;

            res.json({ success: true, data: results });
        }
        );
    })

app.route('/comment')
    .post((req, res) => {
        const { text, id } = req.body

        if (text.length > 200 || isNaN(id)) {
            res.sendStatus(403)
            return
        }

        pool.query(`
                    INSERT INTO comments (comment, game)
                    VALUES (?,?);
                `, [text, id], (err, results) => {
            if (err) throw err

            res.json({ success: true, msg: results.insertId });
        });
    })

app.listen(port, () => console.log(`Server running on port ${port}`));