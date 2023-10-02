import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import io from "socket.io-client";
import { setCurrentRide, setRideRequest } from "../redux/rideSlice"; // Import the action
import { Button, Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room"; // Import the RoomIcon
import { deleteOneRequest, getAllRequest } from "../redux/apiRequest";
import { v4 as uuidv4 } from 'uuid';
import { baseSocketURL, imageUrl } from "../utils/listContainer";
import RideDetail from "./RideDetail";

const RideList = () => {
  const [ride, setRide] = useState([]);
  const socket = useRef(io.connect(baseSocketURL));
  const dispatch = useDispatch(); // Get the dispatch function
  const user = useSelector((state) => state.auth.login.currentUser);
  const currentRide = useSelector((state) => state.ride.currentRide);
  const rideRequest = useSelector((state) => state.ride.rideRequest);
  
  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await getAllRequest(dispatch);
        if (response && response.data) {
          setRide(response.data);
        } else {
          console.error("No data in the response:", response);
        }
      } catch (error) {
        console.error("Error fetching ride requests", error);
      }
    };
  fetchRideRequests(); 
    socket.current.on("receive_request", (request) => {
      // Dispatch the setRideRequest action with the new request
      dispatch(setRideRequest(request));
    });

    return () => {
      socket.current.disconnect();
    };
  }, [dispatch]); // Add dispatch to the dependency array
  useEffect(() => {
    // Log currentRide when it changes
    console.log('Current Ride:', currentRide);
  }, [currentRide]);
  const handleAccept = async (request) =>{
    try {
      // Emit a notification
      socket.current.emit("send_notification", [{ 
        avatar: imageUrl || user.UserImage,
        // rideUuid: rideUuid,
        username: user.username,
        pickup: request.pickup,
        destination: request.destination,
        status: 0,
      }]);
      
      dispatch(setCurrentRide(request));
      // Find the index of the element with the matching _id
      const index = ride.findIndex((req) => req._id === request._id);
      

      if (index !== -1) {
        // Remove the element from the ride array
        const updatedRide = [...ride];
        updatedRide.splice(index, 1);
  
        // Delete the request via API
        await deleteOneRequest(dispatch, request._id);
  
        // Update the local state
        setRide(updatedRide);
      } else {
        console.error("Request not found in the ride array");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
}
const handleDecline =(request) =>{
  // Find the index of the element with the matching id
  const index = ride.findIndex((req) => req.id === request.id);

  // Remove the element from the receive array using splice()
  const updatedReceive = [...ride];
  updatedReceive.splice(index, 1);
  setRide(updatedReceive);
}
console.log(rideRequest);
  return (
    // !currentRide ?
    <Box
      sx={{
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          fontSize: "1.25rem",
          fontWeight: "600",
          padding: "1.25rem 0 1.25rem 1.25rem",
          color: "black",
        }}
      >
        Ride Requests
      </Typography>
      <Box sx={{
         maxHeight: "400px", // Adjust the maximum height as needed
         overflowY: "auto", // Enable vertical scrolling when content overflows
      }}>
        {ride.length > 0 &&
          ride.map((request) => (
            <ListItem
              key={uuidv4()} 
              sx={{
                marginBottom: "1rem",
                color: "black",
              }}
            >
              <ListItemIcon>
                <RoomIcon
                  color="primary"
                  sx={{ marginBottom: "2rem", color: "#708090" }}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", marginY: "0.5rem" }}
                >
                  <span style={{ fontWeight: "bold", color: "#708090" }}>
                    From:
                  </span>{" "}
                  {request.pickup || "Loading..."}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", marginY: "0.5rem" }}
                >
                  <span style={{ fontWeight: "bold", color: "#708090" }}>
                    To:
                  </span>{" "}
                  {request?.destination || "Loading..."}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", marginY: "0.5rem" }}
                >
                  <span style={{ fontWeight: "bold", color: "#708090" }}>
                    Requestor:
                  </span>{" "}
                  {request.requestor || "Loading..."}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", marginY: "0.5rem" }}
                >
                  <span style={{ fontWeight: "bold", color: "#708090" }}>
                    Status:
                  </span>{" "}
                  {request.status === 0 ? "Pending" : "Loading..."}
                </Typography>
                <Grid sx={{ display:'flex'}}>
                  <Button
                    sx={{
                      display: "flex",
                      marginTop: "1rem",
                      backgroundColor: "#fccf76", // Background color
                      fontSize:'12px',
                      marginRight:'0.5rem',
                      color: "#00283a", // Text color
                      "&:hover": {
                        backgroundColor: "#00d084", // Hover background color
                        color:'#00283a'
                      },
                    }}
                    onClick={() => handleAccept(request)}
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{
                      display: "flex",
                      marginTop: "1rem",
                      backgroundColor: "#fccf76", // Background color
                      fontSize:'12px',
                      color: "#00283a", // Text color
                      "&:hover": {
                        backgroundColor: "#00d084", // Hover background color
                        color:'#00283a'
                      },
                    }}
                    onClick={() => handleDecline(request)}
                  >
                   Decline
                  </Button>
                </Grid>
              </ListItemText>
            </ListItem>
          ))}
      </Box>
    </Box>
     
    // :
    // <RideDetail currentRide={currentRide}/>
 
  );
};

export default RideList;
