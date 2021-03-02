const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

mongoose.connect('', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.once('open', () => console.log('Mongodb connect!'));

module.exports = { db, ObjectId };