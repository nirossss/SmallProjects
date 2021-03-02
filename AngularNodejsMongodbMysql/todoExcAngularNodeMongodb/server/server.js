const express = require('express');
const { db, ObjectId } = require('./dbConnection');
const { Family } = require('./models/Family');
const { Todo } = require('./models/Todo');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());

app.get('/api/family', (req, res) => {
    Family.find({}, (err, docs) => {
        if (err) return res.json({ success: false });

        res.json({ success: true, docs });
    })
})

app.route('/api/todos')
    .get((req, res) => {
        Todo.find().populate('inCharge').exec((err, docs) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, data: docs });
        });
    })
    .post((req, res) => {
        const { inCharge, description } = req.body

        if (new ObjectId(inCharge) != inCharge || !inCharge.trim() || !description.trim() || description.includes('{') || description.includes('<')) {
            res.json({ success: false });
            return;
        }

        Todo.create(req.body, (err, docs) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, docs });
        });
    });

app.post('/api/todos/delete', async (req, res) => {
    const { todoId } = req.body;

    try {
        const del = await Todo.deleteOne({ _id: ObjectId(todoId) });
        res.json({ success: true, count: del.deletedCount });
    } catch {
        res.json({ success: false });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));