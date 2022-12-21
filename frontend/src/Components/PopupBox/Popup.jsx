import * as React from 'react';
import { useState,useEffect } from 'react';
import io from "socket.io-client";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Loading from '../Loading/Loading';
import Noti from '../PopupBox/Noti';


const Popup = (props) => {
    const {open, setOpen, isLoading, setLoading} = props
    const [noti,setNoti] = useState([])
    const socket = io.connect("http://localhost:8000")
    useEffect(()=>{
        socket.on("receive_notification",(data)=>{
            if(data.length === 0){
                setNoti([])
            }
            else{
                setNoti(data)
                setLoading(false)
            }
        })
    },[socket])
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        color: 'black',
        borderRadius:'15px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const handleClose = () => {
        setOpen(false);
    };
    return ( 
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style, width: 400}}>
            {isLoading? 
            <>
            <h3> Looking for assistance...</h3>
            <Loading  loadingType="PacmanLoader"
                color="#777777"
                loading={isLoading}
                size="15px"/>
            </>
            :  <Noti sx={{ ...style, width: 400}} noti={noti}/>
            
            }        
        </Box>
        </Modal>
        </>
    );
}

export default Popup;