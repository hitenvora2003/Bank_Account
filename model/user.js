const mongoose = require('mongoose')
const userschema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true,"please enter your name"],
    },
    email : {
        type : String,
        required : [true,"please enter your email"],
        unique : [true,"Email already exists. Please use a different one."]
    },
    phone : {
        type : Number,
        required : [true,"please enter your phone number"],
    
    },
    password : {
       type : String,
       required : [true,"please enter your password"]
    }
})
module.exports = mongoose.model('user',userschema)