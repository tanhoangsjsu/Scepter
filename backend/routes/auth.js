const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();
// const { verifyToken } = require("../controllers/verifyToken");

//REGISTER
router.post("/register", authController.registerUser);

//LOGIN
router.post("/login", authController.loginUser);

//LOG OUT
router.post("/logout", middlewareController.verifyToken, authController.logOut);

//Request
router.post("/request" )
module.exports = router;
