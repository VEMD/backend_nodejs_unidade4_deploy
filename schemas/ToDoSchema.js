// Importação de schema e model do mongoose
const {Schema, model} = require('mongoose');

// Cria o esquema
const ToDoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Exporta o esquema para utilizar em outro local
module.exports = model('ToDo', ToDoSchema);