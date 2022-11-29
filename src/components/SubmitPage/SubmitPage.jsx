import { Box } from "@mui/system";
import { useEffect, useState } from 'react';
// import InfoPage from "../ApptPage/ApptPage";
import { positions } from '@mui/system';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
import requestForm from "../../redux/reducers/requestFrom.reducer";
import './SubmitPage.css'
import swal from 'sweetalert2';
function SubmitPage() {
    const libraries = ['places']
    const dispatch = useDispatch();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    })


    const history = useHistory();
    const appointment = useSelector((store) => store.requestForm);
    console.log('appointment review:', appointment);
    //  const center = { lat: 44.977540, lng: -93.263643 }


    const [map, setMap] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null)

    const distance = directionsResponse && directionsResponse.routes[0].legs[0].distance.text;
    const duration = directionsResponse && directionsResponse.routes[0].legs[0].duration.text;


    // const appointment = appointment.results;
    console.log(appointment);
    console.log('results')

    useEffect(() => {
        calculateRoute();
    }, [appointment]);

    async function calculateRoute() {

        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: appointment.pickUp,
            destination: appointment.dropOff,
            travelMode: google.maps.TravelMode.DRIVING,
        })

        setDirectionsResponse(results);
    }





    const submitRequest = () => {

        swal.fire({
            title: 'Send Request?',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire('Request sent!', '', 'success')
                //Post to database

                //Clearing new order on click
                dispatch({
                    type: 'ADD_REQUEST',
                    payload: appointment
                });

                //fetch users updated info
                // dispatch({ type: 'FETCH_USER_REQUESTS', payload: user.id });


                //Navigating back to home page
                history.push('/user');
            } else if (result.isDenied) {
                swal.fire('Checkout not complete!', '', 'info')
            }
        })

    }


    return (
        <div className="container">
            <div className="confirm-container">
                <h2>Confirm Appointment</h2>
                <br />
                <ul>
                    <li>Date/Time: {new Date(appointment.dateTime).toLocaleString()}</li>
                    <br />
                    <li>Pickup Location: {appointment.pickUp}</li>
                    <br />
                    <li>Destination: {appointment.dropOff}</li>
                    <br />
                    <li>Vehicle Choice: {appointment.car}</li>
                    <br />
                    <li>Distance: {distance}</li>
                    <br />
                    <li>Duration: {duration}</li>
                </ul>
                <br />
                <button className="button-24" onClick={submitRequest}>Submit</button>
            </div>

            <Box
                sx={{
                    mx: 'auto',
                    position: 'fixed',
                    left: '40%',
                    top: '8.5%',
                    width: "90%",
                    height: "100%"

                }}
            >
                {isLoaded &&
                    <GoogleMap
                        // center={center}
                        zoom={10}
                        mapContainerStyle={{ width: '70%', height: '90%' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                        onLoad={map => setMap(map)}
                    >
                        <Marker
                        // position={center} 
                        />
                        {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}
                    </GoogleMap>}
            </Box>
        </div>

    )
}

export default SubmitPage;