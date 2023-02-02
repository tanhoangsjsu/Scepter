import * as React from "react";
import { useEffect, useState } from "react";
import "../Search/search.css";
import { VscCircleFilled } from "react-icons/vsc";
import { RiMore2Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { GoPrimitiveSquare } from "react-icons/go";
import { MdStars } from "react-icons/md";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AddressAutofill } from "@mapbox/search-js-react";
import BackButton from "../BackButton/BackButton";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { updateMapData } from "../../redux/mapSlice";
import Popup from "../PopupBox/Popup";
import { makeRequest } from "../../redux/apiRequest";
import {
  updateStartLatitude,
  updateStartLongtitude,
} from "../../redux/startLocationSlice";
import {
  updateEndLatitude,
  updateEndLongtitude,
} from "../../redux/endLocationSlice";


const Search = () => {
  const style = { color: "black", fontSize: "1.5em" };
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const mapData = useSelector((state) => state.tripInfo.trip);
  const socket = io.connect("https://scepter.onrender.com:8000");
  const pickupLongtitude = useSelector((state) => state.pickup.longtitude);
  const pickupLattitude = useSelector((state) => state.pickup.lattitude);
  const dropoffLongtitude = useSelector((state) => state.dropoff.longtitude);
  const dropoffLattitude = useSelector((state) => state.dropoff.lattitude);
  mapboxgl.accessToken =
    "pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w";
  async function getRoute() {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLongtitude},${pickupLattitude};${dropoffLongtitude},${dropoffLattitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    dispatch(updateMapData(data));
    if (data) return data;
  }
  const handleRequest = async (e) => {
    e.preventDefault();
    if (pickup.length === 0 || dropoff.length === 0) {
      setErrors("Please enter all your destination");
    } else {
      const routeData = getRoute();
      routeData.then((res) => {
        const newRequest = {
          id: uuidv4(),
          socketId: socket.id,
          username: user.username,
          pickup: pickup,
          dropoff: dropoff,
          distance: Math.floor(res?.distance / 20),
          duration: Math.floor(res?.duration / 60),
        };
        setErrors("");
        setLoading(true);
        setOpen(true);
        makeRequest(newRequest, dispatch);
        socket.emit("send_request", { request: [newRequest] });
      });
    }
  };

  const getPickupCoordinates = async () => {
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?access_token=pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w`
      )
      .then(function (response) {
        dispatch(updateStartLongtitude(response.data.features[0].center[0]));
        dispatch(updateStartLatitude(response.data.features[0].center[1]));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };
  const getDropoffCoordinates = async () => {
    await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?access_token=pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w`
      )
      .then(function (response) {
        dispatch(updateEndLongtitude(response.data.features[0].center[0]));
        dispatch(updateEndLatitude(response.data.features[0].center[1]));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };
  useEffect(() => {
    if (pickup && dropoff) {
      getPickupCoordinates();
      getDropoffCoordinates();
    }
  }, [pickup, dropoff]);

  return (
    <div className="search-container">
      <BackButton />
      {/* Inputs box */}
      <div className="input-container">
        <div className="from-to-icons">
          <VscCircleFilled style={style} size={25} />
          <RiMore2Line style={style} size={25} />
          <GoPrimitiveSquare style={style} size={25} />
        </div>
        <div className="input-boxes">
          <div className="input-errors">{errors}</div>
          <form className="flex flex--column">
            <AddressAutofill accessToken="pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w">
              <input
                type="text"
                id="pickup"
                name="pickup"
                placeholder="Enter pickup location"
                autoComplete="address-line1"
                onChange={(e) => setPickup(e.target.value)}
              />
            </AddressAutofill>
          </form>
          <form className="flex flex--column">
            <AddressAutofill accessToken="pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w">
              <input
                type="text"
                id="dropoff"
                name="dropoff"
                placeholder="Where to?"
                autoComplete="address-line1"
                onChange={(e) => setDropoff(e.target.value)}
              />
            </AddressAutofill>
          </form>
        </div>
        <div className="plus-icon-container">
          <CiCirclePlus size={40} className="plus-icon" style={style} />
        </div>
      </div>
      {/* //Favorites Places */}
      <div className="save-places">
        <MdStars style={style} />
        <h3>Save places</h3>
      </div>
      {/* //Request Button */}
      <div className="request-button-container">
        '<button onClick={handleRequest}>Request</button>
        <Popup
          open={open}
          setOpen={setOpen}
          isLoading={isLoading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};
export default Search;
