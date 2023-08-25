const mongoose = require("mongoose");
const createError = require("http-errors");
const Practice = require("../models/practice.model");
const Koder = require("../models/koders.model");

async function getAll() {
    const allPractice = await Practice.find().populate({path: 'koder', select: "firstName lastName program email"});
    return allPractice;
}

async function getById(practiceId) {
    if(!mongoose.isValidObjectId(practiceId)) {
        throw new createError(400, "Invalid id");
    }

    const practice = await Practice.findById(practiceId).populate({path: 'koder', select: "firstName lastName program email"});
    if(!practice) {
        throw new createError(404, "Practice not found");
    }

    return practice;
}

async function create(practiceObject) {
    const koderId = practiceObject.koder;
    if(!mongoose.isValidObjectId(koderId)) {
        throw new createError(404, "invalid id of Koder");
    }
    const koder = await Koder.findById(koderId);
    if(!koder) {
        throw new createError(404, "Koder not found");
    }
    const newPractice = await Practice.create(practiceObject);
    return newPractice;
}

async function deleteById(practiceId) {
    if(!mongoose.isValidObjectId(practiceId)) {
        throw new createError(400, "Invalid id");
    }
    const practice = await Practice.findByIdAndDelete(practiceId);
    if(!practice) {
        throw new createError(404, "Practice not found");
    }
    return practice;
}

async function updateById(practiceId, practiceObject) {
    if(!mongoose.isValidObjectId(practiceId)) {
        throw new createError(400, "Invalid id");
    }

    const practiceUpdated = await Practice.findByIdAndUpdate(practiceId, practiceObject, {new: true, runValidators: true}).populate({path: 'koder', select: "firstName lastName program email"});
    if(!practiceUpdated) {
        throw new createError(404, "practice not found");
    }

    return practiceUpdated;
}

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateById
}