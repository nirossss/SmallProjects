const express = require('express');
const { db, ObjectId, Account } = require('./dbconnection');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());

app.get('/api/account/:accountNumber', (req, res) => {
    const { accountNumber } = req.params

    if (isNaN(accountNumber)) {
        return res.json({ success: false });
    }

    Account.find({ accountNumber: accountNumber }, (err, docs) => {
        if (err) return res.json({ success: false });

        res.json({ success: true, docs });
    })
})

app.post('/api/account', (req, res) => {
    const { accountNumber, type, sum } = req.body

    if (!accountNumber || isNaN(accountNumber) || !type || !sum || isNaN(sum)) {
        return res.json({ success: false });
    }

    if (type == 'loan') {
        const { interest, payments } = req.body
        if (!interest || isNaN(interest) || !payments || isNaN(payments)) {
            return res.json({ success: false });
        }
    }

    Account.create(req.body, (err, docs) => {
        if (err) return res.json({ success: false });

        res.json({ success: true, docs });
    });
})

app.listen(port, () => console.log(`Server running on port ${port}`));