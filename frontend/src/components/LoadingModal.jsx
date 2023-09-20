// LoadingModal.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingModal = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <CircularProgress 
            sx={{ 
            justifyContent:'center', 
            display:'flex', 
            marginLeft:'1.5rem',
            marginBottom:'1rem',
            color:'#00283a'
              
          }} 
        />
        <p>Loading...</p>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;
