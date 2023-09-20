const requestController = require("../controllers/requestControllers")

const router = require("express").Router();
//create requests
router.post("/", requestController.makeRequest)
//get requests
router.get("/", requestController.getRequest)
//delete requests
router.delete("/:id", requestController.deleteRequest)


module.exports = router;