import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './AppPage.css';

function InfoPage() {
  const history = useHistory();
  const dispatch = useDispatch();

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
    });
    history.push('/submit');
  }

  const handlePickUp = evt => {
    setPickUp(evt.target.value);
    console.log('handle pickup', pickUp);
  }

  const handleDropOff = evt => {
    setDropOff(evt.target.value);
    console.log('handle dropOff', dropOff);
  }

  const handleDateTime = evt => {
    setDateTime(evt.target.value);
    console.log('handle time and date', dateTime);
  }

  function clearInputs() {
    setDateTime('');
    setCar('');
    setPickUp('');
    setDropOff('');
  }

  return (
    <div className='container'>
      <h2>New Request</h2>
      <br />

      <div className='input-container'>
        <div className="input-container">
          <input
            autoComplete="off"
            type="text"
            id="origin"
            placeholder="Enter your pickup location"
            value={pickUp}
            onChange={handlePickUp}
          />
          <label className="label" htmlFor="origin">Origin</label>
        </div>
        <div className="input-container">
          <input
            autoComplete="off"
            type="text"
            id="destination"
            placeholder="Enter your destination"
            onChange={handleDropOff}
            value={dropOff}
          />
          <label className="label" htmlFor="destination">Destination</label>
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
        <div className="card">
          <img className="card-image" src="images/minivan.jpeg" alt="Minivan" />
          <div className="card-body">
            <h5 className="card-title">Minivan</h5>
            <p className="card-text">Side-entry handicap van conversion comes standard with a powered ramp.</p>
            <button className='button-24' onClick={() => setCar('Minivan')}>SELECT</button>
          </div>
        </div>
        <div className="card">
          <img className="card-image" src="images/newVan.png" alt="Gurney Van" />
          <div className="card-body">
            <h5 className="card-title">Gurney Van</h5>
            <p className="card-text">Wheelchair accessible Gurney van for patients with Physical constrains</p>
            <button className='button-24' onClick={() => setCar('Gurney Van')}>SELECT</button>
          </div>
        </div>
        <div className="card">
          <img className="card-image" src="images/sedan.png" alt="Sedan" />
          <div className="card-body">
            <h5 className="card-title">Sedan</h5>
            <p className="card-text">Common Carrier Transportation for patients without Physical constrains</p>
            <button className='button-24' onClick={() => setCar('Sedan')}>SELECT</button>
          </div>
        </div>
      </div>
      <br />
      <br />

      <button className='button-24' onClick={saveRequest}>Next</button>
    </div>
  );
}

export default InfoPage;
