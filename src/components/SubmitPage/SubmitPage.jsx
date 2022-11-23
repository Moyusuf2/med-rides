import { Box } from "@mui/system";
// import InfoPage from "../ApptPage/ApptPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api'
function SubmitPage() {
    const center = { lat: 44.977540, lng: -93.263643 }
    const dispatch = useDispatch();
    const history = useHistory();
    const appointment = useSelector((store) => store.requestForm);
     console.log('appointment review:',appointment);

    // const appointment = appointment.results;
console.log(appointment);
        

        const submitRequest = () =>{
            dispatch({
                type: 'ADD_REQUEST',
                payload: appointment
            })
            history.push('/')
        }
    return (
        <>
            <h2>Confirm Appointment</h2>
            <ul>
                <li>Date/Time: {appointment.dateTime}</li>
                <br />
                <li>Pickup Location: {appointment.pickUp}</li>
                <br />
                <li>Destination: {appointment.dropOff}</li>
                <br />
                <li>Vehicle Choice: {appointment.car}</li>
                <br />
                <li>Distance: {appointment.distance}</li>
                <br />
                <li>Duration: {appointment.duration}</li>
            </ul>
            <Button onClick={submitRequest}>Submit</Button>
            {/* <div className='calculation'>
                <h2>Distance: {distance} </h2>
                <h2>Duration: {duration} </h2>
            </div> */}
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
                    mapContainerStyle={{ width: '90%', height: '40%', display: 'flex' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {appointment.directionsResponse && (
                        <DirectionsRenderer directions={appointment.directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
        </>

    )
}

export default SubmitPage;