const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    pickupAddress:{
        type:String,
        require:true,
    },
    dropoffAddress:{
        type:String,
        require:true,
    },
    duration:{
        type:Number,
        require:true,
    },
    distance:{
        type:Number,
        require:true,
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