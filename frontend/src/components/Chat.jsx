import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { baseSocketURL } from "../utils/listContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isDriver, setIsDriver] = useState(true);
  const socket = io(baseSocketURL);

  const user = useSelector((state) => state.auth.login.currentUser);
  const rideRequest = useSelector((state) => state.ride.rideRequest);
  const acceptedRide = useSelector((state) => state.ride.acceptedRide);

  const rideRequestRequestor = rideRequest?.request?.[0]?.requestor || rideRequest?.requestor;
  const acceptedRideRequestor = acceptedRide ? (acceptedRide.requestor || acceptedRide[0]?.username) : null;

  useEffect(() => {
    if (user && rideRequestRequestor === user.username) {
      setIsDriver(true);
    } else if (rideRequestRequestor || acceptedRideRequestor === user.username) {
      setIsDriver(false);
    }
  }, [acceptedRide, rideRequest, user.username]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    socket.emit("join_private_chat", { sender: rideRequestRequestor, receiver: acceptedRideRequestor });

    socket.on("private_chat_joined", (room) => {
      setRoomName(room);
    });

    socket.on("receive_private_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit("leave_private_chat", roomName);
      socket.disconnect();
    };
  }, [roomName]);

  const handleSendMessage = () => {
    const sender = isDriver ? 'DriverA' : 'Student';
    const newMessage = { text: messageInput, sender };
    socket.emit("send_private_message", { roomName, message: newMessage });
    setMessageInput("");
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          marginBottom: "8px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            backgroundColor: message.sender === 'DriverA' ? "#fccf76" : "#104d63",
            borderRadius: "8px",
            padding: "8px 16px",
            color: message.sender === 'DriverA' ? "#00283a" : "#fff",
            marginRight: "10px",
          }}
        >
          {`${message.sender}: ${message.text}`}
        </Typography>
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100vh",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "16px",
        }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon sx={{ color: "black", cursor: "pointer" }} />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          width: "100%",
        }}
      >
        {renderMessages()}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <IconButton color="primary" aria-label="Send" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
