const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

//GET ALL USERS 
router.get("/", middlewareController.verifyToken,userController.getAllUsers);

//DELETE USER 
router.delete("/:id",middlewareController.verifyToken ,userController.deleteUser)
module.exports = router;