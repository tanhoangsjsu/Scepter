import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import MessageIcon from '@mui/icons-material/Message';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentRide } from '../redux/rideSlice';
import { useNavigate } from 'react-router-dom';
import CustomConfirmationDialog from './CustomConfirmationDialog';

const RideDetail = ({ currentRide }) => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const resetSelection = () => {
    dispatch(setCurrentRide(null));
  };
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate('/chat');
  };
  
 const handleBeforeUnload = (event) => {
    // Cancel the event to prevent the default browser behavior
    event.preventDefault();

    // Chrome requires returnValue to be set
    event.returnValue = '';

    // Display a custom confirmation message
    const confirmationMessage = 'Are you sure you want to leave? Your changes may not be saved.';
    // eslint-disable-next-line no-alert
    return (event.returnValue = confirmationMessage);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const handleFinishRide = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmFinish = () => {
    // Perform actions to finish the ride
    // ...
    
    setConfirmationDialogOpen(false);
  };

  const handleCancelFinish = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '6rem',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Avatar
        src={currentRide.avatar || currentRide[0]?.avatar}
        alt={currentRide.username}
        sx={{
          width: '100px',
          height: '100px',
          mb: 1,
        }}
      />
      <Typography variant="h4" sx={{ color: 'black', marginBottom: '1rem' }}>
        {currentRide.requestor || currentRide[0]?.username}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: '3rem',
          marginRight: '3rem',
          mt: 1,
        }}
      >
        {/* "From" line */}
        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant="body1"
            sx={{ fontSize: '18px', fontWeight: 'bold', color: 'grey' }}
          >
            From:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '18px', color: 'black' }}>
            {currentRide.pickup || currentRide[0]?.pickup}
          </Typography>
        </Grid>
        {/* "To" line */}
        <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant="body1"
            sx={{ fontSize: '18px', fontWeight: 'bold', color: 'grey', mt: 2 }}
          >
            To:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '18px', color: 'black', mt: 2 }}>
            {currentRide.destination || currentRide[0]?.destination}
          </Typography>
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5,
        }}
      >
        <Tooltip title="Send a Message">
          <IconButton color="#55EEDD" aria-label="Send a Message" sx={{ color: 'blue' }} onClick={navigateToChat}>
            <MessageIcon sx={{ fontSize: '3rem' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Finish the Ride">
          <IconButton color="#55EEDD" aria-label="Call the User" sx={{ color: 'green' }} onClick={handleFinishRide}>
            <CheckIcon sx={{ fontSize: '3rem' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel the ride">
          <IconButton color="#55EEDD" aria-label="Cancel the ride" sx={{ color: 'red' }} onClick={resetSelection}>
            <CancelIcon sx={{ fontSize: '3rem' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <CustomConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={handleCancelFinish}
        onConfirm={handleConfirmFinish}
        onReset = {resetSelection}
        message="Are you sure you want to finish your ride?"
      />
    </Box>
  );
};

export default RideDetail;
