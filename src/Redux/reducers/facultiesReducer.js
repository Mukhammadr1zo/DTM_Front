const initialState = []

const facultiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FACULTIES': return action.payload; 
        default: return state
    }
}

export default facultiesReducer