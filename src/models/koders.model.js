const mongoose = require("mongoose");

const kodersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"El primero nombre es obligatorio"],
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: [true,"El segundo nombre es obligatorio"],
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    program: {
        type: String,
        enum: {
            values: ["javascript", "python", "ios"],
            message: "{VALUE} no es un valor valido"
        },
        required: true,
        trim: true
    } ,
    email: {
        type: String,
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "El correo no es valido"],
        required: [true, "El correo es obligatorio"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        trim: true
    }
});

module.exports = mongoose.model('koder', kodersSchema);