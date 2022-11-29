import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
function PendingPage(){
    const pending = useSelector(store => store.apptRequest)
  const dispatch = useDispatch()

  

  useEffect(() => {
    dispatch({ 
        type: 'FETCH_UNAPPROVED_REQUESTS'})
  }, []);
    return(
        <>
        <h2>Unapproved Requests</h2>
      <section>
        {pending.map(appointment => {
          return (
            <table key={appointment.id} className='styled-table '>
              <thead>
                <tr>
                <th scope="col">request id</th>
                  <th scope="col">user</th>
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
                <td scope="row">{appointment.id}</td>
                  <td scope="row">{appointment.user_id}</td>
                  <td scope="row">{new Date(appointment.date_time).toLocaleString()}</td>
                  <td>{appointment.pickup_location}</td>
                  <td scope="row">{appointment.destination}</td>
                  <td>{appointment.car_type}</td>
                  <td>{appointment.request_status}</td>

                  <td>
                    <button className='button-24' onClick={() =>{
                      dispatch({
                        type: 'APPROVE_REQUEST',
                        payload: appointment
                    })
                    }}>Approve</button>
                    <button className='button-24' onClick={() =>{
                      dispatch({
                        type: 'DENY_REQUEST',
                        payload: appointment
                    })
                    }}>Deny</button>
                    <button className='button-24' onClick={() =>{
                      dispatch({
                        type: 'REMOVE_REQUEST',
                        payload: appointment
                    })
                    }}>Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>


          );
        })}
      </section>
      </>
    )
}

export default PendingPage;