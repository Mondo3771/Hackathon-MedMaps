import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { Bottom, Check, MapCheck } from "./Maps.styles";

import { clinics, hospitals } from "../../MockData/Arrays";
import Aside from "../../Aside/Aside";
import News from "../News/News";

const containerStyle = {
  width: "max-width",
  height: "600px",
};
const libraries = ["places"];

function Maps() {
  const [center, setCenter] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

  const [routeData, setRouteData] = useState([]);
  const [routeHosData, setRouteHosData] = useState([]);

  const [clicked, setClicked] = useState(false);
  const inputRef = useRef();
  const [isChecked, setIsChecked] = useState(true);

  const [origin, setOrigin] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter({
              lat: latitude,
              lng: longitude,
            });
          },
          (error) => {
            console.log("Unable to retrieve location");
          }
        );
      }
    };
    getLocation();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const recenterMap = () => {
    if (map) {
      map.setCenter(center);
    }
  };

  const geocodeAddress = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  };
  const reverseGeocodeLatLng = async (input) => {
    // eslint-disable-next-line no-undef
    const geocoder = new window.google.maps.Geocoder();
    const latlng = input;

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject("No results found");
          }
        } else {
          reject(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  };
  // const result =  reverseGeocodeLatLng(center.lat, center.lng);
  // console.log(result);

  const calculateAllRoutes = async () => {
    const directionsService = new window.google.maps.DirectionsService();
    const routes = [];
    const routesH = [];
    const array = clinics;

    for (let i = 0; i < array.length; i++) {
      try {
        const destinationLocation = await geocodeAddress(array[i].address);

        const results = await directionsService.route({
          // origin: await geocodeAddress(originAddress),
          origin: center,
          destination: destinationLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        routes.push({
          name: array[i].name,
          Distance: results.routes[0].legs[0].distance.text,
          Duration: results.routes[0].legs[0].duration.text,
          Public: array[i].public,
          address: array[i].address,
        });
      } catch (error) {
        // console.error(error);
      }
    }

    for (let i = 0; i < hospitals.length; i++) {
      try {
        const destinationLocation = await geocodeAddress(hospitals[i].address);

        const results = await directionsService.route({
          // origin: await geocodeAddress(originAddress),
          origin: center,
          destination: destinationLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        routesH.push({
          name: hospitals[i].name,
          Distance: results.routes[0].legs[0].distance.text,
          Duration: results.routes[0].legs[0].duration.text,
          Public: hospitals[i].public,
          address: hospitals[i].address,
        });
      } catch (error) {
        // console.error(error);
      }
    }

    setRouteHosData(
      routesH.sort((a, b) => parseFloat(a.Distance) - parseFloat(b.Distance))
    );

    setRouteData(
      routes.sort((a, b) => parseFloat(a.Distance) - parseFloat(b.Distance))
    );
  };
  useEffect(() => {
    if (isLoaded && center) {
      calculateAllRoutes();
    }
  }, [center, isLoaded]);

  useEffect(() => {
    reverseGeocodeLatLng(center)
      .then((res) => {
        const data = res;
        // Use the 'data' variable here4
        setOrigin(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [center, isLoaded]);

  const calcRoute = async (index) => {
    try {
      // const originLocation = await geocodeAddress(originAddress);
      const originLocation = center;
      const destinationLocation = await geocodeAddress(index);

      const directionsService = new window.google.maps.DirectionsService();

      const results = await directionsService.route({
        origin: originLocation,
        destination: destinationLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setSelectedRouteIndex(index);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoaded || !center) {
    return <p>Loading...</p>;
  }
  const changeCenter = async () => {
    //    inputRef.current.value
    setClicked(true);
    if (inputRef.current.value) {
      const destinationLocation = await geocodeAddress(inputRef.current.value);
      setCenter({
        lat: destinationLocation.lat(),
        lng: destinationLocation.lng(),
      });
    }
  };

  const handleCheckboxChange = (event) => {
    console.log("hey", event.target.checked);
    setIsChecked((e) => !e);
  };

  return (
    <>
      <MapCheck>
        <Autocomplete>
          <input placeholder="Enter a location " ref={inputRef} />
        </Autocomplete>
      </MapCheck>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={10}
        // mapTypeId="satellite"
      >
        {directionsResponse && selectedRouteIndex !== null && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <MapCheck>
        <section className="location">
          <section className="recenter">
            <button onClick={recenterMap}>Recenter Map</button>
          </section>
          <section className="confirm">
            <p>{origin}</p>
            <button onClick={changeCenter}>Confirm your location</button>
          </section>
        </section>
      </MapCheck>

      {/* {
            routeData.map((item, index) => (
                <Wrapper key={index}>
                    <button onClick={() => calcRoute(index)}>Calculate Route</button>
                    <p>{item.Place}</p>
                    <p>Distance: {item.Distance}</p>
                    <p>Duration: {item.Duration}</p>
                </Wrapper>
            ))} */}

      {/* <Aside routes={routeData}/> */}
      <Check>
        {clicked && routeData ? (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          ></input>
        ) : null}
      </Check>
      <Bottom>
        {clicked && routeData ? (
          <Aside
            routes={isChecked ? routeHosData : routeData}
            calculate={calcRoute}
            checked={isChecked}
          />
        ) : null}
        <News></News>
      </Bottom>
    </>
  );
}

export default Maps;
