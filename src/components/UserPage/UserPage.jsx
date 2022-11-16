import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { FaLocationArrow, FaTimes, FaSkullCrossbones } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const center = { lat: 44.977540, lng: -93.263643 }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [destination,setDestination] = useState('')
  const [origin,setOrigin] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  if (!isLoaded) {
    return (
      <FaSkullCrossbones />


    )
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }
  return (
    // <div className="container">
    //   <h2>Welcome, {user.username}!</h2>
    //   <p>Your ID is: {user.id}</p>
    //   <LogOutButton className="btn" />
    // </div>
    <div>
      {/* <Box position='absolute' left={0} top={0} h='100%' w='50%'> */}
      <Box
      sx={{
        position: 'absolute',
        right: '0',
        width:"50%",
        height:"100%",
      }}
    >
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          defaultZoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <div>
        <div className='formInput'>
          <div className='origin'>
            <Autocomplete>
              <input type='text' placeholder='Origin' 
              onChange={(evt) => {
                setOrigin(evt.target.value);
              }}
              value={origin}
              ref={originRef} />
            </Autocomplete>
          </div>
          <div className='destination'>
            <Autocomplete>
              <input
                type='text'
                placeholder='Destination'
                onChange={(evt) => {
                  setDestination(evt.target.value);
                }}
                value={destination}
                ref={destinationRef}
              />
            </Autocomplete>
          </div>
          <FaLocationArrow 
            aria-label='center'
           onClick={() => {
            map.panTo(center)
            map.setZoom(15)
          }}/>
          <div>
            <input type="datetime-local"/>
          </div>

          <div>
            <button type='submit' onClick={calculateRoute}>
              Calculate Route
            </button>
            
            <FaTimes onClick={clearRoute} placeholder="clear"/>
          </div>
        </div>
        <div className='calculation'>
          <h2>Distance: {distance} </h2>
          <h2>Duration: {duration} </h2>
          
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
