import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './AdminPage.css';
import swal from 'sweetalert2';


function AdminPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const appt = useSelector(store => store.apptRequest)
  const history = useHistory()
  const dispatch = useDispatch()
  const newAppt = () => {
    console.log('schedule new appointment')
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_REQUESTS' });
  }, []);

  console.log('load appt', appt)


  const deleteRequest = () => {
    console.log('in delete')


  }
  return (
    <div className="container">
      <h2>WELCOME TO ADMIN PAGE</h2>
      {/* <h2>Welcome, {user.username}!</h2> */}
      <br />
      <h2>List of approved appointments</h2>
      <section>
        {appt.map(appointment => {
          return (
            <table key={appointment.id} className='styled-table '>
              <thead>
                <tr>
                  <th scope="col">user</th>
                  <th scope="col">Date/Time</th>
                  <th scope="col">Pickup Location</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Vehicle type</th>
                  <th scope="col">Status</th>
                  <th>Remove Appointment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">{appointment.user_id}</td>
                  <td scope="row">{new Date(appointment.date_time).toLocaleString()}</td>
                  <td>{appointment.pickup_location}</td>
                  <td scope="row">{appointment.destination}</td>
                  <td>{appointment.car_type}</td>
                  <td>{appointment.request_status}</td>
                  <button className='button-24' onClick={() => {
                    swal.fire({
                      title: 'Delete Request?',
                      showCancelButton: true,
                      confirmButtonText: 'Yes!',
                      denyButtonText: `Cancel`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        swal.fire('Request deleted!', '', 'success')
                        //Post to database

                        //Clearing new order on click
                        dispatch({
                          type: 'DELETE_REQUEST',
                          payload: appointment
                        })

                        //fetch users updated info

                        dispatch({ type: 'FETCH_ALL_REQUESTS' })

                      
                        
                      } else if (result.isDenied) {
                        swal.fire('Checkout not complete!', '', 'info')
                      }
                    })
                  }}>Delete</button>
                </tr>
              </tbody>
            </table>


          );
        })}
      </section>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>

  );
}

// this allows us to use <App /> in index.js
export default AdminPage;
