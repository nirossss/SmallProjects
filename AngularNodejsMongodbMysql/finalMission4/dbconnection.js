const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

mongoose.connect('', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.once('open', () => console.log('Mongodb connect!'));

const AccountOperations = Schema({
    accountNumber: { type: Number },
    type: { type: String },
    sum: { type: Number },
    interest: { type: Number },
    payments: { type: Number }
}, {
    collection: "AccountOperations",
    timestamps: true
});

const Account = mongoose.model('Todos', AccountOperations);

// Account.insertMany([
//     { accountNumber: 1, type: "deposit", sum: 1000 },
//     { accountNumber: 1, type: "withdrawal", sum: 1500 },
//     { accountNumber: 1, type: "loan", sum: 10000, interest: 10, payments: 12 },
//     { accountNumber: 2, type: "loan", sum: 20000, interest: 5, payments: 8 },
//     { accountNumber: 2, type: "withdrawal", sum: 2500 }
// ]);

module.exports = { db, ObjectId, Account };