import axios from "axios";
import { put, takeEvery } from 'redux-saga/effects';


function* addRequest(action){
    console.log('In addRequest SAGA with items..',action.payload)
    try{
        //send new item to server then to DB at server
        yield axios.post('/api/shelf', action.payload);

        //reset redux and rerender after store is updated
        yield put({
            type: 'FETCH_REQUESTS',
        });

    } catch (err) {
        console.error('in addItem SAGA error:', err);
    }
}
    function* fetchRequests(){
        console.log('fetching requests')
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




function* requestSaga() {
    //fetch the shelf from the server and send to redux at fn*
    yield takeEvery('FETCH_REQUESTS', fetchRequests);

    //add to the shelf using saga fn*
    yield takeEvery('ADD_REQUEST', addRequest);

    //delete from the shelf using saga fn*
    // yield takeEvery('DELETE_ITEM', deleteItem);

};

//export shelf saga
export default requestSaga;