const mongoose = require("mongoose")

const triviaSchema = new mongoose.Schema({
    question: { type: String, require: true, unique: true },
    answer: { type: String, require: true },
    id: { type: Number, require: true },
    state: { type: String, require: true, default: "ready" },
})

const model = mongoose.model('TriviaModels', triviaSchema)

module.exports = model