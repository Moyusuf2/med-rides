import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Dispatch } from 'react';
import { useState } from 'react'
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
import { KeyboardDatePicker } from "@material-ui/pickers";
import './AppPage.css';


function InfoPage() {
  // const [displayCar, setDisplayCar] = useState(true);
  const history = useHistory()
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.user);
  


  const [pickUp, setPickUp] = useState('');
  const [dropOff, setDropOff] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [car, setCar] = useState('');

 
  const requestForm = {
    pickUp,
    dropOff,
    dateTime,
    car,
  }

  function saveRequest() {
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

  function clearInputs() {
    setDateTime('')
    setCar('')
    setPickUp('')
    setDropOff('')
  }


  return (
    <div className='container'>
      <h2>New Request</h2>
      <br />

      <div className='"input-container"'>
        <div class="input-container">
          
          <input autocomplete="off" type="text" id="origin" placeholder="Enter your pickup location"
            value={pickUp}
            onChange={handlePickUp}
          />
          <label class="label" for="origin">Origin</label>
        </div>
        <div class="input-container">
          <input autocomplete="off" type="text" id="destination" placeholder="Enter your destination" 
          onChange={handleDropOff}
          value={dropOff}
          />
          <label class="label" for="destination">Destination</label>
        </div>
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
          <button className='button-24' onClick={clearInputs} placeholder="clear">Clear inputs</button>
        </div>
      </div>
      <div className="carsInfo">
        <Card style={{ width: '18rem' }}>
          <img variant="top" src="images/minivan.jpeg" />
          <Card.Body>
            <Card.Title>Minivan</Card.Title>
            <Card.Text>
              Side-entry handicap van conversion comes standard with a powered ramp.
            </Card.Text>
            <button className='button-24' variant="primary" onClick={(event) => setCar('Minivan')}>SELECT</button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', height: '300px'}}>
          <img variant="top" src="images/newVan.png" />
          <Card.Body>
            <Card.Title>GURNEY VAN</Card.Title>
            <Card.Text>
              Wheelchair accessible Gurney van for patients with Physical constrains
            </Card.Text>
            <button className='button-24' variant="primary" onClick={(event) => setCar('Gurney Van')}>SELECT</button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <img variant="top" src="images/sedan.png" />
          <Card.Body>
            <Card.Title>SEDAN</Card.Title>
            <Card.Text>
              Common Carrier Transportation for patients without Physical constrains
            </Card.Text>
            <button className='button-24' variant="primary" onClick={(event) => setCar('Sedan')}>SELECT</button>
          </Card.Body>
        </Card>
      </div>
      <br />
      <br />

      <button className='button-24' onClick={saveRequest}>Next</button>
    </div>
  );
}

export default InfoPage;
