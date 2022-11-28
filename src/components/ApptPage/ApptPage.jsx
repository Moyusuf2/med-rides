import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Dispatch } from 'react';
import { FaLocationArrow, FaTimes, FaSkullCrossbones } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const libraries = ['places']
import './AppPage.css';


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  // const [displayCar, setDisplayCar] = useState(true);
  const history = useHistory()
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.user);
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

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  if (!isLoaded) {
    return (
      <FaSkullCrossbones />
    )
  }
  const requestForm = {
    pickUp,
    dropOff,
    dateTime,
    car,
  }

  async function calculateRoute() {

    // console.log('pickup, dropOff', pickUp, dropOff)
    // // eslint-disable-next-line no-undef
    // const directionsService = new google.maps.DirectionsService()
    // const results = await directionsService.route({
    //   origin: pickUp,
    //   destination: dropOff,
    //   // eslint-disable-next-line no-undef
    //   travelMode: google.maps.TravelMode.DRIVING,
    // })


    // setDirectionsResponse(results)
    // console.log('results:',results)
    // setDistance(results.routes[0].legs[0].distance.text)
    // setDuration(results.routes[0].legs[0].duration.text)

    dispatch({

      type: "SET_FORM",
      payload: requestForm
    })
    history.push('/submit')
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

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }


  return (
    <div className='container'>
      <h2>New Request</h2>
      <br />

      <div className='"input-container"'>
        {/* <div className='origin'>
          <Autocomplete
          >
          <input type='text' placeholder='Origin'
            value={pickUp}
            onChange={handlePickUp}
            ref={originRef}
          />
          </Autocomplete>
        </div> */}
        <div class="input-container">
          <input type="text" id="origin" placeholder="Enter your pickup location"
            value={pickUp}
            onChange={handlePickUp}
            ref={originRef}
          />
          <label class="label" for="origin">Origin</label>
        </div>
        <div class="input-container">
          <input type="text" id="destination" placeholder="Enter your destination" 
          onChange={handleDropOff}
          value={dropOff}
          ref={destinationRef}
          />
          <label class="label" for="destination">Destination</label>
        </div>
        {/* <div className='destination'>
          <Autocomplete
            onChange={handleDropOff}
            value={dropOff}
          >
          <input

            onChange={handleDropOff}
            value={dropOff}
            ref={destinationRef}
            type='text'
            placeholder='Destination'
          />
          </Autocomplete>
        </div> */}

        <div>
          <input 
            className='calendar'
            type="datetime-local"
            required
            onChange={handleDateTime}
            value={dateTime}
          />
        </div>

        <div>
          {/* <Button type='submit' onClick={calculateRoute}>
            Calculate Route
          </Button> */}

          <Button onClick={clearRoute} placeholder="clear">Clear inputs</Button>
        </div>
      </div>
      <div className='calculation'>
        {/* <h2>Distance: {distance} </h2>
        <h2>Duration: {duration} </h2> */}
      </div>
      <div className="carsInfo">
        <Card style={{ width: '18rem' }}>
          <img variant="top" src="images/minivan.jpeg" />
          <Card.Body>
            <Card.Title>Minivan</Card.Title>
            <Card.Text>
              Wheelchair accessible Gurney van for patients with Physical constrains
            </Card.Text>
            <Button variant="primary" onClick={(event) => setCar('Minivan')}>SELECT</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', height: '18rem' }}>
          <img variant="top" src="images/gurley_van.jpeg" />
          <Card.Body>
            <Card.Title>GURNEY VAN</Card.Title>
            <Card.Text>
              Wheelchair accessible Gurney van for patients with Physical constrains
            </Card.Text>
            <Button variant="primary" onClick={(event) => setCar('Gurney Van')}>SELECT</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <img variant="top" src="images/sedan.jpeg" />
          <Card.Body>
            <Card.Title>SEDAN</Card.Title>
            <Card.Text>
              Common Carrier Transportation for patients without Physical constrains
            </Card.Text>
            <Button variant="primary" onClick={(event) => setCar('Sedan')}>SELECT</Button>
          </Card.Body>
        </Card>

        {/* <button onClick={(event) => setCar('Sedan')}>Sedan</button>
        <button onClick={(event) => setCar('Minivan')}>Minivan</button>
        <button onClick={(event) => setCar('Gurney Van')}>Gurney Van</button> */}

      </div>
      <br />
      <br />

      <Button onClick={calculateRoute}>Review Request</Button>

    </div>
  );
}

export default InfoPage;
