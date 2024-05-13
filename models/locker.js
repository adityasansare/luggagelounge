const mongoose = require("mongoose");

const lockerSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
    },
    imageurls : [],
    rentperday : {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    maxcount : {
        type: Number,
        required: true
    },
    phonenumber : {
        type : Number,
        required : true
    },
    currentbookings : [],
    description : {
        type : String,
        required : true
    }
} , {
    timestamps : true
})

const lockerModel = mongoose.model('lockers', lockerSchema)

module.exports = lockerModel