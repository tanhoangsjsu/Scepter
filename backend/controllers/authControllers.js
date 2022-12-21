var User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authController = {
//REGISTER
registerUser: async (req, res) => {
    const { username, email, password, role} = req.body;
try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await new User({
    username: username,
    email: email,
    password: hashed,
    role: role,
    });
    //Save user to DB
    const user = await newUser.save();
    const accessToken = jwt.sign({
        id: user.id,
        username: user.username,
    },
    "sceptersecretkey",
    {expiresIn:"2h"}
    );
    res.status(200).json({user, accessToken});
} catch (err) {
    res.status(500).json(err);
}
},
//LOGIN 
loginUser : async(req,res)=>{
    const { username, password} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json("Wrong username");
        }
        const validPassword = await bcrypt.compare(
            password, user.password
        )
        if(!validPassword){
            return res.status(400).json("Wrong password")
        }
        if(user && validPassword){
            const accessToken = jwt.sign({
                id: user.id,
                username: user.username,
            },
            "sceptersecretkey",
            {expiresIn:"2h"}
            );
            const {password, ...others} = user._doc;
            return res.status(200).json({...others, accessToken})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
},
  //LOG OUT
    logOut: async (req, res) => {
    //Clear cookies when user logs out
    // res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
},

};

module.exports = authController;