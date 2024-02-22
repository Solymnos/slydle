const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mail : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    streak : {
        type : Number,
        required : false,
    },
    score : {
        type : Number,
        required : false,
    }
})

module.exports = mongoose.model('Users', userSchema);