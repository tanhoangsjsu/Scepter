import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const RideRequestModal = ({ open, onClose, onRequestRide }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{
        color: "#00283a",
      }}>You entered the pickup location successfully. Do you want to request a ride now?</DialogTitle>
      <DialogContent>
  
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" sx={{
          color: "#00283a",
        }}>
          Cancel
        </Button>
        <Button 
                onClick={onRequestRide} 
                color="primary" 
                variant="contained"
                sx={{
                    color: "#00283a",
                    backgroundColor: "#fccf76",
                    "&:hover": {
                        backgroundColor: "#00d084", // Hover background color
                        color:'#00283a'
                    },
                  }}
        >
          Requesting a ride now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RideRequestModal;
