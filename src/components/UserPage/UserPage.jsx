import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';

function UserPage() {
  const user = useSelector((store) => store.user);
  const appt = useSelector((store) => store.apptRequest);
  const history = useHistory();
  const dispatch = useDispatch();

  const newAppt = () => {
    console.log('schedule new appointment');
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_REQUESTS', payload: user.id });
  }, [dispatch, user.id]);

  const cancelBtn = () => {
    console.log('test');
  };

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h2>Upcoming Appointments</h2>
      <section>
        {appt.map((appointment) => (
          <table key={appointment.id} className="styled-table">
            <thead>
              <tr>
                <th scope="col">Date/Time</th>
                <th scope="col">Pickup Location</th>
                <th scope="col">Destination</th>
                <th scope="col">Vehicle type</th>
                <th scope="col">Status</th>
                <th>Cancel Appointment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">{new Date(appointment.date_time).toLocaleString()}</td>
                <td>{appointment.pickup_location}</td>
                <td scope="row">{appointment.destination}</td>
                <td>{appointment.car_type}</td>
                <td>{appointment.request_status}</td>
                <td>
                  <button className="button-24" onClick={cancelBtn}>
                    <i className="bi bi-trash">Cancel</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </section>

      <button className="button-24" onClick={newAppt}>
        New Request
      </button>
      <br />
      <br />
      <LogOutButton className="button-24" />
    </div>
  );
}

export default UserPage;
