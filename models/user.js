const Joi = require('joi');
const mongoose = require("mongoose");

const User = mongoose.model('User', new mongoose.Schema({
    
    // name : String,
    // email : String,
    // password : String,
    // isAdmin : Boolean,


    name : {
        type: String, 
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    isAdmin : {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,

}));



exports.User = User;

