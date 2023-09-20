const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    requestor:{
        type:String,
        required: true,
    },
    pickup:{
        type:String,
        require:true,
    },
    destination:{
        type:String,
        require:true,
    },
    status: {
        type: Number,
        default: 0, // You can define different status codes for the ride
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    acceptor:{
        type: String,
    
    },
},{timestamps: true})

module.exports = mongoose.model("Request", requestSchema)