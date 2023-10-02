import React from "react";
import { useSelector } from "react-redux";
import { imageUrl } from "../utils/listContainer";
import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  width: "200px", 
  height: "50px", 
  padding: "10px",
  margin: "10px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  cursor: "pointer",
};

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/homepage");
  };

  return (
    <>
      <IconButton
        color="primary"
        sx={{
          display:'flex',
          justifyContent:'flex-start',
          marginBottom:'2rem',
        }}
        onClick={handleBackButtonClick}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={user.userImage || imageUrl}
            alt="profile"
            sx={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <h1 sx={{ marginTop: "10px", fontSize: "24px", color: "#333" }}>
            {user.username}
          </h1>
        </Box>

        <IconButton
          sx={{
            ...buttonStyle,
            backgroundColor: "#fccf76",
            color: "#00283a",
            "&:hover": {
                backgroundColor: '#00d084',
                color: '#00283a',
            },
          }}
        >
          <AccountCircleIcon />
          Edit Profile
        </IconButton>

        <IconButton
          sx={{
            ...buttonStyle,
            backgroundColor: "#fccf76",
            color: "#00283a",
            "&:hover": {
                backgroundColor: '#00d084',
                color: '#00283a',
            },
          }}
        >
          <SettingsIcon />
          Settings
        </IconButton>
      </Box>
    </>
  );
};

export default ProfilePage;
