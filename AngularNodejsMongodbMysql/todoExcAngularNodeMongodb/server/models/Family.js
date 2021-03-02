const mongoose = require('mongoose');
const { Schema } = mongoose;

const familySchema = Schema({
    name: { type: String },
    nickName: { type: String },
    role: { type: String }
}, {
    collection: "family",
    timestamps: true
});

const Family = mongoose.model('Family', familySchema);

// Family.insertMany([
//     { name: "Eti", nickName: "Ima", role: "Mother" },
//     { name: "Ran", nickName: "Aba", role: "Father" },
//     { name: "Nir", nickName: "Nirossss", role: "First born son" },
//     { name: "Yaniv", nickName: "Gaga", role: "Second born son" },
//     { name: "Keren", nickName: "Karnushkalach", role: "third born daughter" }
// ]);

module.exports = { Family };