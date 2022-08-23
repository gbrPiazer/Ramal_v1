const mongoose = require("mongoose")
const Schema =  mongoose.Schema;

const Setor = new Schema({
    nome: {
        type: String,
        require: true
    }
})

mongoose.model("setores", Setor)