const requestForm = (state =[],action) =>{
    switch (action.type){
        case 'SET_FORM':
            return action.payload
    }
    return state;
}

export default requestForm;