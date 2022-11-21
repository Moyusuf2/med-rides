import { ContactSupportOutlined } from "@mui/icons-material";
import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects';


function* addRequest(action){
    console.log('In addRequest SAGA with items..',action.payload)
    try{
        //send new item to server then to DB at server
        yield axios.post('/api/request', action.payload);

        //reset redux and rerender after store is updated
        yield put({
            type: 'FETCH_ALL_REQUESTS',
        });

    } catch (err) {
        console.error('in addItem SAGA error:', err);
    }
}
    function* fetchRequests(action){
        console.log('fetching requests')
        // if(action.payload !== 'true'){
        try{
            const requests = yield axios.get('/api/request');
            console.log('request.data',requests.data);
            //send to redux
            yield put({
                type: 'SET_REQUESTS',
                payload: requests.data
            })
    
        } catch (err){
            //on error
            console.error('in fetch request SAGA error:', err);
        };
    }
    // else{
    //     try{
    //         const requests = yield axios.get('/api/request/unapproved');
    //         console.log('request.data',requests.data);
    //         //send to redux
    //         yield put({
    //             type: 'SET_REQUESTS',
    //             payload: requests.data
    //         })
    
    //     } catch (err){
    //         //on error
    //         console.error('in fetch request SAGA error:', err);
    //     };
// }   
    // }

    function* fetchUserRequest(action){
        console.log('fetching user\'s request',action.payload)

        try{
            const request = yield axios.get(`/api/request/${action.payload}`)
            yield put ({
                type: 'SET_REQUESTS',
                payload: request.data

            })
        }
        catch (error){
            console.log('error getting user\'s request',error)
        }
    }

function* fetchUnapproved(){
    console.log('fetching unapproved appointments');
    try{
        const unapproved = yield axios.get(`/api/request/fetchunapproved`);
        console.log('here\'s the unapproved appts:',unapproved);

        yield put({
            type: 'SET_REQUESTS',
            payload: unapproved.data
        })
    }
    catch (error){
        console.log('error fetching unapproved requests',error.data)
    }
}

function* approveRequest(action){
    console.log('approve action is:', action.payload)
    try{
        const approveRequest = yield axios.put(`/api/request/${action.payload.id}`)
        console.log('appointment approved', approveRequest)

        yield put({
            type: 'FETCH_ALL_REQUESTS',
        });
    }
    catch (error){
        console.log('error approving request')
    }
}

function* denyRequest(action){
    console.log('approve action is:', action.payload)
    try{
        const approveRequest = yield axios.put(`/api/request/deny/${action.payload.id}`)
        console.log('appointment approved', approveRequest)

        yield put({
            type: 'FETCH_ALL_REQUESTS',
        });
    }
    catch (error){
        console.log('error approving request')
    }
}

function* deleteRequest(action){
    console.log('in delete request',action.payload.id)

    try{
        yield axios.delete(`/api/request/${action.payload.id}`)

        yield put({
            type: 'FETCH_ALL_REQUESTS'
        })
    }
    catch( error ){
        console.log('error deleting request',error)
    }
}
function* requestSaga() {
    //fetch the shelf from the server and send to redux at fn*
    yield takeEvery('FETCH_ALL_REQUESTS', fetchRequests);

    //add to the shelf using saga fn*
    yield takeEvery('ADD_REQUEST', addRequest);

    yield takeEvery('FETCH_USER_REQUESTS',fetchUserRequest)

    yield takeEvery('FETCH_UNAPPROVED_REQUESTS',fetchUnapproved)

    yield takeEvery('APPROVE_REQUEST',approveRequest)
    //delete saga fn*
    yield takeEvery('DELETE_REQUEST', deleteRequest);

    yield takeEvery('DENY_REQUEST',denyRequest)

};

//export shelf saga
export default requestSaga;