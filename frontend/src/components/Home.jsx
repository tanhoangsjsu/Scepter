import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import Header from './Header';
import AddressPicker from './AddressPicker';
import RideDetail from './RideDetail';
import RideList from './RideList';
import { Box, debounce } from '@mui/material';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import '../App.css';
require('leaflet-routing-machine');

const defaultMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultMarkerIcon;

const Home = () => {
  
  const [driverCoordsX, setDriverCoordsX] = useState();
  const [driverCoordsY, setDriverCoordsY] = useState();
 
  const map = useRef();
 
  const routeControl = useRef();
  const dispatch = useDispatch();
  
  const selectedFrom = useSelector((state) => state.address.selectedFrom);
  const selectedTo = useSelector((state) => state.address.selectedTo);
  const user = useSelector((state) => state.auth.login.currentUser);
  const rideRequest = useSelector((state) => state.ride.rideRequest);
  const currentRide = useSelector((state) => state.ride.currentRide);
 
  const isStudent = user && user.role === 'student';
  const isAssistance = user && user.role === 'assistance';
  
  var marker1, marker2, circle;
  

  const style = {
    width: '100%',
    height: '100vh',
  };

  const initMap = () => {
    if (map.current) {
        map.current.off();
        map.current.remove();
    }
    map.current = L.map('map', {
      center: [37.338207, -121.886330],
      zoom: 14,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  };

  const initRouteControl = () => {
    routeControl.current = L.Routing.control({
      show: true,
      fitSelectedRoutes: true,
      plan: false,
      lineOptions: {
        styles: [
          {
            color: 'blue',
            opacity: 0.7,
            weight: 6,
          },
        ],
      },
      router: L.Routing.mapbox(process.env.REACT_APP_MAPBOX_API_KEY),
    })
      .addTo(map.current)
      .getPlan();
  };

  const drawRouteBetweenMarkers = (marker1LatLng, marker2LatLng) => {
    if (routeControl.current) {
      routeControl.current.setWaypoints([marker1LatLng, marker2LatLng]);
    }
  };
  const debouncedDrawRouteBetweenMarkers = useMemo(
    () => debounce(drawRouteBetweenMarkers, 5000),
    [] // No dependencies to ensure the function is memoized only once
  );
  const drawRoute = useCallback(
    (from, to) => {
      if (shouldRouteDrawn(from, to) && routeControl.current) {
        const fromLatLng = new L.LatLng(from.y, from.x);
        const toLatLng = new L.LatLng(to.y, to.x);
        routeControl.current.setWaypoints([fromLatLng, toLatLng]);
      }
    },
    [routeControl]
  );

  const shouldRouteDrawn = (from, to) => {
    return from && to && from.label && to.label && from.x && to.x && from.y && to.y;
  };
 
  const renderSidebar = () => {
    if (isStudent && !currentRide) {
      return <AddressPicker />;
    }
    if (isStudent && currentRide) {
      return <RideDetail isDriver={false} currentRide={currentRide} />;
    }
    if (!isStudent && !currentRide) {
      return <RideList />;
    }
    if (!isStudent && currentRide) {
      return <RideDetail isDriver={true} currentRide={currentRide} />;
    }
  };

  const getUserLocation = () => {
    if (!isStudent && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          setDriverCoordsY(lat);
          const long = position.coords.longitude;
          setDriverCoordsX(long);
          const accuracy = position.coords.accuracy;
          if (map.current) {
            if (marker1) {
              map.current.removeLayer(marker1);
            }

            if (circle) {
              map.current.removeLayer(circle);
            }

            marker1 = L.marker([lat, long]);
            circle = L.circle([lat, long], { radius: accuracy });

            marker2 = L.marker([rideRequest.request[0].studentCoordsY, rideRequest.request[0].studentCoordsX]);

            const featureGroup = L.featureGroup([marker1, marker2, circle]).addTo(map.current);

            map.current.fitBounds(featureGroup.getBounds());

            debouncedDrawRouteBetweenMarkers(marker1.getLatLng(), marker2.getLatLng());

            console.log(`Your coordinate is: Lat: ${lat} Long: ${long} Accuracy: ${accuracy}`);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.log("Only users with the role 'assistance' can use this feature.");
    }
  };

  useEffect(() => {
    initMap();
    initRouteControl();
  }, []);

  useEffect(() => {
    if (shouldRouteDrawn(selectedFrom, selectedTo)) {
      drawRoute(selectedFrom, selectedTo);
    }
  }, [selectedFrom, selectedTo, drawRoute]);

  useEffect(() => {
    if (isAssistance) {
      getUserLocation();
      const intervalId = setInterval(getUserLocation, 5000);
      return () => clearInterval(intervalId);
    }
  }, [isAssistance]);

  return (
    <>
      <Header />
      <div id="map" style={style} />
      <Box
        sx={{
          backgroundColor: 'rgb(255, 255, 255)',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
          height: '50%',
          maxHeight: 'auto',
          overflowY: 'auto',
          left: '2%',
          position: 'fixed',
          top: '13%',
          width: '30rem',
          zIndex: 999,
        }}
      >
        {renderSidebar()}
      </Box>
    </>
  );
};

export default Home;
