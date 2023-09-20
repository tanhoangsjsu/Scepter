import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from '@mui/material';
import { logOutUser } from "../redux/apiRequest"
import { logoutWithGoogle } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { imageUrl } from '../utils/listContainer';


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    // Handle logout here
    const handleLogout =()=>{
        if(user && user.accessToken){
            logOutUser(dispatch, user.id, navigate);
        }
        else{
            dispatch(logoutWithGoogle());
            navigate("/login");
        };
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1A1A1A" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#55EEDD" }}>
                    SCEPTER
                </Typography>
                <IconButton color="inherit">
                    <Avatar
                        className="user-img"
                        src={user.userImage || imageUrl} // Use the default image if userImage is not available
                        alt="User Profile"
                    />
                </IconButton>
                <div className="user-name">{user.username}</div>
                <IconButton color="inherit" onClick={handleLogout}>
                    <ExitToAppIcon /> {/* You can use the same icon for logout action */}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
