const requestController = require("../controllers/requestControllers")
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
//create requests
router.post("/", requestController.makeRequest)
//get requests
router.get("/",middlewareController.verifyToken, requestController.getRequest)
//delete requests
router.delete("/:id",middlewareController.verifyToken, requestController.deleteRequest)


module.exports = router;