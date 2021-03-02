const express = require('express');
const { Msg, ObjectId } = require('./20_8_19HW');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.route('/api/comments')
    .get((req, res) => {
        Msg.find({}, (err, docs) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, docs });
        })
    })
    .post((req, res) => {
        Msg.create(req.body, (err, docs) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, docs });
        });
    });

app.route('/api/comments/:id')
    .get((req, res) => {
        const { id } = req.params;

        Msg.findById(id, (err, doc) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, doc });
        });
    })
    .put((req, res) => {
        const { id } = req.params;
        // const {likes} = req.body;

        Msg.updateOne({ _id: ObjectId(id) }, { $set: req.body }, (err, doc) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, count: doc.nModified });
        });
    })
    .delete(async (req, res) => {
        const { id } = req.params;

        try {
            const del = await Msg.deleteOne({ _id: ObjectId(id) });
            res.json({ success: true, count: del.deletedCount });
        } catch {
            res.json({ success: false });
        }
    });

app.listen(port, () => console.log(`Server running on port ${port}`));