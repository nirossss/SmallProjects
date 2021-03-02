const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

// 'mongodb://localhost'
mongoose.connect('', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
//
const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.once('open', () => console.log('Mongodb connect!'));

const msgSchema = Schema({
    likes: { type: Number },
    created: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, default: function () { return this.title.toLowerCase() } }
}, {
    collection: "msgs",
    timestamps: true
});

const Msg = mongoose.model('Msg', msgSchema);

// const firstMsg = new Msg({
//     likes: 2,
//     title: "test"
// });

// firstMsg.save();

// Msg.create({ title: "hello1" }, function (err, doc) {
//     // doc.likes = 3;
//     doc.title = "hello ";
//     doc.content = "hello world"
//     doc.save();
// });

// Msg.updateOne({ title: "hello " }, { $set: { likes: 3 } }, (err, doc) => {
//     console.log(doc);
// })

// Msg.updateOne({ title: "hello " }, { $set: { likes: 1, content: "changed" } }, (err, doc) => {
//     console.log(doc);
// })

module.exports = { Msg, ObjectId: Types.ObjectId };