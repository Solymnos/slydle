const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
    dailyId : Number,
    lastId : [Number]
})

module.exports = mongoose.model('gameData', gameDataSchema);