const initialState = JSON.parse(localStorage.getItem('subjects')) || {
    first_subject: '',
    secons_subject: ''
}

const subjectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBJECTS': return action.payload; 
        default: return state
    }
}

export default subjectsReducer