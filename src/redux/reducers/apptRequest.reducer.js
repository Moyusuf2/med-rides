const apptRequest = (state = [], action) => {
    switch(action.type) {
        case 'SET_REQUESTS':
            return action.payload;
    }

    return state;
}


export default apptRequest;