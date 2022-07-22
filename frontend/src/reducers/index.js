import {combineReducers} from 'redux'
import authReducer from './authReducer'
import ticketReducer from './ticketReducer'
import noteReducer from './noteReducer'

export default combineReducers({
    auth: authReducer,
    Ticket: ticketReducer,
    note: noteReducer
})