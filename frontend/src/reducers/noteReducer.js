const initialState = {
    notes: [],
    noteSuccess: false,
    noteError: false,
    noteMessage: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'get_notes':
            return {
                ...state,
                notes: action.payload,
                noteSuccess: true
            }
        case 'add_note':
            console.log(action.payload)
            return {
                ...state,
                notes: [action.payload, ...state.notes],
                noteSuccess: true
            }
        case 'note_error':
            return {
                ...state,
                noteSuccess: false,
                noteError: true,
                noteMessage: action.payload
            }
        case 'note_reset':
            return {
                ...state,
                noteSuccess: false,
                noteError: false,
            }
        default: 
            return state
    }
}