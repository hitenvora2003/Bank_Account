const mongoose = require('mongoose')
const accountschema =  new mongoose.Schema({
    name : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true,"please enter your name"],
    },
    accountNo : {
        type : Number,
        required : [true,"please enter your account number"],
        unique : [true,"account number already exists. Please use a different one."]
    },
    bank_balance : {
       type : Number,
       required : [true,"please enter your bank_balance"]
    }
})
module.exports = mongoose.model('bank',accountschema)