const initialState = {
    user: null,
    message: null,
    userLoading: false,
    userError: false,
    userSuccess: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'register': 
        return {
            ...state,
            user: action.payload,
            userSuccess: true
        }
        case 'login':
            return {
                ...state,
                user: action.payload,
                userSuccess: true
            }
        case 'logout':
            return {
                ...state,
                userError: false,
                userSuccess: true,
                user: null
            }
        case 'user_error': 
            return {
                ...state,
                userError: true,
                user: null,
                message: action.payload
            }
        case 'user_reset':
            return {
                ...state,
                userSuccess: false,
                userError: false,

            } 
        default: 
            return state
    }
}