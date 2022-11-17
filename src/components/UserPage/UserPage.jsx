import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const appt = useSelector(store => store.apptRequest)
  const history = useHistory()
  const dispatch = useDispatch()
  const newAppt = () =>{
    console.log('schedule new appointment')
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_REQUESTS' });
}, []);

console.log('load appt',appt)
return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h2>upcoming appointments</h2>
      <h3>{appt.pickup_location
}</h3>

      <button onClick={newAppt}>new request</button>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>
    
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
