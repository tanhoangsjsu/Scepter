
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        minlength:6,
        maxlength:20,
    },
    email:{
        type:String,
        require: true,
        minlength:10,
        maxlength:50,
    },
    password:{
        type:String,
        require: true,
        minlength:6,
    },
    role:{
        type:String,
        require: true,
    },
    driverLicense:{
        type:String,
        require: false,
    },
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)