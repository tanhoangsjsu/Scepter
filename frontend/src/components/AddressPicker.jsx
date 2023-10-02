import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../App.css"
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { setSelectedFrom, setSelectedTo } from '../redux/locationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import io from 'socket.io-client';
import { setCurrentRide, setLoading, setRideRequest } from '../redux/rideSlice';
import { makeRequest } from "../redux/apiRequest";
import { baseSocketURL, imageUrl} from '../utils/listContainer';
import RideDetail from './RideDetail';
import Chat from './Chat';
import RideRequestModal from './RequestRide';
import LoadingModal from './LoadingModal';

const AddressPicker = () => {
  const dispatch = useDispatch();
  const selectedFrom = useSelector((state) => state.address.selectedFrom);
  const selectedTo = useSelector((state) => state.address.selectedTo);
  const user = useSelector((state) => state.auth.login.currentUser);
  const currentRide = useSelector((state) => state.ride.currentRide);
  const rideRequest = useSelector((state) => state.ride.rideRequest);

  const [searchResults, setSearchResults] = useState([]);
  const [isFrom, setIsFrom] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const socket = useRef(io.connect(baseSocketURL)); 


  const provider = useRef();
  const searchRef = useRef(null);

  const [step, setStep] = useState(1); // Initial step

  const onInputChanged = (e) => {
    const input = e.target.value;
    provider.current.search({ query: input })
    .then(results => {
      setSearchResults(() => results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  useEffect(() => {
    initProvider();
  }, []);

  const initProvider = () => {
    provider.current = new OpenStreetMapProvider({
      params: {
        'accept-language': 'en',
        countrycodes: "us"
      }
    });
  }

  const onLocationSelected = (selectedLocation) => {
    console.log(selectedLocation);
    if (selectedLocation && selectedLocation.label && selectedLocation.x && selectedLocation.y) {
      if (isFrom) {
        dispatch(setSelectedFrom(selectedLocation));
        setIsFrom(false);
      } else {
        dispatch(setSelectedTo(selectedLocation));
        setIsFrom(true);
        setStep(2); // Move to the next step
      }
      setSearchResults([]);
      searchRef.current.value = selectedLocation.label;
    }
  };

  const resetSelection = () => {
    dispatch(setSelectedFrom(null));
    dispatch(setSelectedTo(null));
    setIsFrom(true); // Reset to the "From" input
    setStep(1); // Reset to the first step
  };

  const openModal = () => {
    // Check if the user has completed both inputs before opening the modal
    if (selectedFrom && selectedTo) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestRide = () => {
    if (user && selectedFrom && selectedTo) {
      const rideUuid = uuidv4();
      const ride = {
        "avatar": imageUrl || user.UserImage,
        "rideUuid": rideUuid,
        "requestor": user.username,
        "role": user.role,
        "pickup": selectedFrom.label,
        "destination": selectedTo.label,
        "studentCoordsX":selectedFrom.x,
        "studentCoordsY":selectedFrom.y,
        "status": 0
      }
      dispatch(setRideRequest(ride));
      setLoading(true);
      makeRequest(ride, dispatch);
      socket.current.emit("send_request", { request: [ride] });
    }
    closeModal();
  };

  useEffect(() => {
    socket.current.on("receive_notification",(data) => {
      console.log(data)
      if(data.length === 0){
        setCurrentRide("");
      } else {
        dispatch(setCurrentRide(data));
        setLoading(false);
      }
    });
  }, [socket]);

  return (
    <Box className='address_title'>
      <Box sx={{
        alignItems: 'center',
        backgroundColor: '#00283a',
        fontSize: '1rem',
        height: "11.875rem",
        display: 'grid',
      }}>
        <Box sx={{
          paddingLeft: '0.75rem',
          marginY: '2rem',
          marginX: '2rem'
        }}>
          <Typography className="address__title-from" onClick={() => setIsFrom(true)}>
            {selectedFrom && selectedFrom.label ? 'From :' + selectedFrom.label : 'Pickup location ?'}
          </Typography>
          <Typography className="address__title-to" onClick={() => setIsFrom(false)}>
            {selectedTo && selectedTo.label ? 'To :' + selectedTo.label : 'Destination ?'}
          </Typography>
        </Box>
      </Box>
      <Box className='address__title-container' sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '2rem',
        alignItems: 'center',
        gap: '1rem',
      }}>
        {step === 1 && (
          <TextField
            className='address__title-from'
            placeholder={isFrom ? 'Add a pickup location' : 'Enter your destination'}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { marginLeft: '0.5rem' } }}
            onChange={onInputChanged}
            ref={searchRef}
            sx={{
              padding: "0.875rem 1rem",
              width: "100%",
            }}
          />
        )}
        {step === 2 && (
          <Typography className="confirm-text" sx={{color:'#00283a', marginTop:'3rem'}}>
            Do you want to confirm the ride?
          </Typography>
        )}
        {step === 2 && (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#fccf76",
                color: "#00283a",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                "&:hover": {
                  backgroundColor: "#00d084",
                  color: '#00283a'
                },
              }}
              onClick={openModal}
            >
              Request
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#fccf76",
                color: "#00283a",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                "&:hover": {
                  backgroundColor: "#00d084",
                  color: '#00283a'
                },
              }}
              onClick={resetSelection}
            >
              Reset
            </Button>
          </Box>
        )}
      </Box>
      <Box className="search__result" sx={{ backgroundColor: "#fff", marginRight: "1rem", marginTop: "1rem" }}>
          {searchResults && searchResults.length !== 0 && searchResults.map((result, index) => (
            <Box className="search__result-item" key={index} onClick={() => onLocationSelected(result)}>
              <Box className="search__result-icon">
                <svg title="LocationMarkerFilled" viewBox="0 0 24 24" className="g2 ec db">
                  <g transform="matrix( 1 0 0 1 2.524993896484375 1.0250244140625 )">
                    <path fillRule="nonzero" clipRule="nonzero" d="M16.175 2.775C12.475 -0.925 6.475 -0.925 2.775 2.775C-0.925 6.475 -0.925 12.575 2.775 16.275L9.475 22.975L16.175 16.175C19.875 12.575 19.875 6.475 16.175 2.775ZM9.475 11.475C8.375 11.475 7.475 10.575 7.475 9.475C7.475 8.375 8.375 7.475 9.475 7.475C10.575 7.475 11.475 8.375 11.475 9.475C11.475 10.575 10.575 11.475 9.475 11.475Z" opacity="1"></path>
                  </g>
                </svg>
              </Box>
              <Typography className="search__result-label">{result.label}</Typography>
            </Box>
          ))}
        </Box>
      <RideRequestModal open={isModalOpen} onClose={closeModal} onRequestRide={handleRequestRide} />
      <LoadingModal open={loading} />
    </Box>
  );
}

export default AddressPicker;
