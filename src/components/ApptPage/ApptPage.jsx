import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Dispatch } from 'react';
import { FaLocationArrow, FaTimes, FaSkullCrossbones } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
const libraries = ['places']


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const center = { lat: 44.977540, lng: -93.263643 }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [pickUp, setPickUp] = useState('');
  const [dropOff, setDropOff] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [car, setCar] = useState('');


  const requestForm = {
    pickUp,
    dropOff,
    dateTime,
    car
  }

  console.log('request form', requestForm)
  // dispatch({
  //   type: "SET_REQUEST",
  //   payload: requestForm

  // })









  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  if (!isLoaded) {
    return (
      <FaSkullCrossbones />


    )
  }


  const handlePickUp = evt => {
    setPickUp(evt.target.value);
    console.log('handle pickup', pickUp)
  }
  const handleDropOff = evt => {
    setDropOff(evt.target.value);
    console.log('handle dropOff', dropOff)
  }
  const handleDateTime = evt => {
    setDateTime(evt.target.value);
    console.log('handle time and date', dateTime)
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
    <div className="container">
      <p>{pickUp}</p>
      <h2>New Request</h2>
      <Box
        sx={{
          position: 'absolute',
          right: '0',
          width: "50%",
          height: "100%",
          color: "green",
        }}
      >
        <GoogleMap
          className="map"
          center={center}
          defaultZoom={15}
          mapContainerStyle={{ width: '90%', height: '40%',display:'flex'}}
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




      <div className='formInput'>
        <div className='origin'>
          {/* <Autocomplete
            onChange={handlePickUp}> */}
          <input type='text' placeholder='Origin'
            value={pickUp}
            onChange={handlePickUp}

            ref={originRef} />
          {/* </Autocomplete> */}
        </div>
        <FaLocationArrow
          aria-label='center'
          onClick={() => {
            map.panTo(center)
            map.setZoom(15)
          }} />
        <div className='destination'>
          {/* <Autocomplete> */}
          <input
            type='text'
            placeholder='Destination'
            onChange={handleDropOff}
            value={dropOff}
            ref={destinationRef}
          />
          {/* </Autocomplete> */}
        </div>
        
        <div>
          <input type="datetime-local"
            onChange={handleDateTime}
            value={dateTime}
          />
        </div>

        <div>
          <button type='submit' onClick={calculateRoute}>
            Calculate Route
          </button>

          <FaTimes onClick={clearRoute} placeholder="clear">Clear</FaTimes>
        </div>
      </div>
      <div className='calculation'>
        <h2>Distance: {distance} </h2>
        <h2>Duration: {duration} </h2>
      </div>
      <div>
        <button onClick={(event) => setCar('Sedan')}>Sedan</button>
        <button onClick={(event) => setCar('Minivan')}>Minivan</button>
        <button onClick={(event) => setCar('Gurney Van')}>Gurney Van</button>

      </div>
      <button>submit</button>

    </div>
  );
}

export default InfoPage;
