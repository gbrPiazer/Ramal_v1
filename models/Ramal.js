const mongoose = require("mongoose")
const Schema =  mongoose.Schema;

const Ramal = new Schema({
    email: {
        type: String,
        require: true
    },
    ramal: {
        type: Number,
        require: true
    },
    nome_func: {
        type: String,
        require: true
    },
    setor: {
        type: Schema.Types.ObjectId,
        ref: "setores",
        foreignField: '_id',
        require: true
    }
})

mongoose.model("ramais", Ramal)