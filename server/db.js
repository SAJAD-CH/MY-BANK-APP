const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/UKBANK',{
    useNewUrlParser:true
})


const Customer = mongoose.model('Customer',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:Array,
    adharcard:Number,
    pancard:String,
    creditbalance:Number
})

module.exports={Customer}