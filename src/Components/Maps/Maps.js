import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Autocomplete,Marker } from '@react-google-maps/api';
import { Wrapper } from './Maps.styles';

const containerStyle = {
    width: '700px',
    height: '700px',
};

const mock = [
    'Netcare Milpark Hospital, Guild Road, Parktown, Johannesburg, South Africa',
    'Jhb Gen Hospital, Jubilee Road, Parktown, Johannesburg, South Africa',
    'Netcare Park Lane Hospital, Park Lane, Parktown, Johannesburg, South Africa',
    'Cj Cronje Building, Loveday Street, Johannesburg, South Africa',
    '35 Bartlett Rd, Mayfair West, Johannesburg, 2092, South Africa'
];

function Maps() {
    const [center, setCenter] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
    const[routeData,setRouteData]=useState([])
    const inputRef = useRef();


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

        for (let i = 0; i < mock.length; i++) {
            
            try {
                const destinationLocation = await geocodeAddress(mock[i]);

                const results = await directionsService.route({
                    // origin: await geocodeAddress(originAddress),
                    origin:center,
                    destination: destinationLocation,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                });
                routes.push({
                    Place:mock[i],
                    Distance:results.routes[0].legs[0].distance.text,
                    Duration:results.routes[0].legs[0].duration.text
                })

            } catch (error) {
                console.error(error);
            }
        }
    

      
        setRouteData(routes.sort((a, b) => parseFloat(a.Duration) -parseFloat(b.Duration)));
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

    }, [ center]);



    const calcRoute = async (index) => {
        try {
            // const originLocation = await geocodeAddress(originAddress);
            const originLocation=center;
            const destinationLocation = await geocodeAddress(routeData[index].Place);

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
        console.log(inputRef.current.value);
        const destinationLocation = await geocodeAddress(inputRef.current.value);
        setCenter({lat:destinationLocation.lat(),
           lng: destinationLocation.lng()})
        

    }
    



    return (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >

                {directionsResponse && selectedRouteIndex !== null && (
                    <DirectionsRenderer directions={directionsResponse} />
                    
                )}
                <Marker position={center} icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" />

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
            {
            routeData.map((item, index) => (
                <Wrapper key={index}>
                    <button onClick={() => calcRoute(index)}>Calculate Route</button>
                    <p>{item.Place}</p>
                    <p>Distance: {item.Distance}</p>
                    <p>Duration: {item.Duration}</p>
                </Wrapper>
            ))}
        </>
    );
}

export default Maps;
