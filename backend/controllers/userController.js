const User = require("../models/User");

const userController = {
    //GET ALL USER 
    getAllUsers: async(req,res)=>{
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //DELETE USER 
    deleteUser : async(req,res)=>{
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully")
        } catch (error) {
            res.status(500).json(error)    
        }
    }
}

module.exports = userController;