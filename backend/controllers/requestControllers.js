const Request = require("../models/Request")
const requestController = {
    //MAKE REQUEST 
    makeRequest: async(req,res) =>{
        try {
            //create new request 
            const newRequest = await new Request({
                username: req.body.username,
                pickupAddress: req.body.pickup,
                dropoffAddress: req.body.dropoff,
                duration: req.body.duration,
                distance: req.body.distance,
            })
            //save to DB 
            const request = await newRequest.save();
            res.status(200).json(request);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //GET REQUEST 
    getRequest: async(req,res) =>{
        try {
            const request = await Request.find();
            res.status(200).json(request);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //DELETE REQUEST 
    deleteRequest: async(req,res)=>{
        try {
            const request = await Request.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully")
        } catch (error) {
            res.status(500).json(error);

        }
    },

}

module.exports = requestController;