const initialState = {
  tickets: [],
  ticket: null,
  ticketSuccess: false,
  ticketError: false,
  ticketMessage: null

}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'get_tickets': 
            return {
                ...state,
                tickets: action.payload,
                ticketSuccess: true
            }
        case 'get_ticket':
            return {
                ...state,
                ticketSuccess: true,
                ticket: action.payload
            }
        case 'create_ticket':
            console.log(action.payload)
            return {
                ...state,
                ticketSuccess: true,
                tickets: [action.payload, ...state.tickets]
            }
        case 'update_ticket':
            return {
                ...state,
                ticketSuccess: true,
                ticket: action.payload,
                tickets: state.tickets.map(item => item._id.toString() === action.payload._id.toString() ? action.payload : item)
            }
        case 'ticket_error':
            return {
                ...state,
                ticketSuccess: false,
                ticketError: true,
                ticketMessage: action.payload
            }
        case 'delete_ticket': 
            return {
                ...state,
                tickets: state.tickets.filter(item => item._id.toString() !== action.payload.toString()),
                ticketSuccess: true
            }
        case 'ticketReset': 
        console.log('reset_ticket')
            return {
                ...state,
                ticketError: false,
                ticketSuccess: false
            }
        default: 
            return state
    }
}