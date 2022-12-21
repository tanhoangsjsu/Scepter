import "../HomePage/homepage.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMenu } from "react-icons/hi";
import { updateMapData } from "../../redux/mapSlice";

const Map = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoidGFuaG9hbmcxNCIsImEiOiJjbDkwZml6MmkweXdlM25wOHNhZmpta3JhIn0.MqMt1VO7SvoJXzv2d2ju6w";

  const pickupLongtitude = useSelector((state) => state.pickup.longtitude);
  const pickupLattitude = useSelector((state) => state.pickup.lattitude);
  const dropoffLongtitude = useSelector((state) => state.dropoff.longtitude);
  const dropoffLattitude = useSelector((state) => state.dropoff.lattitude);
  const mapData = useSelector((state) => state.tripInfo.trip);
  const dispatch = useDispatch();
  let pickupCoordinates = [pickupLongtitude, pickupLattitude];
  let dropoffCoordinates = [dropoffLongtitude, dropoffLattitude];
  const [direction, setDirection] = useState([]);
  const [openIns, setOpenIns] = useState(false);

  const style = {
    cursor: "pointer",
    color: "black",
    position: "absolute",
    top: "15px",
    bottom: "30px",
    left: "20px",
  };
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/tanhoang14/cl9aa17ku002q14obtxtf7srx", // style URL
      center: [-121.88492, 37.3361663], // starting position [lng, lat]
      zoom: 9, // starting zoom
      projection: "globe", // display the map as a 3D globe
    });
    map.addControl(
      // Add geolocate control to the map.
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true, // When active the map will receive updates to the device's location as it changes.
        showUserHeading: true, // Draw an arrow next to the location dot to indicate which direction the device is heading.
      })
    );
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates);
    }
    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates);
    }
    if (dropoffCoordinates && pickupCoordinates) {
      map.fitBounds(
        [
          [pickupLongtitude, pickupLattitude], // southwestern corner of the bounds
          [dropoffLongtitude, dropoffLattitude], // northeastern corner of the bounds
        ],
        {
          padding: 60,
        }
      );
    }

    // create a function to make a directions request
    async function getRoute() {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLongtitude},${pickupLattitude};${dropoffLongtitude},${dropoffLattitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      const json = await query.json();
      const data = json.routes[0];
      dispatch(updateMapData(data));
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      // add turn instructions here at the end
      const steps = data.legs[0].steps;
      setDirection(steps);
    }
    map.on("load", () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(pickupCoordinates);

      // Add starting point to the map
      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: pickupCoordinates,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
    });
  }, [pickupLongtitude, pickupLattitude, dropoffLongtitude, dropoffLattitude]);

  const addToMap = (map, coordinates) => {
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat(coordinates)
      .addTo(map);
    // Create a default Marker, colored black, rotated 45 degrees.
    const marker2 = new mapboxgl.Marker({ color: "black" })
      .setLngLat(coordinates)
      .addTo(map);
  };
  const handleMenu = () => {
    setOpenIns(!openIns);
  };

  return (
    <>
      <div className="map-container" id="map">
        MAP
      </div>
      <HiOutlineMenu style={style} size={20} onClick={handleMenu} />
      {openIns ? (
        <div id="instructions">
          <p>
            <strong>
              {" "}
              Trip duration: {Math.floor(mapData?.duration / 60)} min 🚴
            </strong>
          </p>
          {direction.map((step, idx) => {
            return (
              <div className="direction-step" key={idx}>
                <li>{step.maneuver.instruction}</li>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};
export default Map;
