const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    repository: {
        type: String,
        required: [true, "Repository is required"],
        trim: true,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/, "The URL doesnt match"]
    },
    koder: {
        //Tipo de dato Object Id para referenciar un atributo con colección o modelo
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Koder is required"],
        trim: true,
        //Nombre del modelo
        ref: "koder"
    }
});

module.exports = mongoose.model('practice', practiceSchema);