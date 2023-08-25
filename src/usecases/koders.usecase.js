const mongoose = require("mongoose");
const createError = require("http-errors");
const Koder = require("../models/koders.model");

//GET /koders
async function getAll() {
    const allKoders = await Koder.find();
    return allKoders;
}

//POST /koders
async function create(koderObject) {
    const newKoder = await Koder.create(koderObject);
    return newKoder;
}

//GET /koders/:id
async function getById(koderId) {
    if(!mongoose.isValidObjectId(koderId)) {
        throw new createError(400, "Invalid id");
    }
    const koder = await Koder.findById(koderId);
    if(!koder) {
        throw new createError(404, "Koder no econtrado")
    }
    return koder;
}

async function deleteById(koderId) {
    if(!mongoose.isValidObjectId(koderId)) {
        throw new createError(400, "Invalid id");
    }
    const koder = await Koder.findByIdAndDelete(koderId);
    if(!koder) {
        throw new createError(404, "Koder no encontrado");
    }
    return koder;
}

async function updateKoder(koderId, koderObject) {
    if(!mongoose.isValidObjectId(koderId)) {
        throw new createError(400, "Invalid id"); 
    }
    const koderUpdated = await Koder.findByIdAndUpdate(koderId, koderObject, { new: true });
    if(!koderUpdated) {
        throw new createError(404, "Koder no encontrado");
    }
    return koderUpdated;
}

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateKoder
};