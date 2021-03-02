const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const todoSchema = Schema({
    description: { type: String },
    inCharge: { type: ObjectId, ref: 'Family' },
}, {
    collection: "todos",
    timestamps: true
});

const Todo = mongoose.model('Todos', todoSchema);

// Todo.insertMany([
//     { description: "Clean dishes", inCharge: "" },
//     { description: "Clean bathroom", inCharge: "" },
//     { description: "Cook lunch", inCharge: "5f5637b5ecaaf963a42757ec" }
// ]);

module.exports = { Todo };
