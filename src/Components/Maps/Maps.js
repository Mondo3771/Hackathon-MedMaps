import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Autocomplete,Marker } from '@react-google-maps/api';
import { Wrapper,Bottom,Check } from './Maps.styles';

import { clinics,hospitals } from '../../MockData/Arrays';
import Aside from '../../Aside/Aside';
import News from '../News/News';

const containerStyle = {
    width: 'max-width',
    height: '600px',
};



function Maps() {
    const [center, setCenter] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
    const[routeData,setRouteData]=useState([])
    const[clicked,setClicked]=useState(false)
    const inputRef = useRef();
    const [isChecked, setIsChecked] = useState(false);



const [origin, setOrigin]=useState(null);

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
                        console.log('Unable to retrieve location');
                    }
                );
            }
        };
        getLocation();
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCgUoQ_heIIK0FOUyzNqz8j5fL0OfFijCQ',
        libraries: ['places'],
    });

    const [map, setMap] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        

        setMap(map);
    }, [center]);

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
                if (status === 'OK') {
                    resolve(results[0].geometry.location);
                } else {
                    reject('Geocode was not successful for the following reason: ' + status);
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
                if (status === 'OK') {
                    if (results[0]) {
                        resolve(results[0].formatted_address);
                    } else {
                        reject('No results found');
                    }
                } else {
                    reject('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    };
    // const result =  reverseGeocodeLatLng(center.lat, center.lng);
    // console.log(result);    

    const calculateAllRoutes = async () => {
        const directionsService = new window.google.maps.DirectionsService();
        const routes=[]

        for (let i = 0; i < clinics.length; i++) {
            try {
                const destinationLocation = await geocodeAddress(clinics[i].address);

                const results = await directionsService.route({
                    // origin: await geocodeAddress(originAddress),
                    origin:center,
                    destination: destinationLocation,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                });
                
                routes.push({
                    name:clinics[i].name,
                    Distance:results.routes[0].legs[0].distance.text,
                    Duration:results.routes[0].legs[0].duration.text,
                    Public:clinics[i].public,
                    address:clinics[i].address
                })

            } catch (error) {
                // console.error(error);
            }
        }
    

        setRouteData(routes.sort((a, b) => parseFloat(a.Distance) -parseFloat(b.Distance)));
    };

    useEffect(() => {
        if (isLoaded && center) {
            calculateAllRoutes();
        }
         reverseGeocodeLatLng(center).then((res) => {
            const data = res
            // Use the 'data' variable here4
            setOrigin(data);

        }).catch((error) => {
            console.error('Error fetching data:', error);
        });;

    }, [center,isLoaded]);



    const calcRoute = async (index) => {
        try {
            // const originLocation = await geocodeAddress(originAddress);
            const originLocation=center;
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
    const changeCenter=async ()=>{
    //    inputRef.current.value
        setClicked(true)
        if(inputRef.current.value){
            const destinationLocation = await geocodeAddress(inputRef.current.value);
            setCenter({lat:destinationLocation.lat(),
               lng: destinationLocation.lng()})

        }
       
        

    }
    


    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    return (
        <>
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
                <button onClick={recenterMap}>
                    Recenter Map
                </button>
                <p> 
                    {origin}
            </p>
            

            <Autocomplete >
                <input placeholder="Enter a location " ref={inputRef} />
            </Autocomplete>
            <button onClick={changeCenter}>Confirm your location</button>
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
            <input type='checkbox' checked={isChecked} 
        onChange={handleCheckboxChange}  ></input>


            </Check>
            <Bottom>

                {clicked && routeData? <Aside routes={routeData} calculate={calcRoute}/>:null}
                {/* <News></News> */}

                
                </Bottom>
            
           
        </>
    );
}

export default Maps;
