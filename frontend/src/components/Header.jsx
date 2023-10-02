import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../redux/apiRequest';
import { logoutWithGoogle } from '../redux/authSlice';
import { imageUrl } from '../utils/listContainer';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleRoutetoProfile = () => {
    navigate('/profile');  
  };
  const handleLogout = () => {
    if (user?.accessToken) {
      logOutUser(dispatch, user._id, navigate);
    } else {
      dispatch(logoutWithGoogle());
      navigate('/login');
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1A1A' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#55EEDD' }}>
          SCEPTER
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}> 
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Avatar className="user-img" src={user?.userImage || imageUrl} alt="User Profile" />
          </IconButton>
          <Typography className="user-name" sx={{ marginLeft: '0.175rem' }}>{user.username}</Typography>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
        <MenuItem onClick={handleRoutetoProfile}>
            <AccountCircleIcon />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToAppIcon />
            Logout
          </MenuItem>
          <MenuItem>
            <HelpOutlineIcon />
            Help
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
