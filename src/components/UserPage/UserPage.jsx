import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import './UserPage.css';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const appt = useSelector(store => store.apptRequest)
  const history = useHistory()
  const dispatch = useDispatch()
  const newAppt = () => {
    console.log('schedule new appointment')
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REQUESTS', payload: user.id });
  }, []);


  console.log('load appt', appt)
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h2>upcoming appointments</h2>
      <section>
        {appt.map(appointment => {
          return (
            <table className='styled-table '>
              <thead>
                <tr>
                  <th scope="col">Date/Time</th>
                  <th scope="col">Pickup Location</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Vehicle type</th>
                  <th scope="col">Status</th>
                  <th>Request Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">{appointment.date_time}</td>
                  <td>{appointment.pickup_location}</td>
                  <td scope="row">{appointment.destination}</td>
                  <td>{appointment.car_type}</td>
                  <td>{appointment.request_status}</td>

                  <td>
                    <div class="dropdown">
                      <button onclick="myFunction()" class="dropbtn">Change Status</button>
                      <div id="myDropdown" class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>


          );
        })}
      </section>


      <button onClick={newAppt}>new request</button>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
