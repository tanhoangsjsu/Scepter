const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const requestRoute = require("./routes/request")
const app = express();
const http = require('http');
const { Server } = require("socket.io")


const port = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods:["GET","POST", "DELETE"],
    }
});

let onlineUser = [];
const addNewUser = (username,socketId)=>{
    !onlineUser.some((user) => user.username === username)&&
    onlineUser.push({username,socketId});
}
const removeUser = (socketId) =>{
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
}
const getUser = (username) => {
    return onlineUser.find((user) => user.username === username);
}

io.on('connection', (socket) => {
    socket.on("Login", (username) => {
        console.log('User logged in!', socket.id);
        addNewUser(username, socket.id)
    });
    socket.on("disconnect",()=>{
        removeUser(socket.id);
    })
    socket.on("send_request",(data)=>{
        socket.broadcast.emit("receive_request", data)
        console.log(data)
    })
    socket.on("send_notification",(data)=>{
        // const receiver = data[0].socketId
        console.log(data)
        // const receiver = getUser(data)
        socket.broadcast.emit("receive_notification",data)
        // io.to(receiver.socketId).emit("receive_notification",data)
    })
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}`);
});

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({limit: '30mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
dotenv.config()

mongoose.connect("mongodb+srv://tanhoang14:3KuADKJSIhBOzJhl@cluster0.n720fe1.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log("connected to mongodb")
})

//ROUTES 
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/request", requestRoute)



